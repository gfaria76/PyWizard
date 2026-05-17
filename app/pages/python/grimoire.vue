<template>
  <div class="relative">
    <!-- HUD Grid Overlay -->
    <div
      class="fixed inset-0 z-[-1] pointer-events-none opacity-5"
      style="background-image: linear-gradient(to right, rgba(0,251,251,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,251,251,0.03) 1px, transparent 1px);
             background-size: 24px 24px;"
    />

    <div class="p-8 max-w-[1200px] mx-auto">
      <!-- Header -->
    <header class="mb-10 flex items-end justify-between border-b border-outline-variant/40 pb-6 relative">
      <div class="absolute bottom-[-1px] left-0 w-32 h-[1px] bg-primary-container drop-shadow-[0_0_5px_rgba(0,251,251,1)]"></div>
      <div>
        <h1 class="font-display-lg text-display-lg text-primary drop-shadow-md mb-2 flex items-center gap-4">
          <span class="material-symbols-outlined text-4xl text-secondary drop-shadow-[0_0_15px_rgba(119,1,208,0.8)]" style="font-variation-settings: 'FILL' 1;">menu_book</span>
          Arcane Grimoire
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Your repository of mastered incantations, logical constructs, and foundational hexes. Select a discipline to review your spellcraft.
        </p>
      </div>
    </header>

    <!-- Category Tabs -->
    <div class="flex gap-4 mb-8">
      <button 
        v-for="cat in categories" 
        :key="cat.id" 
        class="px-6 py-2 rounded-t-lg font-label-caps text-label-caps transition-colors"
        :class="activeCategory === cat.id 
          ? 'bg-surface-container-high border-t border-l border-r border-primary-container/50 text-primary-container shadow-[inset_0_4px_10px_rgba(0,251,251,0.1)] relative overflow-hidden' 
          : 'bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container hover:text-primary'"
        @click="activeCategory = cat.id"
      >
        {{ cat.nome }}
      </button>
    </div>

    <!-- Spell Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <RpgSkillCard
        v-for="(sp, i) in filteredSpells"
        :key="sp.id"
        :title="sp.titulo"
        :icon="getSpellIcon(sp)"
        :mp-cost="getSpellMp(i)"
        :description="sp.descricao"
        :code-snippet="sp.exemplo || '# ' + sp.titulo"
        :color-theme="i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'tertiary'"
      />
    </div>

      <!-- Empty state -->
      <div v-if="filteredSpells.length === 0" class="text-center py-20">
        <span class="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">lock</span>
        <p class="font-body-lg text-on-surface-variant">Nenhum feitiço desbloqueado nesta categoria ainda.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'student' })

import { ref, computed } from 'vue'

interface Superpower {
  id: string
  icone: string
  titulo: string
  categoria: number
  desbloqueio: string | null
  descricao: string
  exemplo?: string
}

interface Category {
  id: number
  nome: string
  modulo: number | null
}

interface Inventario {
  categorias: Category[]
  superpoderes: Superpower[]
}

const { data: inventario } = await useFetch<Inventario>('/api/cursos/python/inventario')

const activeCategory = ref(1)

const categories = computed(() => inventario.value?.categorias || [])

const filteredSpells = computed(() => {
  return (inventario.value?.superpoderes || []).filter(sp => sp.categoria === activeCategory.value)
})

function getSpellIcon(sp: Superpower) {
  // Map lucide icon names to material symbols
  const map: Record<string, string> = {
    'i-lucide-toggle-right': 'toggle_on',
    'i-lucide-circle-dot': 'radio_button_checked',
    'i-lucide-text-cursor-input': 'text_fields',
    'i-lucide-git-branch': 'fork_right',
    'i-lucide-zap': 'bolt',
    'i-lucide-scissors': 'content_cut',
    'i-lucide-link': 'link',
    'i-lucide-bolt': 'flash_on',
    'i-lucide-arrow-up-down': 'swap_vert',
    'i-lucide-unplug': 'cable',
    'i-lucide-variable': 'functions',
    'i-lucide-arrow-right-left': 'sync_alt',
    'i-lucide-filter': 'filter_alt',
    'i-lucide-braces': 'data_object',
    'i-lucide-function-square': 'code',
    'i-lucide-search-code': 'search',
  }
  return map[sp.icone] || 'auto_awesome'
}

function getSpellMp(index: number): number {
  return [5, 8, 10, 15, 12, 20, 18, 25, 22, 30, 35, 28, 32, 40, 45, 50][index % 16] ?? 5
}
</script>
