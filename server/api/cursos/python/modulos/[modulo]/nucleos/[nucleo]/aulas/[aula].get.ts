import type { CourseLessonPayload } from '~~/app/types/selection'
import { readLessonPayload } from '~~/server/utils/course-catalog'

export default defineEventHandler(async (event): Promise<CourseLessonPayload> => {
  const courseId = 'python'
  const moduleParam = getRouterParam(event, 'modulo')
  const nucleoParam = getRouterParam(event, 'nucleo')
  const aulaParam = getRouterParam(event, 'aula')

  const moduleNumber = Number(moduleParam)
  const nucleoNumber = Number(nucleoParam)
  const aulaNumber = Number(aulaParam)

  if (
    !courseId
    || !/^[a-z0-9_-]+$/i.test(courseId)
    || !Number.isInteger(moduleNumber)
    || !Number.isInteger(nucleoNumber)
    || !Number.isInteger(aulaNumber)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetros inválidos.',
    })
  }

  const payload = await readLessonPayload(courseId, moduleNumber, nucleoNumber, aulaNumber)

  if (!payload) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Aula não encontrada.',
    })
  }

  return payload
})
