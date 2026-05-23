<template>
  <!-- Global variant: horizontal compact strip for layout headers -->
  <div v-if="variant === 'global'" class="hud-global">
    <!-- Patente / Level -->
    <div class="hud-cell hud-rank">
      <span class="material-symbols-outlined text-secondary text-[18px]">military_tech</span>
      <div class="flex flex-col leading-tight">
        <span class="font-label-caps text-[9px] text-on-surface-variant tracking-wider">PATENTE</span>
        <span class="font-body-md text-[12px] text-secondary font-bold">{{ patente }}</span>
      </div>
    </div>

    <span class="hud-sep" aria-hidden="true" />

    <!-- HP -->
    <div v-if="showHp" class="hud-cell hud-bar">
      <span class="font-label-caps text-[10px] text-error font-bold tracking-wider">HP</span>
      <div class="hud-bar-track">
        <div class="h-full bg-gradient-to-r from-error to-[#ff5c5c] transition-all duration-300" :style="{ width: hpPercent + '%' }" />
      </div>
      <span class="font-code-md text-[10px] text-error tabular-nums">{{ hp }}/{{ maxHp }}</span>
    </div>

    <!-- Mana -->
    <div v-if="showMana" class="hud-cell hud-bar">
      <span class="font-label-caps text-[10px] text-primary-container font-bold tracking-wider">MP</span>
      <div class="hud-bar-track">
        <div class="h-full bg-gradient-to-r from-surface-tint to-primary-container transition-all duration-300" :style="{ width: manaPercent + '%' }" />
      </div>
      <span class="font-code-md text-[10px] text-primary-container tabular-nums">{{ mana }}/{{ maxMana }}</span>
    </div>

    <span class="hud-sep" aria-hidden="true" />

    <!-- XP -->
    <div class="hud-cell">
      <span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">stars</span>
      <span class="font-code-md text-[11px] text-tertiary-fixed-dim tabular-nums">{{ xp }} XP</span>
    </div>

    <!-- Coins -->
    <div class="hud-cell">
      <span class="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">monetization_on</span>
      <span class="font-code-md text-[11px] text-tertiary-fixed-dim tabular-nums">{{ moedas }}</span>
    </div>

    <span class="hud-sep" aria-hidden="true" />

    <!-- Missão ativa -->
    <div class="hud-cell hud-quest" :title="missaoAtiva">
      <span class="material-symbols-outlined text-primary-fixed-dim text-[16px]">flag</span>
      <span class="font-body-md text-[12px] text-on-surface-variant truncate max-w-[200px]">{{ missaoAtiva }}</span>
    </div>

    <!-- Global XP bar at the very top of the viewport -->
    <Teleport v-if="showGlobalXp" to="body">
      <div class="fixed top-0 left-0 w-full h-[2px] bg-surface-variant z-[60] pointer-events-none">
        <div class="h-full bg-tertiary-fixed-dim transition-all duration-500 shadow-[0_0_10px_rgba(251,188,0,0.8)]" :style="{ width: xpPercent + '%' }" />
      </div>
    </Teleport>
  </div>

  <!-- Sidebar variant: original vertical stack -->
  <div v-else class="flex flex-col gap-1 w-full max-w-[200px]">
    <div v-if="showHp" class="flex flex-col gap-1">
      <div class="flex justify-between items-center px-1">
        <span class="font-label-caps text-[10px] text-error font-bold tracking-wider">HP</span>
        <span class="font-code-md text-[10px] text-error">{{ hp }}/{{ maxHp }}</span>
      </div>
      <div class="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-error to-[#ff5c5c] transition-all duration-300" :style="{ width: hpPercent + '%' }" />
      </div>
    </div>

    <div v-if="showMana" class="flex flex-col gap-1 mt-1">
      <div class="flex justify-between items-center px-1">
        <span class="font-label-caps text-[10px] text-primary-container font-bold tracking-wider">MP</span>
        <span class="font-code-md text-[10px] text-primary-container">{{ mana }}/{{ maxMana }}</span>
      </div>
      <div class="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-surface-tint to-primary-container transition-all duration-300" :style="{ width: manaPercent + '%' }" />
      </div>
    </div>

    <Teleport v-if="showGlobalXp" to="body">
      <div class="fixed top-0 left-0 w-full h-[2px] bg-surface-variant z-[60] pointer-events-none">
        <div class="h-full bg-tertiary-fixed-dim transition-all duration-500 shadow-[0_0_10px_rgba(251,188,0,0.8)]" :style="{ width: xpPercent + '%' }" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'global' | 'sidebar'
  hp?: number
  maxHp?: number
  mana?: number
  maxMana?: number
  xp?: number
  nextLevelXp?: number
  moedas?: number
  patente?: string
  missaoAtiva?: string
  showHp?: boolean
  showMana?: boolean
  showGlobalXp?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'sidebar',
  hp: 100,
  maxHp: 100,
  mana: 50,
  maxMana: 50,
  xp: 0,
  nextLevelXp: 100,
  moedas: 0,
  patente: 'Aprendiz',
  missaoAtiva: 'Nenhuma missão ativa',
  showHp: true,
  showMana: true,
  showGlobalXp: true,
})

const hpPercent = computed(() => Math.max(0, Math.min(100, (props.hp / Math.max(1, props.maxHp)) * 100)))
const manaPercent = computed(() => Math.max(0, Math.min(100, (props.mana / Math.max(1, props.maxMana)) * 100)))
const xpPercent = computed(() => Math.max(0, Math.min(100, (props.xp / Math.max(1, props.nextLevelXp)) * 100)))
</script>

<style scoped>
.hud-global {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: nowrap;
  overflow: hidden;
}
.hud-cell {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  white-space: nowrap;
}
.hud-bar {
  min-width: 130px;
}
.hud-bar-track {
  width: 80px;
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  overflow: hidden;
}
.hud-sep {
  width: 1px;
  height: 22px;
  background: rgba(255, 255, 255, 0.1);
  display: inline-block;
}
.hud-rank {
  padding-right: 0.25rem;
}
.hud-quest {
  min-width: 0;
}
</style>
