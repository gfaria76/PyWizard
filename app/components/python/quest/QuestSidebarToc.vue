<template>
  <section v-if="items.length > 1" class="cg-panel rounded-2xl p-4">
    <div class="mb-3 flex items-center gap-2">
      <UIcon name="i-lucide-list" class="h-4 w-4 text-slate-500" />
      <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Conteúdo</h2>
    </div>
    <nav class="space-y-0.5">
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/6 hover:text-slate-200"
      >
        <UIcon :name="item.icon" class="h-3.5 w-3.5 shrink-0 text-slate-500" />
        {{ item.label }}
      </a>
    </nav>
  </section>
</template>

<script setup lang="ts">
import type { QuestTocItem } from '~/composables/useQuestSections'

defineProps<{
  items: QuestTocItem[]
}>()
</script>

