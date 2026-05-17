// Poder do professor: curar turma ou aluno específico.
// Repõe HP → max_hp e Mana → max_mana.

import { z } from 'zod'
import { getSupabaseAdmin, requireProfessor } from '~~/server/utils/supabase'

const BodySchema = z.object({
  turma_id: z.string().uuid(),
  aluno_id: z.string().uuid().optional(), // omitido → cura toda a turma
})

async function curarAluno(admin: ReturnType<typeof getSupabaseAdmin>, alunoId: string) {
  const { data: prog } = await admin
    .from('aluno_progresso')
    .select('max_hp, max_mana')
    .eq('aluno_id', alunoId)
    .maybeSingle() as { data: { max_hp: number, max_mana: number } | null }

  if (!prog) return

  await admin
    .from('aluno_progresso')
    .update({ hp: prog.max_hp, mana: prog.max_mana })
    .eq('aluno_id', alunoId)
}

export default defineEventHandler(async (event) => {
  const { user } = await requireProfessor(event)
  const body = await readValidatedBody(event, BodySchema.parse)
  const admin = getSupabaseAdmin(event)

  // Verificar que a turma pertence a este professor
  const { data: turma } = await admin
    .from('turma')
    .select('id')
    .eq('id', body.turma_id)
    .eq('professor_id', user.id)
    .maybeSingle() as { data: { id: string } | null }

  if (!turma) {
    throw createError({ statusCode: 403, statusMessage: 'Turma não encontrada ou não pertence a você.' })
  }

  if (body.aluno_id) {
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

    await curarAluno(admin, body.aluno_id)
    return { curados: 1 }
  }

  // Curar toda a turma
  const { data: membros } = await admin
    .from('aluno_turma')
    .select('aluno_id')
    .eq('turma_id', body.turma_id) as { data: { aluno_id: string }[] | null }

  if (!membros?.length) return { curados: 0 }

  await Promise.all(membros.map(m => curarAluno(admin, m.aluno_id)))

  return { curados: membros.length }
})
