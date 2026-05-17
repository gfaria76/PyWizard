<template>
  <div class="bg-background text-on-surface min-h-screen font-body-md overflow-x-hidden relative">
    <!-- TopAppBar -->
    <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div class="flex items-center gap-4 lg:ml-64">
        <span class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Python Arcane</span>
      </div>
      
      <!-- Top Right Actions -->
      <div class="flex items-center gap-6">
        <button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
          <span class="material-symbols-outlined text-[24px]">bolt</span>
        </button>
        <button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
          <span class="material-symbols-outlined text-[24px]">auto_fix_high</span>
        </button>
        <button class="text-on-surface-variant hover:text-primary-container transition-colors duration-300">
          <span class="material-symbols-outlined text-[24px]">monetization_on</span>
        </button>
      </div>

      <!-- HUD Elements (Absolute positioned within header context if needed, handled by GameHUD) -->
      <slot name="hud"></slot>
    </header>

    <!-- SideNavBar -->
    <nav class="hidden lg:flex fixed left-0 top-0 h-full pt-20 flex-col space-y-4 bg-surface-container/90 backdrop-blur-md w-64 border-r border-secondary-container/30 shadow-xl z-40">
      <slot name="sidebar">
        <!-- Default Sidebar Fallback -->
        <div class="flex flex-col items-center mb-8 px-6">
          <div class="w-16 h-16 rounded-full bg-surface-variant mb-4 overflow-hidden border border-secondary-container/50 flex justify-center items-center">
            <span class="material-symbols-outlined text-secondary text-[32px]">face</span>
          </div>
          <h2 class="font-headline-sm text-headline-sm text-secondary">Archmage</h2>
          <p class="font-body-md text-body-md text-on-surface-variant">Level 42 Pythonista</p>
        </div>
      </slot>
    </nav>

    <!-- Main Content Canvas -->
    <main class="lg:ml-64 pt-16 min-h-screen relative flex flex-col">
      <slot />
    </main>

    <!-- Bottom Nav for Mobile -->
    <nav class="fixed bottom-0 inset-x-0 z-40 h-14 border-t border-secondary-container/30 bg-surface-container-high/95 backdrop-blur-xl lg:hidden flex">
      <button class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-on-surface-variant hover:text-primary-container transition">
        <span class="material-symbols-outlined text-[20px]">explore</span>
        Trail
      </button>
      <button class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-on-surface-variant hover:text-primary-container transition">
        <span class="material-symbols-outlined text-[20px]">swords</span>
        Arena
      </button>
      <button class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-on-surface-variant hover:text-primary-container transition">
        <span class="material-symbols-outlined text-[20px]">auto_stories</span>
        Grimoire
      </button>
      <button class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-on-surface-variant hover:text-primary-container transition">
        <span class="material-symbols-outlined text-[20px]">person</span>
        Profile
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
// Shell behavior and state mapping can be extended here
</script>
