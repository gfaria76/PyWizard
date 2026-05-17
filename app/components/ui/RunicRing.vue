<template>
  <div class="relative" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- Outer Ring (animated) -->
    <svg
      :viewBox="`0 0 ${size} ${size}`"
      :width="size"
      :height="size"
      class="absolute inset-0 animate-[runic-spin_10s_linear_infinite]"
    >
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="size / 2 - 8"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-dasharray="8,4"
        class="text-primary-container opacity-30"
      />
    </svg>

    <!-- Nodes -->
    <div
      v-for="(node, i) in nodes"
      :key="i"
      class="absolute w-4 h-4 rounded-full bg-surface-container border-2 border-primary-container flex items-center justify-center text-xs font-bold text-primary-container"
      :style="{
        left: getNodePosition(i).x + 'px',
        top: getNodePosition(i).y + 'px',
        transform: 'translate(-50%, -50%)'
      }"
    >
      {{ i + 1 }}
    </div>

    <!-- Center Point -->
    <div
      class="absolute inset-1/2 w-2 h-2 bg-primary-container rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(0,251,251,0.6)]"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  nodes?: number
  size?: number
}>(), {
  nodes: 6,
  size: 240
})

function getNodePosition(index: number): { x: number; y: number } {
  const angle = (index / props.nodes) * Math.PI * 2 - Math.PI / 2
  const radius = (props.size / 2) * 0.7
  const x = (props.size / 2) + radius * Math.cos(angle)
  const y = (props.size / 2) + radius * Math.sin(angle)
  return { x, y }
}
</script>
