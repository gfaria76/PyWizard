<template>
  <!-- Aprendiz Layout: Fixed Sidebar + Editor -->
  <div v-if="isAprendiz" class="flex h-screen overflow-hidden bg-background">
    <!-- Challenge Sidebar -->
    <aside class="w-80 bg-surface-container/90 backdrop-blur-md border-r border-secondary-container/30 shadow-xl flex flex-col overflow-y-auto pt-6 px-6 pb-6">
      <div class="mb-6">
        <h2 class="font-headline-sm text-headline-sm text-secondary mb-1">{{ lesson?.titulo }}</h2>
        <p class="font-label-caps text-label-caps text-on-surface-variant">{{ getTypeLabel(lesson?.subtipo) }}</p>
      </div>

      <!-- Challenge Info -->
      <div v-if="lesson?.rpg" class="space-y-6 flex-1">
        <div class="bg-surface-container/80 border border-primary-container/20 rounded-xl p-4 shadow-[inset_0_0_10px_rgba(0,251,251,0.1)]">
          <h3 class="font-headline-sm text-headline-sm text-primary-container mb-3">Runa: {{ lesson.rpg.runa_titulo || 'Desafio' }}</h3>
          <div class="space-y-3">
            <div v-if="lesson.rpg.xp_reward" class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary-fixed-dim">stars</span>
              <span class="font-label-caps text-label-caps">Reward: {{ lesson.rpg.xp_reward }} XP</span>
            </div>
            <div v-if="lesson?.objetivo">
              <h4 class="font-label-caps text-label-caps text-on-surface-variant mb-2">Objective</h4>
              <p class="font-body-md text-body-md text-on-surface text-sm">{{ lesson.objetivo }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Test Cases Placeholder -->
      <div v-if="missions.length" class="space-y-3 mt-auto pt-6 border-t border-outline-variant/30">
        <h4 class="font-label-caps text-label-caps text-primary-container">Test Cases</h4>
        <div class="bg-surface-container-highest rounded-lg p-3 border border-outline-variant/50 text-sm">
          <div class="font-label-caps text-label-caps text-on-surface-variant">{{ missions.length }} test{{ missions.length !== 1 ? 's' : '' }}</div>
        </div>
      </div>
    </aside>

    <!-- Editor Area -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- TopAppBar -->
      <header class="h-16 border-b border-primary-container/20 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-8 z-30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <span class="font-headline-md text-headline-md font-bold text-primary-container drop-shadow-[0_0_10px_rgba(0,251,251,0.6)]">Arena</span>
        <div class="flex gap-4">
          <button class="text-on-surface-variant hover:text-primary-container transition-colors">
            <span class="material-symbols-outlined">bolt</span>
          </button>
          <button class="text-on-surface-variant hover:text-primary-container transition-colors">
            <span class="material-symbols-outlined">auto_fix_high</span>
          </button>
        </div>
      </header>

      <!-- Editor + Console -->
      <div class="flex-1 flex flex-col gap-4 p-6 overflow-auto">
        <CodeEditor
          :lesson="lesson"
          :test-cases="missions"
          :submission-meta="{ questSlug: slugPath ?? '', tipoAula: lesson?.tipo ?? 'Aula' }"
          @output="consoleOutput = $event"
        />
      </div>
    </main>
  </div>

  <!-- Aventura/Guardião/Boss/Prova Layout: Grid 4+8 cols with Editor -->
  <div v-else-if="isEditorLayout" class="space-y-6 p-8 max-w-[1400px] mx-auto">
    <!-- Back Button -->
    <NuxtLink to="/python" class="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
      <span class="material-symbols-outlined">arrow_back</span>
      <span class="font-body-md">Return to Trail</span>
    </NuxtLink>

    <!-- Main Grid: Aside (4 cols) + Section (8 cols) -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Left Side: Problem Description -->
      <aside class="col-span-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <!-- Problem Card -->
        <div class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
          <h2 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined">challenge</span>
            {{ lesson?.titulo }}
          </h2>

          <div v-if="lesson?.rpg" class="space-y-4">
            <div v-if="lesson.rpg.runa_titulo" class="bg-surface-dim/80 border border-primary-container/20 rounded-lg p-4 shadow-[inset_0_0_10px_rgba(0,251,251,0.1)]">
              <h3 class="font-label-caps text-label-caps text-primary-container mb-2">Runa</h3>
              <div class="font-body-md text-on-surface">{{ lesson.rpg.runa_titulo }}</div>
            </div>

            <div v-if="lesson.rpg.xp_reward" class="flex items-center gap-2 p-3 bg-tertiary-fixed-dim/5 rounded-lg border border-tertiary-fixed-dim/20">
              <span class="material-symbols-outlined text-tertiary-fixed-dim">stars</span>
              <span class="font-label-caps text-label-caps text-tertiary-fixed-dim">{{ lesson.rpg.xp_reward }} XP</span>
            </div>

            <div v-if="lesson.rpg.enemy_name" class="bg-error/5 border border-error/20 rounded-lg p-4">
              <h4 class="font-label-caps text-label-caps text-error mb-2">Enemy</h4>
              <div class="font-body-md text-on-surface mb-3">{{ lesson.rpg.enemy_name }}</div>
              <div class="space-y-2">
                <div class="text-label-caps text-[12px] text-on-surface-variant">HP {{ lesson.rpg.enemy_hp }}</div>
                <div class="w-full h-2 bg-surface-container-high rounded overflow-hidden border border-outline-variant/30">
                  <div class="h-full bg-gradient-to-r from-error-container to-error" :style="{ width: '100%' }" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="lesson?.objetivo" class="mt-4 p-4 bg-primary-container/5 border border-primary-container/20 rounded-lg">
            <h4 class="font-label-caps text-label-caps text-primary-container mb-2">Objective</h4>
            <div class="font-body-md text-on-surface text-sm">{{ lesson.objetivo }}</div>
          </div>
        </div>

        <!-- Test Cases -->
        <div v-if="missions.length" class="bg-surface-container/80 backdrop-blur-xl border border-secondary-container/30 rounded-xl p-6">
          <h3 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined">check_circle</span>
            Test Cases ({{ missions.length }})
          </h3>
          <div class="space-y-3">
            <div v-for="(mission, i) in missions" :key="i" class="bg-surface-container-highest/50 p-3 rounded-lg border border-outline-variant/30">
              <div class="font-label-caps text-label-caps text-on-surface-variant mb-1">Test {{ i + 1 }}: {{ mission.titulo }}</div>
              <div class="font-body-md text-on-surface/80 text-sm">{{ mission.texto_md }}</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Side: Editor + Console -->
      <section class="col-span-8 max-h-[calc(100vh-200px)]">
        <CodeEditor
          :lesson="lesson"
          :test-cases="missions"
          :submission-meta="{ questSlug: slugPath ?? '', tipoAula: lesson?.tipo ?? 'Aula' }"
          @output="consoleOutput = $event"
        />
      </section>
    </div>
  </div>

  <!-- Conceito Layout: Full-width Content -->
  <div v-else class="space-y-8 p-8 max-w-[1200px] mx-auto">
    <!-- Top Nav Bar -->
    <div class="p-4 border-b border-outline-variant/30 flex items-center justify-between shrink-0">
      <NuxtLink to="/python" class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
        <span class="material-symbols-outlined">arrow_back</span>
        <span class="font-body-md">Return to Trail</span>
      </NuxtLink>

      <div v-if="lesson?.rpg" class="flex items-center gap-4">
        <!-- Enemy Info -->
        <div v-if="lesson.rpg.enemy_name" class="flex items-center gap-2">
          <span class="material-symbols-outlined text-error">skull</span>
          <span class="font-code-md text-error">{{ lesson.rpg.enemy_name }}</span>
          <div class="flex items-center gap-1 ml-2">
            <span class="font-label-caps text-label-caps text-on-surface-variant">HP</span>
            <div class="w-24 h-2 bg-surface-container-high rounded overflow-hidden border border-outline-variant/30">
              <div class="h-full bg-gradient-to-r from-error-container to-error transition-all" :style="{ width: enemyHpPercent + '%' }"></div>
            </div>
            <span class="font-code-md text-[11px] text-error">{{ lesson.rpg.enemy_hp }}</span>
          </div>
        </div>

        <!-- XP Reward -->
        <span class="font-label-caps text-tertiary-fixed-dim bg-tertiary-fixed-dim/10 px-3 py-1 rounded">
          +{{ lesson.rpg.xp_reward }} XP
        </span>
      </div>
    </div>

    <!-- Main Arena Content -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-[1000px] mx-auto">

        <!-- Lesson Header -->
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-2">
            <span
              class="font-label-caps text-label-caps px-3 py-1 rounded border"
              :class="variantBadgeClass"
            >
              {{ variantLabel }}
            </span>
            <span v-if="lesson?.duracao" class="font-label-caps text-label-caps text-on-surface-variant">
              ⏱ {{ lesson.duracao }}
            </span>
          </div>
          <h1 class="font-display-lg text-[36px] text-primary tracking-tight mb-2">{{ lesson?.titulo }}</h1>
          <p v-if="lesson?.subtitulo" class="font-body-lg text-on-surface-variant">{{ lesson.subtitulo }}</p>
          <p v-if="lesson?.objetivo" class="font-body-md text-on-surface-variant/80 mt-2 italic">{{ lesson.objetivo }}</p>
        </div>

        <!-- Sections Rendering -->
        <div class="space-y-8">

          <!-- Abertura -->
          <section v-if="lesson?.secoes?.abertura" class="glass-panel p-6 rounded-xl border border-outline-variant/20">
            <div v-if="lesson.secoes.abertura.introducao" class="prose-arcane" v-html="renderMd(lesson.secoes.abertura.introducao.texto_md)"></div>
            <div v-if="lesson.secoes.abertura.objetivo" class="mt-4 prose-arcane" v-html="renderMd(lesson.secoes.abertura.objetivo.texto_md)"></div>
            <div v-if="lesson.secoes.abertura.situacao" class="mt-4">
              <h3 class="font-headline-sm text-headline-sm text-secondary mb-2">{{ lesson.secoes.abertura.situacao.titulo }}</h3>
              <div class="prose-arcane" v-html="renderMd(lesson.secoes.abertura.situacao.texto_md)"></div>
            </div>
          </section>

          <!-- Conceito -->
          <section v-if="lesson?.secoes?.conceito" class="glass-panel p-6 rounded-xl border border-primary-container/20">
            <h2 class="font-headline-sm text-headline-sm text-primary-container mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined">auto_stories</span>
              {{ lesson.secoes.conceito.titulo }}
            </h2>
            <div class="prose-arcane mb-6" v-html="renderMd(lesson.secoes.conceito.texto_md)"></div>

            <!-- Code Examples -->
            <div v-for="(ex, i) in lesson.secoes.conceito.exemplos" :key="i" class="mt-6 space-y-3">
              <div class="prose-arcane" v-html="renderMd(ex.texto_md)"></div>
              <div v-if="ex.python" class="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/30 font-code-md text-code-md">
                <pre class="overflow-x-auto"><code class="text-primary-fixed-dim whitespace-pre">{{ ex.python }}</code></pre>
              </div>
            </div>
          </section>

          <!-- Prática Guiada -->
          <section v-if="lesson?.secoes?.pratica_guiada" class="glass-panel p-6 rounded-xl border border-secondary/20">
            <h2 class="font-headline-sm text-headline-sm text-secondary mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined">science</span>
              {{ lesson.secoes.pratica_guiada.titulo }}
            </h2>
            <div class="prose-arcane mb-4" v-html="renderMd(lesson.secoes.pratica_guiada.texto_md)"></div>
            <div v-if="lesson.secoes.pratica_guiada.python" class="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/30 font-code-md text-code-md">
              <pre class="overflow-x-auto"><code class="text-primary-fixed-dim whitespace-pre">{{ lesson.secoes.pratica_guiada.python }}</code></pre>
            </div>
          </section>

          <!-- Preparação (Trilhas) -->
          <section v-if="lesson?.secoes?.preparacao" class="glass-panel p-6 rounded-xl border border-outline-variant/20">
            <h2 class="font-headline-sm text-headline-sm text-primary mb-4">{{ lesson.secoes.preparacao.titulo }}</h2>
            <div class="prose-arcane" v-html="renderMd(lesson.secoes.preparacao.texto_md)"></div>
          </section>

          <!-- Desafios / Missões -->
          <section v-if="missions.length" class="space-y-6">
            <h2 class="font-headline-sm text-headline-sm text-primary flex items-center gap-2">
              <span class="material-symbols-outlined">swords</span>
              {{ lesson?.secoes?.desafios?.titulo || lesson?.secoes?.maratona?.titulo || 'Missões' }}
            </h2>

            <div
              v-for="(mission, i) in missions"
              :key="i"
              class="bg-surface-container/60 backdrop-blur-md p-6 rounded-xl border border-outline-variant/20 hover:border-primary-container/40 transition-colors"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 rounded-full bg-primary-container/10 border border-primary-container/30 flex items-center justify-center">
                  <span class="font-label-caps text-primary-container text-[11px]">{{ i + 1 }}</span>
                </div>
                <h3 class="font-headline-sm text-[18px] text-primary">{{ mission.titulo }}</h3>
              </div>
              <div class="prose-arcane" v-html="renderMd(mission.texto_md)"></div>
            </div>
          </section>

          <!-- Aquecimento (Boss) -->
          <section v-if="lesson?.secoes?.aquecimento" class="space-y-6">
            <h2 class="font-headline-sm text-headline-sm text-tertiary-fixed-dim flex items-center gap-2">
              <span class="material-symbols-outlined">local_fire_department</span>
              {{ lesson.secoes.aquecimento.titulo }}
            </h2>
            <div class="prose-arcane mb-4" v-html="renderMd(lesson.secoes.aquecimento.texto_md)"></div>
            <div
              v-for="(m, i) in lesson.secoes.aquecimento.missoes"
              :key="'warmup-' + i"
              class="bg-tertiary-fixed-dim/5 backdrop-blur-md p-6 rounded-xl border border-tertiary-fixed-dim/20"
            >
              <h3 class="font-headline-sm text-[18px] text-tertiary-fixed-dim mb-3">{{ m.titulo }}</h3>
              <div class="prose-arcane" v-html="renderMd(m.texto_md)"></div>
            </div>
          </section>

          <!-- Prática Autônoma -->
          <section v-if="lesson?.secoes?.pratica_autonoma" class="glass-panel p-6 rounded-xl border border-tertiary-fixed-dim/20">
            <h2 class="font-headline-sm text-headline-sm text-tertiary-fixed-dim mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined">edit_note</span>
              {{ lesson.secoes.pratica_autonoma.titulo }}
            </h2>
            <div class="prose-arcane" v-html="renderMd(lesson.secoes.pratica_autonoma.texto_md)"></div>
          </section>

          <!-- Fechamento -->
          <section v-if="lesson?.secoes?.fechamento" class="glass-panel p-6 rounded-xl border border-outline-variant/20">
            <h2 class="font-headline-sm text-headline-sm text-primary mb-4">{{ lesson.secoes.fechamento.titulo }}</h2>
            <div v-if="lesson.secoes.fechamento.quiz" class="prose-arcane mb-4" v-html="renderMd(lesson.secoes.fechamento.quiz.texto_md)"></div>
            <div v-if="lesson.secoes.fechamento.reflexao" class="mt-4 p-4 bg-surface-container/30 rounded-lg border border-outline-variant/10">
              <div class="prose-arcane" v-html="renderMd(lesson.secoes.fechamento.reflexao.texto_md)"></div>
            </div>
          </section>

          <!-- Oracle Hints Panel -->
          <section v-if="lesson?.rpg?.oracle_hints?.length" class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-primary-fixed-dim">terminal</span>
              <h2 class="font-code-md text-primary-fixed-dim">Oracle Hints</h2>
            </div>
            <div class="font-code-md text-code-md text-primary-fixed-dim/80 space-y-1">
              <div v-for="(hint, i) in lesson.rpg.oracle_hints" :key="i">
                <span class="text-outline">&gt;</span> {{ hint }}
              </div>
              <span class="text-primary mt-2 inline-block animate-pulse">_</span>
            </div>
          </section>

          <!-- Loot Preview -->
          <section v-if="lesson?.rpg?.loot_drops?.length" class="flex gap-4 flex-wrap mt-6">
            <div
              v-for="(loot, i) in lesson.rpg.loot_drops"
              :key="i"
              class="bg-surface-container/50 px-4 py-3 rounded-lg border border-outline-variant/20 flex items-center gap-3"
            >
              <span class="material-symbols-outlined text-2xl" :class="lootIconClass(loot.rarity)">
                {{ lootIcon(loot.type) }}
              </span>
              <div>
                <div class="font-code-md text-code-md text-on-surface">{{ loot.item }}</div>
                <div class="font-label-caps text-[10px]" :class="lootRarityClass(loot.rarity)">{{ loot.rarity }}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

definePageMeta({ layout: 'student' })

const route = useRoute()

const consoleOutput = ref<any>(null)
const enemyHpPercent = ref(100)

// route.params.slug is string[] for [...slug] catch-all routes
const slugPath = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s.join('/') : s
})

