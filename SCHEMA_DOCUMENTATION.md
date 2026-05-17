# 📋 Schema de Conteúdo Pedagógico — Metamodelo 2026

## Status

- ✅ Escopo ativo: `data/cursos/python/modulo1`, `data/cursos/python/modulo2`, `data/cursos/python/modulo3`
- ✅ Campos `acesso`, `recompensasRpg` e `regrasPedagogicas` removidos dos JSONs
- ✅ Ordem de atributos top-level padronizada em todos os arquivos

---

## Regra editorial

- `tipo` + `subtipo` definem as características de acesso, recompensa e regra pedagógica na documentação.
- Essas características **não são repetidas** em cada arquivo JSON das aulas.

---

## Convenção de IDs

### Formato canônico

```text
python-M01-A01-CT
```

### Estrutura

- `python` → curso
- `M01` → módulo com 2 dígitos
- `A01` → aula/bloco com 2 dígitos
- `CT` → código editorial do tipo/subtipo

### Códigos editoriais

| Código | Tipo | Subtipo | Arquivo |
|---|---|---|---|
| `CT` | Aula | conceito | `aula-XX-conceitos.json` |
| `TA` | Trilha | aprendiz | `aula-XX-trilha-aprendiz.json` |
| `TV` | Trilha | aventura | `aula-XX-trilha-aventura.json` |
| `TG` | Trilha | guardiao | `aula-YY-trilha-guardiao.json` |
| `MG` | Masmorra | grupo | `aula-YY-exedicao_guilda.json` |
| `MB` | Masmorra | boss | `aula-YY-boss.json` |
| `MP` | Masmorra | prova | `aula-13-PROVA.json` |

---

## Ordem de atributos (top-level)

Todos os JSONs dos módulos 1–3 devem seguir esta ordem:

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

---

## Contrato-base recomendado

```json
{
  "id": "python-M01-A01-CT",
  "curso": "python",
  "modulo": 1,
  "aula": 1,
  "numero": 1,
  "tipo": "Aula",
  "subtipo": "conceito",
  "titulo": "Variáveis e Tipos Básicos",
  "subtitulo": "O começo de tudo",
  "objetivo": "Entender os tipos básicos...",
  "duracao": "1h30",
  "tags": ["variáveis", "tipos"],
  "secoes": {},
  "premio": null
}
```

---

## Estrutura por família

### Aula (`subtipo: conceito`)

- seções esperadas: `abertura`, `conceito`, `pratica_guiada`, `pratica_autonoma`, `fechamento`

### Trilha (`subtipo: aprendiz | aventura | guardiao`)

- `aprendiz`: prática em sala, 5 desafios
- `aventura`: prática autônoma, 5 desafios
- `guardiao`: revisão acumulativa, 10 desafios

### Masmorra (`subtipo: grupo | boss | prova`)

- `grupo`: cooperação em equipe, 5 integrantes, 1 desafio por integrante
- `boss`: avaliação prática principal do bloco
- `prova`: banco de 20, sorteio de 5, distribuição 3 médias + 2 difíceis, mínimo 5 variações equivalentes

---

## Validação rápida

Checklist mínimo ao revisar um JSON:

- `id` no formato `python-MXX-AXX-COD`
- `curso`, `modulo`, `aula`, `numero`, `tipo`, `subtipo` coerentes
- ordem top-level respeitada
- ausência de `acesso`, `recompensasRpg` e `regrasPedagogicas`
- em provas, presença de `avaliacao` e bloco `secoes.questoes` com banco e sorteio
