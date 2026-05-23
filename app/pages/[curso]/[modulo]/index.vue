<template>
  <section class="relative w-full min-h-[calc(100vh-80px)] -mt-8 -mx-8 md:-mx-12 rounded-xl border border-primary-fixed/20 shadow-2xl bg-surface-container-lowest p-8 md:p-12">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-3 text-on-surface-variant font-label-caps text-[11px] mb-6">
      <NuxtLink to="/" class="hover:text-primary-fixed transition-colors">
        CURSOS
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <NuxtLink :to="`/${courseId}`" class="hover:text-primary-fixed transition-colors">
        {{ courseId.toUpperCase() }}
      </NuxtLink>
      <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      <span class="text-primary-fixed">MÓDULO {{ moduleNumber }}</span>
    </div>

    <div v-if="pending" class="glass-panel rounded-xl p-10 text-center text-on-surface-variant animate-pulse">
      <p class="font-label-caps tracking-widest">Carregando núcleos...</p>
    </div>

    <div v-else-if="error || !modulo" class="glass-panel rounded-xl p-10 text-error text-center">
      <p class="font-label-caps tracking-widest">Módulo não encontrado.</p>
    </div>

    <template v-else>
      <header class="mb-10 max-w-3xl">
        <p class="font-label-caps text-primary-fixed tracking-[0.3em] text-xs mb-2">PASSO 3/5 · NÚCLEO</p>
        <h1 class="font-display-lg text-4xl text-white mb-2">Módulo {{ modulo.numero }} — {{ modulo.titulo }}</h1>
        <p class="text-on-surface-variant font-body-lg">
          Escolha um núcleo para ver suas aulas.
        </p>
      </header>

      <ul class="space-y-4 max-w-3xl">
        <li v-for="nucleo in nucleos" :key="nucleo.numero">
          <NuxtLink
            :to="`/${courseId}/${moduleNumber}/${nucleo.numero}`"
            class="block glass-panel rounded-xl p-6 border border-outline-variant/30 hover:border-primary-fixed/60 hover:-translate-y-0.5 transition-all"
          >
            <div class="flex items-start gap-4">
              <div class="shrink-0 w-12 h-12 rounded-lg bg-secondary/15 border border-secondary/40 flex items-center justify-center font-display-lg text-xl text-secondary">
                {{ nucleo.numero }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-label-caps text-[10px] tracking-widest text-secondary uppercase mb-1">
                  Núcleo {{ nucleo.numero }}
                </p>
                <h2 class="font-headline-sm text-lg text-white mb-2">{{ nucleo.titulo }}</h2>
                <p class="text-sm text-on-surface-variant">
                  {{ nucleo.aulas.length }} aulas
                </p>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
            </div>
          </NuxtLink>
        </li>

        <!-- Prova final do módulo (item separado) -->
        <li v-if="prova">
          <NuxtLink
            :to="`/${courseId}/${moduleNumber}/${prova.nucleo}/${prova.aula}/${activitySlugTail(prova)}`"
            class="block glass-panel rounded-xl p-6 border border-tertiary-fixed-dim/40 hover:border-tertiary-fixed-dim hover:-translate-y-0.5 transition-all"
          >
            <div class="flex items-start gap-4">
              <div class="shrink-0 w-12 h-12 rounded-lg bg-tertiary-fixed-dim/15 border border-tertiary-fixed-dim/40 flex items-center justify-center">
                <span class="material-symbols-outlined text-tertiary-fixed-dim">hotel_class</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-label-caps text-[10px] tracking-widest text-tertiary-fixed-dim uppercase mb-1">
                  Prova Final
                </p>
                <h2 class="font-headline-sm text-lg text-white mb-2">{{ prova.titulo }}</h2>
                <p class="text-sm text-on-surface-variant">Avaliação somativa do módulo.</p>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant shrink-0">chevron_right</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>

    <footer class="mt-10">
      <NuxtLink
        :to="`/${courseId}`"
        class="inline-flex items-center gap-2 px-5 py-3 glass-panel rounded-xl text-on-surface-variant hover:text-primary-fixed transition-colors font-label-caps text-xs"
      >
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        Voltar aos módulos
      </NuxtLink>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { CourseModulesPayload, CourseLessonSummary } from '~/types/selection'

definePageMeta({ layout: 'student' })

const route = useRoute()
const flow = useSelectionFlow()

flow.hydrate()

const courseId = computed(() => String(route.params.curso ?? '').toLowerCase())
const moduleNumber = computed(() => Number(route.params.modulo))

const { data, pending, error } = await useFetch<CourseModulesPayload>(
  () => `/api/cursos/${courseId.value}/modulos`,
  { key: () => `course-modules:${courseId.value}` },
)

const modulo = computed(() => data.value?.modulos.find(m => m.numero === moduleNumber.value) ?? null)

watch(modulo, (m) => {
  if (m) flow.setModule(courseId.value, m.numero)
}, { immediate: true })

const aulasNormais = computed(() => modulo.value?.aulas.filter(a => a.nucleo >= 1 && a.nucleo <= 4) ?? [])

const nucleos = computed(() => {
  const groups = new Map<number, CourseLessonSummary[]>()
  for (const aula of aulasNormais.value) {
    if (!groups.has(aula.nucleo)) groups.set(aula.nucleo, [])
    groups.get(aula.nucleo)!.push(aula)
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a - b)
    .map(([numero, aulas]) => ({
      numero,
      titulo: nucleoTitulo(numero, aulas),
      aulas,
    }))
})

const prova = computed<CourseLessonSummary | null>(() => {
  if (!modulo.value) return null
  return modulo.value.aulas.find(a => a.atividades.some(at => at.subtipo === 'prova')) ?? null
})

function nucleoTitulo(numero: number, aulas: CourseLessonSummary[]): string {
  if (!aulas.length) return `Núcleo ${numero}`
  const primeiroTitulo = aulas[0]!.titulo
  if (aulas.length === 1) return primeiroTitulo
  const ultimo = aulas[aulas.length - 1]!
  return `${primeiroTitulo} → ${ultimo.titulo}`
}

function activitySlugTail(aula: CourseLessonSummary): string {
  const atividade = aula.atividades[0]
  if (!atividade) return ''
  const tail = atividade.slug.split('/').pop() ?? atividade.slug
  return encodeURIComponent(tail)
}
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.15);
}
</style>
