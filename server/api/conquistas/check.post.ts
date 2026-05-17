// Endpoint de verificação e desbloqueio de conquistas.
//
// Chamado após uma submissão bem-sucedida para verificar e conceder conquistas ao aluno.
//
// Body: { aluno_id, event, metadata? }
// Response: { conquistasDesbloqueadas: string[] }

import { z } from 'zod'
import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'
import type { AlunoProgresso } from '~/types/database.types'

const BodySchema = z.object({
  aluno_id: z.string().uuid(),
  event: z.enum(['submissao_aceita', 'primeiro_acerto', 'speedrunner']),
  metadata: z.record(z.unknown()).optional().default({}),
})

interface ConquistaDefinicao {
  slug: string
  moedas: number
  xp: number
}

const CONQUISTAS: ConquistaDefinicao[] = [
  { slug: 'primeira_submissao', moedas: 10, xp: 5 },
  { slug: 'primeiro_acerto', moedas: 15, xp: 10 },
  { slug: 'speedrunner', moedas: 20, xp: 15 },
  { slug: 'mago_solitario', moedas: 25, xp: 20 },
]

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readValidatedBody(event, BodySchema.parse)

  // Apenas o próprio aluno ou admin pode verificar conquistas
  if (user.id !== body.aluno_id) {
    throw createError({ statusCode: 403, statusMessage: 'Acesso negado.' })
  }

  const admin = getSupabaseAdmin(event)

  // Carregar conquistas já desbloqueadas
  const { data: jaDesbloqueadas } = await admin
    .from('aluno_conquista')
    .select('conquista_slug')
    .eq('aluno_id', body.aluno_id) as { data: { conquista_slug: string }[] | null }

  const slugsJaDesbloqueados = new Set((jaDesbloqueadas ?? []).map((c) => c.conquista_slug))

  // Carregar progresso atual
  const { data: progressoRaw, error: progErr } = await admin
    .from('aluno_progresso')
    .select('*')
    .eq('aluno_id', body.aluno_id)
    .maybeSingle()

  if (progErr || !progressoRaw) {
    throw createError({ statusCode: 500, statusMessage: `Progresso não encontrado: ${progErr?.message ?? 'sem registro'}` })
  }

  const progresso = progressoRaw as AlunoProgresso

  // Contar submissões do aluno
  const { count: totalSubmissoes } = await admin
    .from('aluno_submissao')
    .select('id', { count: 'exact', head: true })
    .eq('aluno_id', body.aluno_id)

  // Contar submissões aceitas
  const { count: totalAceitas } = await admin
    .from('aluno_submissao')
    .select('id', { count: 'exact', head: true })
    .eq('aluno_id', body.aluno_id)
    .eq('aceito', true)

  const meta = body.metadata
  const aceito = body.event === 'submissao_aceita' || body.event === 'primeiro_acerto' || body.event === 'speedrunner'
  const tempoSegundos = typeof meta.tempo_segundos === 'number' ? meta.tempo_segundos : Infinity
  const usouDicas = meta.usou_dicas !== false // se não informado, assume que usou

  // Determinar quais conquistas devem ser desbloqueadas agora
  const conquistasParaDesbloquear: string[] = []

  // primeira_submissao: primeira submissão de qualquer tipo
  if (!slugsJaDesbloqueados.has('primeira_submissao') && (totalSubmissoes ?? 0) >= 1) {
    conquistasParaDesbloquear.push('primeira_submissao')
  }

  // primeiro_acerto: primeira submissão aceita
  if (!slugsJaDesbloqueados.has('primeiro_acerto') && aceito && (totalAceitas ?? 0) >= 1) {
    conquistasParaDesbloquear.push('primeiro_acerto')
  }

  // speedrunner: aceito em menos de 5 minutos
  if (!slugsJaDesbloqueados.has('speedrunner') && aceito && tempoSegundos < 300) {
    conquistasParaDesbloquear.push('speedrunner')
  }

  // mago_solitario: aceito sem usar dicas
  if (!slugsJaDesbloqueados.has('mago_solitario') && aceito && !usouDicas) {
    conquistasParaDesbloquear.push('mago_solitario')
  }

  if (conquistasParaDesbloquear.length === 0) {
    return { conquistasDesbloqueadas: [] }
  }

  // Inserir novas conquistas (ON CONFLICT DO NOTHING via upsert ignoreDuplicates)
  const inserts = conquistasParaDesbloquear.map((slug) => ({
    aluno_id: body.aluno_id,
    conquista_slug: slug,
  }))

  const { error: insertErr } = await admin
    .from('aluno_conquista')
    .insert(inserts)
    .onConflict('aluno_id,conquista_slug')

  if (insertErr) {
    // Erro não-fatal: pode ser conflito de unicidade em corrida
    console.warn('[conquistas] falha ao inserir conquistas:', insertErr.message)
  }

  // Calcular moedas e XP totais a conceder
  let moedasTotal = 0
  let xpTotal = 0

  for (const slug of conquistasParaDesbloquear) {
    const def = CONQUISTAS.find((c) => c.slug === slug)
    if (def) {
      moedasTotal += def.moedas
      xpTotal += def.xp
    }
  }

  // Atualizar aluno_progresso com os prêmios
  if (moedasTotal > 0 || xpTotal > 0) {
    const novoXp = progresso.xp + xpTotal
    const novoNivel = Math.floor(novoXp / 300) + 1
    const subiu = novoNivel > progresso.level
    const ganhouNiveis = subiu ? novoNivel - progresso.level : 0

    const { error: updErr } = await admin
      .from('aluno_progresso')
      .update({
        coins: progresso.coins + moedasTotal,
        xp: novoXp,
        level: novoNivel,
        max_hp: progresso.max_hp + ganhouNiveis,
        max_mana: progresso.max_mana + ganhouNiveis * 2,
      })
      .eq('aluno_id', body.aluno_id)

    if (updErr) {
      console.error('[conquistas] falha ao atualizar progresso:', updErr.message)
    }
  }

  return { conquistasDesbloqueadas: conquistasParaDesbloquear }
})
