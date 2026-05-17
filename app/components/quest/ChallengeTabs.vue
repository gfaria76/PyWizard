<template>
  <div class="flex flex-col gap-4">
    <UTabs v-if="hasTabs" :items="tabs" :ui="{ container: 'flex gap-2 border-b border-outline-variant/30', list: { background: '' } }">
      <template #default="{ item }">
        <div class="px-4 py-2" :class="item.icon ? 'flex items-center gap-2' : ''">
          <span v-if="item.icon" class="material-symbols-outlined text-[16px]">{{ item.icon }}</span>
          {{ item.label }}
        </div>
      </template>

      <!-- Desafio Tab -->
      <template v-if="hasDesafio" #desafio>
        <div class="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          <!-- Problem Card -->
          <div class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
            <h2 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined">challenge</span>
              {{ lesson?.titulo }}
            </h2>

            <div v-if="lesson?.rpg" class="space-y-4">
              <div v-if="lesson.rpg.runa_titulo" class="bg-surface-dim/80 border border-primary-container/20 rounded-lg p-4 shadow-[inset_0_0_10px_rgba(0,251,251,0.1)]">
                <h3 class="font-label-caps text-label-caps text-primary-container mb-2">Runa</h3>
                <div class="font-body-md text-on-surface">{{ lesson.rpg.runa_titulo }}</div>
              </div>

              <div v-if="lesson.rpg.xp_reward" class="flex items-center gap-2 p-3 bg-tertiary-fixed-dim/5 rounded-lg border border-tertiary-fixed-dim/20">
                <span class="material-symbols-outlined text-tertiary-fixed-dim">stars</span>
                <span class="font-label-caps text-label-caps text-tertiary-fixed-dim">{{ lesson.rpg.xp_reward }} XP</span>
              </div>

              <div v-if="lesson.rpg.enemy_name" class="bg-error/5 border border-error/20 rounded-lg p-4">
                <h4 class="font-label-caps text-label-caps text-error mb-2">Enemy</h4>
                <div class="font-body-md text-on-surface mb-3">{{ lesson.rpg.enemy_name }}</div>
                <div class="space-y-2">
                  <div class="text-label-caps text-[12px] text-on-surface-variant">HP {{ lesson.rpg.enemy_hp }}</div>
                  <div class="w-full h-2 bg-surface-container-high rounded overflow-hidden border border-outline-variant/30">
                    <div class="h-full bg-gradient-to-r from-error-container to-error" :style="{ width: '100%' }" />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="lesson?.objetivo" class="mt-4 p-4 bg-primary-container/5 border border-primary-container/20 rounded-lg">
              <h4 class="font-label-caps text-label-caps text-primary-container mb-2">Objective</h4>
              <div class="font-body-md text-on-surface text-sm">{{ lesson.objetivo }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- Test Cases Tab -->
      <template v-if="hasTests" #tests>
        <div class="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          <div v-for="(mission, i) in missions" :key="i" class="bg-surface-container-highest/50 p-3 rounded-lg border border-outline-variant/30">
            <div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Test {{ i + 1 }}: {{ mission.titulo }}</div>
            <div class="font-body-md text-on-surface/80 text-sm">{{ mission.texto_md }}</div>
          </div>
        </div>
      </template>

      <!-- Exemplos Tab -->
      <template v-if="hasExemplos" #exemplos>
        <div class="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          <div class="prose-arcane">
            <QuestMarkdownBlock :content="lesson?.secoes?.conceito?.exemplos?.[0]?.texto_md ?? ''" />
          </div>
        </div>
      </template>

      <!-- Dicas Tab -->
      <template v-if="hasHints" #dicas>
        <div class="space-y-4 overflow-y-auto max-h-[calc(100vh-300px)]">
          <OracleHints :hints="hints" />
        </div>
      </template>
    </UTabs>

    <!-- Fallback if no tabs -->
    <div v-else class="text-on-surface-variant text-sm">No content available</div>
  </div>
</template>

<script setup lang="ts">
interface Mission {
  titulo: string
  texto_md: string
  entrada?: string
  saida_esperada?: string
}

interface Lesson {
  id?: string
  titulo?: string
  objetivo?: string
  subtipo?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  secoes?: Record<string, any>
  rpg?: {
    runa_titulo?: string
    xp_reward?: number
    enemy_name?: string
    enemy_hp?: number
  }
}

const props = defineProps<{
  lesson?: Lesson
  missions: Mission[]
  hints?: string[]
}>()

const hasDesafio = computed(() => !!props.lesson?.titulo)
const hasTests = computed(() => props.missions.length > 0)
const hasExemplos = computed(() => !!props.lesson?.secoes?.conceito?.exemplos?.[0])
const hasHints = computed(() => (props.hints?.length ?? 0) > 0)
const hasTabs = computed(() => hasDesafio.value || hasTests.value || hasExemplos.value || hasHints.value)

interface TabItem {
  slot: string
  label: string
  icon: string
}

const tabs = computed<TabItem[]>(() => {
  const result = []
  if (hasDesafio.value) result.push({ slot: 'desafio', label: 'Desafio', icon: 'challenge' })
  if (hasTests.value) result.push({ slot: 'tests', label: 'Testes', icon: 'check_circle' })
  if (hasExemplos.value) result.push({ slot: 'exemplos', label: 'Exemplos', icon: 'code' })
  if (hasHints.value) result.push({ slot: 'dicas', label: 'Dicas', icon: 'lightbulb' })
  return result
})
</script>
