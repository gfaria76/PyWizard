# Schema de Conteúdo — Aulas em JSON

Cada atividade do curso é um arquivo JSON em `data/cursos/<curso>/moduloN/nucleoN/`. Este documento descreve o shape canônico atual.

> **Estado da migração (2026-05):** Módulo I do Python (`data/cursos/python/modulo1/`) está no padrão novo descrito aqui. Módulos II e III ainda usam o esquema legado (`aula-XX-*.json` com `numero: int`, `tipo: "Aula"`).

---

## 1. Estrutura de pastas

```
data/cursos/<curso>/
├── game/
│   └── moduloN.json          Inventário do módulo (lista de aulas + recompensas)
└── moduloN/
    ├── nucleo1/
    │   ├── 1.1.1-conceitos.json
    │   ├── 1.1.1-trilha-aprendiz.json
    │   ├── 1.1.1-trilha-aventura.json
    │   ├── 1.1.1-trilha-guardiao.json
    │   ├── 1.1.2-conceitos.json
    │   ├── 1.1.2-trilha-aprendiz.json
    │   ├── 1.1.2-trilha-aventura.json
    │   ├── 1.1.2-trilha-guardiao.json
    │   ├── 1.1.3-exedicao_guilda.json
    │   ├── 1.1.3-labirinto_sabedoria.json
    │   └── 1.1.3-maratona.json
    ├── nucleo2/ … nucleo4/   (mesma estrutura)
    └── nucleo5/              (avaliação final do módulo)
        ├── 1.5.1-labirinto_sabedoria.json
        └── 1.5.1-prova.json
```

Cada **aula** (`1.N.Y`) reúne todas as atividades que compartilham o mesmo `numero`:

| Aula `1.N.1` e `1.N.2` | Aula `1.N.3` (encerramento do núcleo) | Aula `1.5.1` (encerramento do módulo) |
|---|---|---|
| conceito + 3 trilhas (aprendiz, aventura, guardião) | grupo + simulado + boss | simulado + prova |

---

## 2. Convenção de IDs e numeração

### Numero (string)

`numero` é uma string com pontuação **`M.N.Y`**:

- `M` → módulo (1, 2, 3)
- `N` → núcleo (1–4 para os regulares; 5 para a avaliação final do módulo)
- `Y` → aula local dentro do núcleo (1, 2 ou 3)

Exemplos: `"1.1.1"`, `"1.2.3"`, `"1.5.1"`.

### ID

Formato canônico: `<curso>-<numero>-<COD>` onde `COD` é o código editorial do subtipo:

| Código | Subtipo | Arquivo |
|---|---|---|
| `CT` | conceito | `M.N.Y-conceitos.json` |
| `TA` | aprendiz | `M.N.Y-trilha-aprendiz.json` |
| `TV` | aventura | `M.N.Y-trilha-aventura.json` |
| `TG` | guardiao | `M.N.Y-trilha-guardiao.json` |
| `MG` | grupo | `M.N.Y-exedicao_guilda.json` |
| `MS` | simulado | `M.N.Y-labirinto_sabedoria.json` |
| `MB` | boss | `M.N.Y-maratona.json` |
| `MP` | prova | `M.N.Y-prova.json` |

Exemplo de ID: `"python-1.1.1-CT"`, `"python-1.5.1-MP"`.

---

