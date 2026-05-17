<template>
  <header class="cg-solid-panel rounded-3xl p-6 sm:p-8">
    <div class="mb-4 flex flex-wrap items-center gap-2">
      <UBadge color="primary" variant="soft">Módulo {{ lesson.modulo }}</UBadge>
      <UBadge color="neutral" variant="soft">{{ stageBadgeLabel }}</UBadge>
      <UBadge color="neutral" variant="soft">{{ lesson.duracao ?? 'sem duração' }}</UBadge>
      <UBadge v-if="isOptional" color="warning" variant="soft">Opcional</UBadge>
    </div>
    <h1 class="text-3xl font-black tracking-tight text-slate-50 text-shadow-[0_0_24px_rgba(76,215,246,0.32)] sm:text-5xl">
      {{ lesson.titulo }}
    </h1>
    <p v-if="lesson.subtitulo" class="mt-3 text-lg leading-8 text-slate-300">
      {{ lesson.subtitulo }}
    </p>
    <p v-if="lesson.objetivo" class="mt-5 rounded-2xl border p-4 text-sm leading-7" :class="tone.ring">
      {{ lesson.objetivo }}
    </p>
  </header>
</template>

<script setup lang="ts">
import type { Lesson } from '~/types/course'

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
}>()
</script>

