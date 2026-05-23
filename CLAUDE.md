# CLAUDE.md

Referência técnica completa do projeto ALG1-2026. Fonte de verdade para decisões de código e arquitetura.

> Visão geral (setup, stack, navegação) está em [`README.md`](./README.md).
> Schema dos JSONs de aula está em [`SCHEMA_DOCUMENTATION.md`](./SCHEMA_DOCUMENTATION.md).

---

## Comandos

```bash
# Dev
npm install
npm run dev               # Dev server em http://localhost:3000
npm run build && npm run preview

# Qualidade
npm run lint
npm run typecheck

# Supabase CLI (banco não conectado em dev ainda)
npx supabase start
npx supabase db reset
npx supabase migration new <nome>
npx supabase db push
npx supabase gen types typescript --local > app/types/database.types.ts
```

---

## Visão Geral

**ALG1-2026** é uma apostila digital interativa + plataforma de maratonas de programação para "Algoritmos e Programação I" na UFMS (Campus de Coxim). Ensina Python (variáveis, condicionais, listas, `for`, `while`, funções).

É um **Nuxt 4 SPA** (`ssr: false`) com Nitro API routes, deploy no Netlify. O banco é Supabase Postgres (planejado — ainda não conectado ao app).

### Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Nuxt 4 (SPA, `ssr: false`) |
| UI | Nuxt UI v4 + Tailwind CSS 4 |
| Estado | Pinia |
| Editor | CodeMirror 6 |
| DB | Supabase Postgres 15+ (planejado) |
| Deploy | Netlify |
| IA tutoria | DeepSeek / Groq / Ollama |

> **Sem** `@nuxt/content` / MDC. O conteúdo das aulas é JSON em `data/`, servido por Nitro.

### Estado atual dos subsistemas

| Subsistema | Status |
|---|---|
| Conteúdo (138 arquivos JSON: 46 por módulo × 3 módulos) | Ativo |
| Frontend (curso → módulo → núcleo → aula → atividade) | Ativo |
| Banco de dados (Supabase) | Stub — retorna 503 |
| Maratonas / submissões / chat | Aguardando DB |
| AI tutoria (`/api/ai/dica`) | Ativo (requer `AI_PROVIDER`) |

---

## Arquitetura

### Decisões de projeto

- SPA mode — toda proteção de rotas será client-side quando auth for ativada

### Roles (3)

`professor` · `aluno` · `juiz`


---

## Conteúdo das Aulas (JSON Schema)

Conteúdo em `data/cursos/python/moduloN/nucleoN/` (núcleos 1–4 com aulas regulares; núcleo 5 com prova final + labirinto consolidado).

```json
{
  "id": "python-1.1.1-CT",
  "curso": "python",
  "modulo": 1,
  "nucleo": 1,
  "aula": 1,
  "numero": "1.1.1",
  "tipo": "aula",
  "subtipo": "conceito",
  "titulo": "Variáveis e Tipos Básicos",
  "subtitulo": "O começo de tudo",
  "duracao": "1h30",
  "tags": ["variáveis", "tipos"],
  "secoes": {
    "abertura": {
      "objetivo": { "texto_md": "..." },
      "retomada": { "texto_md": "..." },
      "situacao": { "texto_md": "..." },
      "problematizacao": { "texto_md": "..." }
    },
    "conceito": {
      "titulo": "...",
      "texto_md": "...",
      "exemplos": [{ "titulo": "...", "texto_md": "...", "python": "..." }]
    },
    "pratica_guiada": {
      "titulo": "...",
      "texto_md": "...",
      "exemplos": [
        { "titulo": "Passo 1 — ...", "texto_md": "...", "python": "..." },
        { "titulo": "Passo 2 — ...", "texto_md": "...", "python": "..." }
      ]
    },
    "pratica_autonoma": { "titulo": "...", "texto_md": "..." },
    "fechamento": {
      "quiz": { "texto_md": "..." },
      "leitura_complementar": { "texto_md": "..." },
      "reflexao": { "texto_md": "..." }
    }
  }
}
```

### Convenções do schema

- `id` no padrão `<curso>-<M.N.Y>-<COD>` (ex.: `python-1.1.1-CT`, `python-1.5.1-MP`).
- `numero` é **string** `"M.N.Y"` (M=módulo, N=núcleo, Y=aula local 1–3); `nucleo` e `aula` são inteiros redundantes para facilitar indexação.
- `tipo` em **caixa baixa** (`aula`, `trilha`, `masmorra`).
- `titulo` sem prefixo numerado de tipo/subtipo (não use "Trilha do Aprendiz I:", "Maratona Prática III:", "Labirinto IV:").
- Conceito tem `pratica_guiada.exemplos[]` com 2–3 passos progressivos (Básico → Intermediário → Integração).
- Conceitos **não** têm `desafios` (essa chave existe apenas em trilhas/masmorras).

