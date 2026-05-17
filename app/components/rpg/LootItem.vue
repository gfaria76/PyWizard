<template>
  <div
    class="bg-surface-container/80 backdrop-blur-xl border border-primary-container/30 rounded-xl p-3 aspect-square flex flex-col items-center justify-center text-center transition-all hover:border-primary-container/50 hover:shadow-[0_0_15px_rgba(0,251,251,0.2)] cursor-pointer group"
  >
    <div class="text-3xl mb-2 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,251,251,0.4)]">{{ emoji }}</div>
    <div class="font-label-caps text-label-caps font-bold text-on-surface text-xs line-clamp-2">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  emoji: string
  name: string
}>()
</script>
