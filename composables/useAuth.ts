/* ══════════════════════════════════════════════════════════════
   Composable d'authentification — Entra ID via MSAL
   Gère le cycle login/logout, la session utilisateur,
   les domaines accessibles, et la déconnexion automatique
   après 30 minutes d'inactivité.
   ══════════════════════════════════════════════════════════════ */

import type { MsalUser, AuthSyncResponse } from '~/types/auth'

export const useAuth = () => {
  const { $msal } = useNuxtApp()
  const { clearDomain } = useDomain()

  /** Utilisateur MSAL connecté (null si non authentifié) */
  const user = useState<MsalUser | null>('auth:user', () => null)

  /** Liste des codes domaine accessibles par l'utilisateur */
  const userDomains = useState<string[]>('auth:domains', () => [])

  /** Rôle ADMIN détecté dans les claims du token */
  const isAdmin = computed(() => user.value?.roles?.includes('SIDO_ADMIN') ?? false)

  // ── Timer d'inactivité (30 minutes) ──
  let inactivityTimer: ReturnType<typeof setTimeout> | null = null
  const INACTIVITY_MS = 30 * 60 * 1000 // 30 min

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => logout('SESSION_EXPIRED'), INACTIVITY_MS)
  }

  /**
   * Connexion via MSAL popup.
   * 1. Ouvre la popup Microsoft → récupère le token
   * 2. Synchronise l'utilisateur en base via /api/auth/sync
   * 3. Démarre le timer d'inactivité
   * 4. Redirige vers /domaines
   */
  const login = async () => {
    const result = await $msal.loginPopup({
      scopes: ['openid', 'profile', 'email'],
    })

    // Extraire les rôles depuis les claims du token
    const account = result.account as MsalUser
    if (result.idTokenClaims && 'roles' in result.idTokenClaims) {
      account.roles = result.idTokenClaims.roles as string[]
    }
    user.value = account

    // Synchroniser l'utilisateur en base et récupérer ses domaines
    const { data } = await useFetch<AuthSyncResponse>('/api/auth/sync', {
      method: 'POST',
      body: { account: result.account },
    })
    userDomains.value = data.value?.domains ?? []

    // Démarrer le suivi d'inactivité côté client
    resetInactivityTimer()
    if (import.meta.client) {
      const events = ['click', 'keydown', 'scroll', 'mousemove']
      events.forEach((evt) =>
        window.addEventListener(evt, resetInactivityTimer, { passive: true }),
      )
    }

    navigateTo('/domaines')
  }

  /**
   * Déconnexion — nettoie la session, log l'action, et redirige.
   * @param reason - Motif : LOGOUT (volontaire) ou SESSION_EXPIRED (inactivité)
   */
  const logout = async (reason: 'LOGOUT' | 'SESSION_EXPIRED' = 'LOGOUT') => {
    // Logger la déconnexion côté serveur
    await $fetch('/api/auth/logout', {
      method: 'POST',
      body: { reason },
    }).catch(() => {
      // Ignorer les erreurs réseau lors de la déconnexion
    })

    // Nettoyer l'état local
    clearDomain()
    user.value = null
    userDomains.value = []

    // Arrêter le timer d'inactivité
    if (inactivityTimer) {
      clearTimeout(inactivityTimer)
      inactivityTimer = null
    }

    // Retirer les listeners d'activité
    if (import.meta.client) {
      const events = ['click', 'keydown', 'scroll', 'mousemove']
      events.forEach((evt) =>
        window.removeEventListener(evt, resetInactivityTimer),
      )
    }

    // Déconnexion MSAL et redirection
    try {
      await $msal.logoutPopup()
    } catch {
      // Continuer même si la popup échoue
    }
    navigateTo('/login')
  }

  return { user, userDomains, isAdmin, login, logout, resetInactivityTimer }
}
