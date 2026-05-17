import { z } from 'zod'

// Execução via Piston self-hosted (localhost:2000 por padrão).
// Python é executado client-side via Pyodide pelo CodeRunner, mas esta rota
// aceita Python também — útil para auto-correção server-side no futuro.

const BodySchema = z.object({
  language: z.string(),
  code: z.string().max(20_000),
  stdin: z.string().max(4_000).optional().default(''),
})

interface PistonResponse {
  run: { stdout: string, stderr: string, code: number, signal: string | null }
  compile?: { stdout: string, stderr: string, code: number }
  message?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readValidatedBody(event, BodySchema.parse)

  const runtime = await getPistonRuntime(config.pistonUrl, body.language)
  if (!runtime) {
    throw createError({
      statusCode: 400,
      message: `Linguagem '${body.language}' não disponível no Piston em ${config.pistonUrl}.`,
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
        files: [{ content: body.code }],
        stdin: body.stdin,
        run_timeout: Number(config.runTimeoutMs),
        compile_timeout: 12_000,
      }),
    })
  }
  catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    throw createError({ statusCode: 502, message: `Piston indisponível: ${msg}` })
  }

  if (piston.message) {
    throw createError({ statusCode: 422, message: piston.message })
  }

  const compileErr = (piston.compile?.code ?? 0) !== 0 ? (piston.compile?.stderr ?? '') : ''

  return {
    stdout: piston.run.stdout,
    stderr: compileErr || piston.run.stderr,
    exitCode: piston.run.code ?? 0,
    signal: piston.run.signal,
  }
})
