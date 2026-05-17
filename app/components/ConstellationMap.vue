<template>
  <div class="space-y-3">
    <!-- Mapa -->
    <div
      class="relative overflow-x-auto rounded-2xl border border-outline-variant/30 bg-surface-container-lowest cg-scroll"
      :style="{ height: `${MAP_H}px` }"
    >
      <div class="relative" :style="{ width: `${totalWidth}px`, height: `${MAP_H}px` }">

        <!-- ╔══════ Background (SVG): nebulas + estrelas ══════╗ -->
        <svg
          class="absolute inset-0 pointer-events-none"
          :width="totalWidth"
          :height="MAP_H"
        >
          <!-- Nebula por bloco -->
          <radialGradient
            v-for="(block, bi) in blocks"
            :id="`nebula-${bi}`"
            :key="`g-${bi}`"
            cx="50%" cy="50%" r="50%"
          >
            <stop offset="0%" :stop-color="nebulaColor(block)" stop-opacity="0.18" />
            <stop offset="60%" :stop-color="nebulaColor(block)" stop-opacity="0.04" />
            <stop offset="100%" stop-opacity="0" />
          </radialGradient>
          <ellipse
            v-for="(block, bi) in blocks"
            :key="`neb-${bi}`"
            :cx="blockCenterX(bi)" :cy="TRUNK_Y + 40"
            :rx="blockWidth(bi) / 2"
            ry="130"
            :fill="`url(#nebula-${bi})`"
          />

          <!-- Estrelas -->
          <circle
            v-for="s in STARS"
            :key="`star-${s.id}`"
            :cx="s.x" :cy="s.y" :r="s.r"
            fill="rgba(255,255,255,0.18)"
          />

          <!-- Separadores de bloco -->
          <line
            v-for="(_, bi) in blocks.slice(1)"
            :key="`sep-${bi}`"
            :x1="blockStartX(bi + 1) - BLOCK_GAP / 2"
            y1="50"
            :x2="blockStartX(bi + 1) - BLOCK_GAP / 2"
            :y2="MAP_H - 40"
            stroke="rgba(76,215,246,0.08)"
            stroke-width="1"
            stroke-dasharray="2 8"
          />
        </svg>

        <!-- ╔══════ Linhas de conexão (SVG) ══════╗ -->
        <svg
          class="absolute inset-0 pointer-events-none"
          :width="totalWidth"
          :height="MAP_H"
        >
          <defs>
            <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Trunk lines -->
          <template v-for="(block, bi) in blocks" :key="`tlines-${bi}`">
            <line
              v-for="qi in trunkWithCloser(block).length - 1"
              :key="`tl-${bi}-${qi}`"
              :x1="pos(bi, 'trunk', qi - 1).x" :y1="pos(bi, 'trunk', qi - 1).y"
              :x2="pos(bi, 'trunk', qi).x" :y2="pos(bi, 'trunk', qi).y"
              :stroke="trunkLineColor(block, qi - 1, qi)"
              :stroke-width="bothCompleted(trunkWithCloser(block)[qi - 1]!, trunkWithCloser(block)[qi]!) ? 2 : 1.5"
              stroke-linecap="round"
              :filter="bothCompleted(trunkWithCloser(block)[qi - 1]!, trunkWithCloser(block)[qi]!) ? 'url(#line-glow)' : 'none'"
              :class="isCompletedToActiveLink(trunkWithCloser(block)[qi - 1]!, trunkWithCloser(block)[qi]!) ? 'cg-line-flow' : ''"
            />
          </template>

          <!-- Branch lines (trunk → optional) -->
          <template v-for="(block, bi) in blocks" :key="`bls-${bi}`">
            <line
              v-for="(opt, oi) in block.optional"
              :key="`bl-${getQuestSlug(opt)}`"
              :x1="branchOrigin(block, bi, opt).x"
              :y1="branchOrigin(block, bi, opt).y"
              :x2="pos(bi, 'optional', oi).x"
              :y2="pos(bi, 'optional', oi).y"
              :stroke="branchLineColor(opt)"
              stroke-width="1.2"
              stroke-dasharray="4 5"
              stroke-linecap="round"
              opacity="0.65"
            />
          </template>
        </svg>

        <!-- ╔══════ Rótulos de bloco ══════╗ -->
        <div
          v-for="(block, bi) in blocks"
          :key="`hdr-${bi}`"
          class="absolute pointer-events-none"
          :style="{
            left: `${blockCenterX(bi)}px`,
            top: '14px',
            transform: 'translateX(-50%)',
          }"
        >
          <p class="text-center text-[0.6rem] font-bold uppercase tracking-[0.25em] text-on-surface-variant">
            Bloco {{ bi + 1 }}
          </p>
          <p
            v-if="block.closer"
            class="max-w-[200px] truncate text-center text-[0.7rem] font-bold text-on-surface-variant"
          >
            {{ block.closer.titulo }}
          </p>
        </div>

        <!-- ╔══════ Nós (divs absolutos) ══════╗ -->
        <template v-for="(block, bi) in blocks" :key="`b-${bi}`">
          <!-- Trunk + closer -->
          <div
            v-for="(q, qi) in trunkWithCloser(block)"
            :key="getQuestSlug(q)"
            v-motion
            :initial="{ opacity: 0, scale: 0.3 }"
            :enter="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22, delay: 60 + qi * 40 + bi * 30 } }"
            class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            :style="{ left: `${pos(bi, 'trunk', qi).x}px`, top: `${pos(bi, 'trunk', qi).y}px` }"
          >
            <NodeShape
              :quest="q"
              :active="getQuestSlug(q) === activeSlug"
              :completed="isCompleted(q)"
              :unlocked="isUnlocked(q)"
              :hovered="hovered === getQuestSlug(q)"
              @hover="hovered = getQuestSlug(q)"
              @unhover="hovered = null"
            />
            <p
              v-if="getQuestSlug(q) === activeSlug"
              class="text-[0.6rem] text-primary-container text-center font-bold animate-pulse mt-1 pointer-events-none"
            >
              aqui
            </p>
          </div>

          <!-- Opcionais -->
          <div
            v-for="(opt, oi) in block.optional"
            :key="getQuestSlug(opt)"
            v-motion
            :initial="{ opacity: 0, scale: 0.3, y: -10 }"
            :enter="{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 22, delay: 140 + oi * 50 + bi * 30 } }"
            class="absolute -translate-x-1/2 -translate-y-1/2"
            :style="{ left: `${pos(bi, 'optional', oi).x}px`, top: `${pos(bi, 'optional', oi).y}px` }"
          >
            <NodeShape
              :quest="opt"
              :active="getQuestSlug(opt) === activeSlug"
              :completed="isCompleted(opt)"
              :unlocked="isUnlocked(opt)"
              :hovered="hovered === getQuestSlug(opt)"
              small
              @hover="hovered = getQuestSlug(opt)"
              @unhover="hovered = null"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- ╔══════ Painel de info on hover ══════╗ -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      mode="out-in"
    >
      <div
        v-if="hoveredQuest"
        :key="getQuestSlug(hoveredQuest)"
        class="flex flex-wrap items-center gap-3 rounded-2xl border px-4 py-3"
        :class="infoPanelClass(hoveredQuest)"
      >
        <UIcon :name="getQuestIcon(getQuestSubtype(hoveredQuest))" class="h-5 w-5 shrink-0" :class="iconTextClass(hoveredQuest)" />
        <UBadge :color="tone(hoveredQuest).badgeColor" variant="soft" size="xs">
          {{ tone(hoveredQuest).label }}
        </UBadge>
        <span class="text-xs font-semibold text-on-surface-variant">{{ hoveredQuest.rotulo ?? `Aula ${hoveredQuest.numero}` }}</span>
        <span v-if="!isRequiredQuest(hoveredQuest)" class="rounded-full bg-tertiary-fixed-dim/15 px-2 py-0.5 text-[0.65rem] font-bold text-tertiary-fixed-dim">Opcional</span>
        <span v-if="isCompleted(hoveredQuest)" class="rounded-full bg-primary-container/15 px-2 py-0.5 text-[0.65rem] font-bold text-primary-container">✓ Concluída</span>
        <span class="ml-auto truncate text-sm font-black text-on-background">{{ hoveredQuest.titulo }}</span>
        <span class="flex shrink-0 items-center gap-2 text-[0.7rem] font-bold">
          <span class="text-primary-container">+{{ getQuestRewards(hoveredQuest).xp }} XP</span>
          <span class="text-tertiary-fixed-dim">+{{ getQuestRewards(hoveredQuest).coins }} 🪙</span>
        </span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'
