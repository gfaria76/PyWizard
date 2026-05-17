// Maps our language IDs → Piston language names
export const LANGUAGE_ALIASES: Record<string, string> = {
  python: 'python',
  java: 'java',
  javascript: 'node',       // Piston uses "node" for JS
  typescript: 'typescript',
  c: 'gcc',                 // Piston uses "gcc" for C
  cpp: 'gcc',               // and "g++" for C++ — override per call if needed
}

interface PistonRuntime {
  language: string
  version: string
  aliases?: string[]
}

let cached: PistonRuntime[] | null = null
let cachedAt = 0
const CACHE_TTL = 3_600_000 // 1 hour

function runtimesUrl(executeUrl: string): string {
  // http://localhost:2000/api/v2/execute → http://localhost:2000/api/v2/runtimes
  return executeUrl.replace(/\/execute$/, '/runtimes')
}

export async function getPistonRuntime(pistonExecuteUrl: string, ourLanguage: string) {
  const pistonName = LANGUAGE_ALIASES[ourLanguage] ?? ourLanguage

  if (!cached || Date.now() - cachedAt > CACHE_TTL) {
    try {
      cached = await $fetch<PistonRuntime[]>(runtimesUrl(pistonExecuteUrl))
      cachedAt = Date.now()
    }
    catch {
      cached = null
      return null
    }
  }

  if (!cached?.length) return null

  const matches = cached.filter(
    r => r.language === pistonName || r.aliases?.includes(pistonName),
  )
  return matches.at(-1) ?? null  // última = mais recente
}
