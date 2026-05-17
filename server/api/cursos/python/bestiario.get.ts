import fs from 'fs'
import path from 'path'

export default defineEventHandler(async () => {
  try {
    const filePath = path.join(process.cwd(), 'data/cursos/python/game/bestiario.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading bestiary:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load bestiary data'
    })
  }
})
