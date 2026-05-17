<template>
  <div
    class="glass-panel p-4 mb-3 cursor-pointer transition-all hover:bg-surface-container-low/90 flex items-center justify-between group"
    @click="$emit('open')"
  >
    <!-- Left: Icon + Title -->
    <div class="flex items-center gap-4 flex-1">
      <div
        class="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-on-primary-container flex-shrink-0"
        :class="iconBgClass"
      >
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>

      <div class="flex-1 min-w-0">
        <div class="text-body-md font-bold text-on-background truncate">{{ aula.titulo }}</div>
        <div class="text-label-caps text-on-surface-variant">{{ getTypeLabel(aula.subtipo) }}</div>
      </div>
    </div>

    <!-- Right: Status -->
    <div class="flex items-center gap-2 ml-4 flex-shrink-0">
      <span v-if="isCompleted" class="material-symbols-outlined fill text-primary-container">check_circle</span>
      <span v-else-if="isActive" class="material-symbols-outlined animate-pulse text-secondary">radio_button_checked</span>
      <span v-else class="material-symbols-outlined text-on-surface-variant">radio_button_unchecked</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonSubtype } from '~/types/course'

interface Aula {
  titulo: string
  subtipo?: LessonSubtype
}

const props = defineProps<{
  aula: Aula
  state: 'completed' | 'active' | 'locked'
}>()

defineEmits<{
  open: []
}>()

const isCompleted = computed(() => props.state === 'completed')
const isActive = computed(() => props.state === 'active')

const icon = computed(() => {
  switch (props.aula.subtipo) {
    case 'conceito': return 'lightbulb'
    case 'aprendiz': return 'school'
    case 'aventura': return 'landscape'
    case 'guardiao': return 'shield'
    case 'boss': return 'dragon'
    case 'prova': return 'quiz'
    case 'grupo': return 'group'
    default: return 'help'
  }
})

const iconBgClass = computed(() => {
  switch (props.aula.subtipo) {
    case 'conceito': return 'bg-tertiary-fixed-dim/60'
    case 'aprendiz': return 'bg-secondary/60'
    case 'aventura': return 'bg-primary-container/60'
    case 'guardiao': return 'bg-tertiary-container/60'
    case 'boss': return 'bg-error/60'
    case 'prova': return 'bg-error-container/60'
    case 'grupo': return 'bg-secondary-container/60'
    default: return 'bg-outline/60'
  }
})

function getTypeLabel(subtipo?: LessonSubtype): string {
  switch (subtipo) {
    case 'conceito': return 'Conceito'
    case 'aprendiz': return 'Aprendiz'
    case 'aventura': return 'Aventura'
    case 'guardiao': return 'Guardião'
    case 'boss': return 'Boss'
    case 'prova': return 'Prova'
    case 'grupo': return 'Guilda'
    default: return 'Desafio'
  }
}
</script>
