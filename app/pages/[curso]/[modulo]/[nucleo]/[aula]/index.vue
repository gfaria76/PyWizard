<template>
  <section class="relative w-full min-h-[calc(100vh-80px)] -mt-8 -mx-8 md:-mx-12 rounded-xl border border-primary-fixed/20 shadow-2xl bg-surface-container-lowest p-8 md:p-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-3 text-on-surface-variant font-label-caps text-[11px] mb-6">
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
      <span class="text-primary-fixed">AULA {{ lessonNumber }}</span>
    </div>

    <div v-if="pending" class="glass-panel rounded-xl p-10 text-center text-on-surface-variant animate-pulse">
      <p class="font-label-caps tracking-widest">Carregando atividades...</p>
    </div>

    <div v-else-if="error || !payload" class="glass-panel rounded-xl p-10 text-error text-center">
      <p class="font-label-caps tracking-widest">Aula não encontrada.</p>
    </div>

    <template v-else>
      <header class="mb-10 max-w-3xl">
        <p class="font-label-caps text-primary-fixed tracking-[0.3em] text-xs mb-2">PASSO 5/5 · ATIVIDADE</p>
        <h1 class="font-display-lg text-4xl text-white mb-2">{{ payload.aula.titulo }}</h1>
        <p class="text-on-surface-variant font-body-lg">
          Núcleo {{ nucleoNumber }} · Aula {{ payload.aula.numero }}. Selecione uma atividade.
        </p>
      </header>

      <ul class="space-y-3 max-w-3xl">
        <li v-for="atividade in payload.aula.atividades" :key="atividade.id">
          <NuxtLink
            :to="`/${courseId}/${moduleNumber}/${nucleoNumber}/${lessonNumber}/${slugTail(atividade.slug)}`"
            class="block glass-panel rounded-xl p-5 border hover:-translate-y-0.5 transition-all"
            :class="cardBorder(atividade.subtipo)"
            @click="flow.setActivity(courseId, moduleNumber, lessonNumber, atividade.slug)"
          >
            <div class="flex items-center gap-4">
              <div
                class="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center"
                :class="iconBox(atividade.subtipo)"
              >
                <span class="material-symbols-outlined" :class="iconColor(atividade.subtipo)">
                  {{ icon(atividade.subtipo) }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="font-label-caps text-[10px] tracking-widest uppercase mb-1"
                  :class="labelColor(atividade.subtipo)"
                >
                  {{ subtypeLabel(atividade.subtipo) }}
                  <span v-if="!atividade.obrigatoria" class="ml-2 opacity-60">(opcional)</span>
                </p>
                <h2 class="font-headline-sm text-base text-white">{{ atividade.titulo }}</h2>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>

    <footer class="mt-10">
      <NuxtLink
        :to="`/${courseId}/${moduleNumber}/${nucleoNumber}`"
        class="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl text-on-surface-variant hover:text-primary-fixed transition-colors font-label-caps text-xs"
      >
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        Voltar às aulas
      </NuxtLink>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { CourseLessonPayload } from '~/types/selection'

definePageMeta({ layout: 'student' })

const route = useRoute()
const flow = useSelectionFlow()

flow.hydrate()

const courseId = computed(() => String(route.params.curso ?? '').toLowerCase())
const moduleNumber = computed(() => Number(route.params.modulo))
const nucleoNumber = computed(() => Number(route.params.nucleo))
const lessonNumber = computed(() => Number(route.params.aula))

const { data: payload, pending, error } = await useFetch<CourseLessonPayload>(
  () => `/api/cursos/${courseId.value}/modulos/${moduleNumber.value}/nucleos/${nucleoNumber.value}/aulas/${lessonNumber.value}`,
  { key: () => `lesson-activities:${courseId.value}:${moduleNumber.value}:${nucleoNumber.value}:${lessonNumber.value}` },
)

watch(payload, (p) => {
  if (p) flow.setLesson(courseId.value, moduleNumber.value, p.aula.aula)
}, { immediate: true })

function slugTail(slug: string): string {
  return encodeURIComponent(slug.split('/').pop() ?? slug)
}

function subtypeLabel(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'Conceito',
    aprendiz: 'Trilha Aprendiz',
    aventura: 'Trilha Aventura',
    guardiao: 'Trilha Guardião',
    grupo: 'Expedição da Guilda',
    boss: 'Boss',
    prova: 'Prova',
  }
  return map[subtype] ?? subtype
}

function icon(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'menu_book',
    aprendiz: 'school',
    aventura: 'explore',
    guardiao: 'shield',
    grupo: 'groups',
    boss: 'local_fire_department',
    prova: 'hotel_class',
  }
  return map[subtype] ?? 'extension'
}

function cardBorder(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'border-primary-fixed/30 hover:border-primary-fixed',
    aprendiz: 'border-secondary/30 hover:border-secondary',
    aventura: 'border-primary-container/30 hover:border-primary-container',
    guardiao: 'border-tertiary-fixed-dim/30 hover:border-tertiary-fixed-dim',
    grupo: 'border-primary-fixed/30 hover:border-primary-fixed',
    boss: 'border-error/30 hover:border-error',
    prova: 'border-tertiary-fixed-dim/30 hover:border-tertiary-fixed-dim',
  }
  return map[subtype] ?? 'border-outline-variant/30 hover:border-outline-variant'
}

function iconBox(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'bg-primary-fixed/15 border border-primary-fixed/40',
    aprendiz: 'bg-secondary/15 border border-secondary/40',
    aventura: 'bg-primary-container/15 border border-primary-container/40',
    guardiao: 'bg-tertiary-fixed-dim/15 border border-tertiary-fixed-dim/40',
    grupo: 'bg-primary-fixed/15 border border-primary-fixed/40',
    boss: 'bg-error/15 border border-error/40',
    prova: 'bg-tertiary-fixed-dim/15 border border-tertiary-fixed-dim/40',
  }
  return map[subtype] ?? 'bg-surface-container border border-outline-variant'
}

function iconColor(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'text-primary-fixed',
    aprendiz: 'text-secondary',
    aventura: 'text-primary-container',
    guardiao: 'text-tertiary-fixed-dim',
    grupo: 'text-primary-fixed',
    boss: 'text-error',
    prova: 'text-tertiary-fixed-dim',
  }
  return map[subtype] ?? 'text-on-surface'
}

function labelColor(subtype: string): string {
  return iconColor(subtype)
}
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
