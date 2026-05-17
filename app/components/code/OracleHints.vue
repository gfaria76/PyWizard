<template>
  <div class="glass-panel border border-secondary/30">
    <div class="bg-secondary/10 px-4 py-2 border-b border-secondary/30 text-label-caps text-secondary font-bold flex items-center gap-2">
      <span class="material-symbols-outlined text-sm">auto_awesome</span>
      Dicas do Oráculo
    </div>

    <div class="p-4 space-y-3">
      <div
        v-for="(hint, i) in hints"
        :key="i"
        class="flex items-start gap-3 pb-3 border-b border-outline-variant/30 last:border-0"
      >
        <span class="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-1">lightbulb</span>
        <div class="prose-arcane text-body-md" v-html="hint" />
      </div>

      <button
        v-if="!allRevealed"
        @click="revealNext"
        class="w-full mt-4 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary font-bold rounded-lg transition-colors"
      >
        Revelar Próxima ({{ revealed }}/{{ hints.length }})
      </button>
      <div v-else class="text-center text-on-surface-variant text-label-caps font-bold">
        Todas as dicas foram reveladas!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  hints: string[]
}>()

const revealed = ref(1)
const allRevealed = computed(() => revealed.value >= props.hints.length)

function revealNext() {
  if (revealed.value < props.hints.length) {
    revealed.value++
  }
}
</script>
