<template>
  <div class="glass-panel p-6 border border-primary-container/30 glow-cyan">
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="text-label-caps text-primary-container font-bold mb-1">MISSÃO ATIVA</div>
        <div class="text-headline-md font-bold text-on-background">{{ missionTitle }}</div>
      </div>
      <span class="material-symbols-outlined text-primary-container text-2xl animate-pulse">target</span>
    </div>

    <div class="space-y-3">
      <div class="flex items-center gap-2 text-body-md text-on-surface-variant">
        <span class="material-symbols-outlined text-sm">layers</span>
        Módulo {{ modulo }} • Aula {{ aula }}
      </div>
      <div class="flex items-center gap-2 text-body-md text-on-surface-variant">
        <span class="material-symbols-outlined text-sm">schedule</span>
        {{ duration }}
      </div>
    </div>

    <NuxtLink :to="arenaPath" class="mt-6 block w-full px-4 py-2 bg-primary-container text-on-primary-container font-bold text-center rounded-lg hover:opacity-80 transition-opacity">
      Continuar Missão
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  missionTitle: string
  modulo: number
  aula: number
  duration: string
  arenaPath: string
}>()
</script>
