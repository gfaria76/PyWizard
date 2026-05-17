<template>
  <NuxtLink :to="`/python?modulo=${modulo}`" class="glass-panel p-6 text-center transition-all hover:scale-105 hover:glow-cyan group">
    <div class="text-6xl mb-4 group-hover:animate-bounce">{{ icon }}</div>
    <div class="text-headline-md font-bold text-primary-container mb-2">{{ title }}</div>
    <div class="text-body-md text-on-surface-variant">{{ description }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  modulo: number
  title: string
  description: string
  icon: string
}>()
</script>
