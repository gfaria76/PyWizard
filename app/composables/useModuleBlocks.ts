import type { ModuleQuest } from '~/types/course'
import { getQuestSlug, getQuestSubtype, isRequiredQuest } from '~/composables/useLessonMeta'

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

export interface QuestBlock {
  blockIndex: number
  /** Quests obrigatórias do trunk: conceito(s) + aprendiz(es) */
  trunk: ModuleQuest[]
  /** Ramos opcionais: aventura, guardiao, grupo */
  optional: ModuleQuest[]
  /** Quest que fecha o bloco: boss ou prova */
  closer: ModuleQuest | null
}

// ─────────────────────────────────────────────────────────────────────────────
// groupQuestsIntoBlocks
// Agrupa o array plano de quests em blocos pedagógicos.
// Cada bloco é fechado por um boss ou prova.
// ─────────────────────────────────────────────────────────────────────────────

export function groupQuestsIntoBlocks(quests: ModuleQuest[]): QuestBlock[] {
  const blocks: QuestBlock[] = []
  let current: QuestBlock = { blockIndex: 0, trunk: [], optional: [], closer: null }

  for (const quest of quests) {
    const subtype = getQuestSubtype(quest)

    if (subtype === 'boss' || subtype === 'prova') {
      current.closer = quest
      blocks.push(current)
      current = { blockIndex: blocks.length, trunk: [], optional: [], closer: null }
    }
    else if (!isRequiredQuest(quest)) {
      current.optional.push(quest)
    }
    else {
      current.trunk.push(quest)
    }
  }

  // Bloco residual sem boss/prova (improvável mas seguro)
  if (current.trunk.length || current.optional.length) {
    blocks.push(current)
  }

  return blocks
}

// ─────────────────────────────────────────────────────────────────────────────
// findQuestBlock — encontra o bloco e posição de uma quest pelo slug
// ─────────────────────────────────────────────────────────────────────────────

export function findQuestBlock(
  blocks: QuestBlock[],
  slug: string,
): { block: QuestBlock, list: 'trunk' | 'optional' | 'closer' } | null {
  for (const block of blocks) {
    if (block.closer && getQuestSlug(block.closer) === slug) {
      return { block, list: 'closer' }
    }
    if (block.trunk.some(q => getQuestSlug(q) === slug)) {
      return { block, list: 'trunk' }
    }
    if (block.optional.some(q => getQuestSlug(q) === slug)) {
      return { block, list: 'optional' }
    }
  }
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// getBlockNavigation — retorna próximos e anteriores para a sidebar da quest
// ─────────────────────────────────────────────────────────────────────────────

export interface BlockNavigation {
  /** Próxima quest na trilha obrigatória */
  nextMandatory: ModuleQuest | null
  /** Quest obrigatória anterior */
  prevMandatory: ModuleQuest | null
  /** Ramos opcionais disponíveis no contexto atual */
  availableOptionals: ModuleQuest[]
}

export function getBlockNavigation(
  blocks: QuestBlock[],
  slug: string,
): BlockNavigation {
  const found = findQuestBlock(blocks, slug)
  if (!found) return { nextMandatory: null, prevMandatory: null, availableOptionals: [] }

  const { block, list } = found
  const allTrunk = blocks.flatMap(b => [...b.trunk, ...(b.closer ? [b.closer] : [])])

  // Index na lista obrigatória flat
  const currentMandatoryIdx = allTrunk.findIndex(q => getQuestSlug(q) === slug)

  let nextMandatory: ModuleQuest | null = null
  let prevMandatory: ModuleQuest | null = null
  let availableOptionals: ModuleQuest[] = []

  if (list === 'trunk' || list === 'closer') {
    nextMandatory = allTrunk[currentMandatoryIdx + 1] ?? null
    prevMandatory = allTrunk[currentMandatoryIdx - 1] ?? null

    // Se estou no aprendiz, os opcionais do mesmo bloco estão disponíveis
    const subtype = getQuestSubtype(allTrunk[currentMandatoryIdx]!)
    if (subtype === 'aprendiz') {
      availableOptionals = block.optional
    }
  }
  else {
    // Estou num ramo opcional — mostrar o trunk do mesmo bloco como retorno
    const lastTrunkInBlock = block.trunk.at(-1)
    prevMandatory = lastTrunkInBlock ?? null
    nextMandatory = block.closer ?? null
    // Outros opcionais do mesmo bloco disponíveis
    availableOptionals = block.optional.filter(q => getQuestSlug(q) !== slug)
  }

  return { nextMandatory, prevMandatory, availableOptionals }
}
