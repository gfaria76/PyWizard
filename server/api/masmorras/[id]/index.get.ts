// GET /api/masmorras/:id — dados públicos da masmorra (sem revelar prêmios)
import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const masmorraId = getRouterParam(event, 'id')

  if (!masmorraId) {
    throw createError({ statusCode: 400, statusMessage: 'ID da masmorra não informado.' })
  }

  const admin = getSupabaseAdmin(event)

  const { data: masmorra } = await admin
    .from('masmorra')
    .select('id, titulo, quest_slug, total_gavetas, consolacao_moedas, ativa, turma_id')
    .eq('id', masmorraId)
    .maybeSingle() as {
    data: {
      id: string
      titulo: string
      quest_slug: string
      total_gavetas: number
      consolacao_moedas: number
      ativa: boolean
      turma_id: string
    } | null
  }

  if (!masmorra) {
    throw createError({ statusCode: 404, statusMessage: 'Masmorra não encontrada.' })
  }

  // Verificar que o aluno está na turma (ou é o professor)
  const { data: vinculo } = await admin
    .from('aluno_turma')
    .select('aluno_id')
    .eq('turma_id', masmorra.turma_id)
    .eq('aluno_id', user.id)
    .maybeSingle() as { data: { aluno_id: string } | null }

  const { data: turma } = await admin
    .from('turma')
    .select('professor_id')
    .eq('id', masmorra.turma_id)
    .maybeSingle() as { data: { professor_id: string } | null }

  if (!vinculo && turma?.professor_id !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Acesso negado.' })
  }

  // Quantas gavetas já foram abertas (para mostrar progresso)
  const { count: abertas } = await admin
    .from('aluno_quest_loot_log')
    .select('id', { count: 'exact', head: true })
    .eq('masmorra_id', masmorraId)

  return {
    ...masmorra,
    gavetas_abertas: abertas ?? 0,
  }
})
