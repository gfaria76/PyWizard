// Middleware global de auth.
// Rotas públicas: /, /login, /cadastro
// Demais rotas (cursos, quests, professor, masmorras…): exigem usuário autenticado.

const PUBLIC_PATHS = new Set(['/', '/login', '/cadastro'])

export default defineNuxtRouteMiddleware((to) => {
  if (PUBLIC_PATHS.has(to.path)) return

  const user = useSupabaseUser()
  if (!user.value) {
    // return navigateTo({
    //   path: '/login',
    //   query: { redirect: to.fullPath },
    // })
  }
})
