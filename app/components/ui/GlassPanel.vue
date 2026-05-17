<template>
  <div
    class="glass-panel p-4 transition-all"
    :class="[
      levelClass,
      glowClass
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  level?: 1 | 2 | 3
  glow?: 'cyan' | 'violet' | 'gold'
}>(), {
  level: 2
})

const levelClass = computed(() => {
  switch (props.level) {
    case 1: return 'bg-surface-container-lowest/70'
    case 2: return 'bg-surface-container-low/70'
    case 3: return 'bg-surface-container/70'
    default: return 'bg-surface-container-low/70'
  }
})

const glowClass = computed(() => {
  if (!props.glow) return ''
  switch (props.glow) {
    case 'cyan': return 'glow-cyan'
    case 'violet': return 'glow-violet'
    case 'gold': return 'glow-gold'
  }
})
</script>
