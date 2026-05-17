<template>
  <div class="bg-background text-on-background min-h-screen">
    <!-- Global XP thin top bar -->
    <div class="fixed top-0 left-0 w-full h-[2px] bg-surface-container-highest z-[60]">
      <div
        class="h-full bg-tertiary-fixed-dim shadow-[0_0_8px_#fbbc00]"
        :style="{ width: xpPercent + '%' }"
      />
    </div>

    <!-- TopAppBar with HUD -->
    <header
      class="fixed top-0 left-0 w-full z-50 h-16 flex justify-between items-center gap-6 px-margin-mobile md:px-margin-desktop
             bg-surface/80 backdrop-blur-xl border-b border-primary-container/20
             shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
    >
      <div class="flex items-center gap-4 min-w-0">
        <span
          class="font-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)] truncate"
        >
          Python Arcane
        </span>
      </div>

      <GameHUD class="flex-shrink-0" />

      <div class="hidden sm:flex items-center gap-3">
        <button
          class="text-on-surface-variant hover:text-primary-container transition-colors p-1"
          aria-label="Restaurar layout padrão"
          title="Restaurar layout padrão"
          @click="resetLayout"
        >
          <span class="material-symbols-outlined text-[20px]">view_compact</span>
        </button>
      </div>
    </header>

    <!-- SideNavBar (resizable in desktop) -->
    <nav
      class="hidden md:flex fixed left-0 top-0 h-full pt-20 flex-col space-y-4
             bg-surface-container/90 backdrop-blur-md
             border-r border-secondary-container/30 shadow-xl z-40"
      :style="{ width: sidebarPx + 'px' }"
    >
      <NavStudentNav />

      <!-- Resize handle -->
      <div
        class="absolute top-16 right-0 h-[calc(100%-4rem)] w-1.5 cursor-col-resize group z-50"
        :class="dragging ? 'bg-primary-container/40' : 'bg-transparent hover:bg-primary-container/20'"
        role="separator"
        aria-orientation="vertical"
        aria-label="Redimensionar barra lateral"
        @pointerdown="startDrag"
        @dblclick="resetLayout"
      >
        <div class="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded-full bg-outline-variant/40 group-hover:bg-primary-container/70 transition-colors" />
      </div>
    </nav>

    <!-- Main -->
    <main
      class="pt-20 px-margin-mobile md:px-margin-desktop min-h-screen transition-[margin] duration-150"
      :style="mainStyle"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const progress = useProgressStore()
const layout = useLayoutPersistence()

const dragging = ref(false)

const xpPercent = computed(() => {
  if (!progress.hydrated) return 0
  const xpPerLevel = 300
  const currentLevelXp = progress.stats.xp % xpPerLevel
  return (currentLevelXp / xpPerLevel) * 100
})

const sidebarPx = computed(() => layout.widths.value.sidebar)

const mainStyle = computed(() => ({
  marginLeft: import.meta.client && window.matchMedia('(min-width: 768px)').matches
    ? `${sidebarPx.value}px`
    : '0',
}))

onMounted(() => {
  layout.hydrate()
  if (!progress.hydrated) progress.hydrate()
})

function startDrag(event: PointerEvent) {
  event.preventDefault()
  dragging.value = true
  const target = event.target as HTMLElement
  target.setPointerCapture?.(event.pointerId)

  const onMove = (e: PointerEvent) => {
    layout.setSidebar(e.clientX)
  }
  const onUp = (e: PointerEvent) => {
    dragging.value = false
    target.releasePointerCapture?.(e.pointerId)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
  }
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}

function resetLayout() {
  layout.reset()
}
</script>
