<template>
  <div class="flex flex-col gap-4">
    <PlayerPanel
      v-if="showPlayerPanel"
      :stats="stats"
      :completed-count="completedCount"
    />

    <section class="cg-panel rounded-2xl p-4">
      <div class="mb-3 flex items-center gap-2">
        <UIcon :name="contextIcon" class="h-4 w-4" :class="contextIconClass" />
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{{ contextEyebrow }}</h2>
      </div>

      <h3 class="text-sm font-black text-slate-50">{{ contextTitle }}</h3>
      <p class="mt-2 text-xs leading-6 text-slate-400">
        {{ contextDescription }}
      </p>

      <div v-if="contextHighlights.length" class="mt-4 space-y-2">
        <div
          v-for="highlight in contextHighlights"
          :key="highlight"
          class="rounded-xl border border-slate-700/30 bg-black/15 px-3 py-2 text-xs font-semibold text-slate-300"
        >
          {{ highlight }}
        </div>
      </div>
    </section>

    <section class="cg-panel rounded-2xl p-4">
      <div class="mb-3 flex items-center gap-2">
        <UIcon name="i-lucide-compass" class="h-4 w-4 text-cyan-300" />
        <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Próximo passo</h2>
      </div>

      <div class="space-y-2 text-xs">
        <div v-if="prevQuest" class="rounded-xl border border-slate-700/30 bg-black/15 px-3 py-2">
          <p class="font-bold text-slate-200">Retorno recomendado</p>
          <NuxtLink :to="prevPath!" class="mt-1 block text-slate-400 hover:text-slate-200">
            {{ prevQuest.titulo }}
          </NuxtLink>
        </div>

        <div v-if="nextQuest" class="rounded-xl border border-cyan-300/20 bg-cyan-300/8 px-3 py-2">
          <p class="font-bold text-cyan-100">Próxima obrigatória</p>
          <NuxtLink :to="nextPath!" class="mt-1 block text-cyan-200 hover:text-white">
            {{ nextQuest.titulo }}
          </NuxtLink>
        </div>

        <p v-if="!prevQuest && !nextQuest" class="text-slate-500">
          Esta etapa fecha um ciclo da campanha. Revise o mapa para escolher o próximo movimento.
        </p>
      </div>
    </section>

    <QuestSidebarToc v-if="showToc" :items="tocItems" />
    <QuestOptionalBranches v-if="showOptionals" :optionals="optionals" />
    <QuestRewardPanel :quest="quest" :completed="completed" @complete="$emit('complete')" />
  </div>
</template>

<script setup lang="ts">
import type { Lesson, ModuleQuest } from '~/types/course'
import type { QuestMissionBlock, QuestTocItem } from '~/composables/useQuestSections'
import PlayerPanel from '~/components/PlayerPanel.vue'
import QuestSidebarToc from '~/components/python/quest/QuestSidebarToc.vue'
import QuestOptionalBranches from '~/components/python/quest/QuestOptionalBranches.vue'
import QuestRewardPanel from '~/components/python/quest/QuestRewardPanel.vue'

const props = defineProps<{
  lesson: Lesson
  quest: ModuleQuest | null
  completed: boolean
  completedCount: number
  stats: {
    level: number
    xp: number
    coins: number
    hp: number
    maxHp: number
    mana: number
    maxMana: number
  }
  tocItems: QuestTocItem[]
  optionals: ModuleQuest[]
  missionBlocks: QuestMissionBlock[]
  prevQuest: ModuleQuest | null
  nextQuest: ModuleQuest | null
  prevPath: string | null
  nextPath: string | null
}>()

defineEmits<{
  complete: []
}>()

const missionCount = computed(() => props.missionBlocks.reduce((total, block) => total + block.missions.length, 0))
const showPlayerPanel = computed(() => ['boss', 'grupo'].includes(props.lesson.subtipo))
const showOptionals = computed(() => ['aprendiz', 'aventura', 'guardiao'].includes(props.lesson.subtipo) && props.optionals.length > 0)
const showToc = computed(() => {
  if (props.lesson.subtipo === 'prova') return props.tocItems.length > 0
  return props.tocItems.length > 1
})

