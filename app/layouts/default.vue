<template>
  <div class="relative h-screen overflow-hidden flex">
    <div class="cg-grid pointer-events-none absolute inset-0 opacity-70" />

    <!-- Left sidebar (desktop) -->
    <aside
      v-motion
      :initial="{ opacity: 0, x: -20 }"
      :enter="{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } }"
      class="hidden lg:flex lg:flex-col w-80 shrink-0 h-full border-r border-cyan-200/10 bg-[#07111f]/80 relative z-10"
    >
      <!-- Logo -->
      <div class="shrink-0 p-5 border-b border-cyan-200/10">
        <NuxtLink to="/cursos/python" class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-200 shadow-[0_0_24px_rgba(76,215,246,0.18)]">
            CG
          </div>
          <div>
            <p class="text-base font-black tracking-tight text-cyan-100 text-shadow-[0_0_24px_rgba(76,215,246,0.32)]">CodeGrimoire</p>
            <p class="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-slate-400">Python Arcano</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Nav vertical -->
      <nav class="shrink-0 p-3 space-y-1 border-b border-cyan-200/10">
        <NuxtLink
          to="/cursos/python"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition"
          :class="route.path.startsWith('/cursos') ? 'bg-cyan-300/10 text-cyan-200' : 'text-slate-400 hover:bg-white/6 hover:text-slate-200'"
        >
          <UIcon name="i-lucide-map" class="h-5 w-5 shrink-0" />
          Mapa
        </NuxtLink>
        <div class="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600">
          <UIcon name="i-lucide-book-open" class="h-5 w-5 shrink-0" />
          Grimório
          <span class="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide">Em breve</span>
        </div>
        <div class="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600">
          <UIcon name="i-lucide-trophy" class="h-5 w-5 shrink-0" />
          Ranking
          <span class="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide">Em breve</span>
        </div>
      </nav>

      <!-- Spacer -->
      <div class="flex-1" />

      <!-- PlayerPanel -->
      <div class="shrink-0 p-3 border-t border-cyan-200/10">
        <PlayerPanel :stats="progress.stats" :completed-count="progress.completedCount" />
      </div>
    </aside>

    <!-- Main content (center + right — controlados pela página) -->
    <main class="relative z-10 flex-1 min-w-0 h-full overflow-hidden pb-14 lg:pb-0">
      <slot />
    </main>

    <!-- Bottom nav (mobile) -->
    <nav class="fixed bottom-0 inset-x-0 z-40 h-14 border-t border-cyan-200/10 bg-[#07111f]/95 backdrop-blur-xl lg:hidden">
      <div class="flex h-full">
        <button
          class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.62rem] font-bold transition"
          :class="drawerPlayer ? 'text-cyan-300' : 'text-slate-500'"
          @click="drawerPlayer = !drawerPlayer; drawerGrimorio = false"
        >
          <UIcon name="i-lucide-user-circle" class="h-5 w-5" />
          Personagem
        </button>

        <NuxtLink
          to="/cursos/python"
          class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.62rem] font-bold transition"
          :class="route.path === '/cursos/python' ? 'text-cyan-300' : 'text-slate-500'"
          @click="drawerPlayer = false; drawerGrimorio = false"
        >
          <UIcon name="i-lucide-map" class="h-5 w-5" />
          Mapa
        </NuxtLink>

        <button
          class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.62rem] font-bold transition"
          :class="drawerGrimorio ? 'text-cyan-300' : 'text-slate-500'"
          @click="drawerGrimorio = !drawerGrimorio; drawerPlayer = false"
        >
          <UIcon name="i-lucide-book-open" class="h-5 w-5" />
          Grimório
        </button>

        <button class="flex flex-1 flex-col items-center justify-center gap-0.5 text-[0.62rem] font-bold text-slate-700 cursor-not-allowed">
          <UIcon name="i-lucide-trophy" class="h-5 w-5" />
          Ranking
        </button>
      </div>
    </nav>

    <!-- Drawer mobile: Personagem -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-6"
      >
        <div v-if="drawerPlayer" class="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="drawerPlayer = false" />
          <div class="cg-solid-panel relative rounded-t-3xl p-5 pb-10">
            <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-600" />
            <PlayerPanel :stats="progress.stats" :completed-count="progress.completedCount" />
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Drawer mobile: Grimório -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-6"
      >
        <div v-if="drawerGrimorio" class="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="drawerGrimorio = false" />
          <div class="cg-solid-panel relative rounded-t-3xl p-5 pb-10 max-h-[80dvh] overflow-y-auto cg-scroll">
            <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-600" />
            <InventoryPreview
              v-if="campaign"
              :quests="campaign.modulo.aulas"
              :completed-slugs="progress.completedQuestSlugs"
            />
            <p v-else class="py-8 text-center text-sm text-slate-500">
              Navegue até o mapa para ver o grimório.
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { CampaignPayload } from '~/types/course'

const route = useRoute()
const progress = useProgressStore()
const user = useSupabaseUser()
const drawerPlayer = ref(false)
const drawerGrimorio = ref(false)

const { data: campaign } = await useFetch<CampaignPayload>('/api/cursos/python/campanha')

onMounted(() => {
  progress.hydrate()
  // Se o usuário já está autenticado no momento da montagem, hidrata do backend.
  if (user.value?.id) {
    progress.hydrateFromServer()
  }
})

// Quando o usuário faz login, hidrata do backend.
watch(user, (newUser, oldUser) => {
  if (newUser?.id && !oldUser?.id) {
    progress.hydrateFromServer()
  }
})

watch(() => route.path, () => {
  drawerPlayer.value = false
  drawerGrimorio.value = false
})
</script>
