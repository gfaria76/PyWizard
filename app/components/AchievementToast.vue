<template>
  <Transition name="achievement-toast">
    <div
      v-if="visible"
      class="pointer-events-auto flex w-80 items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-300/10 p-4 shadow-2xl backdrop-blur-sm"
      role="alert"
      aria-live="assertive"
    >
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/40 bg-amber-400/20">
        <UIcon name="i-lucide-trophy" class="h-5 w-5 text-amber-400" />
      </div>

      <div class="min-w-0 flex-1">
        <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-amber-300/70">
          {{ description ?? 'Conquista desbloqueada!' }}
        </p>
        <p class="truncate text-sm font-bold text-amber-100">{{ title }}</p>
        <div class="mt-1 flex items-center gap-2">
          <span class="flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-300/10 px-2 py-0.5 text-[0.68rem] font-bold text-cyan-300">
            +{{ xp }} XP
          </span>
          <span class="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-300/10 px-2 py-0.5 text-[0.68rem] font-bold text-amber-300">
            +{{ coins }} 🪙
          </span>
        </div>
      </div>

      <button
        class="ml-1 shrink-0 text-amber-300/50 transition-colors hover:text-amber-200"
        aria-label="Fechar"
        @click="dismiss"
      >
        <UIcon name="i-lucide-x" class="h-4 w-4" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  coins: number
  xp: number
}>()

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timer = setTimeout(() => dismiss(), 4000)
})

onUnmounted(() => {
  if (timer !== null) clearTimeout(timer)
})

function dismiss() {
  visible.value = false
  // give the transition time to finish before emitting
  setTimeout(() => emit('close'), 350)
}

// Reset visibility if props change (reuse component for multiple toasts)
watch(() => props.title, () => {
  if (timer !== null) clearTimeout(timer)
  visible.value = true
  timer = setTimeout(() => dismiss(), 4000)
})
</script>

<style scoped>
.achievement-toast-enter-active {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.achievement-toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.achievement-toast-enter-from {
  opacity: 0;
  transform: translateY(1rem) scale(0.9);
}

.achievement-toast-leave-to {
  opacity: 0;
  transform: translateY(0.5rem) scale(0.95);
}
</style>
