/* ══════════════════════════════════════════════════════════════
   Middleware global d'authentification
   Protège toutes les routes sauf /login.
   Gère la persistance du domaine courant au refresh.
   ══════════════════════════════════════════════════════════════ */

const PUBLIC_ROUTES = ['/login']

export default defineNuxtRouteMiddleware((to) => {
  const { user, isAdmin, userDomains } = useAuth()
  const { currentDomain, setDomain } = useDomain()

  // ── Routes publiques : toujours accessibles ──
  if (PUBLIC_ROUTES.includes(to.path)) return

  // ── Non authentifié → redirection login ──
  if (!user.value) return navigateTo('/login')

  // ── Racine / → redirection vers /domaines ──
  if (to.path === '/') return navigateTo('/domaines')

  // ── /sotrel/* : vérifier l'accès au domaine SOTREL ──
  if (to.path.startsWith('/sotrel')) {
    // Au refresh, le domaine peut ne pas être en mémoire réactive
    // mais être encore dans sessionStorage (lu par useDomain)
    if (!currentDomain.value) {
      if (userDomains.value.includes('SOTREL') || isAdmin.value) {
        // Re-persister automatiquement le domaine
        setDomain('SOTREL')
      } else {
        return navigateTo('/domaines')
      }
    }
  }

  // ── /admin/* : réservé aux ADMIN ──
  if (to.path.startsWith('/admin') && !isAdmin.value) {
    return navigateTo('/domaines')
  }

  // ── /domaines : utilisateur authentifié OK, pas de restriction ──
})
