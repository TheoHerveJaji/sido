/* ══════════════════════════════════════════════════════════════
   Middleware global d'authentification
   - Protège toutes les routes sauf /login
   - Vérifie le rôle ADMIN pour /admin/*
   - Vérifie l'accès domaine SOTREL pour /sotrel/*
   ══════════════════════════════════════════════════════════════ */

// Routes accessibles sans authentification
const PUBLIC_ROUTES = ['/login']

export default defineNuxtRouteMiddleware((to) => {
  const { user, isAdmin, userDomains } = useAuth()

  // Autoriser les routes publiques
  if (PUBLIC_ROUTES.includes(to.path)) return

  // Rediriger vers /login si non authentifié
  if (!user.value) {
    return navigateTo('/login')
  }

  // Protéger les routes /admin/* — réservées aux ADMIN
  if (to.path.startsWith('/admin') && !isAdmin.value) {
    return navigateTo('/')
  }

  // Vérifier l'accès au domaine SOTREL
  if (to.path.startsWith('/sotrel') && !userDomains.value.includes('SOTREL') && !isAdmin.value) {
    return navigateTo('/')
  }
})
