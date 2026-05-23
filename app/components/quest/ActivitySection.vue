<template>
  <div class="cg-section space-y-4">
    <h3 v-if="title" class="font-headline-sm text-lg text-white">{{ title }}</h3>

    <MarkdownBlock v-if="markdown" :content="markdown" />

    <CodeBlock v-if="pythonCode" :code="pythonCode" />

    <!-- Lista de exemplos -->
    <div v-if="examples.length" class="space-y-4">
      <div
        v-for="(example, idx) in examples"
        :key="idx"
        class="border-l-2 border-primary-fixed/30 pl-4 space-y-2"
      >
        <p v-if="example.label" class="font-label-caps text-[10px] text-primary-fixed tracking-widest">
          {{ example.label }}
        </p>
        <MarkdownBlock v-if="example.markdown" :content="example.markdown" />
        <CodeBlock v-if="example.python" :code="example.python" />
      </div>
    </div>

    <!-- Subseções aninhadas (ex: abertura tem objetivo, retomada, etc.) -->
    <div v-if="subsections.length" class="space-y-6 mt-4">
      <div
        v-for="sub in subsections"
        :key="sub.key"
        class="bg-surface-container-low/40 rounded-lg p-4"
      >
        <h4 class="font-label-caps text-[11px] tracking-widest text-primary-fixed mb-2 uppercase">
          {{ formatKey(sub.key) }}
        </h4>
        <ActivitySection :data="sub.value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MarkdownBlock from './MarkdownBlock.vue'
import CodeBlock from '../ui/CodeBlock.vue'

const props = defineProps<{
  data: unknown
}>()

const obj = computed<Record<string, unknown>>(() => {
  if (props.data && typeof props.data === 'object' && !Array.isArray(props.data)) {
    return props.data as Record<string, unknown>
  }
  return {}
})

const title = computed(() => {
  const t = obj.value.titulo ?? obj.value.title
  return typeof t === 'string' ? t : ''
})

const markdown = computed(() => {
  const t = obj.value.texto_md ?? obj.value.enunciado_md
  return typeof t === 'string' ? t : ''
})

const pythonCode = computed(() => {
  const t = obj.value.python
  return typeof t === 'string' ? t : ''
})

interface Example {
  label?: string
  markdown?: string
  python?: string
}

const examples = computed<Example[]>(() => {
  const list = obj.value.exemplos
  if (!Array.isArray(list)) return []
  return list
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
    .map((item, idx) => ({
      label: typeof item.titulo === 'string' ? item.titulo : `Exemplo ${idx + 1}`,
      markdown: typeof item.texto_md === 'string' ? item.texto_md : undefined,
      python: typeof item.python === 'string' ? item.python : undefined,
    }))
})

const knownKeys = new Set(['titulo', 'title', 'texto_md', 'enunciado_md', 'python', 'exemplos'])

const subsections = computed(() => {
  const result: Array<{ key: string, value: unknown }> = []
  for (const [key, value] of Object.entries(obj.value)) {
    if (knownKeys.has(key)) continue
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result.push({ key, value })
    }
  }
  return result
})

function formatKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
</script>