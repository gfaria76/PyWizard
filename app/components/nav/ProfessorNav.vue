<template>
  <div class="flex flex-col h-full w-full">
    <!-- Avatar Section -->
    <div class="px-6 pb-6 border-b border-secondary-container/30">
      <div class="flex items-center gap-4 mb-2">
        <div class="w-12 h-12 rounded-full bg-secondary-container/50 border border-secondary overflow-hidden flex-shrink-0">
          <img :src="avatarUrl" :alt="nome" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-headline-sm text-headline-sm text-secondary truncate">{{ nome }}</div>
          <div class="font-label-caps text-label-caps text-on-surface-variant">Master Guide</div>
        </div>
      </div>
      <button
        class="w-full mt-4 bg-secondary text-on-secondary
               font-label-caps text-label-caps py-2 rounded font-bold
               hover:bg-secondary-container transition-colors shadow-[0_0_10px_rgba(220,184,255,0.4)]"
      >
        Command Power
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
          ? 'bg-secondary-container/20 text-secondary border-l-4 border-secondary shadow-[inset_0_0_15px_rgba(220,184,255,0.2)]'
          : 'text-on-surface-variant opacity-70 hover:bg-surface-variant hover:text-secondary'"
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

const avatarUrl = computed(() => {
  return auth.user?.user_metadata?.avatar_url || 'https://via.placeholder.com/48'
})

const nome = computed(() => {
  return auth.user?.user_metadata?.name || auth.user?.email?.split('@')[0] || 'Professor'
})

const navLinks = [
  { to: '/professor', icon: 'dashboard', label: 'Dashboard' },
  { to: '/professor/turmas', icon: 'groups', label: 'Turmas' },
  { to: '/professor/gradebook', icon: 'grading', label: 'Gradebook' },
  { to: '/professor/masmorras', icon: 'castle', label: 'Masmorras' },
  { to: '/professor/agenda', icon: 'calendar_month', label: 'Agenda' },
]

function isActive(path: string): boolean {
  return route.path.startsWith(path)
}
</script>
