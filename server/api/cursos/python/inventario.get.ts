import type { InventoryCatalog } from '../../../../app/types/course'
import { readPythonJson } from '../../../utils/course-data'

export default defineEventHandler(async (): Promise<InventoryCatalog> => {
  return readPythonJson<InventoryCatalog>('game/inventario.json')
})
