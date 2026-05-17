<template>
  <NuxtLink
    :to="unlocked ? `/cursos/python/quests/${slug}` : undefined"
    :class="[
      'relative block transition-transform duration-200',
      unlocked ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed',
      hovered && unlocked ? 'scale-115' : 'scale-100',
    ]"
    @mouseenter="$emit('hover')"
    @mouseleave="$emit('unhover')"
  >
    <!-- Anel de pulso ambiente (nó ativo + desbloqueado) -->
    <div
      v-if="active && unlocked"
      class="absolute -inset-3 rounded-full pointer-events-none"
      :class="pulseColorClass"
      style="animation: ping 2.4s cubic-bezier(0,0,0.2,1) infinite"
    />

    <!-- Brilho ambiente (quando completado) -->
    <div
      v-if="completed"
      class="absolute -inset-2 rounded-full blur-md opacity-60 pointer-events-none"
      :style="{ background: pal.glow }"
    />

    <!-- Forma + ícone -->
    <div
      class="relative flex items-center justify-center transition-all"
      :style="{
        width: size + 'px',
        height: size + 'px',
        clipPath: clipPath,
        background: bgGradient,
        border: borderStyle,
      }"
    >
      <!-- Ícone -->
      <UIcon
        v-if="unlocked && !completed"
        :name="iconName"
        :style="{ color: iconColor }"
        :class="iconSizeClass"
      />
      <UIcon
        v-else-if="completed"
        name="i-lucide-check"
        :style="{ color: pal.done }"
        :class="iconSizeClass"
      />
      <UIcon
        v-else
        name="i-lucide-lock"
        class="text-slate-700"
        :class="iconSizeClass"
      />
    </div>

    <!-- Badge de número (canto inferior direito, só no trunk) -->
    <div
      v-if="!small && !isBossOrProva && unlocked"
      class="absolute -bottom-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full border border-slate-700/40 bg-slate-900 px-1 text-[0.6rem] font-black"
      :style="{ color: completed ? pal.done : pal.text }"
    >
      {{ quest.numero }}
    </div>

    <!-- Selo opcional -->
    <div
      v-if="isOptional && unlocked"
      class="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/90 text-[0.55rem] font-black text-amber-950"
      title="Opcional"
    >
      ?
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ModuleQuest } from '~/types/course'
import { getQuestIcon, getQuestSlug, getQuestSubtype, isRequiredQuest } from '~/composables/useLessonMeta'

const props = defineProps<{
  quest: ModuleQuest
  active: boolean
  completed: boolean
  unlocked: boolean
  hovered: boolean
  small?: boolean
}>()

defineEmits<{
  hover: []
  unhover: []
}>()

const subtype = computed(() => getQuestSubtype(props.quest))
const slug = computed(() => getQuestSlug(props.quest))
const isOptional = computed(() => !isRequiredQuest(props.quest))
const isBossOrProva = computed(() => subtype.value === 'boss' || subtype.value === 'prova')
const iconName = computed(() => getQuestIcon(subtype.value))

// ── Tamanhos ───────────────────────────────────────────────────────────────
const size = computed(() => {
  if (subtype.value === 'boss') return 64
  if (subtype.value === 'prova') return 72
  if (props.small) return 38
  return 52
})

const iconSizeClass = computed(() => {
  if (subtype.value === 'boss') return 'h-7 w-7'
  if (subtype.value === 'prova') return 'h-8 w-8'
  if (props.small) return 'h-4 w-4'
  return 'h-5 w-5'
})

// ── Paleta ─────────────────────────────────────────────────────────────────
interface Pal {
  stroke: string
  fill: string
  active: string
  text: string
  done: string
  glow: string
}

const pal = computed<Pal>(() => {
  switch (subtype.value) {
    case 'conceito':  return { stroke: '#0891b2', fill: '#0a1322', active: '#67e8f9', text: '#7dd3fc', done: '#34d399', glow: 'rgba(52,211,153,0.35)' }
    case 'aprendiz':  return { stroke: '#6366f1', fill: '#0d0d1f', active: '#a5b4fc', text: '#a5b4fc', done: '#818cf8', glow: 'rgba(129,140,248,0.35)' }
    case 'aventura':  return { stroke: '#16a34a', fill: '#0a1810', active: '#86efac', text: '#86efac', done: '#22c55e', glow: 'rgba(34,197,94,0.35)' }
    case 'guardiao':  return { stroke: '#d97706', fill: '#1a1100', active: '#fde68a', text: '#fcd34d', done: '#f59e0b', glow: 'rgba(245,158,11,0.35)' }
    case 'grupo':     return { stroke: '#14b8a6', fill: '#06181c', active: '#5eead4', text: '#5eead4', done: '#14b8a6', glow: 'rgba(20,184,166,0.35)' }
    case 'boss':      return { stroke: '#a855f7', fill: '#12061f', active: '#d8b4fe', text: '#c4b5fd', done: '#c4b5fd', glow: 'rgba(168,85,247,0.45)' }
    case 'prova':     return { stroke: '#f59e0b', fill: '#1a0f00', active: '#fde68a', text: '#fcd34d', done: '#fcd34d', glow: 'rgba(251,191,36,0.5)' }
    default:          return { stroke: '#0891b2', fill: '#0a1322', active: '#67e8f9', text: '#7dd3fc', done: '#34d399', glow: 'rgba(52,211,153,0.35)' }
  }
})

const pulseColorClass = computed(() => {
  switch (subtype.value) {
    case 'boss':     return 'bg-violet-500/30'
    case 'prova':    return 'bg-amber-400/30'
    case 'aventura': return 'bg-emerald-400/25'
    case 'guardiao': return 'bg-amber-400/25'
    case 'grupo':    return 'bg-teal-400/25'
    case 'aprendiz': return 'bg-indigo-400/25'
    default:         return 'bg-cyan-400/25'
  }
})

// ── Forma (clip-path) ──────────────────────────────────────────────────────
const clipPath = computed(() => {
  if (subtype.value === 'boss') {
    // Octógono
    return 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
  }
  if (subtype.value === 'prova') {
    // Estrela 6 pontas / diamante alongado
    return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
  }
  // Hexágono
  return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
})

const bgGradient = computed(() => {
  if (!props.unlocked) return '#0a0f1a'
  const p = pal.value
  if (props.completed) {
    return `radial-gradient(circle at 30% 30%, ${p.done}25, ${p.fill} 70%)`
  }
  if (props.active) {
    return `radial-gradient(circle at 30% 30%, ${p.active}30, ${p.fill} 70%)`
  }
  return `radial-gradient(circle at 30% 30%, ${p.stroke}20, ${p.fill} 70%)`
})

const borderStyle = computed(() => {
  if (!props.unlocked) return '2px solid #1a2840'
  const p = pal.value
  if (props.active) return `2.5px solid ${p.active}`
  if (props.completed) return `2px solid ${p.done}`
  return `2px solid ${p.stroke}`
})

const iconColor = computed(() => {
  const p = pal.value
  if (props.active) return p.active
  if (props.completed) return p.done
  return p.text
})
</script>
