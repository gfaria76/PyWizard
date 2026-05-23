import type { CourseLessonPayload } from '~~/app/types/selection'
import { readLessonPayload } from '~~/server/utils/course-catalog'

export default defineEventHandler(async (event): Promise<CourseLessonPayload> => {
  const moduleNumber = Number(getRouterParam(event, 'modulo'))
  const lessonNumber = Number(getRouterParam(event, 'aula'))

  if (!Number.isInteger(moduleNumber) || !Number.isInteger(lessonNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetros inválidos.',
    })
  }

  const payload = await readLessonPayload('python', moduleNumber, lessonNumber)
  if (!payload) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Aula não encontrada.',
    })
  }

  return payload
})
