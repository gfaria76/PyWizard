<template>
  <div class="space-y-8">
    <AulaAbertura :sections="openingSections" />

    <section
      v-for="block in missionBlocks"
      :id="`sec-${block.key}`"
      :key="block.key"
      class="glass-panel rounded-xl p-6 md:p-8"
    >
      <header class="mb-5">
        <span class="inline-block font-label-caps text-[10px] tracking-widest text-secondary uppercase">
          Trilha Aprendiz
        </span>
        <h2 class="font-headline-sm text-xl text-secondary mt-1 uppercase tracking-wider">
          {{ block.title }}
        </h2>
      </header>

      <MarkdownBlock v-if="block.text" :content="block.text" class="cg-markdown text-on-surface-variant mb-5" />

      <div v-if="block.missions.length" class="space-y-3">
        <MissaoCard
          v-for="(mission, idx) in block.missions"
          :key="`mission-${block.key}-${idx}`"
          :mission="mission"
          :index="idx"
        />
      </div>
    </section>

    <section v-if="closingSections.length" id="sec-fechamento" class="glass-panel rounded-xl p-6 md:p-8">
      <h2 class="font-headline-sm text-xl text-secondary mb-6 uppercase tracking-wider">
        Fechamento
      </h2>
      <div class="space-y-5">
        <div
          v-for="section in closingSections"
          :key="section.key"
          class="bg-surface-container-low/40 rounded-lg p-4 md:p-5 border-l-2 border-secondary/40"
        >
          <h3 class="font-label-caps text-[11px] tracking-widest text-secondary mb-2 uppercase">
            {{ section.title }}
          </h3>
          <MarkdownBlock :content="section.text" class="cg-markdown text-on-surface-variant" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AulaAbertura from './AulaAbertura.vue'
import MissaoCard from './MissaoCard.vue'
import MarkdownBlock from '~/components/quest/MarkdownBlock.vue'
import type { Lesson } from '~/types/course'
import { useQuestSections } from '~/composables/useQuestSections'

const props = defineProps<{
  lesson: Lesson
  slug: string
}>()

const lessonRef = computed(() => props.lesson)
const slugRef = computed(() => props.slug)

const { openingSections, missionBlocks, closingSections } = useQuestSections(lessonRef, slugRef)
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
