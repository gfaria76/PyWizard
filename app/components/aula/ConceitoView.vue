<template>
  <div class="space-y-8">
    <AulaAbertura :sections="openingSections" />

    <!-- Conceito -->
    <section v-if="concept.texto_md || examples.length" id="sec-conceito" class="glass-panel rounded-xl p-6 md:p-8">
      <h2 class="font-headline-sm text-xl text-primary-fixed mb-4 uppercase tracking-wider">
        {{ concept.titulo ?? 'Conceito' }}
      </h2>
      <MarkdownBlock v-if="concept.texto_md" :content="concept.texto_md" class="cg-markdown text-on-surface-variant" />

      <div v-if="examples.length" class="mt-6 space-y-5">
        <div
          v-for="(example, idx) in examples"
          :key="`concept-ex-${idx}`"
          class="border-l-2 border-primary-fixed/40 pl-4 space-y-2"
        >
          <p class="font-label-caps text-[10px] text-primary-fixed tracking-widest">
            {{ example.titulo ?? `Exemplo ${idx + 1}` }}
          </p>
          <MarkdownBlock v-if="example.texto_md" :content="example.texto_md" class="cg-markdown text-sm text-on-surface-variant" />
          <CodeBlock v-if="example.python" :code="example.python" />
        </div>
      </div>
    </section>

    <!-- Prática guiada -->
    <section v-if="guided.texto_md || guidedExamples.length" id="sec-pratica-guiada" class="glass-panel rounded-xl p-6 md:p-8">
      <h2 class="font-headline-sm text-xl text-primary-fixed mb-4 uppercase tracking-wider">
        {{ guided.titulo ?? 'Prática guiada' }}
      </h2>
      <MarkdownBlock v-if="guided.texto_md" :content="guided.texto_md" class="cg-markdown text-on-surface-variant" />
      <CodeBlock v-if="guided.python && !guidedExamples.length" :code="guided.python" class="mt-4" />

      <div v-if="guidedExamples.length" class="mt-6 space-y-5">
        <div
          v-for="(example, idx) in guidedExamples"
          :key="`guided-ex-${idx}`"
          class="border-l-2 border-secondary/60 pl-4 space-y-2"
        >
          <p class="font-label-caps text-[10px] text-secondary tracking-widest">
            {{ example.titulo ?? `Passo ${idx + 1}` }}
          </p>
          <MarkdownBlock v-if="example.texto_md" :content="example.texto_md" class="cg-markdown text-sm text-on-surface-variant" />
          <CodeBlock v-if="example.python" :code="example.python" />
        </div>
      </div>
    </section>

    <!-- Prática autônoma -->
    <section v-if="autonomous.texto_md" id="sec-pratica-autonoma" class="glass-panel rounded-xl p-6 md:p-8">
      <h2 class="font-headline-sm text-xl text-primary-fixed mb-4 uppercase tracking-wider">
        {{ autonomous.titulo ?? 'Prática autônoma' }}
      </h2>
      <MarkdownBlock :content="autonomous.texto_md" class="cg-markdown text-on-surface-variant" />
    </section>

    <!-- Fechamento -->
    <section v-if="closingSections.length" id="sec-fechamento" class="glass-panel rounded-xl p-6 md:p-8">
      <h2 class="font-headline-sm text-xl text-primary-fixed mb-6 uppercase tracking-wider">
        Fechamento
      </h2>
      <div class="space-y-5">
        <div
          v-for="section in closingSections"
          :key="section.key"
          class="bg-surface-container-low/40 rounded-lg p-4 md:p-5 border-l-2 border-tertiary-fixed-dim/40"
        >
          <h3 class="font-label-caps text-[11px] tracking-widest text-tertiary-fixed-dim mb-2 uppercase">
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
import MarkdownBlock from '~/components/quest/MarkdownBlock.vue'
import CodeBlock from '~/components/ui/CodeBlock.vue'
import type { Lesson } from '~/types/course'
import { useQuestSections } from '~/composables/useQuestSections'

const props = defineProps<{
  lesson: Lesson
  slug: string
}>()

const lessonRef = computed(() => props.lesson)
const slugRef = computed(() => props.slug)

const { openingSections, concept, guided, guidedExamples, examples, autonomous, closingSections } = useQuestSections(lessonRef, slugRef)
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
