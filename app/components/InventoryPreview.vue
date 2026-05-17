<template>
  <section class="cg-panel rounded-2xl p-4">
    <div class="mb-4 flex items-center justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.24em] text-cyan-100/70">Grimório</p>
        <h2 class="text-lg font-black text-slate-50">Habilidades do Módulo</h2>
      </div>
      <UBadge color="neutral" variant="soft" size="xs">
        {{ unlockedCount }}/{{ totalItems }}
      </UBadge>
    </div>

    <div class="space-y-3">
      <div
        v-for="item in displayedItems"
        :key="item.id"
        class="rounded-xl border p-3"
        :class="item.unlocked ? 'border-cyan-200/25 bg-cyan-300/10' : 'border-slate-600/20 bg-black/16 opacity-65'"
      >
        <div class="mb-1 flex items-center justify-between gap-3">
          <p class="text-sm font-bold text-slate-100">{{ item.nome }}</p>
          <UBadge :color="item.unlocked ? 'primary' : 'neutral'" variant="soft" size="xs">
            {{ item.unlocked ? 'ativo' : 'bloqueado' }}
          </UBadge>
        </div>
        <p class="text-xs leading-relaxed text-slate-400">{{ item.descricao }}</p>
      </div>
    </div>

    <button
      v-if="allItems.length > INITIAL_COUNT"
      class="mt-3 w-full rounded-xl border border-slate-600/20 py-2 text-xs font-semibold text-slate-400 transition hover:border-slate-500/40 hover:text-slate-300"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Ver menos' : `+${allItems.length - INITIAL_COUNT} habilidades` }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'

const INITIAL_COUNT = 7

const props = defineProps<{
  quests: ModuleQuest[]
  completedSlugs: string[]
}>()

const expanded = ref(false)

const allItems = computed(() => props.quests
  .flatMap((quest) => {
    const slug = getQuestSlug(quest)
    return quest.inventario_novo.map((item) => ({
      ...item,
      unlocked: props.completedSlugs.includes(slug),
    }))
  }))

const displayedItems = computed(() =>
  expanded.value ? allItems.value : allItems.value.slice(0, INITIAL_COUNT),
)

const totalItems = computed(() => allItems.value.length)
const unlockedCount = computed(() => allItems.value.filter((i) => i.unlocked).length)
</script>
