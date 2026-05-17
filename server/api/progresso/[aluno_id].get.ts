// GET /api/progresso/:aluno_id
//
// Retorna o aluno_progresso do Supabase.
// Apenas o próprio aluno pode acessar (aluno_id deve casar com o user autenticado).

import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'
import type { AlunoProgresso } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const aluno_id = getRouterParam(event, 'aluno_id')

  if (aluno_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Acesso negado: aluno_id não corresponde ao usuário autenticado.' })
  }

  const admin = getSupabaseAdmin(event)

  const { data, error } = await admin
    .from('aluno_progresso')
    .select('*')
    .eq('aluno_id', aluno_id)
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Erro ao buscar progresso: ${error.message}` })
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Progresso não encontrado.' })
  }

  return data as AlunoProgresso
})
