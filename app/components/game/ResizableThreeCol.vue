<template>
  <div
    ref="containerRef"
    class="rtc-container"
    :class="{ 'is-mobile': isMobile }"
    :style="!isMobile ? { gridTemplateColumns: gridCols } : undefined"
  >
    <!-- LEFT -->
    <details v-if="isMobile" class="rtc-mobile-pane">
      <summary class="rtc-mobile-summary">
        <span class="material-symbols-outlined">inventory_2</span>
        {{ leftLabel }}
      </summary>
      <div class="rtc-mobile-body">
        <slot name="left" />
      </div>
    </details>
    <div v-else class="rtc-pane rtc-left">
      <slot name="left" />
    </div>

    <!-- DIVIDER 1 (left ↔ center) -->
    <button
      v-if="!isMobile"
      type="button"
      class="rtc-divider"
      role="separator"
      aria-orientation="vertical"
      :aria-valuenow="Math.round(leftPx)"
      :aria-valuemin="min.left"
      :aria-label="'Redimensionar coluna esquerda'"
      tabindex="0"
      @pointerdown="onPointerDown('left', $event)"
      @keydown="onDividerKey('left', $event)"
    />

    <!-- CENTER -->
    <div class="rtc-pane rtc-center">
      <slot name="center" />
    </div>

    <!-- DIVIDER 2 (center ↔ right) -->
    <button
      v-if="!isMobile"
      type="button"
      class="rtc-divider"
      role="separator"
      aria-orientation="vertical"
      :aria-valuenow="Math.round(rightPx)"
      :aria-valuemin="min.right"
      :aria-label="'Redimensionar coluna direita'"
      tabindex="0"
      @pointerdown="onPointerDown('right', $event)"
      @keydown="onDividerKey('right', $event)"
    />

    <!-- RIGHT -->
    <details v-if="isMobile" class="rtc-mobile-pane" open>
      <summary class="rtc-mobile-summary">
        <span class="material-symbols-outlined">swords</span>
        {{ rightLabel }}
      </summary>
      <div class="rtc-mobile-body">
        <slot name="right" />
      </div>
    </details>
    <div v-else class="rtc-pane rtc-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface ColSpec {
  left: number
  center: number
  right: number
}

const props = withDefaults(defineProps<{
  instanceKey: string
  defaults?: ColSpec
  min?: ColSpec
  leftLabel?: string
  rightLabel?: string
}>(), {
  defaults: () => ({ left: 18, center: 56, right: 26 }),
  min: () => ({ left: 220, center: 560, right: 360 }),
  leftLabel: 'Inventário · Mapa',
  rightLabel: 'Desafio',
})

const DIVIDER_PX = 6
const KEY_STEP_PX = 16

const containerRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const isMobile = ref(false)
const leftPx = ref(0)
const centerPx = ref(0)
const rightPx = ref(0)

const storageKey = computed(() => `arcane:layout:${props.instanceKey}`)

const gridCols = computed(
  () => `${leftPx.value}px ${DIVIDER_PX}px minmax(0, ${centerPx.value}px) ${DIVIDER_PX}px ${rightPx.value}px`,
)

function availableWidth() {
  return Math.max(0, containerWidth.value - DIVIDER_PX * 2)
}

function applyDefaults() {
  const total = availableWidth()
  if (total <= 0) return
  let left = (total * props.defaults.left) / 100
  let right = (total * props.defaults.right) / 100
  left = Math.max(props.min.left, left)
  right = Math.max(props.min.right, right)
  const center = Math.max(props.min.center, total - left - right)
  leftPx.value = left
  rightPx.value = right
  centerPx.value = center
}

function loadSaved(): boolean {
  if (typeof localStorage === 'undefined') return false
  const raw = localStorage.getItem(storageKey.value)
  if (!raw) return false
  try {
    const parsed = JSON.parse(raw) as Partial<ColSpec>
    const left = Number(parsed.left)
    const center = Number(parsed.center)
    const right = Number(parsed.right)
    if (!Number.isFinite(left) || !Number.isFinite(center) || !Number.isFinite(right)) return false
    const total = availableWidth()
    const sum = left + center + right
    if (sum <= 0 || total <= 0) return false
    const scale = total / sum
    leftPx.value = Math.max(props.min.left, left * scale)
    rightPx.value = Math.max(props.min.right, right * scale)
    centerPx.value = Math.max(props.min.center, total - leftPx.value - rightPx.value)
    return true
  }
  catch {
    return false
  }
}

function persist() {
  if (typeof localStorage === 'undefined') return
  const payload: ColSpec = {
    left: leftPx.value,
    center: centerPx.value,
    right: rightPx.value,
  }
  try {
    localStorage.setItem(storageKey.value, JSON.stringify(payload))
  }
  catch {
    // quota or privacy mode — silent
  }
}

function measure() {
  if (!containerRef.value) return
  containerWidth.value = containerRef.value.clientWidth
  if (typeof window !== 'undefined') {
    isMobile.value = window.matchMedia('(max-width: 1023px)').matches
  }
}

