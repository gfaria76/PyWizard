export type CourseAvailability = 'available' | 'coming_soon'

export interface CourseCatalogEntry {
  id: string
  nome: string
  descricao: string
  status: CourseAvailability
  totalModulos: number
  totalAulas: number
}

export interface CourseActivitySummary {
  id: string
  slug: string
  titulo: string
  subtipo: string
  obrigatoria: boolean
}

export interface CourseLessonSummary {
  numero: number
  nucleo: number
  titulo: string
  atividades: CourseActivitySummary[]
}

export interface CourseModuleSummary {
  numero: number
  titulo: string
  aulas: CourseLessonSummary[]
}

export interface CourseModulesPayload {
  curso: CourseCatalogEntry
  modulos: CourseModuleSummary[]
}

export interface CourseLessonPayload {
  curso: CourseCatalogEntry
  modulo: CourseModuleSummary
  aula: CourseLessonSummary
}
