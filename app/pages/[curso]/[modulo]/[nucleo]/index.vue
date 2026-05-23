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
      <span class="text-primary-fixed">NÚCLEO {{ nucleoNumber }}</span>
    </div>

    <div v-if="pending" class="glass-panel rounded-xl p-10 text-center text-on-surface-variant animate-pulse">
      <p class="font-label-caps tracking-widest">Carregando aulas...</p>
    </div>

    <div v-else-if="error || !modulo || !aulas.length" class="glass-panel rounded-xl p-10 text-error text-center">
      <p class="font-label-caps tracking-widest">Núcleo não encontrado.</p>
    </div>

    <template v-else>
      <header class="mb-10 max-w-3xl">
        <p class="font-label-caps text-secondary tracking-[0.3em] text-xs mb-2">PASSO 4/5 · AULA</p>
        <h1 class="font-display-lg text-4xl text-white mb-2">Núcleo {{ nucleoNumber }}</h1>
        <p class="text-on-surface-variant font-body-lg">
          Módulo {{ modulo.numero }} — {{ modulo.titulo }}. Escolha uma aula para ver suas atividades.
        </p>
      </header>

      <ul class="space-y-4 max-w-3xl">
        <li v-for="aula in aulas" :key="aula.numero">
          <NuxtLink
            :to="`/${courseId}/${moduleNumber}/${nucleoNumber}/${aula.aula}`"
            class="block glass-panel rounded-xl p-6 border border-outline-variant/30 hover:border-primary-fixed/60 hover:-translate-y-0.5 transition-all"
          >
            <div class="flex items-start gap-4">
              <div class="shrink-0 w-12 h-12 rounded-lg bg-primary-fixed/15 border border-primary-fixed/40 flex items-center justify-center font-code-md text-base text-primary-fixed">
                {{ aula.aula }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-label-caps text-[10px] tracking-widest text-primary-fixed uppercase mb-1">
                  Aula {{ aula.numero }}
                </p>
                <h2 class="font-headline-sm text-lg text-white mb-2">{{ aula.titulo }}</h2>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="atividade in aula.atividades"
                    :key="atividade.id"
                    class="inline-block font-label-caps text-[9px] px-2 py-0.5 rounded border tracking-widest uppercase"
                    :class="subtypeBadge(atividade.subtipo)"
                  >
                    {{ subtypeShort(atividade.subtipo) }}
                  </span>
                </div>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>

    <footer class="mt-10">
      <NuxtLink
        :to="`/${courseId}/${moduleNumber}`"
        class="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl text-on-surface-variant hover:text-primary-fixed transition-colors font-label-caps text-xs"
      >
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        Voltar aos núcleos
      </NuxtLink>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { CourseModulesPayload } from '~/types/selection'

definePageMeta({ layout: 'student' })

const route = useRoute()

const courseId = computed(() => String(route.params.curso ?? '').toLowerCase())
const moduleNumber = computed(() => Number(route.params.modulo))
const nucleoNumber = computed(() => Number(route.params.nucleo))

const { data, pending, error } = await useFetch<CourseModulesPayload>(
  () => `/api/cursos/${courseId.value}/modulos`,
  { key: () => `course-modules:${courseId.value}` },
)

const modulo = computed(() => data.value?.modulos.find(m => m.numero === moduleNumber.value) ?? null)

const aulas = computed(() => {
  if (!modulo.value) return []
  return modulo.value.aulas
    .filter(a => a.nucleo === nucleoNumber.value)
    .sort((a, b) => a.aula - b.aula)
})

function subtypeShort(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'Conceito',
    aprendiz: 'Aprendiz',
    aventura: 'Aventura',
    guardiao: 'Guardião',
    grupo: 'Grupo',
    simulado: 'Labirinto',
    boss: 'Boss',
    prova: 'Prova',
  }
  return map[subtype] ?? subtype
}

function subtypeBadge(subtype: string): string {
  const map: Record<string, string> = {
    conceito: 'border-primary-fixed text-primary-fixed bg-primary-fixed/10',
    aprendiz: 'border-secondary text-secondary bg-secondary/10',
    aventura: 'border-primary-container text-primary-container bg-primary-container/10',
    guardiao: 'border-tertiary-fixed-dim text-tertiary-fixed-dim bg-tertiary-fixed-dim/10',
    grupo: 'border-primary-fixed text-primary-fixed bg-primary-fixed/10',
    boss: 'border-error text-error bg-error/10',
    prova: 'border-tertiary-fixed-dim text-tertiary-fixed-dim bg-tertiary-fixed-dim/10',
  }
  return map[subtype] ?? 'border-outline-variant text-on-surface-variant'
}
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
