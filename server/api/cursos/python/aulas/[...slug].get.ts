import type { Lesson } from '../../../../../app/types/course'
import { readPythonJson } from '../../../../utils/course-data'

export default defineEventHandler(async (event): Promise<Lesson> => {
  const slug = getRouterParam(event, 'slug')

  // Aceita:
  //   modulo1/nucleo1/1.1.1-conceitos          (novo)
  //   modulo1/aula-50-PROVA                    (legado: prova ainda fora de nucleo)
  //   modulo2/aula-21-conceitos                (legado: módulos ainda não migrados)
  if (!slug || !/^modulo[1-3]\/(?:nucleo[1-5]\/)?[\w.-]+$/.test(slug)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Aula não encontrada.',
    })
  }

  return readPythonJson<Lesson>(`${slug}.json`)
})
