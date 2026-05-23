import { readFile, readdir } from 'node:fs/promises'
import { join, normalize, dirname, basename } from 'node:path'

const courseRoot = join(process.cwd(), 'data', 'cursos', 'python')

export async function readPythonJson<T>(relativePath: string): Promise<T> {
  const normalized = normalize(relativePath)

  if (normalized.startsWith('..') || normalized.startsWith('/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Caminho de curso inválido.',
    })
  }

  const resolved = await resolveFsPath(normalized)
  const raw = await readFile(resolved, 'utf8')
  return JSON.parse(raw) as T
}

async function resolveFsPath(relativePath: string): Promise<string> {
  const direct = join(courseRoot, relativePath)
  try {
    await readFile(direct, 'utf8')
    return direct
  } catch {}

  const parentRel = dirname(relativePath)
  const fileName = basename(relativePath)
  const parentAbs = join(courseRoot, parentRel)

  try {
    const entries = await readdir(parentAbs, { withFileTypes: true })
    const nucleoDirs = entries
      .filter(entry => entry.isDirectory() && /^nucleo\d+$/i.test(entry.name))
      .map(entry => entry.name)
      .sort()

    for (const nucleo of nucleoDirs) {
      const candidate = join(parentAbs, nucleo, fileName)
      try {
        await readFile(candidate, 'utf8')
        return candidate
      } catch {}
    }
  } catch {}

  return direct
}