import {
  getQuestIcon,
  getQuestRewards,
  getQuestSlug,
  getQuestSubtype,
  getQuestTone,
  isRequiredQuest,
} from '~/composables/useLessonMeta'
import { groupQuestsIntoBlocks, type QuestBlock } from '~/composables/useModuleBlocks'

const props = defineProps<{
  quests: ModuleQuest[]
  activeSlug: string
}>()

const progress = useProgressStore()

// ── Constantes de layout ──────────────────────────────────────────────────────
const MAP_H = 320
const TRUNK_Y = 150
const OPT_Y = 240
const NODE_W = 100     // espaço horizontal entre nós do trunk
const OPT_W = 78       // espaço horizontal entre nós opcionais
const BLOCK_GAP = 56   // gap extra entre blocos

// ── Blocos ───────────────────────────────────────────────────────────────────
const blocks = computed(() => groupQuestsIntoBlocks(props.quests))

function trunkWithCloser(block: QuestBlock) {
  return block.closer ? [...block.trunk, block.closer] : block.trunk
}

// ── Cálculo de posições ──────────────────────────────────────────────────────
function blockStartX(bi: number): number {
  let x = 80
  for (let i = 0; i < bi; i++) {
    const b = blocks.value[i]!
    x += trunkWithCloser(b).length * NODE_W + BLOCK_GAP
  }
  return x
}

function blockWidth(bi: number): number {
  const b = blocks.value[bi]!
  return Math.max(trunkWithCloser(b).length, 1) * NODE_W
}