## 3. Atributos top-level (ordem canônica)

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
  "subtitulo": "...",
  "objetivo": "...",
  "duracao": "1h30",
  "tags": ["variáveis", "tipos"],
  "secoes": { ... },
  "premio": null,
  "rpg": { ... }
}
```

Regras:

- `tipo` em **caixa baixa**: `"aula"`, `"trilha"` ou `"masmorra"`.
- `titulo` **não repete** o nome do tipo/subtipo (não use `"Trilha do Aprendiz: …"`).
- `numero` é **string**.
- `nucleo` e `aula` são **inteiros**, redundantes com `numero` para facilitar indexação.

---

## 4. Seções por subtipo

Cada subtipo organiza `secoes` de forma diferente.

### `conceito` (CT)

```json
{
  "abertura": {
    "objetivo":         { "texto_md": "..." },
    "retomada":         { "texto_md": "..." },
    "situacao":         { "texto_md": "...", "titulo": "..." },
    "problematizacao":  { "texto_md": "..." }
  },
  "conceito": {
    "titulo": "Conceito técnico",
    "texto_md": "...",
    "exemplos": [
      { "titulo": "1) ...", "texto_md": "...", "python": "..." }
    ]
  },
  "pratica_guiada": {
    "titulo": "Prática guiada",
    "texto_md": "...",
    "exemplos": [
      { "titulo": "Passo 1 — ...", "texto_md": "...", "python": "..." },
      { "titulo": "Passo 2 — ...", "texto_md": "...", "python": "..." },
      { "titulo": "Passo 3 — ...", "texto_md": "...", "python": "..." }
    ]
  },
  "pratica_autonoma": {
    "titulo": "...",
    "texto_md": "Enunciado + casos de teste em markdown."
  },
  "fechamento": {
    "titulo": "Fechamento e Autoavaliação",
    "quiz":                  { "texto_md": "..." },
    "leitura_complementar":  { "texto_md": "..." },
    "reflexao":              { "texto_md": "..." }
  }
}
```

> **Nota:** o campo `desafios` **foi removido** dos conceitos. Desafios pertencem apenas às trilhas/masmorras.

### `aprendiz` (TA) e `aventura` (TV)

```json
{
  "abertura":   { "introducao": { "texto_md": "..." } },
  "preparacao": { "titulo": "...", "texto_md": "..." },
  "desafios": {
    "titulo": "...",
    "texto_md": "...",
    "missoes": [
      { "titulo": "Missão 1", "texto_md": "Enunciado + I/O" }
    ]
  },
  "fechamento": { "titulo": "...", "reflexao": { "texto_md": "..." } }
}
```

### `guardiao` (TG)

Idêntico a aprendiz/aventura, mas `preparacao` vira `ritual` e cada missão pode ter `meta`:

```json
{
  "desafios": {
    "missoes": [
      {
        "titulo": "Desafio escalonado",
        "texto_md": "...",
        "meta": { "dificuldade": "média", "ordem": 1 }
      }
    ]
  }
}
```

### `grupo` (MG)

```json
{
  "abertura":   { "introducao": { "texto_md": "..." } },
  "formacao":   { "titulo": "...", "texto_md": "Regras de equipe (5 integrantes)" },
  "incursao": {
    "titulo": "Incursão Cooperativa",
    "texto_md": "...",
    "missoes": [ /* 5 missões, uma por integrante */ ]
  },
  "fechamento": { "titulo": "...", "reflexao": { "texto_md": "..." } }
}
```

### `boss` (MB) — arquivo `M.N.3-maratona.json`

```json
{
  "abertura":     { "introducao": { "texto_md": "..." } },
  "aquecimento": {
    "titulo": "Aquecimento (sem pontos)",
    "texto_md": "...",
    "missoes": [ { "titulo": "...", "texto_md": "...", "meta": { "tipo": "warmup" } } ]
  },
  "maratona": {
    "titulo": "Maratona (vale ponto)",
    "texto_md": "...",
    "missoes": [ { "titulo": "Missão 1", "texto_md": "...", "meta": { "tipo": "maratona" } } ]
  },
  "backend":      { "titulo": "...", "texto_md": "Metadados editoriais; não renderizar para aluno." }
}
```

### `simulado` (MS) — `M.N.3-labirinto_sabedoria.json`

Espelho do boss (aquecimento + maratona) com dados sintéticos. Conteúdo igual ao `boss`. O arquivo de `nucleo5/1.5.1-labirinto_sabedoria.json` é a **consolidação** dos 4 simulados de núcleo, servindo como pré-prova.

### `prova` (MP) — `M.5.1-prova.json`

```json
{
  "abertura": { "introducao": { "texto_md": "..." } },
  "questoes": {
    "titulo": "...",
    "texto_md": "...",
    "banco_questoes": [
      {
        "titulo": "Questão N",
        "texto_md": "Enunciado + casos de teste",
        "meta": {
          "tipo": "prova",
          "questao": 1,
          "pontos": 20,
          "dificuldade": "média",
          "variacoesEquivalentesMinimas": 5,
          "sorteioEquilibrado": true
        }
      }
      /* total: 20 questões */
    ],
    "sorteio":             { "total_banco": 20, "questoes_sorteadas": 5, "criterio": "..." },
    "equilibrioEditorial": { "..." : "..." }
  },
  "backend":  { "titulo": "...", "texto_md": "Metadados editoriais." }
}
```

> O frontend sorteia **5 das 20 questões** de forma determinística pelo slug, via `pickQuestionPool` em `app/composables/useQuestSections.ts`.

---

## 5. `game/moduloN.json`

Inventário do módulo: lista plana de todas as atividades com path do arquivo:

```json
{
  "modulo": 1,
  "titulo": "Inventário do Módulo I",
  "schema": 2,
  "aulas": [
    {
      "numero": "1.1.1",
      "rotulo": "111C",
      "tipo_aula": "A",
      "subtipo": "conceito",
      "titulo": "Variáveis e Tipos Básicos",
      "arquivo": "modulo1/nucleo1/1.1.1-conceitos.json",
      "inventario_novo": [],
      "premio": null
    }
  ]
}
```

`server/utils/course-catalog.ts:groupLessons` lê este arquivo e agrupa por `numero`. Cada grupo vira uma `CourseLessonSummary` com `nucleo`, `aula` e a lista de atividades.

---

## 6. Checklist de validação

Ao criar/editar um JSON:

- [ ] `id` no formato `<curso>-<numero>-<COD>`.
- [ ] `numero` é **string** `"M.N.Y"`.
- [ ] `tipo` em caixa baixa (`aula`/`trilha`/`masmorra`).
- [ ] `nucleo` e `aula` inteiros consistentes com `numero`.
- [ ] `titulo` **sem prefixo** do tipo/subtipo (sem "Trilha do …", "Maratona Prática …", "Labirinto III…").
- [ ] Sem campos legados: `acesso`, `recompensasRpg`, `regrasPedagogicas`, `desafios` (em conceitos).
- [ ] Para `prova`: presença de `secoes.questoes.banco_questoes[]` com 20 itens.
- [ ] Para `boss` e `simulado`: `aquecimento` + `maratona`.
- [ ] Para trilhas: `desafios.missoes[]` (não `desafios.lista`).
- [ ] Arquivo nomeado conforme tabela do §2.