// Use `any` — lesson JSON has many dynamic fields (rpg, secoes.*) not in the base type
const { data: lesson } = await useFetch<any>(
  () => `/api/cursos/python/aulas/${slugPath.value}`
)

const isAprendiz = computed(() => lesson.value?.subtipo === 'aprendiz')

const isEditorLayout = computed(() => {
  const subtipo = lesson.value?.subtipo as string | undefined
  return ['aventura', 'guardiao', 'boss', 'prova', 'grupo'].includes(subtipo ?? '')
})

function applyArenaLayout(subtipo: string | undefined) {
  setPageLayout(subtipo === 'aprendiz' ? false : 'student')
}

watch(() => lesson.value?.subtipo, applyArenaLayout, { immediate: true })

const missions = computed<any[]>(() => {
  if (!lesson.value) return []
  const secoes = lesson.value.secoes as Record<string, any>
  return secoes?.desafios?.missoes ?? secoes?.maratona?.missoes ?? []
})

const variantLabel = computed(() => {
  const tipo = lesson.value?.tipo as string | undefined
  const subtipo = lesson.value?.subtipo as string | undefined
  if (tipo === 'Masmorra' || subtipo === 'boss') return '💀 Boss Marathon'
  if (tipo === 'Aula' && subtipo === 'conceito') return '📜 Scroll of Wisdom'
  if (subtipo === 'aprendiz') return '🗡️ Apprentice Trail'
  if (subtipo === 'aventura') return '🌲 Adventure Trail'
  if (subtipo === 'guardiao') return '🛡️ Guardian Trail'
  if (subtipo === 'grupo') return '⚔️ Guild Expedition'
  if (subtipo === 'prova') return '📋 Final Exam'
  return tipo || 'Quest'
})

