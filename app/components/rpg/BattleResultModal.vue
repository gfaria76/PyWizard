<template>
  <UModal v-model:open="isOpen" :prevent-close="true">
    <template #content>
      <!-- Glassmorphism Container Level 3 (Modal) -->
      <div class="bg-surface-container/80 backdrop-blur-xl border border-primary-fixed-dim/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,221,221,0.15)] flex flex-col relative w-full max-w-[800px] mx-auto">
        
        <!-- Header Area -->
        <div class="relative pt-12 pb-8 px-8 text-center border-b border-outline-variant/20 bg-gradient-to-b from-primary-fixed-dim/10 to-transparent">
          <!-- Glowing Emblem -->
          <div class="mx-auto w-24 h-24 rounded-full bg-surface-container border border-primary-fixed-dim/50 shadow-[inset_0_0_20px_rgba(0,221,221,0.3),0_0_30px_rgba(0,221,221,0.4)] flex items-center justify-center mb-6 relative">
            <span class="material-symbols-outlined text-[48px] text-primary-fixed">emoji_events</span>
            <!-- Sparkles -->
            <span class="material-symbols-outlined absolute -top-2 -right-2 text-tertiary-fixed-dim text-[20px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
            <span class="material-symbols-outlined absolute bottom-0 -left-4 text-primary-fixed-dim text-[16px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
          </div>
          <h1 class="font-display-lg text-display-lg text-primary-fixed tracking-tighter mb-2 shadow-primary-fixed-dim drop-shadow-[0_0_8px_rgba(0,221,221,0.5)]">VICTORY ACHIEVED</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant">The syntax goblin has been banished.</p>
        </div>

        <!-- Content Area -->
        <div class="p-8 flex flex-col md:flex-row gap-6">
          <!-- Left Col: Rewards -->
          <div class="flex-1 flex flex-col gap-6">
            <!-- XP Earned -->
            <div class="bg-surface-container-high/50 border border-outline-variant/30 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-tertiary-fixed-dim/50 transition-colors">
              <div class="absolute inset-0 bg-gradient-to-t from-tertiary-fixed-dim/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span class="font-label-caps text-label-caps text-on-surface-variant mb-2">EXPERIENCE GAINED</span>
              <div class="flex items-center gap-2">
                <span class="font-headline-md text-headline-md text-tertiary-fixed-dim">+{{ xp }} XP</span>
                <span class="material-symbols-outlined text-tertiary-fixed-dim" style="font-variation-settings: 'FILL' 1;">keyboard_double_arrow_up</span>
              </div>
            </div>

            <!-- Loot -->
            <div class="bg-surface-container-high/50 border border-outline-variant/30 rounded-lg p-6 flex flex-col">
              <span class="font-label-caps text-label-caps text-on-surface-variant mb-4 text-center">LOOT DROPPED</span>
              <div class="flex justify-center gap-4">
                <!-- Coins -->
                <div class="flex flex-col items-center gap-2 group">
                  <div class="w-16 h-16 rounded border border-tertiary-fixed-dim/30 bg-surface-container flex items-center justify-center shadow-[inset_0_0_10px_rgba(251,188,0,0.1)] group-hover:border-tertiary-fixed-dim transition-colors">
                    <span class="material-symbols-outlined text-[32px] text-tertiary-fixed-dim">toll</span>
                  </div>
                  <span class="font-label-caps text-[10px] text-on-surface-variant text-center">Gold Coins<br/>x{{ coins }}</span>
                </div>
                <!-- Optional Item Drop -->
                <div v-if="levelUp" class="flex flex-col items-center gap-2 group">
                  <div class="w-16 h-16 rounded border border-secondary-fixed-dim/30 bg-surface-container flex items-center justify-center shadow-[inset_0_0_10px_rgba(220,184,255,0.1)] group-hover:border-secondary-fixed-dim transition-colors">
                    <span class="material-symbols-outlined text-[32px] text-secondary-fixed-dim">stars</span>
                  </div>
                  <span class="font-label-caps text-[10px] text-on-surface-variant text-center">Level Up!<br/>Lvl {{ newLevel }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Col: Test Cases & Oracle -->
          <div class="flex-[1.5] flex flex-col gap-6">
            <!-- Oracle Console -->
            <div class="bg-surface-dim border border-outline-variant/40 rounded-lg p-4 font-code-md text-code-md relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]">
              <div class="absolute top-2 right-2 flex gap-1">
                <div class="w-2 h-2 rounded-full bg-outline-variant/50"></div>
                <div class="w-2 h-2 rounded-full bg-outline-variant/50"></div>
                <div class="w-2 h-2 rounded-full bg-outline-variant/50"></div>
              </div>
              <span class="text-primary-fixed-dim">Oracle&gt; </span>
              <span class="text-on-surface">{{ oracleLine }}</span>
              <span class="animate-pulse text-primary-fixed-dim">_</span>
            </div>

            <!-- Test Cases -->
            <div class="flex flex-col gap-2">
              <span class="font-label-caps text-label-caps text-on-surface-variant mb-2 px-2">TEST CASES</span>
              <div v-for="tc in testCases" :key="tc.name" class="flex items-center justify-between bg-surface-container-high border border-outline-variant/20 rounded p-3">
                <div class="flex items-center gap-3">
                  <span
                    class="material-symbols-outlined text-[20px]"
                    :class="tc.passed ? 'text-primary-fixed-dim' : 'text-error'"
                    :style="{ fontVariationSettings: `FILL ${tc.passed ? 1 : 0}` }"
                  >
                    {{ tc.passed ? 'check_circle' : 'cancel' }}
                  </span>
                  <span class="font-code-md text-code-md text-on-surface">{{ tc.name }}</span>
                </div>
                <span class="font-code-md text-code-md text-on-surface-variant text-xs">{{ tc.passed ? 'OK' : 'FAIL' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-end gap-4">
          <button @click="close" class="px-6 py-3 rounded border border-outline-variant/50 text-on-surface hover:bg-surface-variant/50 font-label-caps text-label-caps transition-colors">
            Review Code
          </button>
          <button @click="nextMission" class="px-8 py-3 rounded bg-primary-fixed-dim text-on-primary-fixed font-label-caps text-label-caps hover:bg-primary-container shadow-[0_0_15px_rgba(0,221,221,0.3)] hover:shadow-[0_0_25px_rgba(0,221,221,0.6)] transition-all flex items-center gap-2">
            Próxima Missão
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  kind?: 'lesson' | 'boss' | 'prova'
  xp?: number
  coins?: number
  levelUp?: boolean
  newLevel?: number
  loot?: Array<{ emoji: string; name: string }>
  oracleLine?: string
  testCases?: Array<{ name: string; passed: boolean }>
}>(), {
  kind: 'lesson',
  xp: 0,
  coins: 0,
  levelUp: false,
  newLevel: 1,
  loot: () => [],
  oracleLine: 'Sua lógica foi impecável, Mago. O código fluiu sem obstruções na malha do tempo.',
  testCases: () => [
    { name: 'Test_Case_1', passed: true },
    { name: 'Test_Case_2', passed: true },
    { name: 'Test_Case_3', passed: true }
  ]
})

const isOpen = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{
  next: []
}>()

function close() {
  isOpen.value = false
}

function nextMission() {
  isOpen.value = false
  emit('next')
}
</script>
