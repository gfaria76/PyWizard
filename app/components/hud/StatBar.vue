<template>
  <div class="flex items-center gap-2 w-full">
    <!-- Icon + Value -->
    <div class="flex items-center gap-1 min-w-fit">
      <span class="material-symbols-outlined text-sm" :class="iconClass">{{ icon }}</span>
      <span class="text-label-caps font-bold" :class="textClass">{{ current }}/{{ max }}</span>
    </div>

    <!-- Bar -->
    <div class="flex-1 h-2 rounded-full overflow-hidden" :class="barBgClass">
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="barFillClass"
        :style="{ width: percentage + '%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant: 'hp' | 'mana' | 'xp'
  current: number
  max: number
}>()

const percentage = computed(() => Math.min(100, (props.current / props.max) * 100))

const icon = computed(() => {
  switch (props.variant) {
    case 'hp': return 'favorite'
    case 'mana': return 'bolt'
    case 'xp': return 'star'
  }
})

const iconClass = computed(() => {
  switch (props.variant) {
    case 'hp': return 'text-error'
    case 'mana': return 'text-secondary'
    case 'xp': return 'text-tertiary-fixed-dim'
  }
})

const textClass = computed(() => {
  switch (props.variant) {
    case 'hp': return 'text-error'
    case 'mana': return 'text-secondary'
    case 'xp': return 'text-tertiary-fixed-dim'
  }
})

const barBgClass = computed(() => {
  switch (props.variant) {
    case 'hp': return 'bg-error/20'
    case 'mana': return 'bg-secondary/20'
    case 'xp': return 'bg-tertiary-fixed-dim/20'
  }
})

const barFillClass = computed(() => {
  switch (props.variant) {
    case 'hp': return 'bg-gradient-to-r from-error to-error/60 shadow-[0_0_10px_rgba(255,180,171,0.5)]'
    case 'mana': return 'bg-gradient-to-r from-secondary to-secondary/60 shadow-[0_0_10px_rgba(220,184,255,0.5)]'
    case 'xp': return 'bg-gradient-to-r from-tertiary-fixed-dim to-tertiary-fixed-dim/60 shadow-[0_0_10px_rgba(251,188,0,0.5)]'
  }
})
</script>
