<template>
  <div class="p-gutter grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-[1400px] mx-auto w-full h-[calc(100vh-64px)] overflow-hidden pt-4">
    
    <!-- Left Column: Context & Lore -->
    <aside class="col-span-1 lg:col-span-4 flex flex-col gap-gutter h-full overflow-y-auto cg-scroll pr-2 pb-20 lg:pb-4">
      
      <!-- Variant specific headers -->
      <div v-if="variant === 'exam'" class="glass-panel-alert rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden border border-error/50">
        <div class="absolute inset-0 bg-error/5 animate-pulse"></div>
        <span class="material-symbols-outlined text-display-lg text-error mb-2 relative z-10" style="font-variation-settings: 'FILL' 1;">warning</span>
        <h1 class="font-headline-md text-headline-md text-error neon-text-error relative z-10 uppercase text-center mb-1">Final Exam</h1>
        <h2 class="font-headline-sm text-headline-sm text-on-error-container relative z-10 text-center">{{ title }}</h2>
      </div>

      <div v-else-if="variant === 'marathon'" class="level-1-panel bg-error-container/20 border-error/40 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <span class="material-symbols-outlined text-display-lg text-error mb-2">local_fire_department</span>
        <h1 class="font-headline-md text-headline-md text-error uppercase text-center mb-1">Boss Marathon</h1>
        <h2 class="font-headline-sm text-headline-sm text-on-surface relative z-10 text-center">{{ title }}</h2>
      </div>

      <!-- Default / Trail Header -->
      <div v-else class="level-1-panel rounded-lg p-6 flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div>
            <span class="font-label-caps text-label-caps text-secondary-fixed mb-2 block">{{ subtitle }}</span>
            <h1 class="font-headline-sm text-headline-sm text-primary">{{ title }}</h1>
          </div>
          <div class="bg-surface-container-high rounded px-3 py-1 border border-tertiary-container/30 flex items-center gap-2">
            <span class="material-symbols-outlined text-tertiary-fixed text-[16px]">emoji_events</span>
            <span class="font-label-caps text-label-caps text-tertiary-fixed">{{ rewardPt }} PT</span>
          </div>
        </div>
      </div>

      <!-- Rules / Markdown Content -->
      <slot name="content">
        <div class="level-1-panel rounded-lg p-6 font-body-md text-on-surface-variant space-y-4">
          <p>No description provided.</p>
        </div>
      </slot>

    </aside>

    <!-- Right Column: Code & Execution -->
    <section class="col-span-1 lg:col-span-8 flex flex-col gap-gutter h-full pb-20 lg:pb-4">
      <!-- Editor Slot -->
      <div class="flex-grow min-h-[300px]">
        <slot name="editor">
          <div class="level-1-panel rounded-lg w-full h-full flex items-center justify-center text-on-surface-variant font-code-md">
            [CodeEditor Component Area]
          </div>
        </slot>
      </div>

      <!-- Oracle Console Slot -->
      <div class="h-48 shrink-0">
        <slot name="console">
          <div class="level-1-panel rounded-lg w-full h-full flex flex-col overflow-hidden">
            <div class="bg-surface-container-highest/80 px-4 py-2 flex items-center gap-2 border-b border-outline-variant/30">
              <span class="material-symbols-outlined text-secondary-fixed text-[16px]">terminal</span>
              <span class="font-label-caps text-label-caps text-secondary-fixed">Oracle Console</span>
            </div>
            <div class="p-4 font-code-md text-code-md text-on-surface flex-grow bg-[#000000]/40 overflow-auto">
              [OracleConsole Area]
            </div>
          </div>
        </slot>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
export type ArenaVariant = 'basic' | 'exam' | 'expedition' | 'trail-guardian' | 'marathon' | 'battle-group' | 'lesson';

interface Props {
  variant?: ArenaVariant;
  title?: string;
  subtitle?: string;
  rewardPt?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'basic',
  title: 'Desafio Desconhecido',
  subtitle: 'Treinamento',
  rewardPt: 0
})
</script>

<style scoped>
.glass-panel-alert {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 180, 171, 0.3);
  box-shadow: inset 0 0 15px rgba(255, 180, 171, 0.1);
}
.neon-text-error {
  text-shadow: 0 0 8px rgba(255, 180, 171, 0.6);
}
</style>
