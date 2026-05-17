// Cadastro de aluno via código de acesso da turma.
//
// Pipeline:
//   1. Valida body (Zod)
//   2. Se codigo_acesso presente: busca turma com codigo válido (não-expirado)
//   3. Cria usuário no auth.users (service-role)
//   4. Insere em `aluno` (trigger inicializa aluno_progresso)
//   5. Se turma encontrada: insere em aluno_turma
//   6. Retorna o perfil (sem sessão; frontend faz signInWithPassword depois)
//
// Importante: este endpoint NÃO loga o usuário. O cliente deve, após receber
// 200, chamar `useSupabaseClient().auth.signInWithPassword({email, password})`.

import { z } from 'zod'
import { getSupabaseAdmin } from '~~/server/utils/supabase'

const BodySchema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  codigo_acesso: z.string().regex(/^[a-f0-9]{6}$/i).optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, BodySchema.parse)
  const admin = await getSupabaseAdmin(event)

  // 1. Validar código de acesso (se informado)
  let turmaId: string | null = null
  if (body.codigo_acesso) {
    const { data: turmaRaw, error } = await admin
      .from('turma')
      .select('id, codigo_acesso_expira_em')
      .eq('codigo_acesso', body.codigo_acesso.toLowerCase())
      .maybeSingle()

    if (error) {
      throw createError({ statusCode: 500, statusMessage: `Erro ao validar código: ${error.message}` })
    }

    const turma = turmaRaw as { id: string, codigo_acesso_expira_em: string | null } | null

    if (!turma || (turma.codigo_acesso_expira_em && new Date(turma.codigo_acesso_expira_em) < new Date())) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Chave expirada, solicite nova ao professor.',
      })
    }

    turmaId = turma.id
  }

  // 2. Criar usuário no auth.users (email já confirmado — sem verificação por agora)
  const { data: created, error: authErr } = await admin.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true,
    user_metadata: { nome: body.nome },
  })

  if (authErr || !created?.user) {
    throw createError({ statusCode: 400, statusMessage: authErr?.message ?? 'Falha ao criar usuário.' })
  }

  // 3. Inserir em `aluno` (trigger AFTER INSERT inicializa aluno_progresso)
  const { error: alunoErr } = await admin.from('aluno').insert([{
    id: created.user.id,
    email: body.email,
    nome: body.nome,
    perfil: 'aluno',
  }])

  if (alunoErr) {
    // Rollback: deletar o user criado para evitar órfão
    await admin.auth.admin.deleteUser(created.user.id)
    throw createError({ statusCode: 500, statusMessage: `Erro ao criar perfil: ${alunoErr.message}` })
  }

  // 4. Vincular à turma (se houver código)
  if (turmaId) {
    const { error: turmaErr } = await admin.from('aluno_turma').insert([{
      aluno_id: created.user.id,
      turma_id: turmaId,
      joined_at: new Date().toISOString(),
    }])

    if (turmaErr) {
      // Não-fatal — aluno fica criado mas sem turma; logamos e seguimos.
      console.error('[cadastro] falha ao vincular turma:', turmaErr.message)
    }
  }

  return {
    aluno_id: created.user.id,
    email: body.email,
    nome: body.nome,
    turma_vinculada: Boolean(turmaId),
  }
})
