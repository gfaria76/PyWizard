<template>
  <div class="flex flex-col gap-1 w-full max-w-[200px]">
    <!-- HP Bar -->
    <div v-if="showHp" class="flex flex-col gap-1">
      <div class="flex justify-between items-center px-1">
        <span class="font-label-caps text-[10px] text-error font-bold tracking-wider">HP</span>
        <span class="font-code-md text-[10px] text-error">{{ hp }}/{{ maxHp }}</span>
      </div>
      <div class="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-error to-[#ff5c5c] transition-all duration-300" :style="{ width: hpPercent + '%' }"></div>
      </div>
    </div>

    <!-- Mana Bar -->
    <div v-if="showMana" class="flex flex-col gap-1 mt-1">
      <div class="flex justify-between items-center px-1">
        <span class="font-label-caps text-[10px] text-primary-container font-bold tracking-wider">MP</span>
        <span class="font-code-md text-[10px] text-primary-container">{{ mana }}/{{ maxMana }}</span>
      </div>
      <div class="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-surface-tint to-primary-container transition-all duration-300" :style="{ width: manaPercent + '%' }"></div>
      </div>
    </div>

    <!-- XP Bar (Top global style) -->
    <Teleport to="body" v-if="showGlobalXp">
      <div class="fixed top-0 left-0 w-full h-[2px] bg-surface-variant z-[60]">
        <div class="h-full bg-tertiary-fixed-dim transition-all duration-500 shadow-[0_0_10px_rgba(251,188,0,0.8)]" :style="{ width: xpPercent + '%' }"></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  hp?: number
  maxHp?: number
  mana?: number
  maxMana?: number
  xp?: number
  nextLevelXp?: number
  showHp?: boolean
  showMana?: boolean
  showGlobalXp?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hp: 100,
  maxHp: 100,
  mana: 50,
  maxMana: 50,
  xp: 0,
  nextLevelXp: 100,
  showHp: true,
  showMana: true,
  showGlobalXp: true
})

const hpPercent = computed(() => Math.max(0, Math.min(100, (props.hp / props.maxHp) * 100)))
const manaPercent = computed(() => Math.max(0, Math.min(100, (props.mana / props.maxMana) * 100)))
const xpPercent = computed(() => Math.max(0, Math.min(100, (props.xp / props.nextLevelXp) * 100)))
</script>
