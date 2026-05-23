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

const subtypeOrder = ['conceito', 'aprendiz', 'aventura', 'guardiao', 'grupo', 'boss', 'prova']
const optionalSubtypes = new Set(['aventura', 'guardiao', 'grupo'])

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
  lessonNumber: number,
): Promise<CourseLessonPayload | null> {
  const [catalogo, modulos] = await Promise.all([
    listCourseCatalog(),
    readCourseModules(courseId),
  ])

  const curso = catalogo.find(item => item.id === courseId)
  const modulo = modulos.find(item => item.numero === moduleNumber)
  const aula = modulo?.aulas.find(item => item.numero === lessonNumber)

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
  const groups = new Map<number, ModuleQuest[]>()

  for (const quest of quests) {
    const lessonNumber = Number(quest.numero)
    if (!Number.isFinite(lessonNumber)) {
      continue
    }

    if (!groups.has(lessonNumber)) {
      groups.set(lessonNumber, [])
    }
    groups.get(lessonNumber)!.push(quest)
  }

  return Array.from(groups.entries())
    .sort((left, right) => left[0] - right[0])
    .map(([numero, lessonQuests]) => {
      const sortedQuests = [...lessonQuests].sort((left, right) => {
        return subtypeIndex(getSubtype(left)) - subtypeIndex(getSubtype(right))
      })

      const conceptQuest = sortedQuests.find(quest => getSubtype(quest) === 'conceito')
      const titulo = conceptQuest?.titulo ?? sortedQuests[0]?.titulo ?? `Aula ${String(numero).padStart(2, '0')}`

      return {
        numero,
        nucleo: Math.floor(numero / 10),
        titulo,
        atividades: sortedQuests.map(toActivitySummary),
      }
    })
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
  const match = quest.arquivo.match(/aula-[\w-]+-([a-z_]+)\.json$/i)
  if (match?.[1]) {
    return match[1].toLowerCase()
  }
  if (quest.arquivo.toLowerCase().includes('prova')) {
    return 'prova'
  }
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
