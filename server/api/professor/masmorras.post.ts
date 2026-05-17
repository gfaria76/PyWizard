// Poder do professor: criar e ativar uma masmorra.
//
// O professor define:
//   - turma_id, quest_slug, titulo
//   - premios[]: lista de prêmios (até total de alunos)
//
// O sistema:
//   1. Conta alunos na turma → total_gavetas
//   2. Embaralha os prêmios nos slots
//   3. Preenche slots restantes com consolação (consolacao_moedas)
//   4. Cria masmorra + gavetas em transação

import { z } from 'zod'
import { getSupabaseAdmin, requireProfessor } from '~~/server/utils/supabase'

const PremioSchema = z.object({
  tipo_premio: z.enum(['moedas', 'xp', 'consolacao']).default('moedas'),
  valor_moedas: z.number().int().min(0).default(0),
  valor_xp: z.number().int().min(0).default(0),
  descricao: z.string().max(200).optional(),
})

const BodySchema = z.object({
  turma_id: z.string().uuid(),
  quest_slug: z.string().min(1).max(120),
  titulo: z.string().min(1).max(200),
  premios: z.array(PremioSchema).min(1).max(50),
  consolacao_moedas: z.number().int().min(1).max(100).default(5),
})

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
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

  // Contar alunos para definir total_gavetas
  const { count: totalAlunos } = await admin
    .from('aluno_turma')
    .select('aluno_id', { count: 'exact', head: true })
    .eq('turma_id', body.turma_id)

  const totalGavetas = Math.max(totalAlunos ?? 1, body.premios.length)

  // Criar a masmorra
  const { data: masmorra, error: masmorraErr } = await admin
    .from('masmorra')
    .insert([{
      turma_id: body.turma_id,
      professor_id: user.id,
      quest_slug: body.quest_slug,
      titulo: body.titulo,
      total_gavetas: totalGavetas,
      consolacao_moedas: body.consolacao_moedas,
      ativa: true,
    }])
    .select('id')
    .single() as { data: { id: string } | null, error: unknown }

  if (masmorraErr || !masmorra) {
    throw createError({ statusCode: 500, statusMessage: 'Falha ao criar masmorra.' })
  }

  // Montar array de prêmios + consolações
  const consolacao = {
    tipo_premio: 'consolacao' as const,
    valor_moedas: body.consolacao_moedas,
    valor_xp: 0,
    descricao: `${body.consolacao_moedas} 🪙 de consolação`,
  }

  const todosItens = [
    ...body.premios,
    ...Array.from({ length: totalGavetas - body.premios.length }, () => consolacao),
  ]

  const embaralhados = shuffle(todosItens)

  const gavetas = embaralhados.map((item, i) => ({
    masmorra_id: masmorra.id,
    posicao: i,
    tipo_premio: item.tipo_premio,
    valor_moedas: item.valor_moedas,
    valor_xp: item.valor_xp,
    descricao: item.descricao ?? null,
  }))

  const { error: gavetasErr } = await admin.from('masmorra_gaveta').insert(gavetas)

  if (gavetasErr) {
    // Rollback manual: deletar masmorra
    await admin.from('masmorra').delete().eq('id', masmorra.id)
    throw createError({ statusCode: 500, statusMessage: 'Falha ao criar gavetas.' })
  }

  return {
    masmorra_id: masmorra.id,
    quest_slug: body.quest_slug,
    total_gavetas: totalGavetas,
    premios_reais: body.premios.length,
    consolacoes: totalGavetas - body.premios.length,
  }
})
