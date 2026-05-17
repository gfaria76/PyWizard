<template>
  <div class="overflow-hidden rounded-2xl border border-slate-600/30">
    <!-- Toolbar -->
    <div class="flex items-center justify-between border-b border-slate-600/20 bg-[#0b1729] px-4 py-2">
      <span class="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <UIcon name="i-lucide-code-2" class="h-4 w-4 text-orange-400" />
        {{ label ?? 'Editor HTML' }}
      </span>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1 rounded-lg border border-slate-600/30 bg-black/20 p-0.5">
          <button
            v-for="t in tabs"
            :key="t.id"
            class="rounded-md px-2.5 py-1 text-[0.72rem] font-semibold transition"
            :class="activeTab === t.id ? 'bg-cyan-400/15 text-cyan-300' : 'text-slate-500 hover:text-slate-300'"
            @click="activeTab = t.id"
          >
            {{ t.label }}
          </button>
        </div>
        <UButton size="xs" variant="ghost" color="neutral" @click="resetCode">
          Resetar
        </UButton>
      </div>
    </div>

    <div class="flex" :class="activeTab === 'split' ? 'min-h-[320px]' : ''">
      <!-- Editor pane -->
      <div
        v-show="activeTab !== 'preview'"
        :class="activeTab === 'split' ? 'w-1/2 border-r border-slate-600/20' : 'w-full'"
      >
        <textarea
          ref="textareaEl"
          v-model="code"
          spellcheck="false"
          class="h-full min-h-[320px] w-full resize-none bg-[#050a13] p-4 font-mono text-sm leading-7 text-[#d7e9ff] focus:outline-none"
          placeholder="<!-- Escreva seu HTML aqui -->"
          @keydown.tab.prevent="insertTab"
        />
      </div>

      <!-- Preview pane -->
      <div
        v-show="activeTab !== 'editor'"
        :class="activeTab === 'split' ? 'w-1/2' : 'w-full'"
        class="min-h-[320px] bg-white"
      >
        <iframe
          ref="iframeEl"
          sandbox="allow-scripts"
          class="h-full min-h-[320px] w-full"
          title="Preview HTML"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  initialCode?: string
  label?: string
}>()

const tabs = [
  { id: 'editor', label: 'Código' },
  { id: 'split', label: 'Split' },
  { id: 'preview', label: 'Preview' },
] as const

type Tab = typeof tabs[number]['id']

const activeTab = ref<Tab>('split')
const code = ref(props.initialCode ?? '')
const textareaEl = ref<HTMLTextAreaElement>()
const iframeEl = ref<HTMLIFrameElement>()

function updatePreview() {
  if (!iframeEl.value) return
  const doc = iframeEl.value.contentDocument ?? iframeEl.value.contentWindow?.document
  if (!doc) return
  doc.open()
  doc.write(code.value)
  doc.close()
}

// Debounced live preview update
let previewTimer: ReturnType<typeof setTimeout>
watch(code, () => {
  clearTimeout(previewTimer)
  previewTimer = setTimeout(updatePreview, 350)
})

watch(activeTab, (tab) => {
  if (tab === 'preview' || tab === 'split') {
    nextTick(updatePreview)
  }
})

onMounted(() => {
  updatePreview()
})

function resetCode() {
  code.value = props.initialCode ?? ''
}

function insertTab(e: KeyboardEvent) {
  const el = e.target as HTMLTextAreaElement
  const start = el.selectionStart
  const end = el.selectionEnd
  code.value = code.value.slice(0, start) + '  ' + code.value.slice(end)
  nextTick(() => {
    el.selectionStart = el.selectionEnd = start + 2
  })
}
</script>
