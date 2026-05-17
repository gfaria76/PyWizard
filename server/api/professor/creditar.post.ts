// Poder do professor: creditar moedas a um aluno específico.

import { z } from 'zod'
import { getSupabaseAdmin, requireProfessor } from '~~/server/utils/supabase'

const BodySchema = z.object({
  aluno_id: z.string().uuid(),
  turma_id: z.string().uuid(),
  moedas: z.number().int().min(1).max(1000),
  motivo: z.string().max(200).optional(),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireProfessor(event)
  const body = await readValidatedBody(event, BodySchema.parse)
  const admin = getSupabaseAdmin(event)

  // Verificar que a turma é deste professor
  const { data: turma } = await admin
    .from('turma')
    .select('id')
    .eq('id', body.turma_id)
    .eq('professor_id', user.id)
    .maybeSingle() as { data: { id: string } | null }

  if (!turma) {
    throw createError({ statusCode: 403, statusMessage: 'Turma não encontrada ou não pertence a você.' })
  }

  // Verificar que o aluno está na turma
  const { data: vinculo } = await admin
    .from('aluno_turma')
    .select('aluno_id')
    .eq('turma_id', body.turma_id)
    .eq('aluno_id', body.aluno_id)
    .maybeSingle() as { data: { aluno_id: string } | null }

  if (!vinculo) {
    throw createError({ statusCode: 404, statusMessage: 'Aluno não encontrado nesta turma.' })
  }

  // Buscar saldo atual e incrementar
  const { data: prog } = await admin
    .from('aluno_progresso')
    .select('coins')
    .eq('aluno_id', body.aluno_id)
    .maybeSingle() as { data: { coins: number } | null }

  if (!prog) {
    throw createError({ statusCode: 404, statusMessage: 'Progresso do aluno não encontrado.' })
  }

  const novoSaldo = prog.coins + body.moedas

  const { error } = await admin
    .from('aluno_progresso')
    .update({ coins: novoSaldo })
    .eq('aluno_id', body.aluno_id)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Falha ao creditar moedas.' })
  }

  return {
    aluno_id: body.aluno_id,
    moedas_creditadas: body.moedas,
    novo_saldo: novoSaldo,
    motivo: body.motivo ?? null,
  }
})
