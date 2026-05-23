import type { CourseCatalogEntry } from '~~/app/types/selection'
import { listCourseCatalog } from '~~/server/utils/course-catalog'

export default defineEventHandler(async (): Promise<CourseCatalogEntry[]> => {
  return listCourseCatalog()
})
