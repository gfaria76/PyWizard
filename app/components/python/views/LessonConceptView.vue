<template>
  <div class="space-y-6">
    <QuestHero :lesson="lesson" :tone="tone" :stage-badge-label="stageBadgeLabel" :is-optional="isOptional" />
    <QuestOpeningSection :sections="openingSections" />

    <section v-if="concept.texto_md" id="sec-conceito" class="cg-panel rounded-3xl p-5 sm:p-7">
      <div class="mb-5 flex items-center gap-3">
        <UIcon name="i-lucide-book-marked" class="h-5 w-5 text-violet-200" />
        <h2 class="text-xl font-black text-slate-50">{{ concept.titulo ?? 'Conceito' }}</h2>
      </div>
      <MarkdownBlock :content="concept.texto_md" />
      <div v-if="examples.length" class="mt-6 grid gap-4">
        <div
          v-for="(example, index) in examples"
          :key="index"
          class="rounded-2xl border border-violet-200/15 bg-violet-300/8 p-4"
        >
          <MarkdownBlock :content="example.texto_md" />
          <PythonCodeBlock v-if="example.python" class="mt-3" :code="example.python" />
        </div>
      </div>
    </section>

    <section v-if="guided.texto_md" id="sec-pratica-guiada" class="cg-panel rounded-3xl p-5 sm:p-7">
      <div class="mb-5 flex items-center gap-3">
        <UIcon name="i-lucide-terminal-square" class="h-5 w-5 text-cyan-200" />
        <h2 class="text-xl font-black text-slate-50">{{ guided.titulo ?? 'Prática guiada' }}</h2>
      </div>
      <MarkdownBlock :content="guided.texto_md" />
      <CodeRunner v-if="guided.python" class="mt-4" label="Prática guiada" :initial-code="guided.python" />
    </section>

    <section v-if="autonomous.texto_md" id="sec-pratica-autonoma" class="cg-panel rounded-3xl p-5 sm:p-7">
      <div class="mb-5 flex items-center gap-3">
        <UIcon name="i-lucide-pencil-ruler" class="h-5 w-5 text-amber-200" />
        <h2 class="text-xl font-black text-slate-50">{{ autonomous.titulo ?? 'Prática autônoma' }}</h2>
      </div>
      <MarkdownBlock :content="autonomous.texto_md" />
      <div class="mt-4">
        <CodeRunner label="Seu código" :initial-code="autonomousStarter" />
      </div>
    </section>

    <section v-if="challenges.length" id="sec-desafios" class="cg-panel rounded-3xl p-5 sm:p-7">
      <div class="mb-5 flex items-center gap-3">
        <UIcon name="i-lucide-scroll" class="h-5 w-5 text-amber-200" />
        <h2 class="text-xl font-black text-slate-50">Desafios de maestria</h2>
      </div>
      <div class="grid gap-6">
        <div
          v-for="(challenge, idx) in challenges"
          :key="challenge.titulo ?? idx"
          class="rounded-2xl border border-amber-200/15 bg-amber-300/8 p-4"
        >
          <h3 class="mb-2 font-bold text-amber-50">{{ challenge.titulo }}</h3>
          <MarkdownBlock :content="challenge.enunciado_md ?? challenge.texto_md" />
          <div class="mt-4">
            <CodeRunner
              :label="`Desafio ${idx + 1}`"
              :initial-code="`# ${challenge.titulo ?? `Desafio ${idx + 1}`}\n# Escreva sua solução aqui\n`"
            />
          </div>
        </div>
      </div>
    </section>

    <QuestClosingSection :sections="closingSections" />
    <QuestPrevNextNav :prev-quest="prevQuest" :next-quest="nextQuest" :prev-path="prevPath" :next-path="nextPath" />
  </div>
</template>

<script setup lang="ts">
import type { Lesson, MarkdownSection, ModuleQuest } from '~/types/course'
import type { QuestDisplaySection } from '~/composables/useQuestSections'
import QuestHero from '~/components/python/quest/QuestHero.vue'
import QuestOpeningSection from '~/components/python/quest/QuestOpeningSection.vue'
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
  concept: MarkdownSection
  examples: MarkdownSection[]
  guided: MarkdownSection
  autonomous: MarkdownSection
  autonomousStarter: string
  challenges: MarkdownSection[]
  closingSections: QuestDisplaySection[]
  prevQuest: ModuleQuest | null
  nextQuest: ModuleQuest | null
  prevPath: string | null
  nextPath: string | null
}>()
</script>

