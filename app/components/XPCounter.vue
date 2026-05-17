<template>
  <span>{{ displayValue }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number
  class?: string
}>()

const displayValue = ref(props.value)

watch(() => props.value, (newVal, oldVal) => {
  const start = oldVal
  const end = newVal
  const duration = 600
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - (1 - progress) ** 3
    displayValue.value = Math.round(start + (end - start) * eased)
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
})
</script>
