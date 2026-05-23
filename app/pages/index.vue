<template>
  <div class="relative z-10 max-w-[1200px] mx-auto pt-8 pb-32">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <p class="font-label-caps text-primary-fixed mb-2 tracking-[0.3em]">NAVIGATIONAL INTERFACE v1.0</p>
      <h1 class="font-display-lg text-4xl md:text-5xl text-primary uppercase">O Grande Arquivo dos Multiversos</h1>
      <p class="font-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">
        Bem-vindo, Viajante. Selecione um aglomerado cósmico para iniciar sua sincronização arcana. Cada galáxia representa um plano único de maestria lógica.
      </p>
      <p class="font-label-caps text-on-surface-variant mt-3 text-xs tracking-[0.2em]" id="flow-status">
        PASSO 1/3 · SELECIONE O SEU CURSO
      </p>
    </div>

    <!-- Continue Journey -->
    <div v-if="lastCourse" class="mb-12">
      <div class="glass-panel p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-primary-fixed shadow-[0_0_20px_rgba(0,251,251,0.15)]">
        <div>
          <p class="font-label-caps text-on-surface-variant text-[11px] mb-1">CONTINUAR JORNADA</p>
          <h2 class="font-headline-sm text-2xl text-primary">{{ lastCourse.nome }}</h2>
        </div>
        <button
          class="px-6 py-3 bg-primary-fixed text-on-primary-fixed font-label-caps rounded-xl hover:shadow-[0_0_20px_rgba(0,251,251,0.5)] transition-all uppercase"
          @click="continueLastCourse"
        >
          Retornar ao Espaço
        </button>
      </div>
    </div>

    <div v-if="pending" class="glass-panel rounded-2xl p-12 text-center text-on-surface-variant animate-pulse">
      <span class="material-symbols-outlined text-4xl mb-4 text-primary-fixed animate-spin">sync</span>
      <p class="font-label-caps tracking-widest">MAPEANDO SETORES...</p>
    </div>

    <div v-else-if="error" class="glass-panel rounded-2xl p-12 border-error text-error text-center">
      Falha ao carregar os setores cósmicos. Por favor, consulte o Oráculo.
    </div>

    <!-- Galaxy Map Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mt-16">
      <div
        v-for="curso in courses"
        :key="curso.id"
        class="group relative flex flex-col items-center p-8 glass-panel rounded-2xl transition-all duration-500 hover:-translate-y-2 course-card"
        :class="[
          curso.status === 'available' ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed',
          `hover:border-${getVisuals(curso.id).theme}`
        ]"
        @click="curso.status === 'available' ? startCourse(curso.id) : null"
      >
        <div class="absolute -top-12 flex flex-col items-center">
          <div class="relative w-40 h-40 flex items-center justify-center">
            <div
              class="absolute inset-0 opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
              :class="getVisuals(curso.id).bgClass"
            ></div>
            <img
              class="w-24 h-24 nebula-glow transition-transform group-hover:scale-110 object-cover rounded-full"
              :class="`text-${getVisuals(curso.id).theme}`"
              :src="getVisuals(curso.id).image"
              alt="Course Galaxy"
            />
          </div>
        </div>

        <div class="mt-28 text-center w-full flex flex-col h-full">
          <h3 class="font-headline-sm text-primary mb-2 uppercase">{{ curso.nome }}</h3>

          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="flex-1 w-32 h-1 bg-surface-container rounded-full overflow-hidden">
              <div
                class="h-full"
                :class="`bg-${getVisuals(curso.id).theme}`"
                style="width: 45%;"
              ></div>
            </div>
            <span class="font-code-md" :class="`text-${getVisuals(curso.id).theme}`">45%</span>
          </div>

          <p class="text-on-surface-variant text-sm mb-6 flex-grow">
            {{ curso.descricao }}
          </p>

          <button
            class="w-full py-3 font-label-caps rounded-xl transition-all uppercase course-cta mt-auto"
            :class="curso.status === 'available'
              ? `bg-${getVisuals(curso.id).theme} text-on-${getVisuals(curso.id).theme} hover:shadow-[0_0_20px_var(--color-${getVisuals(curso.id).theme})] cursor-pointer`
              : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'"
            :disabled="curso.status !== 'available'"
          >
            {{ curso.status === 'available' ? 'Entrar na Galáxia' : 'Bloqueado' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseCatalogEntry } from '~/types/selection'

definePageMeta({ layout: 'student' })

const router = useRouter()
const flow = useSelectionFlow()

flow.hydrate()

const { data, pending, error } = await useFetch<CourseCatalogEntry[]>('/api/cursos/catalogo')

const courses = computed(() => data.value ?? [])
const lastCourse = computed(() => {
  const lastCourseId = flow.state.value.lastCourseId
  if (!lastCourseId) {
    return null
  }
  return courses.value.find(curso => curso.id === lastCourseId) ?? null
})

function startCourse(courseId: string) {
  flow.setCourse(courseId)
  router.push(`/${courseId}`)
}

function continueLastCourse() {
  if (!lastCourse.value) {
    return
  }
  startCourse(lastCourse.value.id)
}

function getVisuals(courseId: string) {
  const visuals: Record<string, any> = {
    java: {
      theme: 'primary-container',
      bgClass: 'bg-primary-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoQWXADqYG1VvFq9YQfi5iYk3cyBQgNTdMflwoKmcu5HOlijJJIPvWb0goL7nqTAVW3R4AKqq-r1sM5J6pB3VatPgHHuW2og3FepjJdBLqsk3Z7AyoNDCrxYLIC-KyVhWtB8BOJxljBbHBJ8ObNgFV4RQm74f-xTgT94BvfACXGnlgPVeqAOVEL2ozIy2p4odj4GzIRoS6cuPiNvFzZmZGohwhkK8-Z-T67KJdLSfPicAJpnqILzdUjzC9BQgXcMVSD0VHR8cI29R_'
    },
    python: {
      theme: 'secondary',
      bgClass: 'bg-secondary-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgNwbmpyvbSlak2eRJXOcN0_GQ_nvssNAi1XE9kp0hJ_LuCF7e2XxlSdFNCw_CrMYx-7dQ6sxbiJpYnHA__H13garNFmh0-dIatCoKfV9fmuHtZKYlK9Cu7ZNcwokzL8ldvBSW2kns_2xgIdpPjQ-vbjbH6uKoRXyrdcC6v0SYAPWHQcs1QnsGWmRVq819GpkTzk_kK_cKTAZkk3qGzl_aUUe6d_xJZc9XwGRIGMLtC5WYSDWUKuwLjdp2P4R-fAILEVa5kNF8gADM'
    },
    sql: {
      theme: 'tertiary-fixed',
      bgClass: 'bg-tertiary-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyUQbi0WO01XnSJPYdVm48zvu8b4sGwqpFX8DtlQ2lM4JL27UjzWmXErOBDkhnFM24FxtkjdpvRz2mjMNsk12huc9L-JwKBObsJOubvw0nDPHZujOxnnaeA-IkXqm0jlU53IoIXoHhL0Rd_2YzJOeQZDszsy1NlGGCKFsEBGYe6HjMKqY27Wlc6uhSwSGGSf0fB8-eQfgEz0jRY6lOx30nJJmoJ5lw0OaSdVB-PvWZ1d57ZkhpSSGnmOwL5uwGUWh_529ZZ4zSzEK4'
    },
    vue: {
      theme: 'primary-fixed-dim',
      bgClass: 'bg-primary-fixed-dim',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVOteIcbdmVaIAZ3EuLt8oyxP3YDYX658mft8K3kWGY3UY1GxVt152d8NDoEvXiRcI9yf9UJHIBrqzGI04KLMX97OefWgk-BggnlQP8zZ-NDir1Nmh1LkbJoz4Qrzdhfl9a_qrtPFU-Dw3Fz1FOq39xXjBbPTddfk4Y73g_CCKj9hHTuxOlbbYpmZxq7OZUhJYSmRggn2GP-3QIuYhjfd9ET8CRgJgvvbS-cjNvy4pBXZEZKCsxgwTyWeC7yW97qXy5DWUxiEAn_F6'
    },
    springboot: {
      theme: 'error',
      bgClass: 'bg-error-container',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDOT4ShBNHg_3k51I_CfutBFocRiB7Y6G4YiACDwJ-KSas2LsPvapwPoBIHESysfmHWiazll8VJBjmPN-rM5uk7ytSPjyHxTxDmsSZzD_xA9zGgVfrCPJiLblo_oqcfLT6x7F_mrynEIMhivQe8r9Wl74dO08IueozXZurb4TP__SrI5VbUz1T3govmsFwdRdRU7EYJTTUDhUwP7h_svKgBjO7SXKD73PxTLdBmFNMtVh9H_N84QvxLfUV4xQYsMWjdCHQicyDvTU7'
    },
    php: {
      theme: 'secondary-fixed-dim',
      bgClass: 'bg-on-secondary-fixed-variant',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3WCtwxcaA_8VVNWb70O3LeFTidlojnTYf18ouSK1jpH510dXSob4wpNFQNkagg5Fihh3Srv3rNAV4RlLPVM2yVvEQUMXogbl9W83on1qNdIjN6_RhQvubVQTlrjb8QAsa46vXenrCQc9akOp3Qh9uIJtPI_Em2ogGNPyMUaB7sGaWWnYEiPi9R8cLMtWIwwK6clUIywF78jpxM5GL3Wm7jJ9VSP-khRFdXc7U7RFWZ1TsaEQec7l56l_9OsywTByFaCCs9JfNzGIK'
    }
  }

  return visuals[courseId.toLowerCase()] ?? {
    theme: 'primary-container',
    bgClass: 'bg-primary-container',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoQWXADqYG1VvFq9YQfi5iYk3cyBQgNTdMflwoKmcu5HOlijJJIPvWb0goL7nqTAVW3R4AKqq-r1sM5J6pB3VatPgHHuW2og3FepjJdBLqsk3Z7AyoNDCrxYLIC-KyVhWtB8BOJxljBbHBJ8ObNgFV4RQm74f-xTgT94BvfACXGnlgPVeqAOVEL2ozIy2p4odj4GzIRoS6cuPiNvFzZmZGohwhkK8-Z-T67KJdLSfPicAJpnqILzdUjzC9BQgXcMVSD0VHR8cI29R_'
  }
}
</script>

<style scoped>
.glass-panel {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 251, 251, 0.2);
}
.course-card[data-selected="true"] {
  border-color: rgba(0, 251, 251, 0.95);
  box-shadow: 0 0 32px rgba(0, 251, 251, 0.25);
  transform: translateY(-8px);
}
.nebula-glow {
  filter: drop-shadow(0 0 15px currentColor);
}
</style>