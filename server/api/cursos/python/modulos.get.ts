import type { CourseModulesPayload } from '~~/app/types/selection'
import { listCourseCatalog, readCourseModules } from '~~/server/utils/course-catalog'

export default defineEventHandler(async (): Promise<CourseModulesPayload> => {
  const [catalogo, modulos] = await Promise.all([
    listCourseCatalog(),
    readCourseModules('python'),
  ])

  const curso = catalogo.find(item => item.id === 'python')

  if (!curso) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Curso não encontrado.',
    })
  }

  return {
    curso,
    modulos,
  }
})
