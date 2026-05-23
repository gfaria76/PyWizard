import { computed, type Ref } from 'vue'
import type { Lesson, MarkdownSection } from '~/types/course'

export interface QuestDisplaySection {
  key: string
  title: string
  text: string
}

export interface QuestMissionBlock {
  key: string
  title: string
  text: string
  missions: MarkdownSection[]
}

export interface QuestTocItem {
  id: string
  label: string
  icon: string
}

export function useQuestSections(
  lesson: Readonly<Ref<Lesson | undefined>>,
  slug: Readonly<Ref<string>>,
) {
  const sections = computed(() => lesson.value?.secoes ?? {})

  const openingSections = computed<QuestDisplaySection[]>(() => {
    const abertura = asRecord(sections.value.abertura)
    return Object.entries(abertura)
      .map(([key, value]) => {
        const section = asSection(value)
        return {
          key,
          title: section.titulo ?? section.title ?? getSectionTitle(key),
          text: section.texto_md ?? '',
        }
      })
      .filter(section => section.text)
  })

  const concept = computed(() => asSection(sections.value.conceito))
  const guided = computed(() => asSection(sections.value.pratica_guiada))
  const guidedExamples = computed(() => {
    const raw = guided.value.exemplos
    return Array.isArray(raw) ? raw.map(item => asSection(item)) : []
  })
  const autonomous = computed(() => asSection(sections.value.pratica_autonoma))

  const autonomousStarter = computed(() => {
    const title = autonomous.value.titulo
    return title ? `# ${title}\n# Escreva seu código aqui\n` : '# Escreva seu código aqui\n'
  })

  const examples = computed(() => {
    const raw = concept.value.exemplos
    return Array.isArray(raw) ? raw.map(item => asSection(item)) : []
  })

  const challenges = computed(() => {
    const raw = asRecord(sections.value.desafios).lista
    return Array.isArray(raw) ? raw.map(item => asSection(item)) : []
  })

  const closingSections = computed<QuestDisplaySection[]>(() => {
    const fechamento = asRecord(sections.value.fechamento)
    return Object.entries(fechamento)
      .filter(([key]) => key !== 'titulo')
      .map(([key, value]) => {
        const section = asSection(value)
        return {
          key,
          title: section.titulo ?? getSectionTitle(key),
          text: section.texto_md ?? '',
        }
      })
      .filter(section => section.text)
  })

  const missionBlocks = computed<QuestMissionBlock[]>(() => {
    const targetKeysBySubtype: Record<string, string[]> = {
      prova: ['questoes'],
      boss: ['aquecimento', 'maratona'],
      grupo: ['formacao', 'incursao'],
      aprendiz: ['preparacao', 'desafios'],
      aventura: ['preparacao', 'desafios'],
      guardiao: ['ritual', 'desafios'],
    }

    const targetKeys = targetKeysBySubtype[lesson.value?.subtipo ?? ''] ?? []

    return targetKeys
      .map((key) => {
        const block = asSection(sections.value[key])
        const record = asRecord(sections.value[key])
        const bancoQuestoes = Array.isArray(record.banco_questoes)
          ? pickQuestionPool(record.banco_questoes, 5, slug.value)
          : []

        const rawMissions = Array.isArray(record.missoes)
          ? record.missoes
          : bancoQuestoes.length
            ? bancoQuestoes
            : Object.entries(record)
                .filter(([entryKey]) => entryKey.startsWith('questao_'))
                .map(([, value]) => value)

        return {
          key,
          title: block.titulo ?? getSectionTitle(key),
          text: block.texto_md ?? '',
          missions: rawMissions.map(item => asSection(item)),
        }
      })
      .filter(block => block.text || block.missions.length)
  })

  const tocItems = computed<QuestTocItem[]>(() => {
    if (!lesson.value) return []

    const items: QuestTocItem[] = []

    if (openingSections.value.length) {
      items.push({ id: 'sec-abertura', label: 'Abertura', icon: 'i-lucide-sparkles' })
    }

    if (lesson.value.subtipo === 'conceito') {
      if (concept.value.texto_md) {
        items.push({ id: 'sec-conceito', label: concept.value.titulo ?? 'Conceito', icon: 'i-lucide-book-marked' })
      }
      if (guided.value.texto_md || guidedExamples.value.length) {
        items.push({ id: 'sec-pratica-guiada', label: guided.value.titulo ?? 'Prática guiada', icon: 'i-lucide-terminal-square' })
      }
      if (autonomous.value.texto_md) {
        items.push({ id: 'sec-pratica-autonoma', label: autonomous.value.titulo ?? 'Prática autônoma', icon: 'i-lucide-pencil-ruler' })
      }
      if (challenges.value.length) {
        items.push({ id: 'sec-desafios', label: 'Desafios', icon: 'i-lucide-scroll' })
      }
    }
    else {
      const icon = lesson.value.subtipo === 'prova'
        ? 'i-lucide-clipboard-check'
        : lesson.value.subtipo === 'grupo'
          ? 'i-lucide-users-round'
          : 'i-lucide-swords'

      for (const block of missionBlocks.value) {
        items.push({ id: `sec-${block.key}`, label: block.title, icon })
      }
    }

    if (closingSections.value.length) {
      items.push({ id: 'sec-fechamento', label: 'Fechamento', icon: 'i-lucide-gem' })
    }

    return items
  })

  return {
    sections,
    openingSections,
    concept,
    guided,
    guidedExamples,
    autonomous,
    autonomousStarter,
    examples,
    challenges,
    closingSections,
    missionBlocks,
    tocItems,
  }
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
}

function asSection(value: unknown): MarkdownSection {
  return asRecord(value) as MarkdownSection
}

function getSectionTitle(key: string) {
  const titles: Record<string, string> = {
    objetivo: 'Objetivo',
    retomada: 'Retomada',
    situacao: 'Situação',
    problematizacao: 'Problematização',
    introducao: 'Introdução',
    quiz: 'Quiz',
    leitura_complementar: 'Leitura complementar',
    reflexao: 'Reflexão',
    aquecimento: 'Aquecimento',
    maratona: 'Maratona',
    questoes: 'Questões',
    preparacao: 'Preparação',
    desafios: 'Desafios',
    ritual: 'Ritual de Preparação',
    formacao: 'Formação da Guilda',
    incursao: 'Incursão Cooperativa',
  }

  return titles[key] ?? key
}

function pickQuestionPool(items: unknown[], amount: number, slug: string) {
  const seeded = items
    .map((value, index) => ({
      value,
      score: hashSeed(`${slug}:${index}`),
    }))
    .sort((left, right) => left.score - right.score)

  return seeded.slice(0, amount).map(entry => entry.value)
}

function hashSeed(value: string) {
  let hash = 0
  for (const char of value) {
    hash = ((hash << 5) - hash) + char.charCodeAt(0)
    hash |= 0
  }

  return Math.abs(hash)
}

