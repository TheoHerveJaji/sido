/* ══════════════════════════════════════════════════════════════
   Composable de vérification d'accès domaine
   Vérifie si l'utilisateur connecté a accès à un domaine donné.
   Les ADMIN ont accès à tous les domaines.
   ══════════════════════════════════════════════════════════════ */

export const useUserAccess = () => {
  const { userDomains, isAdmin } = useAuth()

  /**
   * Vérifie si l'utilisateur a accès au domaine spécifié.
   * Les ADMIN ont accès implicite à tous les domaines.
   */
  const hasDomainAccess = (code: string): boolean => {
    if (isAdmin.value) return true
    return userDomains.value.includes(code)
  }

  return { hasDomainAccess }
}
