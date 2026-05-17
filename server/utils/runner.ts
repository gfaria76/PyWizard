// Runner Python server-side via Piston.
//
// Reusa `getPistonRuntime` de pistonRuntimes.ts. Executa código com stdin
// e timeout configurável. Retorna estrutura uniforme — quem chama decide o que
// é "aceito" (comparando stdout com expectedOutput).
//
// Por que server-side se o CodeRunner já roda Pyodide client-side? Confiança:
// para o motor de combate (que gera XP/moedas), precisamos validar a execução
// no servidor — cliente pode ser manipulado.

import { getPistonRuntime } from './pistonRuntimes'

interface PistonResponse {
  run: { stdout: string, stderr: string, code: number, signal: string | null }
  compile?: { stdout: string, stderr: string, code: number }
  message?: string
}

export interface RunResult {
  stdout: string
  stderr: string
  exitCode: number
  signal: string | null
  /** True se Piston abortou por timeout (signal=SIGKILL ou similar). */
  timedOut: boolean
}

export async function executePython(code: string, stdin: string): Promise<RunResult> {
  const config = useRuntimeConfig()
  const runtime = await getPistonRuntime(config.pistonUrl, 'python')

  if (!runtime) {
    throw createError({
      statusCode: 502,
      statusMessage: `Python não disponível no Piston em ${config.pistonUrl}.`,
    })
  }

  let piston: PistonResponse
  try {
    piston = await $fetch<PistonResponse>(config.pistonUrl, {
      method: 'POST',
      timeout: Number(config.runTimeoutMs) + 3000,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ content: code }],
        stdin,
        run_timeout: Number(config.runTimeoutMs),
        compile_timeout: 12_000,
      }),
    })
  }
  catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    throw createError({ statusCode: 502, statusMessage: `Piston indisponível: ${msg}` })
  }

  if (piston.message) {
    throw createError({ statusCode: 422, statusMessage: piston.message })
  }

  const compileErr = (piston.compile?.code ?? 0) !== 0 ? (piston.compile?.stderr ?? '') : ''
  const signal = piston.run.signal

  return {
    stdout: piston.run.stdout ?? '',
    stderr: compileErr || (piston.run.stderr ?? ''),
    exitCode: piston.run.code ?? 0,
    signal,
    timedOut: signal === 'SIGKILL' || signal === 'SIGTERM',
  }
}

/** Normaliza saída para comparação tolerante a whitespace de trailing/EOL. */
export function normalizeOutput(s: string): string {
  return s.trim().replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '')
}

export interface TestCase {
  stdin?: string
  expectedOutput: string
}

export interface CaseResult {
  passed: boolean
  stdin: string
  expected: string
  actual: string
  stderr: string
}

/** Executa todos os casos de teste em paralelo e devolve resultados granulares. */
export async function runTestCases(code: string, cases: TestCase[]): Promise<CaseResult[]> {
  const results = await Promise.all(
    cases.map(async (tc) => {
      const r = await executePython(code, tc.stdin ?? '')
      const expected = normalizeOutput(tc.expectedOutput)
      const actual = normalizeOutput(r.stdout)
      return {
        passed: expected === actual && r.exitCode === 0 && !r.timedOut,
        stdin: tc.stdin ?? '',
        expected,
        actual: r.stdout,
        stderr: r.stderr,
      } satisfies CaseResult
    }),
  )
  return results
}
