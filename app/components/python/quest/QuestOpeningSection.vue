<template>
  <section v-if="sections.length" id="sec-abertura" class="cg-panel rounded-3xl p-5 sm:p-7">
    <div class="mb-5 flex items-center gap-3">
      <UIcon name="i-lucide-sparkles" class="h-5 w-5 text-cyan-200" />
      <h2 class="text-xl font-black text-slate-50">Abertura</h2>
    </div>
    <div class="grid gap-4">
      <div
        v-for="section in sections"
        :key="section.key"
        class="rounded-2xl border border-slate-500/15 bg-black/16 p-4"
      >
        <h3 v-if="section.title" class="mb-2 font-bold text-slate-100">{{ section.title }}</h3>
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

