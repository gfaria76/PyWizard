<template>
  <div class="flex items-center gap-5">
    <!-- HP -->
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-error text-[18px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <span class="font-label-caps text-[10px] text-error font-bold tracking-wider">HP</span>
          <span class="font-code-md text-[10px] text-error tabular-nums">{{ hp }}/{{ maxHp }}</span>
        </div>
        <div class="h-1.5 w-20 bg-surface-container-lowest rounded-full overflow-hidden border border-error/20">
          <div class="h-full bg-gradient-to-r from-error to-[#ff5c5c] transition-all duration-300" :style="{ width: hpPercent + '%' }" />
        </div>
      </div>
    </div>

    <!-- Mana -->
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-primary-container text-[18px]" style="font-variation-settings: 'FILL' 1;">water_drop</span>
      <div class="flex flex-col">
        <div class="flex items-center gap-1">
          <span class="font-label-caps text-[10px] text-primary-container font-bold tracking-wider">MP</span>
          <span class="font-code-md text-[10px] text-primary-container tabular-nums">{{ mana }}/{{ maxMana }}</span>
        </div>
        <div class="h-1.5 w-20 bg-surface-container-lowest rounded-full overflow-hidden border border-primary-container/20">
          <div class="h-full bg-gradient-to-r from-surface-tint to-primary-container transition-all duration-300" :style="{ width: manaPercent + '%' }" />
        </div>
      </div>
    </div>

    <!-- Coins -->
    <div class="hidden sm:flex items-center gap-1.5">
      <span class="material-symbols-outlined text-tertiary-fixed-dim text-[18px]" style="font-variation-settings: 'FILL' 1;">monetization_on</span>
      <span class="font-code-md text-[12px] text-tertiary-fixed-dim tabular-nums">{{ coins }}</span>
    </div>

    <!-- Level + XP -->
    <div class="hidden md:flex items-center gap-2">
      <span class="font-label-caps text-[10px] text-tertiary-fixed-dim font-bold tracking-wider">LVL {{ level }}</span>
      <div class="flex flex-col">
        <div class="h-1.5 w-24 bg-surface-container-lowest rounded-full overflow-hidden border border-tertiary-fixed-dim/20">
          <div class="h-full bg-tertiary-fixed-dim shadow-[0_0_8px_rgba(251,188,0,0.5)] transition-all duration-300" :style="{ width: xpPercent + '%' }" />
        </div>
        <span class="font-code-md text-[9px] text-on-surface-variant tabular-nums mt-0.5">{{ currentLevelXp }}/{{ xpPerLevel }} XP</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const progress = useProgressStore()

const XP_PER_LEVEL = 300

const hp = computed(() => progress.stats.hp)
const maxHp = computed(() => progress.stats.maxHp)
const mana = computed(() => progress.stats.mana)
const maxMana = computed(() => progress.stats.maxMana)
const coins = computed(() => progress.stats.coins)
const level = computed(() => progress.stats.level)
const xpPerLevel = XP_PER_LEVEL
const currentLevelXp = computed(() => progress.stats.xp % XP_PER_LEVEL)

const hpPercent = computed(() => percent(hp.value, maxHp.value))
const manaPercent = computed(() => percent(mana.value, maxMana.value))
const xpPercent = computed(() => percent(currentLevelXp.value, XP_PER_LEVEL))

function percent(value: number, total: number) {
  if (!total) return 0
  return Math.max(0, Math.min(100, (value / total) * 100))
}
</script>
