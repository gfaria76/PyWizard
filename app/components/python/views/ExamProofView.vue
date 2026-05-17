<template>
  <div class="space-y-6">
    <QuestHero :lesson="lesson" :tone="tone" :stage-badge-label="stageBadgeLabel" :is-optional="isOptional" />

    <section class="cg-panel rounded-3xl border border-amber-300/15 bg-slate-950/60 p-5 sm:p-7">
      <div class="mb-3 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-clipboard-check" class="h-5 w-5 text-amber-200" />
          <h2 class="text-xl font-black text-slate-50">Modo prova</h2>
        </div>
        <UBadge color="warning" variant="soft">Foco total</UBadge>
      </div>
      <p class="text-sm leading-7 text-slate-300">
        A prova precisa reduzir distrações e privilegiar legibilidade, ritmo e previsibilidade. O aluno deve sentir avaliação formal, não apenas uma variação do boss.
      </p>
    </section>

    <QuestOpeningSection :sections="openingSections" />
    <QuestMissionBlocks subtype="prova" :mission-blocks="missionBlocks" :quest-slug="questSlug" :tipo-aula="tipoAula" />
    <QuestClosingSection :sections="closingSections" />
    <QuestPrevNextNav :prev-quest="prevQuest" :next-quest="nextQuest" :prev-path="prevPath" :next-path="nextPath" />
  </div>
</template>

<script setup lang="ts">
import type { Lesson, ModuleQuest } from '~/types/course'
import type { QuestDisplaySection, QuestMissionBlock } from '~/composables/useQuestSections'
import QuestHero from '~/components/python/quest/QuestHero.vue'
import QuestOpeningSection from '~/components/python/quest/QuestOpeningSection.vue'
import QuestMissionBlocks from '~/components/python/quest/QuestMissionBlocks.vue'
import QuestClosingSection from '~/components/python/quest/QuestClosingSection.vue'
import QuestPrevNextNav from '~/components/python/quest/QuestPrevNextNav.vue'

interface Tone {
  label: string
  icon: string
  badgeColor: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
  ring: string
}

defineProps<{
  lesson: Lesson
  tone: Tone
  stageBadgeLabel: string
  isOptional: boolean
  openingSections: QuestDisplaySection[]
  missionBlocks: QuestMissionBlock[]
  closingSections: QuestDisplaySection[]
  prevQuest: ModuleQuest | null
  nextQuest: ModuleQuest | null
  prevPath: string | null
  nextPath: string | null
  questSlug: string
  tipoAula: 'A' | 'E' | 'P'
}>()
</script>

