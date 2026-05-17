<template>
  <div class="flex flex-col h-full w-full">
    <!-- Avatar Section -->
    <div class="px-6 pb-6 border-b border-secondary-container/30">
      <div class="flex items-center gap-4 mb-2">
        <div class="w-12 h-12 rounded-full bg-secondary-container/50 border border-primary-container overflow-hidden flex-shrink-0">
          <img :src="avatarUrl" :alt="nome" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-headline-sm text-headline-sm text-secondary truncate">{{ nome }}</div>
          <div class="font-label-caps text-label-caps text-on-surface-variant">Level {{ level }} Pythonista</div>
        </div>
      </div>
      <button
        class="w-full mt-4 bg-primary-container text-on-primary-container
               font-label-caps text-label-caps py-2 rounded font-bold
               hover:bg-surface-tint transition-colors shadow-[0_0_10px_rgba(0,251,251,0.4)]"
      >
        Cast Spell
      </button>
    </div>

    <!-- Nav Links -->
    <nav class="flex-1 overflow-y-auto pt-4 px-2">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-4 py-3 px-4 transition-all duration-200 rounded-lg"
        :class="isActive(link.to)
          ? 'bg-secondary-container/20 text-primary-container border-l-4 border-primary-container shadow-[inset_0_0_15px_rgba(0,251,251,0.2)]'
          : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-primary'"
      >
        <span class="material-symbols-outlined flex-shrink-0">{{ link.icon }}</span>
        <span class="font-body-md text-body-md">{{ link.label }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const auth = useAuthStore()
const progress = useProgressStore()

const avatarUrl = computed(() => {
  return auth.user?.user_metadata?.avatar_url || 'https://via.placeholder.com/48'
})

const nome = computed(() => {
  return auth.user?.user_metadata?.name || auth.user?.email?.split('@')[0] || 'Pythonista'
})

const level = computed(() => progress.stats.level)

const navLinks = [
  { to: '/python/grimoire', icon: 'auto_stories', label: 'Grimoire' },
  { to: '/python', icon: 'explore', label: 'Trail' },
  { to: '/python/arena', icon: 'swords', label: 'Arena' },
  { to: '/python/bestiary', icon: 'pets', label: 'Bestiary' },
  { to: '/python/ranking', icon: 'leaderboard', label: 'Ranking' },
]

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}
</script>