const variantBadgeClass = computed(() => {
  const subtipo = lesson.value?.subtipo as string | undefined
  if (subtipo === 'boss' || lesson.value?.tipo === 'Masmorra') return 'text-error border-error/30'
  if (subtipo === 'guardiao') return 'text-secondary border-secondary/30'
  if (subtipo === 'grupo') return 'text-secondary-fixed-dim border-secondary/30'
  if (subtipo === 'conceito') return 'text-primary-fixed border-primary-fixed/30'
  if (subtipo === 'prova') return 'text-tertiary-fixed-dim border-tertiary-fixed-dim/30'
  return 'text-primary-fixed-dim border-primary-fixed-dim/30'
})

function renderMd(md: string): string {
  if (!md) return ''
  return md
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-surface-container px-1 rounded text-primary-fixed-dim font-code-md text-[13px]">$1</code>')
    .replace(/^# (.*$)/gm, '<h1 class="font-headline-md text-headline-md text-primary mb-3">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="font-headline-sm text-headline-sm text-secondary mb-2">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="font-body-lg text-body-lg text-primary font-bold mb-2">$1</h3>')
    .replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc text-on-surface-variant">$1</li>')
    .replace(/\n/g, '<br/>')
}

function lootIcon(type: string) {
  const icons: Record<string, string> = {
    scroll: 'description',
    badge: 'military_tech',
    achievement: 'emoji_events',
    superpower: 'auto_awesome',
    consumable: 'diamond',
  }
  return icons[type] ?? 'inventory_2'
}

function lootIconClass(rarity: string) {
  const classes: Record<string, string> = {
    epic: 'text-secondary',
    rare: 'text-tertiary-fixed-dim',
    uncommon: 'text-primary-fixed-dim',
  }
  return classes[rarity] ?? 'text-on-surface-variant'
}

function lootRarityClass(rarity: string) {
  return lootIconClass(rarity)
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

<style scoped>
.glass-panel {
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
}
.prose-arcane {
  @apply text-on-surface/90 leading-relaxed;
}
</style>
