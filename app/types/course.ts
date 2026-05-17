// Subtipos canônicos — fonte de verdade: arquivos JSON das aulas (modulo*/aula-*.json)
export type LessonSubtype =
  | 'conceito'   // aula teórica regular
  | 'aprendiz'   // trilha guiada em sala, 5 desafios
  | 'aventura'   // trilha autônoma, 5 desafios
  | 'guardiao'   // revisão acumulativa, 10 desafios
  | 'grupo'      // expedição em grupo (5 integrantes)
  | 'boss'       // avaliação prática principal do bloco
  | 'prova'      // banco de 20 questões, sorteio de 5
export type LessonKind = 'A' | 'E' | 'P'
export type QuestStatus = 'completed' | 'active' | 'locked'

export interface InventoryItem {
  id: string
  tipo: string
  nome: string
  descricao: string
  exemplo?: string
}

export interface ModuleQuest {
  numero: number
  tipo_aula: LessonKind
  subtipo?: LessonSubtype
  titulo: string
  arquivo: string
  rotulo?: string
  obrigatoria?: boolean
  inventario_novo: InventoryItem[]
  premio: null | {
    pontuacao?: number
    recursos?: string[]
    descricao_md?: string
  }
}

export interface GameModule {
  modulo: number
  titulo: string
  schema: number
  aulas: ModuleQuest[]
}

export interface InventoryCategory {
  id: number
  nome: string
  modulo: number | null
}

export interface Superpower {
  id: string
  icone: string
  titulo: string
  categoria: number
  desbloqueio: string | null
  descricao: string
}

export interface InventoryCatalog {
  titulo: string
  schema: number
  categorias: InventoryCategory[]
  superpoderes: Superpower[]
}

export interface MarkdownSection {
  texto_md?: string
  enunciado_md?: string
  titulo?: string
  title?: string
  python?: string
  [key: string]: unknown
}

export interface Lesson {
  id: string
  curso: string
  modulo: number
  aula: number
  numero: number
  tipo: 'Aula' | 'Trilha' | 'Masmorra'
  subtipo: LessonSubtype
  titulo: string
  subtitulo?: string
  objetivo?: string
  duracao?: string
  tags?: string[]
  secoes: Record<string, unknown>
  premio?: unknown
  avaliacao?: unknown
}

export interface CampaignPayload {
  modulo: GameModule
  inventario: InventoryCatalog
}
