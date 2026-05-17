<template>
  <div class="p-8 max-w-[1200px] mx-auto" :class="$route.path.startsWith('/python/') ? 'pt-20' : 'pt-8'">
    <definePageMeta layout="student" />

    <!-- Page Header -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-2">
        <span class="material-symbols-outlined text-primary-container text-3xl">map</span>
        <h1 class="font-display-lg text-display-lg text-primary-container tracking-tight">Trilha</h1>
      </div>
      <p class="font-body-lg text-on-surface-variant">
        Selecione seu próximo desafio na trilha <span class="text-primary-container font-bold">Python Arcane</span> — Módulo {{ modulo?.modulo }}.
      </p>
    </div>

    <!-- Quest Timeline -->
    <div class="space-y-4">
      <div
        v-for="aula in modulo?.aulas"
        :key="aula.arquivo"
        class="group cursor-pointer transition-all"
        @click="goToArena(aula)"
      >
        <div
          class="glass-panel p-6 rounded-xl border transition-all"
          :class="getCardClass(aula)"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-4 flex-1">
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white flex-shrink-0 transition-transform group-hover:scale-110"
                :class="getIconBgClass(aula.subtipo)"
              >
                <span class="material-symbols-outlined text-xl">{{ getIcon(aula.subtipo) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-body-md font-bold text-on-background truncate">{{ aula.titulo }}</div>
                <div class="text-label-caps text-on-surface-variant">{{ getTypeLabel(aula.subtipo) }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-4 flex-shrink-0">
              <span v-if="getQuestState(aula) === 'completed'" class="material-symbols-outlined fill text-primary-container">check_circle</span>
              <span v-else-if="getQuestState(aula) === 'active'" class="material-symbols-outlined animate-pulse text-secondary">radio_button_checked</span>
              <span v-else class="material-symbols-outlined text-on-surface-variant">radio_button_unchecked</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Module Navigation -->
    <div class="mt-12 flex gap-4 justify-center">
      <button
        v-for="m in [1, 2, 3]"
        :key="m"
        class="px-6 py-3 rounded-lg border font-label-caps text-label-caps transition-all"
        :class="m === currentModulo
          ? 'bg-primary-container/20 border-primary-container text-primary-container shadow-[0_0_15px_rgba(0,251,251,0.2)]'
          : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60'"
        @click="switchModulo(m)"
      >
        Módulo {{ m }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CampaignPayload, ModuleQuest } from '~/types/course'

definePageMeta({ layout: 'student' })

const router = useRouter()
const progress = useProgressStore()
const currentModulo = ref(1)

const { data: campaign } = await useFetch<CampaignPayload>(
  () => `/api/cursos/python/campanha?modulo=${currentModulo.value}`
)

const modulo = computed(() => campaign.value?.modulo)

function switchModulo(m: number) {
  currentModulo.value = m
}

function goToArena(aula: ModuleQuest) {
  const slug = aula.arquivo.replace('.json', '')
  router.push(`/python/arena/${slug}`)
}

function getQuestState(aula: ModuleQuest): 'completed' | 'active' | 'locked' {
  const slug = aula.arquivo.replace('.json', '')
  if (progress.isCompleted(slug)) return 'completed'
  if (progress.getActiveQuestSlug(modulo.value?.aulas || []) === slug) return 'active'
  return 'locked'
}

function getCardClass(aula: ModuleQuest): string {
  const state = getQuestState(aula)
  const subtipo = aula.subtipo

  if (subtipo === 'boss') {
    return 'border-error/50 shadow-[0_0_20px_rgba(255,180,171,0.15)] bg-error/5'
  }
  if (subtipo === 'prova') {
    return 'border-tertiary-fixed-dim/50 bg-tertiary-fixed-dim/5'
  }
  if (subtipo === 'guardiao') {
    return 'border-secondary/50 bg-secondary/5'
  }
  if (state === 'completed') {
    return 'border-primary-container/50 bg-primary-container/5'
  }
  if (state === 'active') {
    return 'border-primary-container shadow-[0_0_15px_rgba(0,251,251,0.3)]'
  }
  return 'border-outline-variant/30 opacity-70'
}

function getIconBgClass(subtipo?: string): string {
  switch (subtipo) {
    case 'conceito': return 'bg-tertiary-fixed-dim/60'
    case 'aprendiz': return 'bg-secondary/60'
    case 'aventura': return 'bg-primary-container/60'
    case 'guardiao': return 'bg-tertiary-container/60'
    case 'boss': return 'bg-error/60'
    case 'prova': return 'bg-error-container/60'
    case 'grupo': return 'bg-secondary-container/60'
    default: return 'bg-outline/60'
  }
}

function getIcon(subtipo?: string): string {
  switch (subtipo) {
    case 'conceito': return 'lightbulb'
    case 'aprendiz': return 'school'
    case 'aventura': return 'landscape'
    case 'guardiao': return 'shield'
    case 'boss': return 'dragon'
    case 'prova': return 'quiz'
    case 'grupo': return 'group'
    default: return 'help'
  }
}

function getTypeLabel(subtipo?: string): string {
  switch (subtipo) {
    case 'conceito': return 'Conceito'
    case 'aprendiz': return 'Aprendiz'
    case 'aventura': return 'Aventura'
    case 'guardiao': return 'Guardião'
    case 'boss': return 'Boss'
    case 'prova': return 'Prova'
    case 'grupo': return 'Guilda'
    default: return 'Desafio'
  }
}
</script>
