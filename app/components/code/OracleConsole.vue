<template>
  <div class="level-1-panel rounded-lg shrink-0 min-h-[150px] max-h-[300px] flex flex-col overflow-hidden border border-secondary-container/30">
    <div class="bg-surface-container-highest/80 px-4 py-2 flex items-center justify-between border-b border-outline-variant/30">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-container text-[16px]">terminal</span>
        <span class="font-label-caps text-label-caps text-primary-container">Oracle Console</span>
      </div>
      <div v-if="output" class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" :class="output.exitCode === 0 ? 'bg-primary-container' : 'bg-error'" />
        <span class="font-code-md text-[10px]" :class="output.exitCode === 0 ? 'text-primary-container' : 'text-error'">
          {{ output.exitCode === 0 ? 'Success' : 'Error' }}
        </span>
      </div>
    </div>

    <div class="p-4 font-code-md text-code-md text-on-surface flex-grow bg-[#000000]/40 overflow-auto">
      <!-- Default State -->
      <div v-if="!output && !verdict && !submissionResult" class="opacity-50 italic text-sm text-on-surface-variant flex items-center gap-2">
        <span class="text-primary-container">~</span> <span class="text-tertiary-fixed-dim">$</span> Awaiting magical invocation...
      </div>

      <!-- Standard Output -->
      <template v-if="output">
        <pre v-if="output.stdout" class="whitespace-pre-wrap text-on-surface">{{ output.stdout }}</pre>
        <pre v-if="output.stderr" class="whitespace-pre-wrap text-error mt-2">{{ output.stderr }}</pre>
        <div v-if="!output.stdout && !output.stderr" class="italic text-on-surface-variant/50">Void output (None)</div>
      </template>

      <!-- Verdict Output -->
      <div v-if="verdict" class="mt-4 pt-4 border-t border-outline-variant/30">
        <div class="flex items-center gap-2 mb-2">
          <span class="material-symbols-outlined" :class="verdict.passed ? 'text-primary-container' : 'text-error'">
            {{ verdict.passed ? 'verified' : 'cancel' }}
          </span>
          <span :class="verdict.passed ? 'text-primary-container' : 'text-error'">
            {{ verdict.passed ? `All ${verdict.total} seals broken!` : `Seal failed: ${verdict.passedCount}/${verdict.total}` }}
          </span>
        </div>
        <div v-if="!verdict.passed && verdict.firstFail" class="grid gap-2 text-xs opacity-90 mt-2">
          <div class="bg-surface/50 p-2 border border-error/20 rounded">
            <span class="text-error/70 text-[10px] block mb-1">Expected:</span>
            {{ verdict.firstFail.expected }}
          </div>
          <div class="bg-surface/50 p-2 border border-outline-variant/30 rounded">
            <span class="text-on-surface-variant/70 text-[10px] block mb-1">Got:</span>
            {{ verdict.firstFail.actual }}
          </div>
        </div>
      </div>

      <!-- Submission Output -->
      <div v-if="submissionResult" class="mt-4 p-3 rounded" :class="submissionResult.aceito ? 'bg-tertiary-fixed-dim/10 border border-tertiary-fixed-dim/30' : 'bg-error-container/20 border border-error/30'">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined" :class="submissionResult.aceito ? 'text-tertiary-fixed-dim' : 'text-error'">
              {{ submissionResult.aceito ? 'workspace_premium' : 'gavel' }}
            </span>
            <span class="font-bold" :class="submissionResult.aceito ? 'text-tertiary-fixed-dim' : 'text-error'">
              {{ submissionResult.aceito ? 'Trial Conquered!' : 'Trial Failed' }}
            </span>
          </div>
          <div v-if="submissionResult.aceito" class="flex gap-3">
            <span class="text-tertiary-fixed-dim text-xs">+{{ submissionResult.recompensa.xp_ganho }} XP</span>
            <span class="text-tertiary-fixed text-xs">+{{ submissionResult.recompensa.moedas_ganhas }} G</span>
          </div>
          <div v-else class="text-error text-xs">-1 HP</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Verdict {
  passed: boolean
  passedCount: number
  total: number
  firstFail: { stdin: string, expected: string, actual: string } | null
}

interface SubmissionResponse {
  aceito: boolean
  tentativa: number
  recompensa: { xp_ganho: number, moedas_ganhas: number, hp_perdido: number, level_up: boolean, novo_level: number }
  progresso: Record<string, unknown>
  verdict: { passed: boolean, passed_count: number, total: number }
}

interface PyRunResult {
  exitCode: number
  stdout: string
  stderr: string
}

defineProps<{
  output?: PyRunResult | null
  verdict?: Verdict | null
  submissionResult?: SubmissionResponse | null
}>()
</script>
