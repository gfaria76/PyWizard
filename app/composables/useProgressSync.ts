// Composable para sincronizar progresso local com o backend via debounce.
//
// Comportamento:
//   - localStorage é sempre atualizado imediatamente pelo store.
//   - Se o usuário estiver autenticado, agenda um PUT /api/progresso/:id após 2s de inatividade.
//   - Erros são silenciosos para não quebrar o uso offline.

import type { AlunoProgresso } from '~/types/database.types'

type SyncPayload = Partial<Pick<AlunoProgresso, 'completed_quest_slugs' | 'xp' | 'coins' | 'hp' | 'mana' | 'level'>>

export function useProgressSync() {
  const user = useSupabaseUser()
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function scheduleSync(progress: SyncPayload) {
    if (!user.value?.id) return

    if (debounceTimer !== null) {
      clearTimeout(debounceTimer)
    }

    const userId = user.value.id

    debounceTimer = setTimeout(async () => {
      try {
        await $fetch(`/api/progresso/${userId}`, {
          method: 'PUT',
          body: progress,
        })
      } catch {
        // Silencioso — não quebra uso offline
      } finally {
        debounceTimer = null
      }
    }, 2000)
  }

  return { scheduleSync }
}
