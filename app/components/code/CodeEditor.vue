<template>
  <div class="flex flex-col h-full gap-4 w-full">
    <!-- Code Editor Glass Panel -->
    <div class="level-1-panel rounded-lg flex flex-col flex-grow overflow-hidden relative group border border-primary-container/30">
      
      <!-- Target Overlay (Hover intent) -->
      <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[linear-gradient(rgba(0,251,251,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,251,251,0.2)_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
      
      <div class="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-outline-variant/50 relative z-10">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary-container text-[18px]">code_blocks</span>
          <span class="font-label-caps text-label-caps text-on-surface">{{ label ?? 'spell_book.py' }}</span>
        </div>
        <div class="flex gap-2">
          <button class="w-3 h-3 rounded-full bg-error-container hover:bg-error transition-colors" @click="resetEditor"></button>
          <button class="w-3 h-3 rounded-full bg-tertiary-fixed-dim hover:bg-tertiary-fixed transition-colors"></button>
          <button class="w-3 h-3 rounded-full bg-primary-container hover:bg-primary transition-colors"></button>
        </div>
      </div>
      
      <div class="flex-grow bg-[#0f111a] font-code-md text-code-md text-on-surface relative overflow-auto z-10">
        <!-- CodeMirror injects here -->
        <div ref="editorEl" class="h-full w-full" />
      </div>
      
      <!-- Action Bar -->
      <div class="bg-surface-container-high px-4 py-3 flex justify-end gap-4 border-t border-outline-variant/50 relative z-10">
        <button
          class="font-label-caps text-label-caps text-on-surface-variant hover:text-on-surface px-4 py-2 transition-colors border border-outline-variant/50 rounded flex items-center gap-2 disabled:opacity-50"
          :disabled="running || pyodide.initializing.value || submitting"
          @click="run"
        >
          <span class="material-symbols-outlined text-[18px]">{{ pyodide.initializing.value ? 'hourglass_empty' : 'bug_report' }}</span>
          {{ pyodide.initializing.value ? 'Loading Mana...' : 'Debug Cast' }}
        </button>
        <button
          v-if="submissionMeta && testCases?.length"
          class="bg-primary-container text-on-primary-container font-label-caps text-label-caps px-6 py-2 rounded hover:shadow-[0_0_15px_rgba(0,251,251,0.6)] transition-all flex items-center gap-2 disabled:opacity-50"
          :disabled="submitting || running || pyodide.initializing.value"
          @click="submitSolution"
        >
          <span class="material-symbols-outlined text-[18px]">play_arrow</span>
          Execute Spell
        </button>
      </div>
    </div>

    <!-- Oracle Console (Output) -->
    <CodeOracleConsole
      :output="output"
      :verdict="verdict"
      :submission-result="submissionResult"
    />
  </div>

  <!-- Stdin dialog — shown when code uses input() -->
  <UModal v-model:open="showInputDialog">
    <template #content>
      <div class="p-6 bg-surface-container border border-primary-container/30 rounded-xl">
        <div class="mb-4 flex items-center gap-3">
          <span class="material-symbols-outlined text-primary-container text-[32px]">keyboard</span>
          <div>
            <h3 class="font-headline-sm text-primary">Oracle's Demand</h3>
            <p class="font-body-md text-on-surface-variant text-sm">Provide the necessary inputs for the spell.</p>
          </div>
        </div>

        <textarea
          ref="stdinTextareaEl"
          v-model="stdinDraft"
          rows="4"
          placeholder="One input per line..."
          class="w-full resize-none rounded bg-[#0b1326] border border-outline-variant/30 p-3 font-code-md text-on-surface focus:border-primary-container focus:outline-none"
          @keydown.ctrl.enter.prevent="confirmAndRun"
        />
        <p class="mt-1.5 text-right text-[10px] text-on-surface-variant">Ctrl+Enter to cast</p>

        <div class="mt-5 flex justify-end gap-2">
          <button class="px-4 py-2 rounded text-on-surface-variant hover:bg-surface-variant transition-colors" @click="showInputDialog = false">
            Cancel
          </button>
          <button class="bg-primary-container text-on-primary-container font-label-caps px-4 py-2 rounded flex items-center gap-2 hover:shadow-[0_0_10px_rgba(0,251,251,0.5)]" @click="confirmAndRun">
            <span class="material-symbols-outlined text-[18px]">play_arrow</span> Proceed
          </button>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { EditorView, lineNumbers, drawSelection, highlightActiveLine, highlightActiveLineGutter, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { syntaxHighlighting, indentOnInput, bracketMatching } from '@codemirror/language'
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { python } from '@codemirror/lang-python'
import { oneDark, oneDarkHighlightStyle } from '@codemirror/theme-one-dark'
import type { PyRunResult } from '~/composables/usePyodide'

export interface TestCase {
  stdin?: string
  expectedOutput: string
}

interface Verdict {
  passed: boolean
  passedCount: number
  total: number
  firstFail: { stdin: string, expected: string, actual: string } | null
}

interface SubmissionMeta {
  questSlug: string
  desafioId?: string
  tipoAula: 'A' | 'E' | 'P'
}

interface SubmissionResponse {
  aceito: boolean
  tentativa: number
  recompensa: { xp_ganho: number, moedas_ganhas: number, hp_perdido: number, level_up: boolean, novo_level: number }
  progresso: Record<string, unknown>
  verdict: { passed: boolean, passed_count: number, total: number }
}

const props = defineProps<{
  language?: string
  initialCode?: string
  label?: string
  testCases?: TestCase[]
  /** Quando definido, exibe botão "Submeter" que chama /api/submissoes. */
  submissionMeta?: SubmissionMeta
}>()

const emit = defineEmits<{
  submitted: [result: SubmissionResponse]
}>()

const editorEl = ref<HTMLElement>()
const stdinTextareaEl = ref<HTMLTextAreaElement>()
let editorView: EditorView | null = null

const toast = useToast()
const progress = useProgressStore()
const pyodide = usePyodide()
const currentCode = ref(props.initialCode ?? '')
const stdin = ref('')
const stdinDraft = ref('')
const showInputDialog = ref(false)
const running = ref(false)
const submitting = ref(false)
const output = ref<PyRunResult | null>(null)
const verdict = ref<Verdict | null>(null)
const submissionResult = ref<SubmissionResponse | null>(null)

const needsInput = computed(() => /\binput\s*\(/.test(currentCode.value))
const lang = computed(() => props.language ?? 'python')

watch(showInputDialog, (open) => {
  if (open) {
    nextTick(() => stdinTextareaEl.value?.focus())
  }
})

const cgTheme = EditorView.theme({
  '&': { background: 'var(--color-surface-container-lowest)' },
  '.cm-content': {
    padding: '1rem',
    minHeight: '10rem',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: '0.875rem',
  },
  '.cm-line': { lineHeight: '1.75' },
  '.cm-scroller': { overflow: 'auto' },
  '.cm-gutters': {
    background: 'var(--color-surface-dim)',
    color: 'var(--color-on-surface-variant)',
    border: 'none',
    borderRight: '1px solid rgba(0,251,251,0.08)',
  },
  '.cm-activeLineGutter': { background: 'rgba(76,215,246,0.06)' },
  '.cm-activeLine': { background: 'rgba(76,215,246,0.04)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    background: 'rgba(76,215,246,0.2)',
  },
  '.cm-cursor': { borderLeftColor: '#4cd7f6' },
  '&.cm-focused': { outline: 'none' },
})

onMounted(() => {
  if (!editorEl.value) return

  editorView = new EditorView({
    state: EditorState.create({
      doc: props.initialCode ?? '',
      extensions: [
        history(),
        lineNumbers(),
        drawSelection(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        syntaxHighlighting(oneDarkHighlightStyle),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          ...completionKeymap,
          indentWithTab,
        ]),
        python(),
        oneDark,
        cgTheme,
        EditorView.updateListener.of((u) => {
          if (u.docChanged) {
            currentCode.value = u.state.doc.toString()
            output.value = null
            verdict.value = null
          }
        }),
      ],
    }),
    parent: editorEl.value,
  })
})

onUnmounted(() => editorView?.destroy())

function resetEditor() {
  editorView?.dispatch({
    changes: { from: 0, to: editorView.state.doc.length, insert: props.initialCode ?? '' },
  })
  stdin.value = ''
  stdinDraft.value = ''
  output.value = null
  verdict.value = null
}

function normalize(s: string) {
  return s.trim().replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '')
}

async function execute(code: string, stdinVal: string): Promise<PyRunResult> {
  if (lang.value === 'python') {
    return pyodide.runPython(code, stdinVal)
  }
  return $fetch<PyRunResult>('/api/run', {
    method: 'POST',
    body: { language: lang.value, code, stdin: stdinVal },
  })
}

async function doExecute() {
  const code = editorView?.state.doc.toString() ?? ''
  running.value = true
  output.value = null
  verdict.value = null

  try {
    if (props.testCases?.length) {
      const results = await Promise.all(
        props.testCases.map(tc => execute(code, tc.stdin ?? '')),
      )

      let passedCount = 0
      let firstFail: Verdict['firstFail'] = null

      results.forEach((r, i) => {
        const tc = props.testCases![i]!
        if (normalize(r.stdout) === normalize(tc.expectedOutput)) {
          passedCount++
        }
        else if (!firstFail) {
          firstFail = {
            stdin: tc.stdin ?? '',
            expected: tc.expectedOutput.trim(),
            actual: r.stdout.trim() || r.stderr.trim(),
          }
        }
      })

      const failIdx = results.findIndex((r, i) => normalize(r.stdout) !== normalize(props.testCases![i]!.expectedOutput))
      output.value = results[failIdx >= 0 ? failIdx : 0] ?? null
      verdict.value = { passed: passedCount === props.testCases!.length, passedCount, total: props.testCases!.length, firstFail }
    }
    else {
      output.value = await execute(code, stdin.value)
    }
  }
  finally {
    running.value = false
  }
}

async function run() {
  const code = editorView?.state.doc.toString() ?? ''
  if (!code.trim()) return

  if (needsInput.value && !props.testCases?.length) {
    stdinDraft.value = stdin.value
    showInputDialog.value = true
    return
  }

  await doExecute()
}

async function confirmAndRun() {
  stdin.value = stdinDraft.value
  showInputDialog.value = false
  await doExecute()
}

async function submitSolution() {
  if (!props.submissionMeta || !props.testCases?.length) return
  const code = editorView?.state.doc.toString() ?? ''
  if (!code.trim()) return

  submitting.value = true
  submissionResult.value = null

  try {
    const result = await $fetch<SubmissionResponse>('/api/submissoes', {
      method: 'POST',
      body: {
        quest_slug: props.submissionMeta.questSlug,
        desafio_id: props.submissionMeta.desafioId,
        tipo_aula: props.submissionMeta.tipoAula,
        codigo: code,
        casos_de_teste: props.testCases.map(tc => ({
          stdin: tc.stdin ?? '',
          expectedOutput: tc.expectedOutput,
        })),
      },
    })

    submissionResult.value = result
    progress.syncFromBackend(result.progresso as Parameters<typeof progress.syncFromBackend>[0])
    emit('submitted', result)

    if (result.aceito) {
      toast.add({
        title: result.recompensa.level_up ? `⬆ Nível ${result.recompensa.novo_level}!` : 'Submissão aceita!',
        description: `+${result.recompensa.xp_ganho} XP  +${result.recompensa.moedas_ganhas} 🪙`,
        color: 'success',
        duration: 4000,
      })
    }
    else {
      toast.add({
        title: 'Código rejeitado',
        description: `−1 ❤️  Tentativa ${result.tentativa}`,
        color: 'error',
        duration: 3500,
      })
    }
  }
  catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    toast.add({ title: 'Erro ao submeter', description: msg, color: 'error' })
  }
  finally {
    submitting.value = false
  }
}
</script>