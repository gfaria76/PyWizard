<template>
  <div v-if="isEmpty" class="aspect-square bg-surface-container/30 rounded-lg border border-outline-variant/20 border-dashed p-4 flex items-center justify-center opacity-50 hover:opacity-100 hover:border-outline-variant/50 transition-all duration-300 cursor-pointer">
    <span class="material-symbols-outlined text-on-surface-variant text-4xl">add</span>
  </div>
  
  <div v-else class="aspect-square bg-surface-container-highest rounded-lg border p-4 flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
       :class="[borderColorClass, hoverShadowClass]">
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" :class="bgHoverClass"></div>
    
    <div class="w-16 h-16 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform relative"
         :class="[iconBorderClass, iconTextColorClass, dropShadowClass]">
      <!-- Optional pulse effect for special items like secondary/epic -->
      <div v-if="theme === 'secondary'" class="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(220,184,255,0.5)] animate-pulse"></div>
      
      <span class="material-symbols-outlined text-4xl relative z-10" style="font-variation-settings: 'FILL' 1;">{{ icon }}</span>
    </div>
    
    <div class="text-center relative z-10">
      <h3 class="font-code-md text-code-md text-primary mb-1">{{ name }}</h3>
      <span class="font-label-caps text-label-caps" :class="iconTextColorClass">{{ type }}</span>
    </div>
    
    <div v-if="quantity && quantity > 1" class="absolute top-2 right-2 bg-surface-variant text-on-surface-variant font-code-md text-[10px] px-2 py-0.5 rounded z-10">
      x{{ quantity }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isEmpty?: boolean
  name?: string
  type?: string
  icon?: string
  quantity?: number
  theme?: 'primary' | 'secondary' | 'tertiary'
}>()

const borderColorClass = computed(() => {
  switch (props.theme) {
    case 'secondary': return 'border-secondary/30'
    case 'tertiary': return 'border-tertiary-fixed-dim/30'
    default: return 'border-primary-fixed/30'
  }
})

const hoverShadowClass = computed(() => {
  switch (props.theme) {
    case 'secondary': return 'hover:shadow-[0_0_20px_rgba(220,184,255,0.2)] shadow-[inset_0_0_15px_rgba(119,1,208,0.2)]'
    case 'tertiary': return 'hover:shadow-[0_0_20px_rgba(251,188,0,0.2)]'
    default: return 'hover:shadow-[0_0_20px_rgba(0,251,251,0.2)]'
  }
})

const bgHoverClass = computed(() => {
  switch (props.theme) {
    case 'secondary': return 'bg-secondary/5'
    case 'tertiary': return 'bg-tertiary-fixed-dim/5'
    default: return 'bg-primary-fixed/5'
  }
})

const iconBorderClass = computed(() => {
  switch (props.theme) {
    case 'secondary': return 'border-secondary/50'
    case 'tertiary': return 'border-tertiary-fixed-dim/50'
    default: return 'border-primary-fixed/50'
  }
})

const iconTextColorClass = computed(() => {
  switch (props.theme) {
    case 'secondary': return 'text-secondary'
    case 'tertiary': return 'text-tertiary-fixed-dim'
    default: return 'text-primary-fixed'
  }
})

const dropShadowClass = computed(() => {
  switch (props.theme) {
    case 'secondary': return 'drop-shadow-[0_0_8px_rgba(220,184,255,0.6)]'
    case 'tertiary': return 'drop-shadow-[0_0_8px_rgba(251,188,0,0.6)]'
    default: return 'drop-shadow-[0_0_8px_rgba(0,251,251,0.6)]'
  }
})
</script>
