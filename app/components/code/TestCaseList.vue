<template>
  <div v-if="missions.length" class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
    <h3 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center gap-2">
      <span class="material-symbols-outlined">check_circle</span>
      Test Cases ({{ missions.length }})
    </h3>
    <div class="space-y-3">
      <div v-for="(mission, i) in missions" :key="i" class="bg-surface-container-highest/50 p-3 rounded-lg border border-outline-variant/30">
        <div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Test {{ i + 1 }}: {{ mission.titulo }}</div>
        <div class="font-body-md text-on-surface/80 text-sm">{{ mission.texto_md }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Mission {
  titulo: string
  texto_md: string
  entrada?: string
  saida_esperada?: string
}

defineProps<{
  missions: Mission[]
}>()
</script>
