/* ══════════════════════════════════════════════════════════════
   Composable d'authentification — Gère le cycle complet :
   - Connexion / déconnexion via MSAL (Entra ID)
   - Synchronisation utilisateur en base (POST /api/auth/sync)
   - Timer d'inactivité de 30 minutes
   - Lecture du rôle depuis les claims du token
   ══════════════════════════════════════════════════════════════ */

import type { MsalUser, AuthSyncResponse } from '~/types/auth'

export const useAuth = () => {
  const { $msal } = useNuxtApp()

  // ── État réactif partagé (persiste entre les pages via useState) ──
  const user = useState<MsalUser | null>('auth:user', () => null)
  const accessToken = useState<string | null>('auth:token', () => null)
  const userDomains = useState<string[]>('auth:domains', () => [])

  // ── Timer d'inactivité — 30 minutes ──
  const INACTIVITY_MS = 30 * 60 * 1000
  let inactivityTimer: ReturnType<typeof setTimeout> | null = null

  /** Réinitialise le timer à chaque interaction utilisateur */
  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => logout('SESSION_EXPIRED'), INACTIVITY_MS)
  }

  // ── Computed ──
  const isAdmin = computed(() => {
    return user.value?.roles?.includes('SIDO_ADMIN') ?? false
  })

  const isAuthenticated = computed(() => user.value !== null)

  // ── Connexion via MSAL popup ──
  const login = async () => {
    try {
      const result = await ($msal as any).loginPopup({
        scopes: ['openid', 'profile', 'email'],
      })

      // Extraction des rôles depuis les claims du token
      const account = result.account as MsalUser
      const idTokenClaims = result.idTokenClaims as Record<string, unknown>
      account.roles = (idTokenClaims?.roles as string[]) ?? []

      user.value = account
      accessToken.value = result.accessToken ?? null

      // Synchroniser l'utilisateur en base et récupérer ses domaines
      const syncResponse = await $fetch<AuthSyncResponse>('/api/auth/sync', {
        method: 'POST',
        body: {
          entra_id: account.localAccountId,
          email: account.username,
          display_name: account.name ?? account.username,
          roles: account.roles,
        },
      })

      userDomains.value = syncResponse.domains ?? []

      // Démarrer le timer d'inactivité + écouter les interactions
      resetInactivityTimer()
      startActivityListeners()
    }
    catch (error) {
      console.error('[useAuth] Erreur de connexion MSAL :', error)
      throw error
    }
  }

  // ── Déconnexion ──
  const logout = async (reason: 'LOGOUT' | 'SESSION_EXPIRED' = 'LOGOUT') => {
    try {
      // Enregistrer le log de déconnexion côté serveur
      await $fetch('/api/auth/logout', {
        method: 'POST',
        body: { reason, email: user.value?.username },
      }).catch(() => {})

      await ($msal as any).logoutPopup()
    }
    catch {
      // Continuer même si le logout MSAL échoue
    }
    finally {
      // Nettoyage de l'état
      user.value = null
      accessToken.value = null
      userDomains.value = []
      stopActivityListeners()
      if (inactivityTimer) clearTimeout(inactivityTimer)
      navigateTo('/login')
    }
  }

  // ── Récupération silencieuse du token ──
  const getToken = async (): Promise<string | null> => {
    if (!user.value) return null
    try {
      const result = await ($msal as any).acquireTokenSilent({
        account: user.value,
        scopes: ['openid', 'profile'],
      })
      return result.accessToken
    }
    catch {
      return null
    }
  }

  // ── Gestion des listeners d'activité ──
  const ACTIVITY_EVENTS = ['click', 'keydown', 'scroll', 'mousemove'] as const

  const startActivityListeners = () => {
    if (!import.meta.client) return
    ACTIVITY_EVENTS.forEach((evt) => {
      window.addEventListener(evt, resetInactivityTimer, { passive: true })
    })
  }

  const stopActivityListeners = () => {
    if (!import.meta.client) return
    ACTIVITY_EVENTS.forEach((evt) => {
      window.removeEventListener(evt, resetInactivityTimer)
    })
  }

  return {
    user,
    accessToken,
    userDomains,
    isAdmin,
    isAuthenticated,
    login,
    logout,
    getToken,
    resetInactivityTimer,
  }
}
