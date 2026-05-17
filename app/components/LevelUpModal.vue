<template>
  <Teleport to="body">
    <Transition name="level-up-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
        @click.self="handleClose"
      >
        <div
          v-motion
          :initial="{ scale: 0.5, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } }"
          class="cg-solid-panel relative mx-4 max-w-sm rounded-3xl p-8 text-center"
          style="border-color: rgba(167, 139, 250, 0.3); box-shadow: 0 0 60px rgba(139, 92, 246, 0.25), 0 24px 80px rgba(0,0,0,0.5);"
        >
          <!-- Glow ring -->
          <div class="absolute inset-0 rounded-3xl" style="background: radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%); pointer-events: none;" />

          <!-- Level badge -->
          <div class="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-violet-400/50 bg-violet-500/20">
            <div class="absolute inset-0 animate-ping rounded-full border border-violet-400/30" />
            <span class="font-orbitron text-4xl font-black text-violet-200">{{ newLevel }}</span>
          </div>

          <!-- Heading -->
          <p class="mb-1 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-violet-300/60">Você subiu de nível!</p>
          <h2 class="mb-2 text-2xl font-black text-violet-100">
            Nível {{ newLevel }}!
          </h2>

          <!-- Title -->
          <p class="mb-6 text-sm font-semibold text-slate-300">{{ title }}</p>

          <!-- Perks -->
          <div class="mb-6 flex justify-center gap-4 text-xs font-bold">
            <div class="flex items-center gap-1 rounded-full border border-rose-400/20 bg-rose-300/10 px-3 py-1 text-rose-300">
              <UIcon name="i-lucide-heart" class="h-3 w-3" />
              +1 HP máx
            </div>
            <div class="flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-300/10 px-3 py-1 text-cyan-300">
              <UIcon name="i-lucide-sparkles" class="h-3 w-3" />
              +2 Mana máx
            </div>
          </div>

          <!-- Close button -->
          <UButton
            color="secondary"
            variant="solid"
            size="lg"
            class="w-full font-bold"
            @click="handleClose"
          >
            Continuar
          </UButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  newLevel: number
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

let dismissTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    dismissTimer = setTimeout(() => handleClose(), 5000)
  } else {
    if (dismissTimer !== null) clearTimeout(dismissTimer)
  }
})

onUnmounted(() => {
  if (dismissTimer !== null) clearTimeout(dismissTimer)
})

function handleClose() {
  if (dismissTimer !== null) clearTimeout(dismissTimer)
  emit('close')
}
</script>

<style scoped>
.level-up-backdrop-enter-active,
.level-up-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.level-up-backdrop-enter-from,
.level-up-backdrop-leave-to {
  opacity: 0;
}
</style>
