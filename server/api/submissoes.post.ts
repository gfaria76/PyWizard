// Motor de combate (Fase 3).
//
// Pipeline:
//   1. Valida body (Zod)
//   2. Resolve usuário autenticado
//   3. Carrega aluno_progresso (service-role)
//   4. Verifica HP > 0 e Mana > 0 (senão 403)
//   5. Conta tentativas anteriores para o par (quest, desafio)
//   6. Executa todos os casos de teste server-side (Piston)
//   7. Calcula recompensa via config_jogo + fórmulas do CLAUDE.md
//   8. Atualiza aluno_progresso (mana, hp, xp, coins, level, completed_quest_slugs)
//   9. Persiste aluno_submissao
//  10. Retorna { aceito, verdict, recompensa, progresso }
//
// Anti-trapaça (token gating) — DELEGADO PARA F4.

import { z } from 'zod'
import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'
import { runTestCases } from '~~/server/utils/runner'
import type { AlunoProgresso, ConfigJogo } from '~/types/database.types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminClient = any

const TestCaseSchema = z.object({
  stdin: z.string().max(4000).optional().default(''),
  expectedOutput: z.string().max(20_000),
})

const BodySchema = z.object({
  quest_slug: z.string().min(1).max(120),
  desafio_id: z.string().max(120).optional(),
  codigo: z.string().min(1).max(20_000),
  tipo_aula: z.enum(['A', 'E', 'P']).default('A'),
  casos_de_teste: z.array(TestCaseSchema).min(1).max(20),
})

interface Recompensa {
  xp_ganho: number
  moedas_ganhas: number
  hp_perdido: number
  mana_consumida: number
  level_up: boolean
  novo_level: number
}

interface Verdict {
  passed: boolean
  passed_count: number
  total: number
  first_fail: { stdin: string, expected: string, actual: string, stderr: string } | null
}

const XP_THRESHOLD_POR_NIVEL = 300

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, BodySchema.parse)
  const user = await requireUser(event)
  const admin = await getSupabaseAdmin(event)

  // 1. Carregar progresso atual
  const { data: progressoRaw, error: progErr } = await admin
    .from('aluno_progresso')
    .select('*')
    .eq('aluno_id', user.id)
    .maybeSingle()

  if (progErr || !progressoRaw) {
    throw createError({ statusCode: 500, statusMessage: `Progresso não encontrado: ${progErr?.message ?? 'sem registro'}` })
  }

  const progresso = progressoRaw as AlunoProgresso

  // 2. Verificar gates de HP/Mana
  if (progresso.hp <= 0) {
    throw createError({ statusCode: 403, statusMessage: 'HP zerado — peça ao professor para curar.' })
  }
  if (progresso.mana <= 0) {
    throw createError({ statusCode: 403, statusMessage: 'Mana zerada — descanse ou use uma poção.' })
  }

  // 3. Contar tentativas anteriores no mesmo desafio
  const { count: tentativasAnteriores } = await admin
    .from('aluno_submissao')
    .select('id', { count: 'exact', head: true })
    .eq('aluno_id', user.id)
    .eq('quest_slug', body.quest_slug)
    .eq('desafio_id', body.desafio_id ?? '')

  const tentativa = (tentativasAnteriores ?? 0) + 1

  // 4. Executar casos de teste (server-side, paralelo)
  const results = await runTestCases(body.codigo, body.casos_de_teste)
  const passedCount = results.filter(r => r.passed).length
  const total = results.length
  const aceito = passedCount === total
  const firstFail = results.find(r => !r.passed) ?? null

  // 5. Carregar config de jogo
  const cfg = await loadConfig(admin)

  // 6. Calcular recompensa
  const recompensa = computeRecompensa(aceito, body.tipo_aula, tentativa, cfg)

  // 7. Aplicar mudanças no aluno_progresso
  const novoXp = progresso.xp + recompensa.xp_ganho
  const novoNivel = Math.floor(novoXp / XP_THRESHOLD_POR_NIVEL) + 1
  const subiu = novoNivel > progresso.level
  const ganhouNiveis = subiu ? novoNivel - progresso.level : 0
  const novoMaxHp = progresso.max_hp + ganhouNiveis
  const novoMaxMana = progresso.max_mana + ganhouNiveis * 2

  // Mana: deduz 1 (consumo). Se aceito, reembolsa 1 (capped em max_mana).
  // Em level-up, restaura HP/Mana cheios (CLAUDE.md: cada nível regenera).
  let novaMana = progresso.mana - 1
  if (aceito) novaMana = Math.min(novaMana + 1, progresso.max_mana)
  if (subiu) novaMana = novoMaxMana

  let novoHp = progresso.hp - recompensa.hp_perdido
  if (subiu) novoHp = novoMaxHp

  const completedSet = new Set(progresso.completed_quest_slugs)
  // Marca quest como concluída só se for a primeira submissão aceita
  // E se for o último desafio (no MVP, qualquer aceito marca a quest)
  if (aceito) completedSet.add(body.quest_slug)

  const updatePayload = {
    level: novoNivel,
    xp: novoXp,
    coins: progresso.coins + recompensa.moedas_ganhas,
    hp: Math.max(0, novoHp),
    max_hp: novoMaxHp,
    mana: Math.max(0, novaMana),
    max_mana: novoMaxMana,
    completed_quest_slugs: Array.from(completedSet),
  } satisfies Partial<AlunoProgresso>

  recompensa.level_up = subiu
  recompensa.novo_level = novoNivel

  const { error: updErr } = await admin
    .from('aluno_progresso')
    .update(updatePayload)
    .eq('aluno_id', user.id)

  if (updErr) {
    throw createError({ statusCode: 500, statusMessage: `Falha ao atualizar progresso: ${updErr.message}` })
  }

  // 8. Persistir submissão
  const { error: subErr } = await admin.from('aluno_submissao').insert({
    aluno_id: user.id,
    quest_slug: body.quest_slug,
    desafio_id: body.desafio_id ?? null,
    codigo: body.codigo,
    aceito,
    tentativa,
    output: firstFail?.actual ?? results[0]?.actual ?? null,
    expected: firstFail?.expected ?? null,
    err_msg: firstFail?.stderr || null,
    integridade_penalidade: false, // F4
    xp_ganho: recompensa.xp_ganho,
    moedas_ganhas: recompensa.moedas_ganhas,
    hp_perdido: recompensa.hp_perdido,
  })

  if (subErr) {
    // Não-fatal — progresso já foi atualizado; logamos
    console.error('[submissoes] falha ao gravar submissao:', subErr.message)
  }

  // 9. Retornar
  const verdict: Verdict = {
    passed: aceito,
    passed_count: passedCount,
    total,
    first_fail: firstFail
      ? {
          stdin: firstFail.stdin,
          expected: firstFail.expected,
          actual: firstFail.actual,
          stderr: firstFail.stderr,
        }
      : null,
  }

  return {
    aceito,
    verdict,
    recompensa,
    progresso: Object.assign({}, progresso, updatePayload) as AlunoProgresso,
    tentativa,
  }
})

