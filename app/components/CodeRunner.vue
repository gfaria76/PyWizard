<template>
  <div class="overflow-hidden rounded-2xl border border-slate-600/30">
    <!-- Toolbar -->
    <div class="flex items-center justify-between border-b border-slate-600/20 bg-[#0b1729] px-4 py-2">
      <span class="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <UIcon name="i-lucide-code-2" class="h-4 w-4 text-cyan-400" />
        {{ label ?? 'Editor de código' }}
      </span>
      <div class="flex items-center gap-1.5">
        <button
          class="rounded px-2 py-1 text-[0.72rem] font-semibold text-slate-500 transition hover:text-slate-300"
          @click="resetEditor"
        >
          Resetar
        </button>
        <UButton
          size="xs"
          color="neutral"
          variant="soft"
          :loading="running || pyodide.initializing.value"
          :disabled="running || pyodide.initializing.value || submitting"
          @click="run"
        >
          <UIcon v-if="!running && !pyodide.initializing.value" name="i-lucide-play" class="h-3.5 w-3.5" />
          {{ pyodide.initializing.value ? 'Carregando Python…' : 'Testar' }}
        </UButton>
        <!-- Botão submeter: só aparece quando submissionMeta está definido -->
        <UButton
          v-if="submissionMeta && testCases?.length"
          size="xs"
          color="primary"
          :loading="submitting"
          :disabled="submitting || running || pyodide.initializing.value"
          @click="submitSolution"
        >
          <UIcon v-if="!submitting" name="i-lucide-send" class="h-3.5 w-3.5" />
          Submeter
        </UButton>
      </div>
    </div>

    <!-- CodeMirror -->
    <div ref="editorEl" />

    <!-- Output -->
    <div v-if="output" class="border-t border-slate-600/20 bg-[#050a13] p-4">
      <div class="mb-2 flex items-center gap-2">
        <div class="h-2 w-2 rounded-full" :class="output.exitCode === 0 ? 'bg-emerald-400' : 'bg-rose-400'" />
        <span class="text-xs font-semibold" :class="output.exitCode === 0 ? 'text-emerald-400' : 'text-rose-400'">
          {{ output.exitCode === 0 ? 'Executado com sucesso' : 'Erro de execução' }}
        </span>
      </div>
      <pre v-if="output.stdout" class="whitespace-pre-wrap font-mono text-sm leading-6 text-[#d7e9ff]">{{ output.stdout }}</pre>
      <pre v-if="output.stderr" class="mt-2 whitespace-pre-wrap font-mono text-sm leading-6 text-rose-300">{{ output.stderr }}</pre>
      <p v-if="!output.stdout && !output.stderr" class="text-xs italic text-slate-500">Sem saída produzida.</p>
    </div>

    <!-- Auto-correction verdict (teste local Pyodide) -->
    <div
      v-if="verdict"
      class="border-t-2 p-4"
      :class="verdict.passed ? 'border-emerald-400/40 bg-emerald-300/6' : 'border-rose-400/40 bg-rose-300/6'"
    >
      <div class="flex items-center gap-2">
        <UIcon
          :name="verdict.passed ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
          class="h-5 w-5"
          :class="verdict.passed ? 'text-emerald-400' : 'text-rose-400'"
        />
        <span class="text-sm font-bold" :class="verdict.passed ? 'text-emerald-300' : 'text-rose-300'">
          {{ verdict.passed
            ? `Correto! ${verdict.passedCount}/${verdict.total} casos aceitos`
            : `Incorreto — ${verdict.passedCount}/${verdict.total} casos aceitos` }}
        </span>
        <span v-if="verdict.passed && submissionMeta" class="ml-auto text-xs text-slate-500">
          Clique em Submeter para registrar e ganhar XP
        </span>
      </div>
      <div v-if="!verdict.passed && verdict.firstFail" class="mt-3 grid gap-2 text-xs">
        <div v-if="verdict.firstFail.stdin" class="rounded-lg bg-black/20 p-3">
          <p class="mb-1 text-slate-500">Entrada usada:</p>
          <pre class="font-mono text-slate-300">{{ verdict.firstFail.stdin }}</pre>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg bg-black/20 p-3">
            <p class="mb-1 text-slate-500">Esperado:</p>
            <pre class="font-mono text-emerald-300">{{ verdict.firstFail.expected }}</pre>
          </div>
          <div class="rounded-lg bg-black/20 p-3">
            <p class="mb-1 text-slate-500">Obtido:</p>
            <pre class="font-mono text-rose-300">{{ verdict.firstFail.actual }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- Resultado da submissão oficial -->
    <div
      v-if="submissionResult"
      class="border-t-2 p-4"
      :class="submissionResult.aceito ? 'border-amber-400/40 bg-amber-300/4' : 'border-rose-400/40 bg-rose-300/4'"
    >
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <UIcon
            :name="submissionResult.aceito ? 'i-lucide-trophy' : 'i-lucide-shield-x'"
            class="h-5 w-5"
            :class="submissionResult.aceito ? 'text-amber-400' : 'text-rose-400'"
          />
          <span class="text-sm font-bold" :class="submissionResult.aceito ? 'text-amber-300' : 'text-rose-300'">
            {{ submissionResult.aceito ? 'Submissão aceita!' : 'Submissão rejeitada' }}
          </span>
        </div>
        <!-- Recompensas -->
        <div v-if="submissionResult.aceito" class="flex items-center gap-3 text-xs font-semibold">
          <span class="text-cyan-300">+{{ submissionResult.recompensa.xp_ganho }} XP</span>
          <span class="text-amber-300">+{{ submissionResult.recompensa.moedas_ganhas }} 🪙</span>
          <span v-if="submissionResult.recompensa.level_up" class="text-violet-300">
            ⬆ Nível {{ submissionResult.recompensa.novo_level }}!
          </span>
        </div>
        <div v-else class="text-xs font-semibold text-rose-400">
          −1 ❤️ HP
        </div>
      </div>
      <p v-if="!submissionResult.aceito" class="mt-2 text-xs text-slate-500">
        Tentativa {{ submissionResult.tentativa }} — corrija e tente novamente.
      </p>
    </div>
  </div>

  <!-- Stdin dialog — shown when code uses input() -->
  <UModal v-model:open="showInputDialog">
    <template #content>
      <div class="p-6">
        <div class="mb-4 flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
            <UIcon name="i-lucide-keyboard" class="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <h3 class="font-black text-slate-100">Entradas do programa</h3>
            <p class="text-xs text-slate-500">Digite um valor por linha, na ordem em que serão pedidos</p>
          </div>
        </div>

        <div class="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <UIcon name="i-simple-icons-python" class="h-3 w-3 text-cyan-400/60" />
          <span>O código usa <code class="font-mono text-cyan-300">input()</code></span>
        </div>
        <textarea
          ref="stdinTextareaEl"
          v-model="stdinDraft"
          rows="4"
          placeholder="Ex: João&#10;25&#10;Cuiabá"
          class="mt-1.5 w-full resize-none rounded-xl border border-slate-600/30 bg-black/40 px-3 py-2.5 font-mono text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-400/40 focus:outline-none"
          @keydown.ctrl.enter.prevent="confirmAndRun"
        />
        <p class="mt-1.5 text-right text-[0.68rem] text-slate-600">Ctrl+Enter para executar</p>

        <div class="mt-5 flex justify-end gap-2">
          <UButton variant="ghost" color="neutral" @click="showInputDialog = false">
            Cancelar
          </UButton>
          <UButton color="primary" icon="i-lucide-play" @click="confirmAndRun">
            Executar
          </UButton>
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
  '&': { background: '#050a13' },
  '.cm-content': {
    padding: '1rem',
    minHeight: '10rem',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: '0.875rem',
  },
  '.cm-line': { lineHeight: '1.75' },
  '.cm-scroller': { overflow: 'auto' },
  '.cm-gutters': {
    background: '#0b1729',
    color: '#3d5a7a',
    border: 'none',
    borderRight: '1px solid rgba(76,215,246,0.08)',
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