function blockCenterX(bi: number): number {
  return blockStartX(bi) + blockWidth(bi) / 2 - NODE_W / 2
}

function pos(bi: number, list: 'trunk' | 'optional', idx: number): { x: number, y: number } {
  const startX = blockStartX(bi)
  if (list === 'trunk') {
    return { x: startX + idx * NODE_W, y: TRUNK_Y }
  }
  const block = blocks.value[bi]!
  const optCount = block.optional.length
  const totalOptW = Math.max(optCount - 1, 0) * OPT_W
  // Centra o grupo de opcionais sob o trunk do bloco
  const centerX = startX + (trunkWithCloser(block).length - 1) * NODE_W / 2
  const optStartX = centerX - totalOptW / 2
  return { x: optStartX + idx * OPT_W, y: OPT_Y }
}

function branchOrigin(block: QuestBlock, bi: number, opt: ModuleQuest): { x: number, y: number } {
  const aprendizIdx = block.trunk.findIndex(q => q.numero === opt.numero && getQuestSubtype(q) === 'aprendiz')
  const idx = aprendizIdx >= 0 ? aprendizIdx : Math.max(0, block.trunk.length - 1)
  return pos(bi, 'trunk', idx)
}

const totalWidth = computed(() => {
  if (!blocks.value.length) return 400
  const lastBi = blocks.value.length - 1
  const lastBlock = blocks.value[lastBi]!
  return blockStartX(lastBi) + trunkWithCloser(lastBlock).length * NODE_W + 80
})

// ── Estrelas de fundo ────────────────────────────────────────────────────────
function lcg(seed: number) {
  let s = seed
  return () => { s = Math.imul(s, 1664525) + 1013904223 | 0; return (s >>> 0) / 4294967296 }
}
const rng = lcg(7919)
const STARS = Array.from({ length: 100 }, (_, id) => ({
  id,
  x: Math.floor(rng() * 2600),
  y: Math.floor(rng() * MAP_H),
  r: rng() > 0.82 ? 1.4 : rng() > 0.5 ? 1 : 0.6,
}))

// ── Estado de hover ──────────────────────────────────────────────────────────
const hovered = ref<string | null>(null)
const hoveredQuest = computed(() =>
  hovered.value ? (props.quests.find(q => getQuestSlug(q) === hovered.value) ?? null) : null,
)

// ── Helpers de estado ────────────────────────────────────────────────────────
const isCompleted = (q: ModuleQuest) => progress.isCompleted(getQuestSlug(q))
const isUnlocked = (q: ModuleQuest) => progress.isUnlocked(q, props.quests)
const tone = (q: ModuleQuest) => getQuestTone(getQuestSubtype(q))

function bothCompleted(a: ModuleQuest, b: ModuleQuest) {
  return isCompleted(a) && isCompleted(b)
}

function isCompletedToActiveLink(a: ModuleQuest, b: ModuleQuest) {
  return isCompleted(a) && !isCompleted(b)
}

// ── Cores ────────────────────────────────────────────────────────────────────
function trunkLineColor(block: QuestBlock, fromIdx: number, toIdx: number): string {
  const list = trunkWithCloser(block)
  const a = list[fromIdx]!
  const b = list[toIdx]!
  if (bothCompleted(a, b)) return '#4cd7f6'
  if (isCompleted(a)) return '#1d4a5e'
  return '#1a2840'
}

function branchLineColor(opt: ModuleQuest): string {
  if (isCompleted(opt)) return '#22c55e'
  if (isUnlocked(opt)) {
    switch (getQuestSubtype(opt)) {
      case 'aventura': return '#15803d'
      case 'guardiao': return '#d97706'
      case 'grupo':    return '#0f766e'
      default:         return '#475569'
    }
  }
  return '#1a2840'
}

function nebulaColor(block: QuestBlock): string {
  if (!block.closer) return '#0891b2'
  switch (getQuestSubtype(block.closer)) {
    case 'boss':  return '#a855f7'
    case 'prova': return '#f59e0b'
    default:      return '#0891b2'
  }
}

function infoPanelClass(q: ModuleQuest): string {
  switch (getQuestSubtype(q)) {
    case 'boss':     return 'border-violet-700/40 bg-violet-950/30'
    case 'prova':    return 'border-amber-700/40 bg-amber-950/30'
    case 'aventura': return 'border-emerald-700/30 bg-emerald-950/20'
    case 'guardiao': return 'border-amber-700/30 bg-amber-950/20'
    case 'grupo':    return 'border-teal-700/30 bg-teal-950/20'
    case 'aprendiz': return 'border-indigo-700/30 bg-indigo-950/20'
    default:         return 'border-cyan-700/30 bg-cyan-950/20'
  }
}

function iconTextClass(q: ModuleQuest): string {
  switch (getQuestSubtype(q)) {
    case 'boss':     return 'text-violet-300'
    case 'prova':    return 'text-amber-300'
    case 'aventura': return 'text-emerald-300'
    case 'guardiao': return 'text-amber-300'
    case 'grupo':    return 'text-teal-300'
    case 'aprendiz': return 'text-indigo-300'
    default:         return 'text-cyan-300'
  }
}
</script>
