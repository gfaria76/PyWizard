<template>
  <div class="bg-surface-container/80 backdrop-blur-xl rounded-lg border border-secondary-container/30 p-6 relative overflow-hidden group hover:border-primary-container/50 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(0,251,251,0.1)] flex flex-col h-full">
    
    <!-- Inner Glow -->
    <div 
      class="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl transition-all pointer-events-none"
      :class="glowColorClass"
    ></div>

    <div class="flex justify-between items-start mb-4 z-10">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant/50">
          <span class="material-symbols-outlined text-sm" :class="iconColorClass">{{ icon }}</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-primary transition-colors" :class="titleHoverColorClass">{{ title }}</h3>
      </div>
      <div class="bg-surface-container-lowest px-3 py-1 rounded-full border border-secondary/20">
        <span class="font-label-caps text-[10px] text-secondary tracking-widest">{{ mpCost }} MP</span>
      </div>
    </div>

    <p class="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 z-10">
      {{ description }}
    </p>

    <!-- Code Block -->
    <div class="bg-surface-container-lowest p-4 rounded-md border border-outline-variant/50 relative group-hover:border-primary-container/30 transition-colors z-10">
      <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" @click="copyCode">
        <span class="material-symbols-outlined text-on-surface-variant text-sm hover:text-primary">content_copy</span>
      </div>
      <pre class="font-code-md text-code-md overflow-x-auto"><code class="text-on-surface whitespace-pre-wrap"><slot name="code">{{ codeSnippet }}</slot></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  icon: string
  mpCost: number
  description: string
  codeSnippet?: string
  colorTheme?: 'primary' | 'secondary' | 'tertiary'
}>()

const glowColorClass = computed(() => {
  switch (props.colorTheme) {
    case 'secondary': return 'bg-secondary-fixed-dim/5 group-hover:bg-secondary-fixed-dim/15'
    case 'tertiary': return 'bg-tertiary-fixed-dim/5 group-hover:bg-tertiary-fixed-dim/15'
    default: return 'bg-primary-container/5 group-hover:bg-primary-container/15'
  }
})

const iconColorClass = computed(() => {
  switch (props.colorTheme) {
    case 'secondary': return 'text-secondary-fixed-dim'
    case 'tertiary': return 'text-tertiary-fixed-dim'
    default: return 'text-primary-container'
  }
})

const titleHoverColorClass = computed(() => {
  switch (props.colorTheme) {
    case 'secondary': return 'group-hover:text-secondary-fixed-dim'
    case 'tertiary': return 'group-hover:text-tertiary-fixed-dim'
    default: return 'group-hover:text-primary-container'
  }
})

function copyCode() {
  if (props.codeSnippet) {
    navigator.clipboard.writeText(props.codeSnippet)
  }
}
</script>