// ────────────────────────────────────────────────────────────────────────────

async function loadConfig(admin: AdminClient) {
  const { data, error } = await admin.from('config_jogo').select('key, value')
  if (error) {
    throw createError({ statusCode: 500, statusMessage: `Falha ao ler config: ${error.message}` })
  }

  const map = new Map<string, unknown>((data as Pick<ConfigJogo, 'key' | 'value'>[] ?? []).map((r: Pick<ConfigJogo, 'key' | 'value'>) => [r.key, r.value]))
  const num = (k: string, fb: number) => {
    const v = map.get(k)
    return typeof v === 'number' ? v : fb
  }

  return {
    moedas_questao_aula: num('moedas_questao_aula', 15),
    moedas_questao_maratona: num('moedas_questao_maratona', 50),
    xp_questao_aula: num('xp_questao_aula', 80),
    xp_questao_maratona: num('xp_questao_maratona', 180),
    penalidade_erro: num('penalidade_erro', 0.1),
    pontos_minimos: num('pontos_minimos', 10),
  }
}

function computeRecompensa(
  aceito: boolean,
  tipoAula: 'A' | 'E' | 'P',
  tentativa: number,
  cfg: Awaited<ReturnType<typeof loadConfig>>,
): Recompensa {
  if (!aceito) {
    return {
      xp_ganho: 0,
      moedas_ganhas: 0,
      hp_perdido: 1,
      mana_consumida: 1,
      level_up: false,
      novo_level: 0,
    }
  }

  const xpBase = tipoAula === 'A' ? cfg.xp_questao_aula : cfg.xp_questao_maratona
  const moedasBase = tipoAula === 'A' ? cfg.moedas_questao_aula : cfg.moedas_questao_maratona

  // XP: decay 0.9^(tentativa-1), com piso pontos_minimos
  const xpGanho = Math.max(Math.round(xpBase * 0.9 ** (tentativa - 1)), cfg.pontos_minimos)

  // Moedas: penalidade linear, mínimo 0
  const fator = Math.max(0, 1 - (tentativa - 1) * cfg.penalidade_erro)
  const moedasGanhas = Math.round(moedasBase * fator)

  return {
    xp_ganho: xpGanho,
    moedas_ganhas: moedasGanhas,
    hp_perdido: 0,
    mana_consumida: 1,
    level_up: false, // calculado depois com os stats atualizados
    novo_level: 0,
  }
}
