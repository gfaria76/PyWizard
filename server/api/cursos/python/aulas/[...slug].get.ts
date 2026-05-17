import type { Lesson } from '../../../../../app/types/course'
import { readPythonJson } from '../../../../utils/course-data'

export default defineEventHandler(async (event): Promise<Lesson> => {
  const slug = getRouterParam(event, 'slug')

  if (!slug || !/^modulo[1-3]\/aula-[\w-]+$/.test(slug)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Aula não encontrada.',
    })
  }

  return readPythonJson<Lesson>(`${slug}.json`)
})
