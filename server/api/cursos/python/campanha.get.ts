import type { CampaignPayload, GameModule, InventoryCatalog } from '../../../../app/types/course'
import { readPythonJson } from '../../../utils/course-data'

export default defineEventHandler(async (event): Promise<CampaignPayload> => {
  const { modulo: moduloQ } = getQuery(event)
  const moduloNum = Number(moduloQ) || 1
  const validModulo = [1, 2, 3].includes(moduloNum) ? moduloNum : 1

  const [modulo, inventario] = await Promise.all([
    readPythonJson<GameModule>(`game/modulo${validModulo}.json`),
    readPythonJson<InventoryCatalog>('game/inventario.json'),
  ])

  return { modulo, inventario }
})
