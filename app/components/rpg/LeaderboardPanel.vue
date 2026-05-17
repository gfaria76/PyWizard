<template>
  <div class="flex-1 w-full max-w-[1200px] mx-auto">
    <!-- Header Section -->
    <div class="mb-12 text-center">
      <h1 class="font-display-lg text-display-lg text-secondary tracking-tighter mb-4 drop-shadow-[0_0_12px_rgba(119,1,208,0.5)]">Ranking of Sages</h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">The eternal hall of fame. Behold the Grandmasters who have woven the most complex spells in the Arcane Universe.</p>
      
      <!-- Tabs -->
      <div class="flex justify-center mt-8 gap-4">
        <button class="px-6 py-2 bg-secondary-container/20 border border-secondary text-secondary font-label-caps text-label-caps rounded uppercase shadow-[inset_0_0_12px_rgba(119,1,208,0.4)] backdrop-blur-md">Global Ranking</button>
        <button class="px-6 py-2 bg-surface-container border border-outline-variant/30 text-on-surface-variant font-label-caps text-label-caps rounded uppercase hover:bg-surface-variant/40 hover:text-on-surface transition-colors">Guild Ranking</button>
      </div>
    </div>

    <!-- Top 3 Pedestals -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16 mt-16 px-4">
      
      <!-- Rank 2 -->
      <div class="flex flex-col items-center order-2 md:order-1 relative">
        <div class="absolute -top-16 text-on-surface-variant opacity-20 font-display-lg text-[120px] font-bold leading-none select-none z-0">2</div>
        <div class="w-24 h-24 rounded-full border-4 border-surface-variant overflow-hidden mb-4 relative z-10 shadow-[0_0_15px_rgba(45,52,73,0.5)] bg-surface">
          <img alt="Player 2" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAScpIgVwCIHrskppUgDPLKJ5g1qoXxS-Hv5kfPT_110ObjMdGk_97ucHOUGzab7t0_noaurbCd4dNRWg9-sjHXXlck5Pm2iY8bz5RaWJY21n7oAKrr97tC5Eg1oB5mGI7QOCr031hnrrHfhvky2HI6ruyd1nZaQhXLbGy6pLrwmrrSrlgkeOkav02txlxRz64cB8bj3KRmVegHcpl9epakgeeTZCV3rCIs4W3E8t_4ezpvfd5p88KCWMz14FH6stQDlkSS1yCG9Udk"/>
        </div>
        <div class="bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-4 w-full text-center relative z-10">
          <div class="font-headline-sm text-headline-sm text-on-surface mb-1">NullPointer</div>
          <div class="font-code-md text-code-md text-secondary mb-2">Grandmaster</div>
          <div class="font-label-caps text-label-caps text-tertiary-fixed-dim">98,420 XP</div>
        </div>
        <div class="w-full h-32 bg-surface-container-lowest border-t border-x border-outline-variant/20 mt-4 rounded-t-lg relative overflow-hidden flex justify-center items-center opacity-80">
          <div class="absolute inset-0 bg-gradient-to-t from-surface-variant/20 to-transparent"></div>
          <span class="font-display-lg text-[48px] text-surface-variant font-bold">II</span>
        </div>
      </div>

      <!-- Rank 1 -->
      <div class="flex flex-col items-center order-1 md:order-2 relative -mt-12">
        <div class="absolute -top-20 text-tertiary-fixed-dim opacity-20 font-display-lg text-[160px] font-bold leading-none select-none z-0">1</div>
        <div class="absolute -top-10 z-20 material-symbols-outlined text-tertiary-fixed-dim text-4xl drop-shadow-[0_0_10px_rgba(251,188,0,0.8)]" style="font-variation-settings: 'FILL' 1;">workspace_premium</div>
        <div class="w-32 h-32 rounded-full border-4 border-tertiary-fixed-dim overflow-hidden mb-4 relative z-10 shadow-[0_0_30px_rgba(251,188,0,0.4)] bg-surface">
          <img alt="Player 1" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpF98w3yFl1cmSfNIFqlI9dSn0XW69XGbk61DftY3oGY1PaIqFaSn5cA7sds1QpcHFai-_QrG5Lt3ZgBMH9_V539QhDm5q5S8_3TaYB9SV2PdrUZbDmHpuh323JFTcCJ2fsPmNgHvifAR7gV7eIhixPsnv69AMppwHP9_l_TjyHGDaAmQuP8MpW7EyGri69wD2T6NQCN-sJx_p7CSFUGcqf7K4XEWJ4uCV0SUYx7pxbKGQl6phFLB3tnGrP_6IDsj8vJgkhovFuItb"/>
        </div>
        <div class="bg-surface-container-highest/90 backdrop-blur-xl border border-tertiary-fixed-dim/50 rounded-xl p-6 w-full text-center relative z-10 shadow-[inset_0_0_20px_rgba(251,188,0,0.1)]">
          <div class="font-headline-sm text-headline-sm text-primary mb-1 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">ByteWeaver</div>
          <div class="font-code-md text-code-md text-secondary mb-2 drop-shadow-[0_0_4px_rgba(220,184,255,0.5)]">Arch-Grandmaster</div>
          <div class="font-label-caps text-label-caps text-tertiary-fixed-dim text-lg">112,050 XP</div>
        </div>
        <div class="w-full h-40 bg-surface-container-lowest border-t-2 border-x border-tertiary-fixed-dim/30 mt-4 rounded-t-xl relative overflow-hidden flex justify-center items-center shadow-[0_-10px_30px_rgba(251,188,0,0.1)]">
          <div class="absolute inset-0 bg-gradient-to-t from-tertiary-fixed-dim/10 to-transparent"></div>
          <span class="font-display-lg text-[64px] text-tertiary-fixed-dim/30 font-bold">I</span>
        </div>
      </div>

      <!-- Rank 3 -->
      <div class="flex flex-col items-center order-3 md:order-3 relative">
        <div class="absolute -top-16 text-on-surface-variant opacity-20 font-display-lg text-[120px] font-bold leading-none select-none z-0">3</div>
        <div class="w-24 h-24 rounded-full border-4 border-surface-variant overflow-hidden mb-4 relative z-10 shadow-[0_0_15px_rgba(45,52,73,0.5)] bg-surface">
          <img alt="Player 3" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpJBiOh0Hh7pK4GqZq5V9X1aMKoMWyNIxcWwBct-te_Cu6yUtoYlXFLQfkjqGCwI3Iofm_hgude6o6D2sRyMbhNlC4s7HnbSAufUic8xiiT2p9LGXrvk916RhcI7ZgBw7GWcWxu2E3cs_a_f233j9BPthANvARQr_QxwHn7JV-UMuqOI325YjGWrYvtEK4jY1OWH_IJqIPm23CHWMEM46fppOE9w9b1Ni3DgLtZfTyQaeJXOFlIQuLpzbDb2jTZExe4ELO6cM5tQC6"/>
        </div>
        <div class="bg-surface-container-high/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-4 w-full text-center relative z-10">
          <div class="font-headline-sm text-headline-sm text-on-surface mb-1">LoopCrafter</div>
          <div class="font-code-md text-code-md text-secondary mb-2">Grandmaster</div>
          <div class="font-label-caps text-label-caps text-tertiary-fixed-dim">94,100 XP</div>
        </div>
        <div class="w-full h-24 bg-surface-container-lowest border-t border-x border-outline-variant/20 mt-4 rounded-t-lg relative overflow-hidden flex justify-center items-center opacity-80">
          <div class="absolute inset-0 bg-gradient-to-t from-surface-variant/20 to-transparent"></div>
          <span class="font-display-lg text-[40px] text-surface-variant font-bold">III</span>
        </div>
      </div>
    </div>

    <!-- List Ranking -->
    <div class="bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl overflow-hidden mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      
      <!-- List Header -->
      <div class="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/30 bg-surface-container/50 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
        <div class="col-span-1 text-center">Rank</div>
        <div class="col-span-4 md:col-span-5">Mage Name</div>
        <div class="col-span-2 text-center hidden md:block">Level</div>
        <div class="col-span-3 md:col-span-2 text-right">Total XP</div>
        <div class="col-span-4 md:col-span-2 text-center">Badges</div>
      </div>

      <!-- List Items -->
      <div class="flex flex-col">
        <!-- Item 4 -->
        <div class="grid grid-cols-12 gap-4 p-4 border-b border-outline-variant/10 items-center hover:bg-surface-variant/20 transition-colors group">
          <div class="col-span-1 font-code-md text-code-md text-on-surface-variant text-center">4</div>
          <div class="col-span-4 md:col-span-5 flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden flex-shrink-0">
              <img alt="Player 4" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn8h3Hhd9adDmM9ZOTKSwuTzRXZHAHlJ-RACFjAgS036aWMu5etaUtU_8k_Q_iMTfvF36ZQD1CCaa9WYEv6_G2kvFy4GnZDJnJbltrXoamZkic-pKMSxZN53E10mn8RK6GC7Y7BMMzSEzkln1woQ55OtBNvpF2qTSZPcWOm-0okkxNuMYiP5jwCzVLhmIS5ODKjURSZxKPBuYbF23mvvR03Wt4KJGbZj7aVH9HM-FKUOhwAemGSzDppZ4bEaIj5kHPh4MRzIgbMqMX"/>
            </div>
            <span class="font-body-lg text-body-lg text-on-surface group-hover:text-primary-fixed transition-colors">VoidCaller</span>
          </div>
          <div class="col-span-2 text-center font-code-md text-code-md text-secondary hidden md:block">Lvl 98</div>
          <div class="col-span-3 md:col-span-2 text-right font-code-md text-code-md text-tertiary-fixed-dim">89,200</div>
          <div class="col-span-4 md:col-span-2 flex justify-center gap-1 text-secondary">
            <span class="material-symbols-outlined text-sm">local_fire_department</span>
            <span class="material-symbols-outlined text-sm">bolt</span>
          </div>
        </div>

        <div class="p-4 text-center text-outline-variant">
          <span class="material-symbols-outlined">more_vert</span>
        </div>

        <!-- Current User Highlight (Rank 12) -->
        <div class="grid grid-cols-12 gap-4 p-4 border border-secondary bg-secondary-container/10 items-center shadow-[inset_0_0_20px_rgba(119,1,208,0.2)] group relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-secondary shadow-[0_0_10px_rgba(220,184,255,0.8)]"></div>
          <div class="col-span-1 font-code-md text-code-md text-secondary text-center font-bold">12</div>
          <div class="col-span-4 md:col-span-5 flex items-center gap-3">
            <div class="w-10 h-10 rounded-full border-2 border-secondary bg-surface-variant overflow-hidden flex-shrink-0 relative">
              <span class="material-symbols-outlined w-full h-full flex items-center justify-center text-secondary">face</span>
            </div>
            <div class="flex flex-col">
              <span class="font-headline-sm text-headline-sm text-secondary drop-shadow-[0_0_4px_rgba(220,184,255,0.5)]">Master Syntax</span>
              <span class="font-label-caps text-label-caps text-on-surface-variant">Archmage (You)</span>
            </div>
          </div>
          <div class="col-span-2 text-center font-code-md text-code-md text-secondary font-bold hidden md:block">Lvl 82</div>
          <div class="col-span-3 md:col-span-2 text-right font-code-md text-code-md text-tertiary-fixed-dim font-bold">64,300</div>
          <div class="col-span-4 md:col-span-2 flex justify-center gap-1 text-secondary drop-shadow-[0_0_4px_rgba(220,184,255,0.6)]">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">stars</span>
            <span class="material-symbols-outlined text-sm">menu_book</span>
            <span class="material-symbols-outlined text-sm">code</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination/Action -->
    <div class="flex justify-center mb-16">
      <button class="px-8 py-3 bg-surface-container-high border border-outline-variant/30 text-primary-fixed font-label-caps text-label-caps rounded flex items-center gap-2 hover:bg-surface-variant/50 hover:shadow-[0_0_15px_rgba(0,251,251,0.2)] transition-all">
        Load More Sages
        <span class="material-symbols-outlined text-sm">expand_more</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props para receber os dados reais do ranking
interface Sage {
  id: string
  rank: number
  name: string
  level: number
  xp: number
  title: string
  avatar?: string
  isCurrentUser?: boolean
  badges: string[]
}

const props = defineProps<{
  sages?: Sage[]
}>()
</script>
