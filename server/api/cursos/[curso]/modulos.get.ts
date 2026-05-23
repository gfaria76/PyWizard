import type { CourseModulesPayload } from '~~/app/types/selection'
import { listCourseCatalog, readCourseModules } from '~~/server/utils/course-catalog'

export default defineEventHandler(async (event): Promise<CourseModulesPayload> => {
  const courseId = getRouterParam(event, 'curso')

  if (!courseId || !/^[a-z0-9_-]+$/i.test(courseId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Curso inválido.',
    })
  }

  const [catalogo, modulos] = await Promise.all([
    listCourseCatalog(),
    readCourseModules(courseId),
  ])

  const curso = catalogo.find(item => item.id === courseId)

  if (!curso) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Curso não encontrado.',
    })
  }

  if (curso.status !== 'available') {
    throw createError({
      statusCode: 409,
      statusMessage: 'Curso ainda não possui módulos estruturados.',
    })
  }

  return {
    curso,
    modulos,
  }
})
