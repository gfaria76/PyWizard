<template>
  <aside class="cg-panel rounded-2xl p-4">
    <div class="mb-4 flex items-center gap-3">
      <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-200/30 bg-violet-300/10 text-xl font-black text-violet-100">
        {{ stats.level }}
      </div>
      <div>
        <p class="text-sm font-bold text-slate-100">{{ playerTitle }}</p>
        <p class="text-xs text-slate-400">Nível {{ stats.level }} · {{ stats.xp }} XP</p>
      </div>
    </div>

    <div class="space-y-3">
      <div>
        <div class="mb-1 flex justify-between text-xs font-semibold text-slate-300">
          <UTooltip text="Perde 1 ao errar uma submissão. Com HP 0 não pode submeter.">
            <span class="cursor-help border-b border-dashed border-slate-600">HP</span>
          </UTooltip>
          <span>{{ stats.hp }}/{{ stats.maxHp }}</span>
        </div>
        <UProgress :model-value="hpPercent" color="error" />
      </div>

      <div>
        <div class="mb-1 flex justify-between text-xs font-semibold text-slate-300">
          <UTooltip text="Gasta 1 por submissão e é reembolsada no acerto.">
            <span class="cursor-help border-b border-dashed border-slate-600">Mana</span>
          </UTooltip>
          <span>{{ stats.mana }}/{{ stats.maxMana }}</span>
        </div>
        <UProgress :model-value="manaPercent" color="primary" />
      </div>

      <div class="grid grid-cols-2 gap-2 pt-2">
        <div class="rounded-xl border border-amber-200/20 bg-amber-300/10 p-3">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-amber-100/70">Moedas</p>
          <p class="text-lg font-black text-amber-100">{{ stats.coins }}</p>
        </div>
        <div class="rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-3">
          <p class="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan-100/70">Quests</p>
          <p class="text-lg font-black text-cyan-100">{{ completedCount }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const LEVEL_TITLES = [
  'Aprendiz Arcano',
  'Iniciado do Grimório',
  'Praticante de Runas',
  'Adepto das Listas',
  'Oficial dos Feitiços',
  'Mago de Batalha',
  'Mestre das Funções',
  'Grão-Mestre Arcano',
  'Lenda do Código',
]

const props = defineProps<{
  stats: {
    level: number
    xp: number
    coins: number
    hp: number
    maxHp: number
    mana: number
    maxMana: number
  }
  completedCount: number
}>()

const playerTitle = computed(() =>
  LEVEL_TITLES[Math.min(props.stats.level - 1, LEVEL_TITLES.length - 1)] ?? 'Lenda do Código',
)
const hpPercent = computed(() => Math.round((props.stats.hp / props.stats.maxHp) * 100))
const manaPercent = computed(() => Math.round((props.stats.mana / props.stats.maxMana) * 100))
</script>
