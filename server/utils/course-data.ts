import { readFile } from 'node:fs/promises'
import { join, normalize } from 'node:path'

const courseRoot = join(process.cwd(), 'data', 'cursos', 'python')

export async function readPythonJson<T>(relativePath: string): Promise<T> {
  const normalized = normalize(relativePath)

  if (normalized.startsWith('..') || normalized.startsWith('/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Caminho de curso inválido.',
    })
  }

  const raw = await readFile(join(courseRoot, normalized), 'utf8')
  return JSON.parse(raw) as T
}
