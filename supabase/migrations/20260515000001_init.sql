-- ============================================================================
-- ALG1-2026 — Schema inicial (Fase 2)
-- Cobre: aluno/turma/auth, progresso RPG, submissões, conquistas, config_jogo.
-- Auth é delegada ao Supabase Auth (auth.users); aluno é o perfil estendido.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tipos
-- ----------------------------------------------------------------------------
create type perfil_usuario as enum ('professor', 'aluno', 'juiz');

-- ----------------------------------------------------------------------------
-- aluno — perfil estendido do auth.users
-- ----------------------------------------------------------------------------
create table aluno (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  nome text not null,
  perfil perfil_usuario not null default 'aluno',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index aluno_perfil_idx on aluno(perfil);

-- ----------------------------------------------------------------------------
-- turma — agrupa alunos sob um professor
-- codigo_acesso: hex 6 dígitos, TTL 4h (regenerável pelo professor)
-- ----------------------------------------------------------------------------
create table turma (
  id uuid primary key default gen_random_uuid(),
  professor_id uuid not null references aluno(id) on delete restrict,
  nome text not null,
  codigo_acesso text,
  codigo_acesso_expira_em timestamptz,
  created_at timestamptz not null default now()
);

create index turma_codigo_acesso_idx on turma(codigo_acesso) where codigo_acesso is not null;

-- ----------------------------------------------------------------------------
-- aluno_turma — many-to-many; aluno entra via codigo_acesso, fica permanente
-- ----------------------------------------------------------------------------
create table aluno_turma (
  aluno_id uuid not null references aluno(id) on delete cascade,
  turma_id uuid not null references turma(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (aluno_id, turma_id)
);

-- ----------------------------------------------------------------------------
-- aluno_progresso — stats RPG persistidos (fonte de verdade, supera localStorage)
-- ----------------------------------------------------------------------------
create table aluno_progresso (
  aluno_id uuid primary key references aluno(id) on delete cascade,
  level int not null default 1,
  xp int not null default 0,
  coins int not null default 10,
  hp int not null default 3,
  max_hp int not null default 3,
  mana int not null default 10,
  max_mana int not null default 10,
  completed_quest_slugs text[] not null default '{}',
  unlocked_skills text[] not null default '{}',
  mana_last_regen_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- aluno_submissao — log de todas as tentativas (sucesso ou erro)
-- ----------------------------------------------------------------------------
create table aluno_submissao (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references aluno(id) on delete cascade,
  quest_slug text not null,
  desafio_id text,                              -- id do desafio dentro da quest (opcional)
  codigo text not null,
  aceito boolean not null,
  tentativa int not null default 1,             -- contador por (aluno, quest, desafio)
  output text,
  expected text,
  err_msg text,
  integridade_penalidade boolean not null default false,  -- usado em F4 (anti-trapaça)
  xp_ganho int not null default 0,
  moedas_ganhas int not null default 0,
  hp_perdido int not null default 0,
  created_at timestamptz not null default now()
);

create index aluno_submissao_aluno_quest_idx on aluno_submissao(aluno_id, quest_slug, desafio_id);
create index aluno_submissao_created_at_idx on aluno_submissao(created_at desc);

-- ----------------------------------------------------------------------------
-- aluno_conquista — galeria persistida (preenchida em F6)
-- ----------------------------------------------------------------------------
create table aluno_conquista (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references aluno(id) on delete cascade,
  conquista_slug text not null,
  unlocked_at timestamptz not null default now(),
  unique (aluno_id, conquista_slug)
);

create index aluno_conquista_aluno_idx on aluno_conquista(aluno_id);

-- ----------------------------------------------------------------------------
-- config_jogo — constantes globais ajustáveis sem deploy
-- ----------------------------------------------------------------------------
create table config_jogo (
  key text primary key,
  value jsonb not null,
  descricao text,
  updated_at timestamptz not null default now()
);

insert into config_jogo(key, value, descricao) values
  ('moedas_questao_maratona', '50'::jsonb, 'Moedas base por desafio aceito (tipo E)'),
  ('moedas_questao_aula',     '15'::jsonb, 'Moedas base por desafio aceito (tipo A)'),
  ('xp_questao_maratona',     '180'::jsonb, 'XP base por desafio aceito (tipo E)'),
  ('xp_questao_aula',         '80'::jsonb,  'XP base por desafio aceito (tipo A)'),
  ('penalidade_erro',         '0.1'::jsonb, 'Penalidade por tentativa errada (fração)'),
  ('penalidade_integridade',  '0.1'::jsonb, 'Penalidade adicional por uso de skill bloqueada'),
  ('multa_skill_bloqueada',   '5'::jsonb,   'Moedas perdidas em HARD REJECT (F4)'),
  ('regen_mana_diaria',       '10'::jsonb,  'Mana regenerada no primeiro login do dia (até max_mana)'),
  ('pontos_minimos',          '10'::jsonb,  'Pontos mínimos garantidos em acerto, mesmo com decay');

-- ----------------------------------------------------------------------------
-- Triggers — updated_at automático
-- ----------------------------------------------------------------------------
create or replace function tg_set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger aluno_updated_at before update on aluno for each row execute function tg_set_updated_at();
create trigger aluno_progresso_updated_at before update on aluno_progresso for each row execute function tg_set_updated_at();
create trigger config_jogo_updated_at before update on config_jogo for each row execute function tg_set_updated_at();

-- ----------------------------------------------------------------------------
-- Trigger — criar aluno + aluno_progresso quando auth.users é criado
-- (rodado via service-role na primeira inserção em aluno; mantém atomicidade)
-- ----------------------------------------------------------------------------
create or replace function tg_inicializar_progresso() returns trigger language plpgsql as $$
begin
  insert into aluno_progresso(aluno_id) values (new.id);
  return new;
end;
$$;

create trigger aluno_inicializar_progresso
  after insert on aluno
  for each row execute function tg_inicializar_progresso();

-- ============================================================================
-- Row Level Security
-- Aluno vê/edita só os próprios dados. Professor vê dados da própria turma.
-- Para F2 (escopo atual) deixamos RLS habilitado mas com policies permissivas
-- baseadas em auth.uid(). Refinamento de RBAC fica para iteração futura.
-- ============================================================================

alter table aluno enable row level security;
alter table turma enable row level security;
alter table aluno_turma enable row level security;
alter table aluno_progresso enable row level security;
alter table aluno_submissao enable row level security;
alter table aluno_conquista enable row level security;
alter table config_jogo enable row level security;

-- aluno: self-read, self-update (perfil é imutável via API client)
create policy aluno_self_read on aluno
  for select using (id = auth.uid());

create policy aluno_self_update on aluno
  for update using (id = auth.uid())
  with check (id = auth.uid() and perfil = 'aluno');

-- aluno_progresso: self-read; writes só via service-role (motor de combate)
create policy aluno_progresso_self_read on aluno_progresso
  for select using (aluno_id = auth.uid());

-- aluno_submissao: self-read
create policy aluno_submissao_self_read on aluno_submissao
  for select using (aluno_id = auth.uid());

-- aluno_conquista: self-read
create policy aluno_conquista_self_read on aluno_conquista
  for select using (aluno_id = auth.uid());

-- turma e aluno_turma: aluno vê turmas em que está matriculado
create policy turma_membro_read on turma
  for select using (
    exists (select 1 from aluno_turma where turma_id = turma.id and aluno_id = auth.uid())
    or professor_id = auth.uid()
  );

create policy aluno_turma_self_read on aluno_turma
  for select using (aluno_id = auth.uid());

-- config_jogo: leitura pública para todos os autenticados
create policy config_jogo_read on config_jogo
  for select using (auth.uid() is not null);
