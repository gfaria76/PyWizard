// PUT /api/progresso/:aluno_id
//
// Faz upsert do aluno_progresso no Supabase.
// Apenas o próprio aluno pode atualizar (aluno_id deve casar com o user autenticado).

import { z } from 'zod'
import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'
import type { AlunoProgresso } from '~/types/database.types'

const BodySchema = z.object({
  completed_quest_slugs: z.array(z.string()).optional(),
  xp: z.number().int().nonnegative().optional(),
  coins: z.number().int().nonnegative().optional(),
  hp: z.number().int().nonnegative().optional(),
  mana: z.number().int().nonnegative().optional(),
  level: z.number().int().min(1).optional(),
})

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const aluno_id = getRouterParam(event, 'aluno_id')

  if (aluno_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Acesso negado: aluno_id não corresponde ao usuário autenticado.' })
  }

  const body = await readValidatedBody(event, BodySchema.parse)
  const admin = getSupabaseAdmin(event)

  const upsertPayload: Partial<AlunoProgresso> & Pick<AlunoProgresso, 'aluno_id'> = {
    aluno_id: aluno_id as string,
    ...body,
  }

  const { data, error } = await admin
    .from('aluno_progresso')
    .upsert(upsertPayload, { onConflict: 'aluno_id' })
    .select()
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Erro ao atualizar progresso: ${error.message}` })
  }

  return data as AlunoProgresso
})
