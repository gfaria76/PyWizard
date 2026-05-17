// Middleware de rota: garante que apenas professores acessam /professor/*
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }
  if (auth.aluno?.perfil !== 'professor') {
    return navigateTo('/')
  }
})
