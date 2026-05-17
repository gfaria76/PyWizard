import type { LessonKind, LessonSubtype, ModuleQuest } from '~/types/course'

export function getQuestSlug(quest: Pick<ModuleQuest, 'arquivo'>) {
  return quest.arquivo.replace(/\.json$/, '')
}

export function getQuestSubtype(quest: Pick<ModuleQuest, 'arquivo' | 'tipo_aula' | 'subtipo'>): LessonSubtype {
  if (quest.subtipo) return quest.subtipo

  // Fallback por nome de arquivo (boss/prova não têm subtipo no game config)
  if (quest.arquivo.includes('PROVA')) return 'prova'
  if (quest.arquivo.includes('boss')) return 'boss'
  if (quest.arquivo.includes('aprendiz')) return 'aprendiz'
  if (quest.arquivo.includes('aventura')) return 'aventura'
  if (quest.arquivo.includes('guardiao')) return 'guardiao'
  if (quest.arquivo.includes('exedicao_guilda') || quest.arquivo.includes('guilda')) return 'grupo'

  return 'conceito'
}

export function getQuestTone(subtype: LessonSubtype | string) {
  switch (subtype) {
    case 'aprendiz':
      return { label: 'Trilha do Aprendiz', icon: 'i-lucide-scroll-text', badgeColor: 'primary' as const, ring: 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100' }
    case 'aventura':
      return { label: 'Trilha da Aventura', icon: 'i-lucide-trees', badgeColor: 'success' as const, ring: 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100' }
    case 'guardiao':
      return { label: 'Trilha do Guardião', icon: 'i-lucide-shield', badgeColor: 'warning' as const, ring: 'border-amber-300/45 bg-amber-300/12 text-amber-100' }
    case 'grupo':
      return { label: 'Exedição da Guilda', icon: 'i-lucide-users', badgeColor: 'success' as const, ring: 'border-teal-300/35 bg-teal-300/10 text-teal-100' }
    case 'prova':
      return { label: 'Provação', icon: 'i-lucide-flame', badgeColor: 'warning' as const, ring: 'border-amber-300/45 bg-amber-300/12 text-amber-100' }
    case 'boss':
      return { label: 'Boss', icon: 'i-lucide-swords', badgeColor: 'error' as const, ring: 'border-rose-300/45 bg-rose-300/12 text-rose-100' }
    default:
      return { label: 'Aula', icon: 'i-lucide-scroll-text', badgeColor: 'primary' as const, ring: 'border-cyan-300/35 bg-cyan-300/10 text-cyan-100' }
  }
}

export function getLessonKindLabel(kind: LessonKind) {
  return kind === 'A' ? 'Aula guiada' : 'Evento'
}

export function isRequiredQuest(quest: Pick<ModuleQuest, 'obrigatoria'>) {
  return quest.obrigatoria !== false
}

/** Ícone Lucide temático por subtipo — usado no ConstellationMap. */
export function getQuestIcon(subtype: LessonSubtype | string): string {
  switch (subtype) {
    case 'conceito':  return 'i-lucide-scroll-text'
    case 'aprendiz':  return 'i-lucide-wand-2'
    case 'aventura':  return 'i-lucide-map'
    case 'guardiao':  return 'i-lucide-shield-check'
    case 'grupo':     return 'i-lucide-users-round'
    case 'boss':      return 'i-lucide-swords'
    case 'prova':     return 'i-lucide-crown'
    default:          return 'i-lucide-book-open'
  }
}

/** Recompensas base por subtipo — fallback offline (sem backend). */
export function getQuestRewards(quest: Pick<ModuleQuest, 'tipo_aula' | 'subtipo'>) {
  switch (quest.subtipo) {
    case 'aprendiz':  return { xp: 70,  coins: 12 }
    case 'aventura':  return { xp: 90,  coins: 18 }
    case 'guardiao':  return { xp: 120, coins: 22 }
    case 'grupo':     return { xp: 140, coins: 28 }
    case 'prova':     return { xp: 220, coins: 45 }
    case 'boss':      return { xp: 180, coins: 35 }
    default:          return quest.tipo_aula === 'A' ? { xp: 80, coins: 15 } : { xp: 180, coins: 35 }
  }
}
