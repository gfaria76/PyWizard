<template>
  <article class="flex gap-4 p-4 md:p-5 rounded-lg bg-surface-container-low/40 border border-outline-variant/30">
    <div class="shrink-0 w-9 h-9 rounded-full bg-primary-fixed/15 border border-primary-fixed/40 flex items-center justify-center font-code-md text-sm text-primary-fixed">
      {{ index + 1 }}
    </div>

    <div class="flex-1 min-w-0 space-y-2">
      <header class="flex items-center gap-2 flex-wrap">
        <h3 v-if="mission.titulo" class="font-headline-sm text-base text-white">
          {{ mission.titulo }}
        </h3>
        <span
          v-if="dificuldade"
          class="inline-block font-label-caps text-[9px] tracking-widest px-2 py-0.5 rounded border"
          :class="dificuldadeClass"
        >
          {{ dificuldade }}
        </span>
        <span
          v-if="ordem"
          class="font-code-md text-[10px] text-on-surface-variant opacity-70"
        >
          ordem #{{ ordem }}
        </span>
      </header>

      <MarkdownBlock
        v-if="texto"
        :content="texto"
        class="cg-markdown text-sm text-on-surface-variant"
      />

      <CodeBlock v-if="mission.python" :code="mission.python" />
    </div>
  </article>
</template>

<script setup lang="ts">
import MarkdownBlock from '~/components/quest/MarkdownBlock.vue'
import CodeBlock from '~/components/ui/CodeBlock.vue'
import type { MarkdownSection } from '~/types/course'

const props = defineProps<{
  mission: MarkdownSection
  index: number
}>()

const texto = computed(() => {
  return typeof props.mission.texto_md === 'string'
    ? props.mission.texto_md
    : typeof props.mission.enunciado_md === 'string'
      ? props.mission.enunciado_md
      : ''
})

const meta = computed<Record<string, unknown>>(() => {
  const m = props.mission.meta
  return m && typeof m === 'object' && !Array.isArray(m) ? m as Record<string, unknown> : {}
})

const dificuldade = computed(() => {
  const v = meta.value.dificuldade
  return typeof v === 'string' ? v : ''
})

const ordem = computed(() => {
  const v = meta.value.ordem
  return typeof v === 'number' || typeof v === 'string' ? String(v) : ''
})

const dificuldadeClass = computed(() => {
  const v = dificuldade.value.toLowerCase()
  if (v.includes('fácil') || v.includes('facil')) return 'border-secondary text-secondary bg-secondary/10'
  if (v.includes('médi') || v.includes('medi')) return 'border-primary-fixed text-primary-fixed bg-primary-fixed/10'
  if (v.includes('dific') || v.includes('difíc') || v.includes('alta')) return 'border-error text-error bg-error/10'
  return 'border-outline-variant text-on-surface-variant'
})
</script>
