import type { CourseLessonPayload } from '~~/app/types/selection'
import { readLessonPayload } from '~~/server/utils/course-catalog'

export default defineEventHandler(async (event): Promise<CourseLessonPayload> => {
  const courseId = getRouterParam(event, 'curso')
  const moduleParam = getRouterParam(event, 'modulo')
  const lessonParam = getRouterParam(event, 'aula')

  const moduleNumber = Number(moduleParam)
  const lessonNumber = Number(lessonParam)

  if (!courseId || !/^[a-z0-9_-]+$/i.test(courseId) || !Number.isInteger(moduleNumber) || !Number.isInteger(lessonNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetros inválidos.',
    })
  }

  const payload = await readLessonPayload(courseId, moduleNumber, lessonNumber)

  if (!payload) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Aula não encontrada.',
    })
  }

  return payload
})
