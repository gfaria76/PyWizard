<template>
  <div class="bg-background text-on-background min-h-screen">
    <!-- XP Tracker HUD -->
    <div class="fixed top-0 left-0 w-full h-[2px] bg-surface-container-highest z-[60]">
      <div
        class="h-full bg-tertiary-fixed-dim shadow-[0_0_8px_#fbbc00]"
        :style="{ width: xpPercent + '%' }"
      />
    </div>

    <!-- TopAppBar -->
    <header
      class="fixed top-0 left-0 w-full z-50 h-16 flex justify-between items-center px-margin-desktop
             bg-surface/80 backdrop-blur-xl border-b border-primary-container/20
             shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
    >
      <span
        class="font-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]"
      >
        Python Arcane
      </span>
      <div class="flex items-center gap-4">
        <button
          class="text-on-surface-variant hover:text-primary-container transition-colors"
          aria-label="Powers"
        >
          <span class="material-symbols-outlined">bolt</span>
        </button>
        <button
          class="text-on-surface-variant hover:text-primary-container transition-colors"
          aria-label="Settings"
        >
          <span class="material-symbols-outlined">auto_fix_high</span>
        </button>
        <button
          class="text-on-surface-variant hover:text-primary-container transition-colors"
          aria-label="Coins"
        >
          <span class="material-symbols-outlined">monetization_on</span>
        </button>
      </div>
    </header>

    <!-- SideNavBar -->
    <nav
      class="hidden md:flex fixed left-0 top-0 h-full pt-20 flex-col space-y-4
             bg-surface-container/90 backdrop-blur-md w-64
             border-r border-secondary-container/30 shadow-xl z-40"
    >
      <NavStudentNav />
    </nav>

    <!-- Main -->
    <main
      class="md:ml-64 pt-20 px-margin-mobile md:px-margin-desktop min-h-screen"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const progress = useProgressStore()

const xpPercent = computed(() => {
  if (!progress.hydrated) return 0
  const xpPerLevel = 300
  const currentLevelXp = progress.stats.xp % xpPerLevel
  return (currentLevelXp / xpPerLevel) * 100
})
</script>
