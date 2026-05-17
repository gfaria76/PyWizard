<template>
  <div class="flex flex-col h-full w-full">
    <!-- User Profile Area -->
    <div class="px-6 pb-6 border-b border-secondary-container/30">
      <div class="flex items-center gap-4 mb-2">
        <div class="w-12 h-12 rounded-full bg-secondary-container/50 border border-primary-container overflow-hidden flex justify-center items-center">
          <span v-if="!avatarUrl" class="material-symbols-outlined text-secondary text-[24px]">face</span>
          <img v-else :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
        </div>
        <div>
          <div class="font-headline-sm text-headline-sm text-secondary">{{ title }}</div>
          <div class="font-label-caps text-label-caps text-on-surface-variant">Level {{ level }} {{ className }}</div>
        </div>
      </div>
      <button class="w-full mt-4 bg-primary-container text-on-primary-container font-label-caps text-label-caps py-2 rounded font-bold hover:bg-surface-tint transition-colors shadow-[0_0_10px_rgba(0,251,251,0.4)]">
        Cast Spell
      </button>
    </div>

    <!-- Navigation Links -->
    <div class="flex-1 overflow-y-auto pt-4 flex flex-col cg-scroll">
      <NuxtLink
        to="/python/grimoire"
        class="flex items-center gap-4 py-3 px-6 transition-all duration-200"
        :class="isActive('/python/grimoire') ? 'bg-secondary-container/20 text-primary-container border-l-4 border-primary-container shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]' : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-primary'"
      >
        <span class="material-symbols-outlined">auto_stories</span>
        <span class="font-body-md text-body-md">Grimoire</span>
      </NuxtLink>

      <NuxtLink
        to="/python"
        class="flex items-center gap-4 py-3 px-6 transition-all duration-200"
        :class="isActiveTrail ? 'bg-secondary-container/20 text-primary-container border-l-4 border-primary-container shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]' : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-primary'"
      >
        <span class="material-symbols-outlined">explore</span>
        <span class="font-body-md text-body-md">Trail</span>
      </NuxtLink>

      <NuxtLink
        to="/python/arena"
        class="flex items-center gap-4 py-3 px-6 transition-all duration-200"
        :class="isActive('/python/arena') ? 'bg-secondary-container/20 text-primary-container border-l-4 border-primary-container shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]' : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-primary'"
      >
        <span class="material-symbols-outlined">swords</span>
        <span class="font-body-md text-body-md">Arena</span>
      </NuxtLink>

      <NuxtLink
        to="/python/bestiary"
        class="flex items-center gap-4 py-3 px-6 transition-all duration-200"
        :class="isActive('/python/bestiary') ? 'bg-secondary-container/20 text-primary-container border-l-4 border-primary-container shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]' : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-primary'"
      >
        <span class="material-symbols-outlined">pets</span>
        <span class="font-body-md text-body-md">Bestiary</span>
      </NuxtLink>

      <NuxtLink
        to="/python/ranking"
        class="flex items-center gap-4 py-3 px-6 transition-all duration-200"
        :class="isActive('/python/ranking') ? 'bg-secondary-container/20 text-primary-container border-l-4 border-primary-container shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]' : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-primary'"
      >
        <span class="material-symbols-outlined">leaderboard</span>
        <span class="font-body-md text-body-md">Ranking</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Props {
  title?: string
  level?: number
  className?: string
  avatarUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Archmage',
  level: 1,
  className: 'Explorer',
  avatarUrl: ''
})

const isActive = (path: string) => route.path.startsWith(path)

// Trail is active only on exactly /python (not subroutes like /python/grimoire)
const isActiveTrail = computed(() =>
  route.path === '/python' || route.path === '/python/'
)
</script>
