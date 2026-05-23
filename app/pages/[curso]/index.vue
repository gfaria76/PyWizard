<template>
  <section class="relative w-full min-h-[calc(100vh-80px)] -mt-8 -mx-8 md:-mx-12 rounded-xl border border-primary-fixed/20 shadow-2xl bg-surface-container-lowest p-8 md:p-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-3 text-on-surface-variant font-label-caps text-[11px] mb-6">
      <NuxtLink to="/" class="hover:text-primary-fixed transition-colors">
        CURSOS
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <span class="text-primary-fixed">{{ courseId.toUpperCase() }}</span>
    </div>

    <header class="mb-10 max-w-3xl">
      <p class="font-label-caps text-primary-fixed tracking-[0.3em] text-xs mb-2">PASSO 2/5 · MÓDULO</p>
      <h1 class="font-display-lg text-4xl text-white mb-2 uppercase">{{ courseId }}</h1>
      <p class="text-on-surface-variant font-body-lg">
        Escolha um módulo para ver seus núcleos de aprendizado.
      </p>
    </header>

    <div v-if="pending" class="glass-panel rounded-xl p-10 text-center text-on-surface-variant animate-pulse">
      <p class="font-label-caps tracking-widest">Carregando módulos...</p>
    </div>

    <div v-else-if="error || !modulos.length" class="glass-panel rounded-xl p-10 text-error text-center">
      <p class="font-label-caps tracking-widest">Falha ao carregar os módulos deste curso.</p>
    </div>

    <ul v-else class="space-y-4 max-w-3xl">
      <li v-for="modulo in modulos" :key="modulo.numero">
        <NuxtLink
          :to="`/${courseId}/${modulo.numero}`"
          class="block glass-panel rounded-xl p-6 border border-outline-variant/30 hover:border-primary-fixed/60 hover:-translate-y-0.5 transition-all"
          @click="flow.setModule(courseId, modulo.numero)"
        >
          <div class="flex items-start gap-4">
            <div class="shrink-0 w-12 h-12 rounded-lg bg-primary-fixed/15 border border-primary-fixed/40 flex items-center justify-center font-display-lg text-xl text-primary-fixed">
              {{ modulo.numero }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-label-caps text-[10px] tracking-widest text-primary-fixed uppercase mb-1">
                Módulo {{ modulo.numero }}
              </p>
              <h2 class="font-headline-sm text-lg text-white mb-2">{{ modulo.titulo }}</h2>
              <p class="text-sm text-on-surface-variant">
                {{ summarize(modulo) }}
              </p>
            </div>
            <span class="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <footer class="mt-10">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl text-on-surface-variant hover:text-primary-fixed transition-colors font-label-caps text-xs"
      >
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        Voltar aos cursos
      </NuxtLink>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { CourseModulesPayload, CourseModuleSummary } from '~/types/selection'

definePageMeta({ layout: 'student' })

const route = useRoute()
const flow = useSelectionFlow()

flow.hydrate()

const courseId = computed(() => String(route.params.curso ?? '').toLowerCase())

const { data, pending, error } = await useFetch<CourseModulesPayload>(
  () => `/api/cursos/${courseId.value}/modulos`,
  { key: () => `course-modules:${courseId.value}` },
)

const modulos = computed(() => data.value?.modulos ?? [])

watch(courseId, (id) => {
  if (id) flow.setCourse(id)
}, { immediate: true })

function summarize(modulo: CourseModuleSummary): string {
  const nucleos = new Set(modulo.aulas.map(a => a.nucleo))
  const nucleosNormais = Array.from(nucleos).filter(n => n >= 1 && n <= 4).length
  const aulasNormais = modulo.aulas.filter(a => a.nucleo >= 1 && a.nucleo <= 4).length
  const temProva = modulo.aulas.some(a => a.atividades.some(at => at.subtipo === 'prova'))

  const partes: string[] = []
  if (nucleosNormais) partes.push(`${nucleosNormais} núcleos`)
  if (aulasNormais) partes.push(`${aulasNormais} aulas`)
  if (temProva) partes.push('prova final')
  return partes.join(' · ')
}
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
