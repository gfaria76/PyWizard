# Python Básico — Schema JSON de Conteúdo

Escopo desta documentação: `modulo1`, `modulo2` e `modulo3`.

## Contrato comum dos JSONs

As características de acesso, recompensa e regras pedagógicas são definidas por `tipo` + `subtipo` na documentação, e **não** persistidas em cada arquivo.

### Ordem canônica dos atributos top-level

1. `id`
2. `curso`
3. `modulo`
4. `aula`
5. `numero`
6. `tipo`
7. `subtipo`
8. `titulo`
9. `subtitulo`
10. `objetivo`
11. `duracao`
12. `tags`
13. `secoes`
14. `premio` (quando existir)
15. `avaliacao` (quando existir)

### Campos removidos dos JSONs

- `acesso`
- `recompensasRpg`
- `regrasPedagogicas`

## Tipos editoriais

| Código | Tipo | Subtipo | Arquivo |
|---|---|---|---|
| `CT` | Aula | conceito | `aula-XX-conceitos.json` |
| `TA` | Trilha | aprendiz | `aula-XX-trilha-aprendiz.json` |
| `TV` | Trilha | aventura | `aula-XX-trilha-aventura.json` |
| `TG` | Trilha | guardiao | `aula-YY-trilha-guardiao.json` |
| `MG` | Masmorra | grupo | `aula-YY-exedicao_guilda.json` |
| `MB` | Masmorra | boss | `aula-YY-boss.json` |
| `MP` | Masmorra | prova | `aula-13-PROVA.json` |

## Regras por família de conteúdo

- `conceitos`
  - foco em ensino explícito
  - seções esperadas: `abertura`, `conceito`, `pratica_guiada`, `pratica_autonoma`, `fechamento`
- `trilha-aprendiz`
  - prática em sala
  - **5 desafios**
- `trilha-aventura`
  - prática autônoma
  - **5 desafios**
- `trilha-guardiao`
  - revisão acumulativa
  - **10 desafios**
- `exedicao_guilda`
  - cooperação em equipe
  - **5 integrantes** e **1 desafio por integrante**
- `boss`
  - avaliação principal do bloco
  - seções esperadas: `abertura`, `aquecimento`, `maratona`, `backend`
- `PROVA`
  - avaliação final do módulo
  - banco com **20 questões**
  - sorteio com **5 questões**, sendo **3 médias + 2 difíceis**
  - mínimo de **5 variações equivalentes**

## Campos textuais padrão

- `texto_md`
- `enunciado_md`
- `descricao_md`

## Referência

Para o contrato completo do metamodelo, consultar `SCHEMA_DOCUMENTATION.md`.