### Códigos editoriais

| Código | Subtipo | Arquivo (sob `moduloN/nucleoN/`) |
|---|---|---|
| `CT` | conceito | `M.N.Y-conceitos.json` |
| `TA` | aprendiz | `M.N.Y-trilha-aprendiz.json` |
| `TV` | aventura | `M.N.Y-trilha-aventura.json` |
| `TG` | guardiao | `M.N.Y-trilha-guardiao.json` |
| `MG` | grupo | `M.N.Y-exedicao_guilda.json` |
| `MS` | simulado | `M.N.Y-labirinto_sabedoria.json` |
| `MB` | boss | `M.N.Y-maratona.json` |
| `MP` | prova | `M.5.1-prova.json` |

### Subtipos canônicos (`subtipo`)

`conceito` · `aprendiz` · `aventura` · `guardiao` · `grupo` · `simulado` · `boss` · `prova`

### Convenção de numeração

- Aulas regulares: `numero = "M.N.Y"` onde N ∈ {1..4} e Y ∈ {1, 2, 3}.
- Aula 3 do núcleo encerra com `grupo + simulado + boss` (todos com `numero = "M.N.3"`).
- Núcleo 5 contém a avaliação final do módulo: `simulado + prova` com `numero = "M.5.1"`.

### Regra especial das provas

`M.5.1-prova.json` mantém banco com 20 questões; o frontend sorteia 5 por aplicação de forma determinística pelo slug, usando `pickQuestionPool` em `app/composables/useQuestSections.ts`:

- distribuição alvo: `3 médias + 2 difíceis`
- mínimo de 5 variações equivalentes por questão

Referência completa do schema: `SCHEMA_DOCUMENTATION.md`.

### Labirintos da Sabedoria (`simulado`)

Cada núcleo tem um simulado (`M.N.3-labirinto_sabedoria.json`) que é o **espelho do boss** do mesmo núcleo: mesmas habilidades, dados sintéticos diferentes, **sem aquecimento** (só `maratona.missoes`). O labirinto do núcleo 5 (`M.5.1-labirinto_sabedoria.json`) é a consolidação dos 4 labirintos, com 8 missões (2 representativas de cada núcleo) servindo como pré-prova.

### Módulos (13 aulas cada)

- Módulo I — Variáveis, Matemática e Condicionais
- Módulo II — Coleções e Repetições (`for`, `while`, listas, matrizes)
- Módulo III — Funções e Programação Estruturada (`def`, escopo, `*args/**kwargs`, `import`)

Cada módulo tem 13 aulas (4 núcleos × 3 + prova final) e **46 arquivos JSON** (4 núcleos × 11 + nucleo5 × 2).


---

## Navegação (rotas)

```
/                                                       seleção de curso
/[curso]                                                lista de módulos
/[curso]/[modulo]                                       lista de núcleos (+ prova final)
/[curso]/[modulo]/[nucleo]                              lista de aulas
/[curso]/[modulo]/[nucleo]/[aula]                       lista de atividades da aula
/[curso]/[modulo]/[nucleo]/[aula]/[atividade]           atividade renderizada por subtipo
```

A página `[atividade].vue` é roteadora: mapeia `lesson.subtipo` → view especializado em `app/components/aula/{Subtipo}View.vue` (ConceitoView, AprendizView, AventuraView, GuardiaoView, GrupoView, BossView, ProvaView; `simulado` usa BossView).

### Endpoints relevantes

- `GET /api/cursos/catalogo` — lista de cursos.
- `GET /api/cursos/[curso]/modulos` — módulos + aulas + atividades agrupadas por `numero`.
- `GET /api/cursos/[curso]/modulos/[modulo]/nucleos/[nucleo]/aulas/[aula]` — payload de uma aula específica (atividades para a arena).
- `GET /api/cursos/python/aulas/[...slug]` — carrega um JSON de atividade pelo slug (`modulo1/nucleo1/1.1.1-conceitos`).

`server/utils/course-catalog.ts:groupLessons` agrupa quests por `numero` (string), expondo `nucleo` e `aula` em cada `CourseLessonSummary`.

---

## Motor de Combate (`POST /api/submissoes`)

