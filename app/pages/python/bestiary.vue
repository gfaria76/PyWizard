<template>
  <div class="p-8 max-w-[1200px] mx-auto">
    <!-- Header -->
    <header class="mb-10 border-b border-outline-variant/40 pb-6 relative">
      <div class="absolute bottom-[-1px] left-0 w-32 h-[1px] bg-error drop-shadow-[0_0_5px_rgba(255,180,171,1)]"></div>
      <h1 class="font-display-lg text-display-lg text-primary drop-shadow-md mb-2 flex items-center gap-4">
        <span class="material-symbols-outlined text-4xl text-error drop-shadow-[0_0_15px_rgba(255,180,171,0.8)]" style="font-variation-settings: 'FILL' 1;">pest_control</span>
        Bestiary
      </h1>
      <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
        A record of every bug, sentinel, and digital entity you have encountered on your journey through the Python Arcane trail.
      </p>
    </header>

    <!-- Beast Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="beast in beasts" 
        :key="beast.name"
        class="bg-surface-container/80 backdrop-blur-xl p-6 rounded-xl border border-error/20 hover:border-error/50 transition-all group cursor-pointer relative overflow-hidden"
      >
        <!-- Glow -->
        <div class="absolute -top-16 -right-16 w-40 h-40 bg-error/5 rounded-full blur-3xl group-hover:bg-error/15 transition-all pointer-events-none"></div>
        
        <div class="flex items-start justify-between mb-4 z-10 relative">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-error/10 border border-error/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-error text-2xl">{{ beast.icon }}</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-[18px] text-primary group-hover:text-error transition-colors">{{ beast.name }}</h3>
              <span class="font-label-caps text-[10px] text-on-surface-variant">{{ beast.source }}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="font-label-caps text-label-caps text-error mb-1">HP {{ beast.hp }}</div>
            <div class="w-16 h-2 bg-surface-container-high rounded overflow-hidden border border-outline-variant/30">
              <div class="h-full bg-gradient-to-r from-error-container to-error" :style="{ width: (beast.hp / 500 * 100) + '%' }"></div>
            </div>
          </div>
        </div>

        <p class="font-body-md text-on-surface-variant mb-4 z-10 relative">{{ beast.description }}</p>

        <div class="flex items-center gap-2 z-10 relative">
          <span class="font-label-caps text-[10px] text-secondary border border-secondary/30 px-2 py-0.5 rounded-full">
            Weakness: {{ beast.weakness }}
          </span>
          <span class="font-label-caps text-[10px] text-tertiary-fixed-dim border border-tertiary-fixed-dim/30 px-2 py-0.5 rounded-full">
            {{ beast.xp }} XP
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'student' })

interface Beast {
  name: string
  hp: number
  weakness: string
  xp: number
  icon: string
  source: string
  description: string
}

const { data } = await useFetch<{ bestas: Beast[] }>('/api/cursos/python/bestiario')
const beasts = computed(() => data.value?.bestas ?? [])
</script>
