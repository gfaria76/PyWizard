// Helpers Supabase para Nitro server.
//
// O módulo @nuxtjs/supabase expõe:
//   - serverSupabaseClient(event)      → client com cookies do usuário logado (RLS aplicada)
//   - serverSupabaseServiceRole(event) → client com service-role (bypassa RLS)
//   - serverSupabaseUser(event)        → user atual ou null
//
// Estes wrappers tipam os retornos com nosso Database e centralizam o uso.

import type { H3Event } from 'h3'
import { serverSupabaseClient, serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

// Helpers Supabase para Nitro server.
// Usamos o client sem generic Database para evitar conflitos com o tipo interno
// do módulo @nuxtjs/supabase; type-assertions nos resultados quando necessário.

/** Client respeitando RLS (usar para leituras do próprio aluno). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabaseUserClient(event: H3Event): any {
  return serverSupabaseClient(event)
}

/** Client com service-role (usar APENAS no motor de combate / endpoints privilegiados). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabaseAdmin(event: H3Event): any {
  return serverSupabaseServiceRole(event)
}

/** User atual; lança 401 se não autenticado. */
export async function requireUser(event: H3Event) {
  const user = await serverSupabaseUser(event)
  if (!user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Não autenticado.' })
  }
  return user
}

/** User com perfil professor; lança 401/403 se não autorizado. */
export async function requireProfessor(event: H3Event) {
  const user = await requireUser(event)
  const admin = getSupabaseAdmin(event)

  const { data: aluno } = await admin
    .from('aluno')
    .select('perfil')
    .eq('id', user.id)
    .maybeSingle() as { data: { perfil: string } | null }

  if (!aluno || aluno.perfil !== 'professor') {
    throw createError({ statusCode: 403, statusMessage: 'Acesso restrito a professores.' })
  }

  return { user, perfil: aluno.perfil }
}