1. Validar sessão + rate limit + maratona ativa + janela de tempo
2. Deduzir 1 Mana — bloquear se Mana=0 ou HP=0
3. Anti-trapaça: tokenizar código, verificar tags Python vs skills desbloqueadas
4. Executar via OneCompiler API (`server/utils/runner.ts`)
5. Resultado:
   - Aceito → +XP, +Moedas (com decay), +1 Mana
   - Rejeitado → −1 HP
   - Skill bloqueada (HARD REJECT) → −5🪙, sem executar

**Fórmula de moedas**:
```
moedasBase = config.moedas_questao_maratona  (padrão: 50)
penalidade = (tentativa - 1) × config.penalidade_erro  (padrão: 10%)
moedasGanhas = round(moedasBase × max(0, 1.0 - penalidade))
```

**Fórmula de pontos**:
```
pontosBase = extraído da questão  (padrão: 100)
pontos = max(round(pontosBase × 0.9^(tentativa-1)), 10)
Se penalidade de integridade: pontos = max(round(pontos × 0.9), 5)
```

**Anti-trapaça de skills**: código tokenizado (`/[a-zA-Z_]+/g`) → verifica `token → skill` → se skill não desbloqueada: HARD REJECT + multa −5🪙.

---

## Design do RPG

### Filosofia
> "Se o aluno precisa resolver um problema para vencer o jogo, e o problema exige que ele aprenda, então jogar É aprender."

### Stats do personagem

| Stat | Início | Função |
|------|--------|--------|
| ❤️ HP | 3/3 | Perde 1 ao errar uma submissão. Com 0 HP, não pode mais submeter |
| 💎 Mana | 10/10 | Gasta 1 por submissão; reembolsada no acerto. Hard cap diário |
| ⭐ XP | 0 | Ganho ao acertar. Usado para desbloquear skills e subir de nível |
| 🪙 Moedas | 10 | Comprar poções, pagar ingressos de masmorras |
| 🏅 Nível | 1 | Sobe com XP. Cada nível: +2 Mana máx, +1 HP máx |

**Mana — Hard Cap**: regeneração diária nunca ultrapassa a Mana Máxima. Para acumular mais, comprar Poção de Mana.

### Poderes do professor

| Poder | Efeito |
|-------|--------|
| Curar Turma | Repõe HP e Mana de todos os alunos |
| Curar Aluno | Repõe HP e Mana de um aluno específico |
| Ativar Masmorra | Cria instância de quest com gavetas de loot |
| Creditar Moedas | Crédito manual para um aluno |

### Sistema de Gacha (Masmorras)

1. Professor define o pool de prêmios e ativa a masmorra
2. Sistema cria gavetas (array tamanho = nº de alunos)
3. Prêmios embaralhados nas gavetas; gavetas vazias dão moedas de consolação
4. Ordem de abertura = ordem de conclusão da masmorra
5. Anti-duplicata: `aluno_quest_loot_log` — UNIQUE(aluno_id, quest_slug)

### Conquistas (exemplos do seed)

| Slug | Nome | Condição | Moedas | XP |
|------|------|----------|--------|-----|
| `primeira_submissao` | Primeiros Passos | 1 submissão | 10 | 5 |
| `primeiro_acerto` | Na Mosca! | Acertar de primeira | 15 | 10 |
| `speedrunner` | Speedrunner | Aceito em < 5min | 20 | 15 |
| `mago_solitario` | Mago Solitário | Sem usar dicas | 25 | 20 |

---

## Variáveis de Ambiente

```env
# Supabase (a ativar)
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Auth
PIN_ADMIN=seu-pin-aqui
DEV_AUTH_BYPASS=true
DEV_AUTH_PERFIL=professor

# IA tutoria
AI_PROVIDER=deepseek          # deepseek | groq | ollama | (vazio = desabilitado)
DEEPSEEK_API_KEY=
GROQ_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

# Execução remota Python
ONECOMPILER_URL=
ONECOMPILER_API_KEY=
ONECOMPILER_TIMEOUT_MS=8000
```

---

## Regras de Turma e Chave de Acesso

- `codigo_acesso`: hex de 6 dígitos, validade de 4h (`codigo_acesso_expira_em`)
- Ao expirar, autocadastro retorna: *"Chave expirada, solicite nova ao professor"*
- Alunos já vinculados não são afetados pela expiração
- Professor pode regenerar a qualquer momento; chave anterior é invalidada imediatamente

---

## Deploy

Netlify com `@netlify/nuxt` + Supabase Postgres.
