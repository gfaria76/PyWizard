# ALG1-2026

Apostila digital interativa + plataforma de maratonas de programação para a disciplina **Algoritmos e Programação I** (UFMS, Campus de Coxim). Ensina Python (variáveis, condicionais, listas, `for`, `while`, funções) com mecânica de RPG educacional — XP, mana, habilidades, masmorras.

> Para a referência técnica detalhada (motor de combate, gacha, fórmulas de XP/moedas), veja **[CLAUDE.md](./CLAUDE.md)**.
>
> Para o schema dos JSONs de conteúdo, veja **[SCHEMA_DOCUMENTATION.md](./SCHEMA_DOCUMENTATION.md)**.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Nuxt 4 (SPA, `ssr: false`) |
| UI | Nuxt UI v4 + Tailwind CSS 4 |
| Estado | Pinia |
| Editor de código | CodeMirror 6 |
| Banco (planejado) | Supabase Postgres 15+ |
| Deploy | Netlify |
| IA tutoria | DeepSeek / Groq / Ollama |

---

## Comandos

```bash
npm install            # dependências
npm run dev            # dev server em http://localhost:3000
npm run build          # build de produção
npm run preview        # serve o build
npm run lint           # ESLint
npm run typecheck      # vue-tsc via nuxt typecheck
```

Supabase CLI (banco ainda não conectado em dev):

```bash
npx supabase start
npx supabase migration new <nome>
npx supabase gen types typescript --local > app/types/database.types.ts
```

---

## Estrutura de pastas

```
alg1-2026/
├── app/
│   ├── components/
│   │   ├── aula/                  Views por subtipo de aula (Conceito, Aprendiz, Aventura, Guardião, Grupo, Boss, Prova) + compartilhados
│   │   ├── code/CodeEditor.vue    CodeMirror 6 com tema Python
│   │   ├── game/GameHUD.vue       HUD do jogador (HP, Mana, XP, moedas)
│   │   ├── nav/                   StudentNav + ProfessorNav
│   │   ├── quest/MarkdownBlock.vue  Renderizador de markdown
│   │   └── ui/CodeBlock.vue       Bloco de código com highlight Python
│   ├── composables/
│   │   ├── useQuestSections.ts    Lê secoes do JSON da aula por subtipo
│   │   └── useSelectionFlow.ts    Última seleção (curso/módulo/aula/atividade) em localStorage
│   ├── layouts/                   default, student, professor
│   ├── middleware/                professor.ts (gate de rota)
│   ├── pages/                     ver "Navegação" abaixo
│   ├── stores/                    Pinia
│   └── types/                     course.ts, selection.ts, database.types.ts
├── server/
│   ├── api/cursos/                Endpoints REST (catalogo, modulos, aulas)
│   └── utils/                     course-catalog.ts, course-data.ts, runner.ts (OneCompiler)
├── data/cursos/                   Conteúdo das aulas em JSON
│   └── python/
│       ├── game/moduloN.json      Inventário do módulo (aulas + recompensas)
│       └── moduloN/nucleoN/       JSONs de cada atividade (conceito, trilhas, masmorras)
└── CLAUDE.md, SCHEMA_DOCUMENTATION.md, README.md
```

---

## Navegação

```
/                                                       seleção de curso
/[curso]                                                seleção de módulo
/[curso]/[modulo]                                       seleção de núcleo (+ prova final do módulo)
/[curso]/[modulo]/[nucleo]                              seleção de aula
/[curso]/[modulo]/[nucleo]/[aula]                       seleção de atividade
/[curso]/[modulo]/[nucleo]/[aula]/[atividade]           atividade renderizada por subtipo
```

A página de atividade é uma roteadora: lê `lesson.subtipo` e renderiza via `<component :is="...">` o view especializado em `app/components/aula/{Subtipo}View.vue`.

---

## Conteúdo

### Convenção de numeração de aulas

O número da aula é `XY` onde `X` é o núcleo e `Y` é a posição dentro do núcleo:

- `11` → núcleo 1, aula 1
- `12` → núcleo 1, aula 2
- `21` → núcleo 2, aula 1
- `50` → prova final do módulo (fora dos núcleos regulares)

### Subtipos de atividade

| Subtipo | Código | Descrição | View |
|---|---|---|---|
| `conceito` | CT | Aula teórica (abertura, conceito, prática guiada, prática autônoma, fechamento) | `ConceitoView.vue` |
| `aprendiz` | TA | Trilha guiada em sala — 5 desafios | `AprendizView.vue` |
| `aventura` | TV | Trilha autônoma — 5 desafios | `AventuraView.vue` |
| `guardiao` | TG | Revisão acumulativa — 10 desafios | `GuardiaoView.vue` |
| `grupo` | MG | Expedição em grupo (5 integrantes) | `GrupoView.vue` |
| `boss` | MB | Avaliação prática principal do bloco | `BossView.vue` |
| `prova` | MP | Banco de 20 questões, sorteio determinístico de 5 | `ProvaView.vue` |

### Módulos de Python

- **Módulo I** — Variáveis, Matemática e Condicionais
- **Módulo II** — Coleções e Repetições (`for`, `while`, listas)
- **Módulo III** — Funções e Programação Estruturada

Cada módulo tem 4 núcleos × 2 aulas/núcleo de conteúdo + 1 prova final.

---

## Variáveis de ambiente

```env
# Supabase (a ativar)
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Autenticação
PIN_ADMIN=<pin>
DEV_AUTH_BYPASS=true
DEV_AUTH_PERFIL=professor

# IA tutoria
AI_PROVIDER=deepseek            # deepseek | groq | ollama | (vazio = desabilitado)
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

## Estado dos subsistemas

| Subsistema | Status |
|---|---|
| Conteúdo (24 aulas conceito + trilhas + bosses + provas) | Ativo |
| Frontend (curso → módulo → núcleo → aula → atividade) | Ativo |
| Banco Supabase | Stub — endpoints retornam 503 |
| Maratonas / submissões / chat | Aguardando DB |
| AI tutoria (`/api/ai/dica`) | Ativo (requer `AI_PROVIDER`) |
| Editor CodeMirror | Ativo (Python highlight + tema) |
| Execução Python via OneCompiler | Configurado via env |

---

## Deploy

Netlify com `@netlify/nuxt`. Supabase Postgres é o banco-alvo (ainda não plugado no app em dev).
