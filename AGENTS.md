# AGENTS.md

Referência técnica completa do projeto ALG1-2026. Fonte de verdade para decisões de código e arquitetura.

---

## Comandos

```bash
# Dev
pnpm dev                  # Dev server em http://localhost:3000
pnpm build && pnpm preview

# Qualidade
pnpm lint
pnpm typecheck

# Supabase CLI (banco não conectado em dev ainda)
pnpm exec supabase start
pnpm exec supabase db reset
pnpm exec supabase migration new <nome>
pnpm exec supabase db push
pnpm exec supabase gen types typescript --local > app/types/database.types.ts
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
| Conteúdo (39 aulas JSON) | Ativo |
| Frontend (curso, aulas, layouts) | Ativo |
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

Conteúdo em `data/cursos/python/modulo{1,2,3}`. O projeto usa um metamodelo **aditivo**: preserva os campos legados e adiciona metadados pedagógicos mais explícitos.

```json
{
  "id": "python-M01-A01-CT",
  "idLegado": "modulo1/aula-01-conceitos",
  "curso": "python",
  "modulo": 1,
  "aula": 1,
  "numero": 1,
  "tipo": "Aula",
  "subtipo": "conceito",
  "titulo": "Variáveis e Tipos Básicos",
  "subtitulo": "O começo de tudo",
  "duracao": "1h30",
  "tags": ["variáveis", "tipos"],
  "acesso": {},
  "recompensasRpg": {},
  "regrasPedagogicas": {},
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
      "exemplos": [{ "texto_md": "...", "python": "..." }]
    },
    "pratica_guiada": { "titulo": "...", "texto_md": "...", "python": "..." },
    "pratica_autonoma": { "titulo": "...", "texto_md": "..." },
    "fechamento": {
      "quiz": { "texto_md": "..." },
      "leitura_complementar": { "texto_md": "..." },
      "reflexao": { "texto_md": "..." }
    }
  }
}
```

### Campos novos do metamodelo

- `id` no padrão `python-M01-A01-CT`
- `idLegado` para retrocompatibilidade editorial
- `curso`, `aula`, `tipo`, `subtipo`
- `acesso`, `recompensasRpg`, `regrasPedagogicas`

### Códigos editoriais

- `CT` — Aula teórica
- `TA` — Trilha Aprendiz
- `TV` — Trilha Aventura
- `TG` — Trilha Guardião
- `MG` — Masmorra Grupo
- `MB` — Masmorra Boss
- `MP` — Masmorra Prova

### Subtipos canônicos (`subtipo`)

- `conceito`
- `aprendiz`
- `aventura`
- `guardiao`
- `grupo`
- `boss`
- `prova`

### Regra especial das provas

Arquivos `aula-13-PROVA.json` mantêm banco com 20 questões e agora documentam explicitamente:

- sorteio de 5 questões por aplicação
- distribuição `3 médias + 2 difíceis`
- mínimo de `5` variações equivalentes

Referência completa: `SCHEMA_DOCUMENTATION.md`.

**Módulos** (13 aulas cada):
- Módulo I — Variáveis, Matemática e Condicionais
- Módulo II — Coleções e Repetições (`for`, `while`, listas)
- Módulo III — Funções e Programação Estruturada


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
