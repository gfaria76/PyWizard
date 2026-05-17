-- ============================================================================
-- ALG1-2026 — Masmorras e Gacha (Fase 10)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- masmorra — instância criada pelo professor, vinculada a uma quest
-- ----------------------------------------------------------------------------
create table masmorra (
  id uuid primary key default gen_random_uuid(),
  turma_id uuid not null references turma(id) on delete cascade,
  professor_id uuid not null references aluno(id) on delete restrict,
  quest_slug text not null,
  titulo text not null,
  ativa boolean not null default true,
  total_gavetas int not null default 0,
  consolacao_moedas int not null default 5,
  created_at timestamptz not null default now()
);

create index masmorra_turma_idx on masmorra(turma_id, ativa);
create index masmorra_quest_idx on masmorra(quest_slug) where ativa = true;

-- ----------------------------------------------------------------------------
-- masmorra_gaveta — cada posição tem um prêmio (ou vale consolação)
-- A posição 0 é a mais valiosa; gavetas "vazias" dão consolacao_moedas.
-- Embaralhamento feito no endpoint de criação.
-- ----------------------------------------------------------------------------
create table masmorra_gaveta (
  id uuid primary key default gen_random_uuid(),
  masmorra_id uuid not null references masmorra(id) on delete cascade,
  posicao int not null,
  tipo_premio text not null default 'consolacao', -- 'moedas' | 'xp' | 'consolacao'
  valor_moedas int not null default 0,
  valor_xp int not null default 0,
  descricao text,
  unique (masmorra_id, posicao)
);

-- ----------------------------------------------------------------------------
-- aluno_quest_loot_log — anti-duplicata: aluno abre 1 gaveta por masmorra,
-- em ordem de chegada (quem bate primeiro no endpoint pega posição menor).
-- ----------------------------------------------------------------------------
create table aluno_quest_loot_log (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references aluno(id) on delete cascade,
  masmorra_id uuid not null references masmorra(id) on delete cascade,
  gaveta_id uuid not null references masmorra_gaveta(id),
  posicao_aberta int not null,
  opened_at timestamptz not null default now(),
  unique (aluno_id, masmorra_id)
);

create index aluno_loot_masmorra_idx on aluno_quest_loot_log(masmorra_id, posicao_aberta);

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------
alter table masmorra enable row level security;
alter table masmorra_gaveta enable row level security;
alter table aluno_quest_loot_log enable row level security;

-- Aluno vê masmorras ativas da própria turma
create policy masmorra_aluno_read on masmorra
  for select using (
    exists (
      select 1 from aluno_turma
      where turma_id = masmorra.turma_id
        and aluno_id = auth.uid()
    )
    or professor_id = auth.uid()
  );

-- Gavetas: aluno lê gavetas de masmorras que pode ver (sem revelar prêmio dos outros)
create policy masmorra_gaveta_aluno_read on masmorra_gaveta
  for select using (
    exists (
      select 1 from masmorra m
      join aluno_turma at on at.turma_id = m.turma_id
      where m.id = masmorra_gaveta.masmorra_id
        and at.aluno_id = auth.uid()
    )
  );

-- Aluno vê o próprio loot
create policy aluno_loot_self_read on aluno_quest_loot_log
  for select using (aluno_id = auth.uid());

-- Professor vê o loot de todos na turma
create policy aluno_loot_professor_read on aluno_quest_loot_log
  for select using (
    exists (
      select 1 from masmorra m
      where m.id = masmorra_id
        and m.professor_id = auth.uid()
    )
  );
