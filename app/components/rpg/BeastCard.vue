<template>
  <div class="glass-panel p-4 flex items-center gap-4 transition-all hover:bg-surface-container-low/90">
    <div class="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center text-2xl flex-shrink-0">
      {{ icon }}
    </div>

    <div class="flex-1 min-w-0">
      <div class="text-body-md font-bold text-on-background truncate">{{ name }}</div>
      <div class="text-label-caps text-on-surface-variant">{{ difficulty }} • Derrotado {{ defeats }}x</div>
    </div>

    <div class="text-right flex-shrink-0">
      <div class="text-label-caps text-tertiary-fixed-dim font-bold">{{ reward }} XP</div>
      <div class="text-body-md text-on-surface-variant">+{{ coin }} 🪙</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  name: string
  difficulty: string
  defeats: number
  reward: number
  coin: number
}>()
</script>
