<template>
  <section v-if="sections.length" id="sec-fechamento" class="cg-panel rounded-3xl p-5 sm:p-7">
    <div class="mb-5 flex items-center gap-3">
      <UIcon name="i-lucide-gem" class="h-5 w-5 text-violet-200" />
      <h2 class="text-xl font-black text-slate-50">Fechamento</h2>
    </div>
    <div class="grid gap-4">
      <div
        v-for="section in sections"
        :key="section.key"
        class="rounded-2xl border border-violet-200/15 bg-violet-300/8 p-4"
      >
        <h3 v-if="section.title" class="mb-2 font-bold text-violet-50">{{ section.title }}</h3>
        <MarkdownBlock :content="section.text" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { QuestDisplaySection } from '~/composables/useQuestSections'

defineProps<{
  sections: QuestDisplaySection[]
}>()
</script>

