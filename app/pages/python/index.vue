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
    <div class="space-y-3">
      <QuestCard
        v-for="aula in modulo?.aulas"
        :key="aula.arquivo"
        :aula="{ titulo: aula.titulo, subtipo: aula.subtipo }"
        :state="getQuestState(aula)"
        @open="goToArena(aula)"
      />
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
</script>
