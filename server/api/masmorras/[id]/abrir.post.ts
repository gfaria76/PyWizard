// Aluno abre sua gaveta na masmorra.
//
// Regras:
//   1. Masmorra deve estar ativa
//   2. Aluno deve estar na turma da masmorra
//   3. Aluno só pode abrir 1 gaveta (UNIQUE aluno_id + masmorra_id)
//   4. Recebe a próxima gaveta disponível (menor posição ainda não atribuída)
//   5. Prêmio é aplicado ao aluno_progresso imediatamente

import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const masmorraId = getRouterParam(event, 'id')

  if (!masmorraId) {
    throw createError({ statusCode: 400, statusMessage: 'ID da masmorra não informado.' })
  }

  const admin = getSupabaseAdmin(event)

  // 1. Carregar a masmorra
  const { data: masmorra } = await admin
    .from('masmorra')
    .select('id, turma_id, ativa, consolacao_moedas, total_gavetas')
    .eq('id', masmorraId)
    .maybeSingle() as { data: { id: string, turma_id: string, ativa: boolean, consolacao_moedas: number, total_gavetas: number } | null }

  if (!masmorra) {
    throw createError({ statusCode: 404, statusMessage: 'Masmorra não encontrada.' })
  }

  if (!masmorra.ativa) {
    throw createError({ statusCode: 409, statusMessage: 'Esta masmorra já foi encerrada.' })
  }

  // 2. Verificar que o aluno está na turma
  const { data: vinculo } = await admin
    .from('aluno_turma')
    .select('aluno_id')
    .eq('turma_id', masmorra.turma_id)
    .eq('aluno_id', user.id)
    .maybeSingle() as { data: { aluno_id: string } | null }

  if (!vinculo) {
    throw createError({ statusCode: 403, statusMessage: 'Você não faz parte desta turma.' })
  }

  // 3. Verificar se o aluno já abriu uma gaveta
  const { data: lootExistente } = await admin
    .from('aluno_quest_loot_log')
    .select('id, posicao_aberta, gaveta_id')
    .eq('aluno_id', user.id)
    .eq('masmorra_id', masmorraId)
    .maybeSingle() as { data: { id: string, posicao_aberta: number, gaveta_id: string } | null }

  if (lootExistente) {
    // Já abriu — retorna o resultado anterior (idempotente)
    const { data: gavetaAnterior } = await admin
      .from('masmorra_gaveta')
      .select('tipo_premio, valor_moedas, valor_xp, descricao')
      .eq('id', lootExistente.gaveta_id)
      .maybeSingle() as { data: GavetaInfo | null }

    return {
      ja_aberta: true,
      posicao: lootExistente.posicao_aberta,
      premio: gavetaAnterior,
    }
  }

  // 4. Encontrar próxima gaveta disponível (menor posição sem loot_log)
  // Usa subquery: gavetas cujo id não está em aluno_quest_loot_log.gaveta_id para esta masmorra
  const { data: gavetas } = await admin
    .from('masmorra_gaveta')
    .select('id, posicao, tipo_premio, valor_moedas, valor_xp, descricao')
    .eq('masmorra_id', masmorraId)
    .order('posicao', { ascending: true }) as { data: (GavetaInfo & { id: string, posicao: number })[] | null }

  const { data: alocados } = await admin
    .from('aluno_quest_loot_log')
    .select('gaveta_id')
    .eq('masmorra_id', masmorraId) as { data: { gaveta_id: string }[] | null }

  const alocadosSet = new Set((alocados ?? []).map(a => a.gaveta_id))
  const proximaGaveta = (gavetas ?? []).find(g => !alocadosSet.has(g.id))

  if (!proximaGaveta) {
    throw createError({ statusCode: 409, statusMessage: 'Todas as gavetas já foram abertas.' })
  }

  // 5. Registrar o loot (UNIQUE garante corrida não cria duplicata)
  const { error: lootErr } = await admin.from('aluno_quest_loot_log').insert([{
    aluno_id: user.id,
    masmorra_id: masmorraId,
    gaveta_id: proximaGaveta.id,
    posicao_aberta: proximaGaveta.posicao,
    opened_at: new Date().toISOString(),
  }])

  if (lootErr) {
    // Violação de UNIQUE → outro request ganhou a corrida, tentar a próxima
    throw createError({ statusCode: 409, statusMessage: 'Gaveta já foi pega por outro aluno — tente novamente.' })
  }

  // 6. Aplicar prêmio ao progresso do aluno
  if (proximaGaveta.valor_moedas > 0 || proximaGaveta.valor_xp > 0) {
    const { data: prog } = await admin
      .from('aluno_progresso')
      .select('coins, xp')
      .eq('aluno_id', user.id)
      .maybeSingle() as { data: { coins: number, xp: number } | null }

    if (prog) {
      await admin
        .from('aluno_progresso')
        .update({
          coins: prog.coins + proximaGaveta.valor_moedas,
          xp: prog.xp + proximaGaveta.valor_xp,
        })
        .eq('aluno_id', user.id)
    }
  }

  return {
    ja_aberta: false,
    posicao: proximaGaveta.posicao,
    premio: {
      tipo_premio: proximaGaveta.tipo_premio,
      valor_moedas: proximaGaveta.valor_moedas,
      valor_xp: proximaGaveta.valor_xp,
      descricao: proximaGaveta.descricao,
    },
  }
})

interface GavetaInfo {
  tipo_premio: string
  valor_moedas: number
  valor_xp: number
  descricao: string | null
}
