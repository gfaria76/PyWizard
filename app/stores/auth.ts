// useAuthStore — wrapper fino sobre o estado de auth do @nuxtjs/supabase.
// Expõe:
//   - user            (reativo, vem do useSupabaseUser)
//   - aluno           (perfil estendido carregado da tabela `aluno`)
//   - isAuthenticated (computed)
//   - signIn / signUp / signOut
//
// Login: chama supabase.auth.signInWithPassword diretamente (sem endpoint custom).
// Cadastro: delegado a /api/auth/cadastro.post.ts (precisa de service-role para
// validar código de acesso e criar perfil estendido atomicamente).

import type { Aluno } from '~/types/database.types'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const aluno = ref<Aluno | null>(null)
  const loadingProfile = ref(false)

  const isAuthenticated = computed(() => Boolean(user.value))

  async function loadProfile() {
    if (!user.value?.id) {
      aluno.value = null
      return
    }
    loadingProfile.value = true
    try {
      const { data, error } = await supabase
        .from('aluno')
        .select('*')
        .eq('id', user.value.id)
        .maybeSingle()
      if (error) {
        console.error('[auth] erro ao carregar perfil:', error.message)
        aluno.value = null
        return
      }
      aluno.value = data as Aluno | null
    }
    finally {
      loadingProfile.value = false
    }
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    await loadProfile()
  }

  async function signUp(nome: string, email: string, password: string, codigoAcesso?: string) {
    // Cadastro pelo backend (precisa validar código + criar perfil)
    await $fetch('/api/auth/cadastro', {
      method: 'POST',
      body: { nome, email, password, codigo_acesso: codigoAcesso },
    })
    // Após criação, faz login
    await signIn(email, password)
  }

  async function signOut() {
    await supabase.auth.signOut()
    aluno.value = null
  }

  // Recarrega perfil quando o usuário muda (login/logout)
  watch(user, () => { void loadProfile() }, { immediate: true })

  return {
    user,
    aluno,
    isAuthenticated,
    loadingProfile,
    loadProfile,
    signIn,
    signUp,
    signOut,
  }
})
