import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { GameModule, ModuleQuest } from '../../app/types/course'
import type {
  CourseActivitySummary,
  CourseCatalogEntry,
  CourseLessonPayload,
  CourseLessonSummary,
  CourseModuleSummary,
} from '../../app/types/selection'

const coursesRoot = join(process.cwd(), 'data', 'cursos')

const courseNameMap: Record<string, string> = {
  python: 'Python Arcane',
  java: 'Java Forge',
  sql: 'SQL Cluster',
  vue_vuetify: 'Vue + Vuetify Star',
}

const courseDescriptionMap: Record<string, string> = {
  python: 'Trilha completa com módulos, aulas e atividades RPG.',
  java: 'Curso em preparação.',
  sql: 'Curso em preparação.',
  vue_vuetify: 'Curso em preparação.',
}

const subtypeOrder = ['conceito', 'aprendiz', 'aventura', 'guardiao', 'grupo', 'simulado', 'boss', 'prova']
const optionalSubtypes = new Set(['aventura', 'guardiao', 'grupo', 'simulado'])

export async function listCourseCatalog(): Promise<CourseCatalogEntry[]> {
  const dirs = await readdir(coursesRoot, { withFileTypes: true })
  const courseIds = dirs
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()

  const rows = await Promise.all(courseIds.map(async (courseId): Promise<CourseCatalogEntry> => {
    const modulos = await readCourseModules(courseId)
    const totalAulas = modulos.reduce((acc, modulo) => acc + modulo.aulas.length, 0)
    const readme = await readCourseReadme(courseId)
    const nome = courseNameMap[courseId] ?? toDisplayName(courseId)
    const hasStructuredData = modulos.length > 0

    return {
      id: courseId,
      nome,
      descricao: hasStructuredData
        ? (courseDescriptionMap[courseId] ?? readme ?? 'Trilha estruturada com módulos e aulas.')
        : (readme ?? 'Curso em preparação.'),
      status: hasStructuredData ? 'available' : 'coming_soon',
      totalModulos: modulos.length,
      totalAulas,
    }
  }))

  return rows.sort((left, right) => {
    if (left.status !== right.status) {
      return left.status === 'available' ? -1 : 1
    }
    return left.nome.localeCompare(right.nome, 'pt-BR')
  })
}

export async function readCourseModules(courseId: string): Promise<CourseModuleSummary[]> {
  const gameModules = await readGameModules(courseId)
  return gameModules
    .map(modulo => ({
      numero: modulo.modulo,
      titulo: modulo.titulo,
      aulas: groupLessons(modulo.aulas),
    }))
    .sort((left, right) => left.numero - right.numero)
}

export async function readLessonPayload(
  courseId: string,
  moduleNumber: number,
  nucleoNumber: number,
  aulaNumber: number,
): Promise<CourseLessonPayload | null> {
  const [catalogo, modulos] = await Promise.all([
    listCourseCatalog(),
    readCourseModules(courseId),
  ])

  const curso = catalogo.find(item => item.id === courseId)
  const modulo = modulos.find(item => item.numero === moduleNumber)
  const aula = modulo?.aulas.find(
    item => item.nucleo === nucleoNumber && item.aula === aulaNumber,
  )

  if (!curso || !modulo || !aula) {
    return null
  }

  return { curso, modulo, aula }
}

async function readGameModules(courseId: string): Promise<GameModule[]> {
  const gameDir = join(coursesRoot, courseId, 'game')

  let files: string[]
  try {
    files = await readdir(gameDir)
  } catch {
    return []
  }

  const moduleFiles = files
    .filter(file => /^modulo\d+\.json$/i.test(file))
    .sort((left, right) => toModuleNumber(left) - toModuleNumber(right))

  const rows = await Promise.all(moduleFiles.map(async (file): Promise<GameModule | null> => {
    try {
      const raw = await readFile(join(gameDir, file), 'utf8')
      return JSON.parse(raw) as GameModule
    } catch {
      return null
    }
  }))

  return rows.filter((item): item is GameModule => Boolean(item))
}

function groupLessons(quests: ModuleQuest[]): CourseLessonSummary[] {
  const groups = new Map<string, ModuleQuest[]>()

  for (const quest of quests) {
    const numero = String(quest.numero)
    if (!numero) continue
    if (!groups.has(numero)) {
      groups.set(numero, [])
    }
    groups.get(numero)!.push(quest)
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => compareNumero(a, b))
    .map(([numero, lessonQuests]) => {
      const sortedQuests = [...lessonQuests].sort((left, right) => {
        return subtypeIndex(getSubtype(left)) - subtypeIndex(getSubtype(right))
      })

      const conceptQuest = sortedQuests.find(quest => getSubtype(quest) === 'conceito')
      const first = sortedQuests[0]
      const titulo = conceptQuest?.titulo ?? first?.titulo ?? `Aula ${numero}`

      const partes = numero.split('.').map(part => Number(part) || 0)
      const nucleo = first?.nucleo ?? partes[1] ?? 0
      const aula = first?.aula ?? partes[2] ?? 0

      return {
        numero,
        nucleo,
        aula,
        titulo,
        atividades: sortedQuests.map(toActivitySummary),
      }
    })
}

function compareNumero(a: string, b: string): number {
  const as = a.split('.').map(part => Number(part) || 0)
  const bs = b.split('.').map(part => Number(part) || 0)
  const len = Math.max(as.length, bs.length)
  for (let i = 0; i < len; i++) {
    const diff = (as[i] ?? 0) - (bs[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

function toActivitySummary(quest: ModuleQuest): CourseActivitySummary {
  const slug = quest.arquivo.replace(/\.json$/i, '')
  const subtype = getSubtype(quest)
  const activityId = quest.rotulo || slug.split('/').at(-1) || `${quest.numero}`

  return {
    id: activityId,
    slug,
    titulo: quest.titulo,
    subtipo: subtype,
    obrigatoria: !optionalSubtypes.has(subtype) && quest.obrigatoria !== false,
  }
}

function getSubtype(quest: ModuleQuest): string {
  if (quest.subtipo) {
    return String(quest.subtipo).toLowerCase()
  }
  const arquivo = quest.arquivo.toLowerCase()
  if (arquivo.includes('prova')) return 'prova'
  if (arquivo.includes('boss') || arquivo.includes('maratona')) return 'boss'
  if (arquivo.includes('labirinto_sabedoria')) return 'simulado'
  if (arquivo.includes('exedicao_guilda') || arquivo.includes('expedicao_guilda')) return 'grupo'
  const match = arquivo.match(/-([a-z_]+)\.json$/i)
  if (match?.[1]) return match[1].toLowerCase()
  return 'conceito'
}

function subtypeIndex(subtype: string): number {
  const idx = subtypeOrder.indexOf(subtype)
  return idx === -1 ? subtypeOrder.length : idx
}

function toModuleNumber(file: string): number {
  const match = file.match(/modulo(\d+)\.json$/i)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

async function readCourseReadme(courseId: string): Promise<string | null> {
  const candidates = ['README.md', 'readme.md']

  for (const filename of candidates) {
    try {
      const raw = await readFile(join(coursesRoot, courseId, filename), 'utf8')
      const firstLine = raw
        .split('\n')
        .map(line => line.trim())
        .find(Boolean)

      if (!firstLine) {
        continue
      }
      if (firstLine.toLowerCase() === 'proximo curso') {
        return 'Curso em preparação.'
      }
      return firstLine.replace(/^#+\s*/, '')
    } catch {
      continue
    }
  }

  return null
}

function toDisplayName(slug: string): string {
  return slug
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase())
}
