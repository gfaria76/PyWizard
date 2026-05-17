<template>
  <section
    v-for="block in missionBlocks"
    :id="`sec-${block.key}`"
    :key="block.key"
    class="cg-panel rounded-3xl p-5 sm:p-7"
  >
    <div class="mb-5 flex items-center gap-3">
      <UIcon :name="sectionIcon" class="h-5 w-5 text-amber-200" />
      <h2 class="text-xl font-black text-slate-50">{{ block.title }}</h2>
    </div>
    <MarkdownBlock :content="block.text" />
    <div v-if="block.missions.length" class="mt-5 grid gap-6">
      <div
        v-for="mission in block.missions"
        :key="mission.titulo"
        class="rounded-2xl border border-slate-500/15 bg-black/16 p-4"
      >
        <h3 class="mb-2 font-bold text-slate-50">{{ mission.titulo }}</h3>
        <MarkdownBlock :content="mission.texto_md" />
        <div class="mt-4">
          <CodeRunner
            :label="mission.titulo"
            :initial-code="`# ${mission.titulo}\n# Escreva sua solução aqui\n`"
            :test-cases="missionTestCases(mission)"
            :submission-meta="{ questSlug, desafioId: mission.titulo ?? block.key, tipoAula }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { QuestMissionBlock } from '~/composables/useQuestSections'
import type { MarkdownSection } from '~/types/course'
import type { TestCase } from '~/components/CodeRunner.vue'

const props = defineProps<{
  subtype: string
  missionBlocks: QuestMissionBlock[]
  questSlug: string
  tipoAula: 'A' | 'E' | 'P'
}>()

const sectionIcon = computed(() => {
  if (props.subtype === 'prova') return 'i-lucide-clipboard-check'
  if (props.subtype === 'grupo') return 'i-lucide-users-round'
  return 'i-lucide-swords'
})

function missionTestCases(mission: MarkdownSection): TestCase[] {
  const raw = mission.casos_de_teste
  if (!Array.isArray(raw)) return []
  return raw.map((item) => {
    const tc = item as Record<string, unknown>
    const expectedOutput = String(tc.saida_esperada ?? tc.expectedOutput ?? '')
    const stdin = tc.stdin !== undefined ? String(tc.stdin) : undefined
    return stdin !== undefined ? { stdin, expectedOutput } : { expectedOutput }
  })
}
</script>