function enforceMins() {
  const total = availableWidth()
  if (total <= 0) return
  const sum = leftPx.value + centerPx.value + rightPx.value
  if (sum === total) return
  // proportional scale so 3 columns always exactly fill total
  const scale = sum > 0 ? total / sum : 1
  let left = Math.max(props.min.left, leftPx.value * scale)
  let right = Math.max(props.min.right, rightPx.value * scale)
  let center = Math.max(props.min.center, total - left - right)
  if (left + center + right > total) {
    const overflow = left + center + right - total
    const shrinkLeft = Math.min(left - props.min.left, overflow / 2)
    const shrinkRight = Math.min(right - props.min.right, overflow / 2)
    left -= shrinkLeft
    right -= shrinkRight
    center = Math.max(props.min.center, total - left - right)
  }
  leftPx.value = left
  rightPx.value = right
  centerPx.value = center
}

interface DragState {
  side: 'left' | 'right'
  startX: number
  startLeft: number
  startCenter: number
  startRight: number
  pointerId: number
  target: HTMLElement | null
}
let drag: DragState | null = null

function onPointerDown(side: 'left' | 'right', evt: PointerEvent) {
  if (isMobile.value) return
  evt.preventDefault()
  drag = {
    side,
    startX: evt.clientX,
    startLeft: leftPx.value,
    startCenter: centerPx.value,
    startRight: rightPx.value,
    pointerId: evt.pointerId,
    target: evt.currentTarget as HTMLElement,
  }
  drag.target?.setPointerCapture?.(evt.pointerId)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
  window.addEventListener('pointercancel', onPointerUp, { once: true })
}

function onPointerMove(evt: PointerEvent) {
  if (!drag) return
  const dx = evt.clientX - drag.startX
  if (drag.side === 'left') {
    const proposedLeft = drag.startLeft + dx
    const newLeft = Math.max(props.min.left, proposedLeft)
    const delta = newLeft - drag.startLeft
    const newCenter = drag.startCenter - delta
    if (newCenter < props.min.center) return
    leftPx.value = newLeft
    centerPx.value = newCenter
  }
  else {
    const proposedRight = drag.startRight - dx
    const newRight = Math.max(props.min.right, proposedRight)
    const delta = newRight - drag.startRight
    const newCenter = drag.startCenter - delta
    if (newCenter < props.min.center) return
    rightPx.value = newRight
    centerPx.value = newCenter
  }
}

function onPointerUp() {
  if (drag?.target && drag.pointerId !== undefined) {
    try { drag.target.releasePointerCapture?.(drag.pointerId) }
    catch { /* noop */ }
  }
  drag = null
  window.removeEventListener('pointermove', onPointerMove)
  persist()
}

function nudge(side: 'left' | 'right', direction: -1 | 1) {
  const delta = KEY_STEP_PX * direction
  if (side === 'left') {
    const newLeft = direction > 0
      ? Math.min(leftPx.value + delta, leftPx.value + (centerPx.value - props.min.center))
      : Math.max(props.min.left, leftPx.value + delta)
    const realDelta = newLeft - leftPx.value
    if (realDelta === 0) return
    leftPx.value = newLeft
    centerPx.value -= realDelta
  }
  else {
    const newRight = direction < 0
      ? Math.min(rightPx.value - delta, rightPx.value + (centerPx.value - props.min.center))
      : Math.max(props.min.right, rightPx.value - delta)
    const realDelta = newRight - rightPx.value
    if (realDelta === 0) return
    rightPx.value = newRight
    centerPx.value -= realDelta
  }
  persist()
}

function onDividerKey(side: 'left' | 'right', evt: KeyboardEvent) {
  if (evt.key === 'ArrowLeft') {
    evt.preventDefault()
    nudge(side, -1)
  }
  else if (evt.key === 'ArrowRight') {
    evt.preventDefault()
    nudge(side, 1)
  }
}

function resetDefaults() {
  if (typeof localStorage !== 'undefined') {
    try { localStorage.removeItem(storageKey.value) }
    catch { /* noop */ }
  }
  measure()
  if (!isMobile.value) applyDefaults()
}

defineExpose({ resetDefaults })

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  measure()
  if (!isMobile.value) {
    if (!loadSaved()) applyDefaults()
    else enforceMins()
  }
  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      const wasMobile = isMobile.value
      measure()
      if (isMobile.value) return
      if (wasMobile) {
        if (!loadSaved()) applyDefaults()
      }
      else {
        enforceMins()
      }
    })
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<style scoped>
.rtc-container {
  display: grid;
  width: 100%;
  min-height: 0;
  gap: 0;
}
.rtc-container.is-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rtc-pane {
  min-width: 0;
  min-height: 0;
  overflow: auto;
  scrollbar-width: thin;
}
.rtc-left {
  padding-right: 0.5rem;
}
.rtc-right {
  padding-left: 0.5rem;
}
.rtc-divider {
  background: transparent;
  border: none;
  cursor: col-resize;
  position: relative;
  touch-action: none;
  padding: 0;
  width: 6px;
  align-self: stretch;
}
.rtc-divider::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 2px;
  right: 2px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.15s ease;
}
.rtc-divider:hover::before,
.rtc-divider:focus-visible::before {
  background: rgba(0, 251, 251, 0.5);
  box-shadow: 0 0 8px rgba(0, 251, 251, 0.4);
}
.rtc-divider:focus-visible {
  outline: none;
}
.rtc-mobile-pane {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(8px);
}
.rtc-mobile-summary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: rgb(220, 184, 255);
  list-style: none;
}
.rtc-mobile-summary::-webkit-details-marker {
  display: none;
}
.rtc-mobile-body {
  padding: 0 1rem 1rem 1rem;
}
</style>
