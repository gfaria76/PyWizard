<template>
  <div class="bg-surface-container/80 backdrop-blur-xl border border-error/30 rounded-xl p-4 flex items-center gap-4 transition-all hover:border-error/50 hover:shadow-[0_0_20px_rgba(255,180,171,0.15)] group">
    <div class="w-16 h-16 rounded-lg bg-error/10 border border-error/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
      <span class="material-symbols-outlined text-error text-2xl drop-shadow-[0_0_8px_rgba(255,180,171,0.6)]">{{ icon }}</span>
    </div>

    <div class="flex-1 min-w-0">
      <div class="font-body-md text-body-md font-bold text-on-surface truncate">{{ name }}</div>
      <div class="font-label-caps text-label-caps text-on-surface-variant">{{ difficulty }} • Derrotado {{ defeats }}x</div>
    </div>

    <div class="text-right flex-shrink-0">
      <div class="font-label-caps text-label-caps text-tertiary-fixed-dim font-bold">{{ reward }} XP</div>
      <div class="font-body-md text-body-md text-on-surface-variant">+{{ coin }} 🪙</div>
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
