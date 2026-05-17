// Tipos manuais do schema. Após `pnpm exec supabase gen types typescript --local`
// este arquivo pode ser regenerado e este conteúdo descartado.
// Manter alinhado com supabase/migrations/0001_init.sql.

export type PerfilUsuario = 'professor' | 'aluno' | 'juiz'

export interface Aluno {
  id: string
  email: string
  nome: string
  perfil: PerfilUsuario
  created_at: string
  updated_at: string
}

export interface Turma {
  id: string
  professor_id: string
  nome: string
  codigo_acesso: string | null
  codigo_acesso_expira_em: string | null
  created_at: string
}

export interface AlunoTurma {
  aluno_id: string
  turma_id: string
  joined_at: string
}

export interface AlunoProgresso {
  aluno_id: string
  level: number
  xp: number
  coins: number
  hp: number
  max_hp: number
  mana: number
  max_mana: number
  completed_quest_slugs: string[]
  unlocked_skills: string[]
  mana_last_regen_at: string
  updated_at: string
}

export interface AlunoSubmissao {
  id: string
  aluno_id: string
  quest_slug: string
  desafio_id: string | null
  codigo: string
  aceito: boolean
  tentativa: number
  output: string | null
  expected: string | null
  err_msg: string | null
  integridade_penalidade: boolean
  xp_ganho: number
  moedas_ganhas: number
  hp_perdido: number
  created_at: string
}

export interface AlunoConquista {
  id: string
  aluno_id: string
  conquista_slug: string
  unlocked_at: string
}

export interface ConfigJogo {
  key: string
  value: unknown
  descricao: string | null
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      aluno: { Row: Aluno, Insert: Partial<Aluno> & Pick<Aluno, 'id' | 'email' | 'nome'>, Update: Partial<Aluno> }
      turma: { Row: Turma, Insert: Partial<Turma> & Pick<Turma, 'professor_id' | 'nome'>, Update: Partial<Turma> }
      aluno_turma: { Row: AlunoTurma, Insert: AlunoTurma, Update: Partial<AlunoTurma> }
      aluno_progresso: { Row: AlunoProgresso, Insert: Partial<AlunoProgresso> & Pick<AlunoProgresso, 'aluno_id'>, Update: Partial<AlunoProgresso> }
      aluno_submissao: { Row: AlunoSubmissao, Insert: Omit<AlunoSubmissao, 'id' | 'created_at'> & Partial<Pick<AlunoSubmissao, 'id' | 'created_at'>>, Update: Partial<AlunoSubmissao> }
      aluno_conquista: { Row: AlunoConquista, Insert: Omit<AlunoConquista, 'id' | 'unlocked_at'> & Partial<Pick<AlunoConquista, 'id' | 'unlocked_at'>>, Update: Partial<AlunoConquista> }
      config_jogo: { Row: ConfigJogo, Insert: ConfigJogo, Update: Partial<ConfigJogo> }
    }
  }
}
