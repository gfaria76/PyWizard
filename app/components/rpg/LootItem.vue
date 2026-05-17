<template>
  <div
    class="glass-panel p-3 aspect-square flex flex-col items-center justify-center text-center transition-all hover:bg-surface-container-low/90 cursor-pointer group"
  >
    <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ emoji }}</div>
    <div class="text-label-caps font-bold text-on-background text-xs line-clamp-2">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  emoji: string
  name: string
}>()
</script>
