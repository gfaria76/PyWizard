<template>
  <USlideOver v-model:open="isOpen" title="Praticar Agora">
    <template #content>
      <div class="flex flex-col h-full overflow-hidden bg-surface">
        <CodeEditor
          :lesson="lesson"
          :initial-code="initialCode"
          :test-cases="testCases"
          :submission-meta="submissionMeta"
          class="flex-1"
        />
      </div>
    </template>
  </USlideOver>

  <!-- Button to open drawer -->
  <button
    class="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-container/20 hover:bg-primary-container/30 text-primary-container font-label-caps rounded-lg transition-colors"
    @click="isOpen = true"
  >
    <span class="material-symbols-outlined">edit_note</span>
    Praticar Agora
  </button>
</template>

<script setup lang="ts">
interface TestCase {
  stdin?: string
  expectedOutput: string
}

interface SubmissionMeta {
  questSlug: string
  tipoAula: string
}

interface Lesson {
  id?: string
  titulo?: string
  subtipo?: string
  secoes?: {
    pratica_guiada?: {
      python?: string
      titulo?: string
    }
    conceito?: {
      exemplos?: Array<{ python?: string }>
    }
  }
}

const props = defineProps<{
  lesson?: Lesson
  questSlug: string
}>()

const isOpen = ref(false)

const initialCode = computed(() => {
  return props.lesson?.secoes?.pratica_guiada?.python ?? props.lesson?.secoes?.conceito?.exemplos?.[0]?.python ?? ''
})

const testCases = computed<TestCase[]>(() => {
  // For Conceito, we don't have test cases — this is just for practice
  return []
})

const submissionMeta = computed<SubmissionMeta | undefined>(() => ({
  questSlug: props.questSlug,
  tipoAula: props.lesson?.tipo ?? 'Aula',
}))
</script>
