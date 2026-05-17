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
        class="bg-surface-container/60 backdrop-blur-md p-6 rounded-xl border border-error/20 hover:border-error/50 transition-all group cursor-pointer relative overflow-hidden"
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
// Extract unique enemies from all lesson JSONs
// For now, we use a curated static list derived from the enriched data

const beasts = [
  { name: 'Golem de Memória', hp: 50, weakness: 'variáveis', xp: 70, icon: 'smart_toy', source: 'Trilha do Aprendiz I', description: 'Um construto de pedra e circuitos que guarda segredos em cofres de memória. Vulnerável a quem domina a arte de nomear e vincular dados.' },
  { name: 'Espectro Errante', hp: 65, weakness: 'tipos de dados', xp: 90, icon: 'blur_on', source: 'Trilha da Aventura I', description: 'Um fantasma digital que assume formas aleatórias — ora inteiro, ora string. Só cai quando revelamos sua verdadeira natureza.' },
  { name: 'Fantasma dos Operadores', hp: 55, weakness: 'operadores', xp: 70, icon: 'calculate', source: 'Trilha do Aprendiz II', description: 'Materializa-se em equações nebulosas. Derrote-o provando que conhece cada operador aritmético.' },
  { name: 'Elemental Numérico', hp: 70, weakness: 'cálculos', xp: 90, icon: 'whatshot', source: 'Trilha da Aventura II', description: 'Uma entidade feita de puro cálculo. Suas chamas só se apagam com resultados precisos.' },
  { name: 'Guardião da Forja', hp: 120, weakness: 'cálculos complexos', xp: 120, icon: 'shield', source: 'Trilha do Guardião I', description: 'O protetor da forja ancestral. Testa cada aprendiz com problemas de múltiplas etapas.' },
  { name: 'O Analista de Dados Brutos', hp: 300, weakness: 'f-strings e formatação', xp: 500, icon: 'skull', source: 'Boss Marathon I', description: 'O primeiro chefão. Extraído do Portal da Transparência, exige análise precisa de dados governamentais reais.' },
  { name: 'Cubo de Formatação', hp: 60, weakness: 'f-strings', xp: 70, icon: 'view_in_ar', source: 'Trilha do Aprendiz IV', description: 'Um cubo geométrico que exibe mensagens distorcidas. Só se alinha quando a formatação está perfeita.' },
  { name: 'Espírito da Bifurcação', hp: 65, weakness: 'condicionais', xp: 70, icon: 'fork_right', source: 'Trilha do Aprendiz VII', description: 'Uma presença que habita encruzilhadas lógicas. Desaparece quando o caminho correto é escolhido.' },
  { name: 'O Filtrador de Regras', hp: 400, weakness: 'condicionais avançadas', xp: 500, icon: 'skull', source: 'Boss Marathon III', description: 'Um juiz sombrio que aplica cadeias de regras impiedosas. Só é derrotado com lógica impecável.' },
  { name: 'Hidra Aninhada', hp: 80, weakness: 'if aninhado', xp: 70, icon: 'hub', source: 'Trilha do Aprendiz XI', description: 'Cada cabeça cortada gera duas novas condições. Exige organização hierárquica para ser vencida.' },
]
</script>
