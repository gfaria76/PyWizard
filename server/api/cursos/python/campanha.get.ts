import type { CampaignPayload, GameModule, InventoryCatalog } from '../../../../app/types/course'
import { readPythonJson } from '../../../utils/course-data'

export default defineEventHandler(async (): Promise<CampaignPayload> => {
  const [modulo, inventario] = await Promise.all([
    readPythonJson<GameModule>('game/modulo1.json'),
    readPythonJson<InventoryCatalog>('game/inventario.json'),
  ])

  return {
    modulo,
    inventario,
  }
})
