<template>
  <section v-if="sections.length" id="sec-abertura" class="glass-panel rounded-xl p-6 md:p-8">
    <h2 class="font-headline-sm text-xl text-primary-fixed mb-6 uppercase tracking-wider">
      Abertura
    </h2>

    <div class="space-y-5">
      <div
        v-for="section in sections"
        :key="section.key"
        class="bg-surface-container-low/40 rounded-lg p-4 md:p-5 border-l-2 border-primary-fixed/40"
      >
        <h3 class="font-label-caps text-[11px] tracking-widest text-primary-fixed mb-2 uppercase">
          {{ section.title }}
        </h3>
        <MarkdownBlock :content="section.text" class="cg-markdown text-on-surface-variant" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MarkdownBlock from '~/components/quest/MarkdownBlock.vue'
import type { QuestDisplaySection } from '~/composables/useQuestSections'

defineProps<{
  sections: QuestDisplaySection[]
}>()
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
