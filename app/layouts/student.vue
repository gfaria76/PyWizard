<template>
  <div class="bg-background text-on-background min-h-screen">
    <!-- TopAppBar with persistent HUD -->
    <header
      class="fixed top-0 left-0 w-full z-50 h-16 flex justify-between items-center gap-6 px-margin-desktop
             bg-surface/80 backdrop-blur-xl border-b border-primary-container/20
             shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
    >
      <span
        class="font-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)] shrink-0"
      >
        Python Arcane
      </span>
      <GameHUD
        variant="global"
        :hp="progress.stats.hp"
        :max-hp="progress.stats.maxHp"
        :mana="progress.stats.mana"
        :max-mana="progress.stats.maxMana"
        :xp="currentLevelXp"
        :next-level-xp="XP_PER_LEVEL"
        :moedas="progress.stats.coins"
        :patente="patente"
        :missao-ativa="missaoAtiva"
      />
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

onMounted(() => {
  progress.hydrate()
})

const XP_PER_LEVEL = 300

const currentLevelXp = computed(() => progress.stats.xp % XP_PER_LEVEL)

// TODO(Sprint 4): derivar patente da progressão (90% trilha aprendiz/aventura)
const patente = computed(() => 'Aprendiz')

// TODO(Sprint 4): missão ativa vem de useActiveQuest() com base no módulo atual
const missaoAtiva = computed(() => 'Nenhuma missão ativa')
</script>