const contextMeta = computed(() => {
  switch (props.lesson.subtipo) {
    case 'conceito':
      return {
        eyebrow: 'Estudo guiado',
        title: 'Aprender antes de avançar',
        description: 'Leia, observe os exemplos e passe pela prática guiada antes de seguir para a próxima etapa da campanha.',
        icon: 'i-lucide-book-open',
        iconClass: 'text-cyan-300',
        highlights: [
          'Conceito central + exemplos executáveis',
          'Prática guiada e prática autônoma no mesmo fluxo',
          `Sumário com ${props.tocItems.length} blocos de estudo`,
        ],
      }
    case 'aprendiz':
      return {
        eyebrow: 'Sprint do bloco',
        title: 'Ritmo e fixação imediata',
        description: 'Esta trilha foi desenhada para treino curto e intenso, aproveitando o impulso da aula recém-estudada.',
        icon: 'i-lucide-wand-2',
        iconClass: 'text-cyan-300',
        highlights: [
          `${missionCount.value} desafios em sequência`,
          'Objetivo: consolidar a técnica antes do próximo tronco obrigatório',
          showOptionals.value ? `${props.optionals.length} ramo(s) opcional(is) liberado(s)` : 'Sem ramos opcionais liberados neste ponto',
        ],
      }
    case 'aventura':
      return {
        eyebrow: 'Exploração opcional',
        title: 'Prática sem pressão',
        description: 'Aqui a proposta é experimentar, errar e descobrir caminhos alternativos sem interromper o tronco principal.',
        icon: 'i-lucide-map',
        iconClass: 'text-emerald-300',
        highlights: [
          `${missionCount.value} desafios opcionais`,
          'Ideal para ganhar confiança antes do fechamento do bloco',
          'Use esta trilha para aprofundar sem travar a campanha principal',
        ],
      }
    case 'guardiao':
      return {
        eyebrow: 'Preparação final',
        title: 'Revisão acumulativa antes do boss',
        description: 'Esta trilha reúne revisão e resistência. A ideia é chegar ao boss com domínio real, não só com memória recente.',
        icon: 'i-lucide-shield-check',
        iconClass: 'text-amber-300',
        highlights: [
          `${missionCount.value} desafios de revisão`,
          'Foco em prontidão para a arena',
          props.nextQuest ? `Próximo fechamento: ${props.nextQuest.titulo}` : 'Fechamento do bloco logo à frente',
        ],
      }
    case 'grupo':
      return {
        eyebrow: 'Incursão cooperativa',
        title: 'Coordenação da guilda',
        description: 'A sidebar precisa orientar equipe, papéis e ordem de execução. Esta masmorra valoriza coordenação tanto quanto solução.',
        icon: 'i-lucide-users-round',
        iconClass: 'text-teal-300',
        highlights: [
          `${missionCount.value} objetivos cooperativos`,
          'Divisão clara de tarefas entre integrantes',
          'Monitorar HP/Mana ajuda a sustentar o clima de raid',
        ],
      }
    case 'prova':
      return {
        eyebrow: 'Modo prova',
        title: 'Foco, legibilidade e previsibilidade',
        description: 'Nesta tela, a sidebar deve reduzir distrações e lembrar apenas o essencial para a aplicação formal.',
        icon: 'i-lucide-clipboard-check',
        iconClass: 'text-amber-300',
        highlights: [
          'Banco com 20 questões, aplicação com 5',
          'Distribuição editorial: 3 médias + 2 difíceis',
          'Mínimo de 5 variações equivalentes',
        ],
      }
    case 'boss':
    default:
      return {
        eyebrow: 'Arena do bloco',
        title: 'Combate principal',
        description: 'Aqui a sidebar deve apoiar decisão, tensão e leitura rápida do estado do jogador para sustentar a sensação de batalha.',
        icon: 'i-lucide-swords',
        iconClass: 'text-rose-300',
        highlights: [
          `${missionCount.value} objetivos de combate`,
          'Aquecimento curto, maratona principal e foco nas submissões',
          'HP, mana e avanço do bloco precisam estar sempre visíveis',
        ],
      }
  }
})

const contextEyebrow = computed(() => contextMeta.value.eyebrow)
const contextTitle = computed(() => contextMeta.value.title)
const contextDescription = computed(() => contextMeta.value.description)
const contextIcon = computed(() => contextMeta.value.icon)
const contextIconClass = computed(() => contextMeta.value.iconClass)
const contextHighlights = computed(() => contextMeta.value.highlights)
</script>

