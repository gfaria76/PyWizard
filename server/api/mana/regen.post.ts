// POST /api/mana/regen
//
// Regenera mana do aluno autenticado.
// Chamado no login ou manualmente. Usa config_jogo para o valor de regeneração.
// Se mana < max_mana, incrementa em `mana_regen_diaria` (padrão: 5), capped em max_mana.

import { getSupabaseAdmin, requireUser } from '~~/server/utils/supabase'
import type { AlunoProgresso, ConfigJogo } from '~/types/database.types'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const admin = getSupabaseAdmin(event)

  // Carregar configuração de jogo
  const { data: configRows, error: cfgErr } = await admin
    .from('config_jogo')
    .select('key, value')

  if (cfgErr) {
    throw createError({ statusCode: 500, statusMessage: `Falha ao ler config: ${cfgErr.message}` })
  }

  const cfgMap = new Map<string, unknown>(
    (configRows as Pick<ConfigJogo, 'key' | 'value'>[] ?? []).map(
      (r: Pick<ConfigJogo, 'key' | 'value'>) => [r.key, r.value],
    ),
  )
  const num = (k: string, fb: number) => {
    const v = cfgMap.get(k)
    return typeof v === 'number' ? v : fb
  }
  const manaRegenDiaria = num('mana_regen_diaria', 5)

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

  // Sem necessidade de regeneração
  if (progresso.mana >= progresso.max_mana) {
    return progresso
  }

  const novaMana = Math.min(progresso.mana + manaRegenDiaria, progresso.max_mana)

  const { data: updated, error: updErr } = await admin
    .from('aluno_progresso')
    .update({
      mana: novaMana,
      mana_last_regen_at: new Date().toISOString(),
    })
    .eq('aluno_id', user.id)
    .select()
    .maybeSingle()

  if (updErr) {
    throw createError({ statusCode: 500, statusMessage: `Falha ao regenerar mana: ${updErr.message}` })
  }

  return updated as AlunoProgresso
})
