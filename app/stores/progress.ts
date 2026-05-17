import type { ModuleQuest } from '~/types/course'
import type { AlunoProgresso } from '~/types/database.types'
import { getQuestRewards, getQuestSlug, isRequiredQuest } from '~/composables/useLessonMeta'

const STORAGE_KEY = 'codegrimoire:python:progress:v1'

interface PlayerStats {
  level: number
  xp: number
  coins: number
  hp: number
  maxHp: number
  mana: number
  maxMana: number
}

interface StoredProgress {
  completedQuestSlugs: string[]
  stats: PlayerStats
}

const defaultStats = (): PlayerStats => ({
  level: 1,
  xp: 0,
  coins: 10,
  hp: 3,
  maxHp: 3,
  mana: 10,
  maxMana: 10,
})

export const useProgressStore = defineStore('progress', () => {
  const hydrated = ref(false)
  const completedQuestSlugs = ref<string[]>([])
  const stats = ref<PlayerStats>(defaultStats())

  const completedCount = computed(() => completedQuestSlugs.value.length)

  function hydrate() {
    if (hydrated.value || !import.meta.client) {
      return
    }

    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<StoredProgress>
        completedQuestSlugs.value = Array.isArray(parsed.completedQuestSlugs) ? parsed.completedQuestSlugs : []
        stats.value = {
          ...defaultStats(),
          ...(parsed.stats ?? {}),
        }
      } catch {
        completedQuestSlugs.value = []
        stats.value = defaultStats()
      }
    }

    hydrated.value = true
  }

  function persist() {
    if (!import.meta.client) {
      return
    }

    const payload: StoredProgress = {
      completedQuestSlugs: completedQuestSlugs.value,
      stats: stats.value,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))

    // Sincroniza com backend (debounced, silencioso se offline ou não autenticado)
    const { scheduleSync } = useProgressSync()
    scheduleSync({
      completed_quest_slugs: completedQuestSlugs.value,
      xp: stats.value.xp,
      coins: stats.value.coins,
      hp: stats.value.hp,
      mana: stats.value.mana,
      level: stats.value.level,
    })
  }

  /**
   * Hidrata o estado com dados autoritativos do backend.
   * Chamado após login ou na montagem do layout quando o usuário já está autenticado.
   * Faz fallback silencioso para o localStorage em caso de falha.
   */
  async function hydrateFromServer() {
    if (!import.meta.client) return

    const user = useSupabaseUser()
    if (!user.value?.id) return

    try {
      const data = await $fetch<AlunoProgresso>(`/api/progresso/${user.value.id}`)
      syncFromBackend(data)
    } catch {
      // Falha silenciosa — mantém estado do localStorage
    }
  }

  function isCompleted(slug: string) {
    return completedQuestSlugs.value.includes(slug)
  }

  function getActiveQuestSlug(quests: ModuleQuest[]) {
    const activeQuest = quests.find((quest) => isRequiredQuest(quest) && !isCompleted(getQuestSlug(quest)))
      ?? quests.find((quest) => !isCompleted(getQuestSlug(quest)))
      ?? quests[0]
    return activeQuest ? getQuestSlug(activeQuest) : ''
  }

  function isUnlocked(quest: ModuleQuest, quests: ModuleQuest[]) {
    const index = quests.findIndex((item) => item.arquivo === quest.arquivo)
    if (index <= 0) return true

    const isOptional = !isRequiredQuest(quest)

    if (isOptional) {
      // Opcional desbloqueia quando o último obrigatório ANTES dele estiver completo.
      // Isso permite abrir aventura/guardiao/grupo assim que o aprendiz estiver feito,
      // sem precisar completar o boss do bloco.
      for (let cursor = index - 1; cursor >= 0; cursor--) {
        const prev = quests[cursor]
        if (!prev || !isRequiredQuest(prev)) continue
        return isCompleted(getQuestSlug(prev))
      }
      return true
    }

    // Obrigatório: exige que o último obrigatório anterior esteja completo
    for (let cursor = index - 1; cursor >= 0; cursor--) {
      const prev = quests[cursor]
      if (!prev || !isRequiredQuest(prev)) continue
      return isCompleted(getQuestSlug(prev))
    }

    return true
  }

  function completeQuest(quest: ModuleQuest) {
    const slug = getQuestSlug(quest)
    if (completedQuestSlugs.value.includes(slug)) {
      return
    }

    // Fallback local (usado quando não autenticado ou sem backend).
    // Quando autenticado, o progresso vem de /api/submissoes via syncFromBackend.
    const reward = getQuestRewards(quest)

    completedQuestSlugs.value.push(slug)
    stats.value.xp += reward.xp
    stats.value.coins += reward.coins

    const nextLevel = Math.floor(stats.value.xp / 300) + 1
    if (nextLevel > stats.value.level) {
      const gainedLevels = nextLevel - stats.value.level
      stats.value.level = nextLevel
      stats.value.maxMana += gainedLevels * 2
      stats.value.maxHp += gainedLevels
      stats.value.mana = stats.value.maxMana
      stats.value.hp = stats.value.maxHp
    }

    persist()
  }

  /**
   * Sobrescreve o estado local com dados autoritativos do backend (AlunoProgresso).
   * Chamado após cada resposta bem-sucedida de /api/submissoes.
   * Mantém localStorage em sync como cache.
   */
  function syncFromBackend(progresso: Partial<AlunoProgresso>) {
    if (progresso.level !== undefined) stats.value.level = progresso.level
    if (progresso.xp !== undefined) stats.value.xp = progresso.xp
    if (progresso.coins !== undefined) stats.value.coins = progresso.coins
    if (progresso.hp !== undefined) stats.value.hp = progresso.hp
    if (progresso.max_hp !== undefined) stats.value.maxHp = progresso.max_hp
    if (progresso.mana !== undefined) stats.value.mana = progresso.mana
    if (progresso.max_mana !== undefined) stats.value.maxMana = progresso.max_mana
    if (Array.isArray(progresso.completed_quest_slugs)) {
      completedQuestSlugs.value = progresso.completed_quest_slugs
    }
    persist()
  }

  function reset() {
    completedQuestSlugs.value = []
    stats.value = defaultStats()
    persist()
  }

  return {
    hydrated,
    completedQuestSlugs,
    stats,
    completedCount,
    hydrate,
    hydrateFromServer,
    persist,
    isCompleted,
    getActiveQuestSlug,
    isUnlocked,
    completeQuest,
    syncFromBackend,
    reset,
  }
})
