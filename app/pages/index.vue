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

    <!-- Main Content -->
    <main
      class="md:ml-64 pt-20 px-margin-mobile md:px-margin-desktop pb-margin-desktop min-h-screen relative"
    >
      <!-- Background Cosmic Image -->
      <div
        class="absolute inset-0 z-[-1] opacity-20 pointer-events-none"
        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD8rbj326Wwz8KKYOaKXFFlHzdhH_DF5jz9B_oBhb-xnNFw8oMbH_ldjF97nwEWy6v0hPEe4cBvsdEOu6hV9PKkFA_RSz3LiapfqDdX8Y8uIUpF9rdOgt6rqXrb1xidEkp4MmM_wp8QDT-MeuBm4qsDJVnISmG5yfv5CcozHeZxAhCFVArgmWdKBKxpr5ZIBLilKbbvhkBD5qdKhyhrWF2fuuJv5XEOm-0pPxaEM7rRispeZFxZKP_OQNDNIHgbI-WuV6R9YN7aQt5B');
               background-size: cover;
               background-position: center;"
      />

      <div class="max-w-[1200px] mx-auto pt-8">
        <!-- Page Header -->
        <div class="mb-12">
          <h1 class="font-display-lg text-display-lg text-primary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-2">
            Multiverse Hub
          </h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Select your next realm of mastery. Each world holds ancient Pythonic secrets waiting to be compiled.
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <!-- Left Column: Cosmic Map -->
          <div
            class="lg:col-span-8 relative min-h-[600px] bg-surface-container-low/80 backdrop-blur-xl
                   border border-secondary-container/20 rounded-xl p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]"
          >
            <!-- SVG Path Connectors -->
            <svg
              class="absolute inset-0 w-full h-full pointer-events-none opacity-30"
              preserveAspectRatio="none"
            >
              <path
                d="M 150 150 Q 300 100 450 250 T 700 350"
                fill="transparent"
                stroke="var(--tw-colors-primary-container)"
                stroke-dasharray="5,5"
                stroke-width="2"
              />
              <path
                d="M 450 250 Q 500 450 300 500"
                fill="transparent"
                stroke="var(--tw-colors-on-surface-variant)"
                stroke-dasharray="5,5"
                stroke-width="2"
              />
            </svg>

            <!-- Node 1: Completed -->
            <div class="absolute top-[10%] left-[10%] group cursor-pointer">
              <div
                class="relative w-24 h-24 rounded-full bg-surface-container border border-primary-container
                       shadow-[0_0_20px_rgba(0,251,251,0.3)] flex items-center justify-center
                       transition-transform duration-300 group-hover:scale-110"
              >
                <span
                  class="material-symbols-outlined text-primary-container text-4xl drop-shadow-[0_0_8px_rgba(0,251,251,0.8)]"
                  style="font-variation-settings: 'FILL' 1;"
                >
                  token
                </span>
                <div class="absolute -bottom-8 whitespace-nowrap text-center">
                  <div class="font-label-caps text-label-caps text-primary-container">
                    Syntax Sanctuary
                  </div>
                </div>
              </div>
            </div>

            <!-- Node 2: Active -->
            <div class="absolute top-[30%] left-[45%] group cursor-pointer z-10">
              <div
                class="relative w-32 h-32 rounded-full bg-surface-container border-2 border-secondary
                       shadow-[0_0_30px_rgba(220,184,255,0.4),inset_0_0_20px_rgba(119,1,208,0.5)]
                       flex items-center justify-center transition-transform duration-300
                       group-hover:scale-105 animate-pulse"
              >
                <span
                  class="material-symbols-outlined text-secondary text-5xl drop-shadow-[0_0_12px_rgba(220,184,255,0.8)]"
                  style="font-variation-settings: 'FILL' 1;"
                >
                  public
                </span>
                <!-- Runic Ring -->
                <div
                  class="absolute inset-[-10px] border border-secondary/50 rounded-full border-dashed
                         animate-[spin_10s_linear_infinite]"
                />
                <div
                  class="absolute -bottom-10 whitespace-nowrap text-center bg-surface-container-high/90
                         px-3 py-1 rounded border border-secondary-container/50 backdrop-blur-md"
                >
                  <div class="font-label-caps text-label-caps text-secondary">Loops Labyrinth</div>
                  <div class="font-code-md text-code-md text-tertiary-fixed-dim text-[10px]">
                    Active Quest
                  </div>
                </div>
              </div>
            </div>

            <!-- Node 3: Locked -->
            <div class="absolute top-[50%] right-[15%] group cursor-not-allowed opacity-50 grayscale">
              <div
                class="relative w-24 h-24 rounded-full bg-surface-container border border-on-surface-variant
                       flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-on-surface-variant text-4xl">lock</span>
                <div class="absolute -bottom-8 whitespace-nowrap text-center">
                  <div class="font-label-caps text-label-caps text-on-surface-variant">
                    Functions Forge
                  </div>
                </div>
              </div>
            </div>

            <!-- Node 4: Locked -->
            <div class="absolute bottom-[15%] left-[30%] group cursor-not-allowed opacity-50 grayscale">
              <div
                class="relative w-20 h-20 rounded-full bg-surface-container border border-on-surface-variant
                       flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-on-surface-variant text-3xl">lock</span>
                <div class="absolute -bottom-8 whitespace-nowrap text-center">
                  <div class="font-label-caps text-label-caps text-on-surface-variant">Class Citadel</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Status & Quests -->
          <div class="lg:col-span-4 flex flex-col gap-6">
            <!-- Player Status Card -->
            <div
              class="bg-surface-container-high/80 backdrop-blur-xl border border-secondary-container/30
                     rounded-xl p-6 relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-full
                       blur-3xl -mr-10 -mt-10 pointer-events-none"
              />
              <h2 class="font-headline-sm text-headline-sm text-primary mb-4 flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">person</span>
                Vitals
              </h2>
              <div class="space-y-4">
                <!-- HP -->
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="font-label-caps text-label-caps text-error">HP</span>
                    <span class="font-code-md text-code-md text-error">850/1000</span>
                  </div>
                  <div class="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-error to-[#ff5c5c] rounded-full"
                      style="width: 85%;"
                    />
                  </div>
                </div>
                <!-- Mana -->
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="font-label-caps text-label-caps text-primary-container">Mana</span>
                    <span class="font-code-md text-code-md text-primary-container">420/500</span>
                  </div>
                  <div class="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-surface-tint to-primary-container rounded-full"
                      style="width: 84%;"
                    />
                  </div>
                </div>
                <!-- Resources -->
                <div class="flex justify-between mt-6 pt-4 border-t border-outline-variant/30">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-tertiary-fixed-dim">monetization_on</span>
                    <span class="font-code-md text-code-md text-tertiary-container">1,240 G</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary">star</span>
                    <span class="font-code-md text-code-md text-secondary">Lv. 42</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Active Quest Card -->
            <div
              class="bg-surface-container/90 backdrop-blur-xl border border-primary-container/20 rounded-xl p-6 relative"
            >
              <div
                class="absolute -left-[1px] top-4 bottom-4 w-1 bg-primary-container rounded-r-full
                       shadow-[0_0_10px_rgba(0,251,251,0.5)]"
              />
              <div class="flex justify-between items-start mb-4">
                <h2 class="font-headline-sm text-headline-sm text-primary">Active Quest</h2>
                <span
                  class="bg-secondary-container/30 text-secondary border border-secondary/30 px-2 py-1
                         rounded font-label-caps text-label-caps text-[10px]"
                >
                  IN PROGRESS
                </span>
              </div>
              <h3 class="font-headline-md text-headline-md text-primary-container mb-2 text-xl">
                The While Loop Enigma
              </h3>
              <p class="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                Escape the infinite cycle of the Labyrinth by correctly defining an exit condition. Beware of
                off-by-one demons.
              </p>
              <div
                class="bg-surface-container-lowest p-3 rounded border border-outline-variant/30 mb-6
                       font-code-md text-code-md text-on-surface text-sm"
              >
                <span class="text-secondary">while</span>
                <span class="text-tertiary-container">not</span>
                escaped:<br />
                <span class="text-on-surface-variant"># TODO: Find exit</span>
              </div>
              <button
                class="w-full bg-primary-container text-on-primary-container font-label-caps text-label-caps
                       py-3 rounded font-bold hover:bg-surface-tint transition-all
                       shadow-[0_0_15px_rgba(0,251,251,0.3)] hover:shadow-[0_0_25px_rgba(0,251,251,0.6)]
                       flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-sm">play_arrow</span>
                Resume Cast
              </button>
            </div>
          </div>
        </div>
      </div>
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
