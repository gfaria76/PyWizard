<template>
  <section class="relative w-full min-h-[calc(100vh-80px)] -mt-8 -mx-8 md:-mx-12 rounded-xl border border-primary-fixed/20 shadow-2xl bg-surface-container-lowest p-8 md:p-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-3 text-on-surface-variant font-label-caps text-[11px] mb-6 flex-wrap">
      <NuxtLink to="/" class="hover:text-primary-fixed transition-colors">CURSOS</NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <NuxtLink :to="`/${courseId}`" class="hover:text-primary-fixed transition-colors">
        {{ courseId.toUpperCase() }}
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <NuxtLink :to="`/${courseId}/${moduleNumber}`" class="hover:text-primary-fixed transition-colors">
        MÓDULO {{ moduleNumber }}
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <NuxtLink :to="`/${courseId}/${moduleNumber}/${nucleoNumber}`" class="hover:text-primary-fixed transition-colors">
        NÚCLEO {{ nucleoNumber }}
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <NuxtLink :to="`/${courseId}/${moduleNumber}/${nucleoNumber}/${lessonNumber}`" class="hover:text-primary-fixed transition-colors">
        AULA {{ lessonNumber }}
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <span class="text-primary-fixed">{{ subtypeLabel.toUpperCase() }}</span>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex items-center justify-center h-96 text-primary-fixed animate-pulse">
      <p class="font-label-caps tracking-widest text-xl">CARREGANDO ATIVIDADE...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error || !lesson" class="flex items-center justify-center h-96 text-error">
      <div class="glass-panel p-8 text-center rounded-xl max-w-md">
        <p class="font-label-caps tracking-widest text-lg">ATIVIDADE NÃO ENCONTRADA</p>
        <p class="text-sm mt-2 opacity-80">Não foi possível carregar o conteúdo desta atividade.</p>
        <p class="text-xs mt-3 font-code-md opacity-60">slug: {{ activitySlug }}</p>
        <NuxtLink
          :to="`/${courseId}/${moduleNumber}/${nucleoNumber}/${lessonNumber}`"
          class="inline-block mt-6 px-4 py-2 bg-primary-fixed text-on-primary-fixed rounded-lg font-label-caps text-xs"
        >
          Voltar à aula
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <article v-else class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-10">
        <div class="flex items-center gap-3 mb-3">
          <span
            class="inline-block font-label-caps text-[10px] px-3 py-1 rounded border tracking-widest"
            :class="subtypeBadgeClass"
          >
            {{ subtypeLabel }}
          </span>
          <span v-if="lesson.duracao" class="text-on-surface-variant text-xs font-code-md">
            ⏱ {{ lesson.duracao }}
          </span>
        </div>
        <h1 class="font-display-lg text-4xl text-white mb-2">{{ lesson.titulo }}</h1>
        <p v-if="lesson.subtitulo" class="font-body-lg text-on-surface-variant">{{ lesson.subtitulo }}</p>
        <p v-if="lesson.objetivo" class="mt-4 text-sm text-on-surface-variant italic border-l-2 border-primary-fixed/40 pl-4">
          {{ lesson.objetivo }}
        </p>
      </header>

      <!-- View especializada por subtipo -->
      <component
        :is="aulaView"
        v-if="aulaView"
        :lesson="lesson"
        :slug="fullSlug"
      />
      <div v-else class="glass-panel p-6 rounded-xl text-on-surface-variant">
        <p class="font-label-caps text-xs tracking-widest text-error mb-2">SUBTIPO DESCONHECIDO</p>
        <p class="text-sm">Não há renderização específica para o subtipo <code class="font-code-md">{{ lesson.subtipo }}</code>.</p>
      </div>

      <!-- Footer Nav -->
      <footer class="mt-12 flex items-center justify-between gap-4">
        <NuxtLink
          :to="`/${courseId}/${moduleNumber}/${nucleoNumber}/${lessonNumber}`"
          class="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl text-on-surface-variant hover:text-primary-fixed transition-colors font-label-caps text-xs"
        >
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          Voltar à aula
        </NuxtLink>
        <div class="text-on-surface-variant text-xs font-code-md opacity-60">
          {{ lesson.id }}
        </div>
      </footer>
    </article>
  </section>
</template>

<script setup lang="ts">
import type { Lesson, LessonSubtype } from '~/types/course'
import type { Component } from 'vue'
import ConceitoView from '~/components/aula/ConceitoView.vue'
import AprendizView from '~/components/aula/AprendizView.vue'
import AventuraView from '~/components/aula/AventuraView.vue'
import GuardiaoView from '~/components/aula/GuardiaoView.vue'
import GrupoView from '~/components/aula/GrupoView.vue'
import BossView from '~/components/aula/BossView.vue'
import ProvaView from '~/components/aula/ProvaView.vue'

definePageMeta({ layout: 'student' })

const route = useRoute()
const flow = useSelectionFlow()

flow.hydrate()

const courseId = computed(() => String(route.params.curso ?? '').toLowerCase())
const moduleNumber = computed(() => Number(route.params.modulo))
const nucleoNumber = computed(() => Number(route.params.nucleo))
const lessonNumber = computed(() => Number(route.params.aula))
const activitySlug = computed(() => String(route.params.atividade ?? ''))

const fullSlug = computed(() => `modulo${moduleNumber.value}/${activitySlug.value}`)

const { data: lesson, pending, error } = await useFetch<Lesson>(
  () => `/api/cursos/${courseId.value}/aulas/${fullSlug.value}`,
  { key: () => `activity:${courseId.value}:${fullSlug.value}` },
)

watch(activitySlug, (slug) => {
  if (slug) {
    flow.setActivity(courseId.value, moduleNumber.value, lessonNumber.value, `modulo${moduleNumber.value}/${slug}`)
  }
}, { immediate: true })

const subtypeLabel = computed(() => {
  const map: Record<string, string> = {
    conceito: 'Conceito',
    aprendiz: 'Trilha Aprendiz',
    aventura: 'Trilha Aventura',
    guardiao: 'Trilha Guardião',
    grupo: 'Expedição da Guilda',
    boss: 'Boss',
    prova: 'Prova',
  }
  return map[lesson.value?.subtipo ?? ''] ?? lesson.value?.subtipo ?? 'Atividade'
})

const subtypeBadgeClass = computed(() => {
  const map: Record<string, string> = {
    conceito: 'border-primary-fixed text-primary-fixed bg-primary-fixed/10',
    aprendiz: 'border-secondary text-secondary bg-secondary/10',
    aventura: 'border-primary-container text-primary-container bg-primary-container/10',
    guardiao: 'border-tertiary-fixed-dim text-tertiary-fixed-dim bg-tertiary-fixed-dim/10',
    boss: 'border-error text-error bg-error/10',
    prova: 'border-tertiary-fixed-dim text-tertiary-fixed-dim bg-tertiary-fixed-dim/10',
  }
  return map[lesson.value?.subtipo ?? ''] ?? 'border-outline-variant text-on-surface-variant'
})

const aulaView = computed<Component | null>(() => {
  const map: Partial<Record<LessonSubtype, Component>> = {
    conceito: ConceitoView,
    aprendiz: AprendizView,
    aventura: AventuraView,
    guardiao: GuardiaoView,
    grupo: GrupoView,
    boss: BossView,
    prova: ProvaView,
  }
  const subtipo = lesson.value?.subtipo
  return subtipo ? (map[subtipo] ?? null) : null
})
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
