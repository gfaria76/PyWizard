<template>
  <div class="font-code-md text-code-md bg-surface-container-lowest/50 border border-primary-container/30 rounded-lg p-4 space-y-2">
    <div v-for="(line, i) in lines" :key="i" class="text-primary-container flex items-start gap-2">
      <span class="text-on-surface-variant">></span>
      <span>{{ line }}</span>
    </div>
    <div class="text-primary-container flex items-start gap-2 animate-pulse">
      <span class="text-on-surface-variant">></span>
      <span class="inline-block w-2 h-4 bg-primary-container" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  lines: string[]
}>()
</script>
