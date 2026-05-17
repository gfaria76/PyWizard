<template>
  <Teleport to="body">
    <div v-if="progress.hydrated" class="fixed inset-0 pointer-events-none z-40">
      <!-- Top XP Bar -->
      <div class="absolute top-0 left-0 right-0 h-1 pointer-events-auto">
        <HudStatBar variant="xp" :current="progress.stats.xp" :max="progress.stats.xp + 300" />
      </div>

      <!-- Top Left: HP + Mana -->
      <div class="absolute top-20 left-6 flex flex-col gap-3 pointer-events-auto w-48">
        <HudStatBar variant="hp" :current="progress.stats.hp" :max="progress.stats.maxHp" />
        <HudStatBar variant="mana" :current="progress.stats.mana" :max="progress.stats.maxMana" />
      </div>

      <!-- Top Right: Coins + Level -->
      <div class="absolute top-20 right-6 glass-panel p-4 pointer-events-auto">
        <div class="flex items-center justify-between gap-4">
          <div class="text-center">
            <div class="text-label-caps text-on-surface-variant mb-1">Moedas</div>
            <div class="text-headline-md font-bold text-tertiary-fixed-dim">{{ progress.stats.coins }}</div>
          </div>
          <div class="w-px h-10 bg-outline-variant/30" />
          <div class="text-center">
            <div class="text-label-caps text-on-surface-variant mb-1">Nível</div>
            <div class="text-headline-md font-bold text-primary-container glow-cyan">{{ progress.stats.level }}</div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const progress = useProgressStore()

onMounted(() => {
  if (!progress.hydrated) {
    progress.hydrate()
  }
})
</script>
