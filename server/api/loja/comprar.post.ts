// POST /api/loja/comprar
//
// Compra itens da loja usando moedas do aluno.
// Custos (hard-coded por enquanto; futuramente virão de config_jogo):
//   pocao_hp:         30 moedas → +2 HP  (capped em max_hp)
//   pocao_mana:       40 moedas → +3 Mana (capped em max_mana)
//   ingresso_masmorra: 50 moedas → deduz moedas (sem stat; futuro: adiciona ingresso)

import { z } from 'zod'
import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'
import type { AlunoProgresso } from '~/types/database.types'

const BodySchema = z.object({
  item: z.enum(['pocao_hp', 'pocao_mana', 'ingresso_masmorra']),
  quantidade: z.number().int().min(1).max(10).optional().default(1),
})

interface ItemConfig {
  custo: number
  aplicar: (progresso: AlunoProgresso, qtd: number) => Partial<AlunoProgresso>
}

const CATALOGO: Record<string, ItemConfig> = {
  pocao_hp: {
    custo: 30,
    aplicar: (p, qtd) => ({ hp: Math.min(p.hp + 2 * qtd, p.max_hp) }),
  },
  pocao_mana: {
    custo: 40,
    aplicar: (p, qtd) => ({ mana: Math.min(p.mana + 3 * qtd, p.max_mana) }),
  },
  ingresso_masmorra: {
    custo: 50,
    aplicar: (_p, _qtd) => ({}),
  },
}

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readValidatedBody(event, BodySchema.parse)
  const admin = getSupabaseAdmin(event)

  // Carregar progresso atual
  const { data: progressoRaw, error: progErr } = await admin
    .from('aluno_progresso')
    .select('*')
    .eq('aluno_id', user.id)
    .maybeSingle()

  if (progErr || !progressoRaw) {
    throw createError({
      statusCode: 404,
      statusMessage: `Progresso não encontrado: ${progErr?.message ?? 'sem registro'}`,
    })
  }

  const progresso = progressoRaw as AlunoProgresso
  const item = CATALOGO[body.item]!
  const custoTotal = item.custo * body.quantidade

  if (progresso.coins < custoTotal) {
    throw createError({
      statusCode: 400,
      statusMessage: `Moedas insuficientes. Necessário: ${custoTotal}, disponível: ${progresso.coins}.`,
    })
  }

  const statChanges = item.aplicar(progresso, body.quantidade)
  const updatePayload: Partial<AlunoProgresso> = {
    coins: progresso.coins - custoTotal,
    ...statChanges,
  }

  const { data: updated, error: updErr } = await admin
    .from('aluno_progresso')
    .update(updatePayload)
    .eq('aluno_id', user.id)
    .select()
    .maybeSingle()

  if (updErr) {
    throw createError({ statusCode: 500, statusMessage: `Falha ao processar compra: ${updErr.message}` })
  }

  return updated as AlunoProgresso
})
