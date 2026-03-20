/* ══════════════════════════════════════════════════
   Composable de vérification des droits par domaine
   Dépend de useAuth() pour les domaines de l'utilisateur
   ══════════════════════════════════════════════════ */

export const useUserAccess = () => {
  const { userDomains, isAdmin } = useAuth()

  /**
   * Vérifie si l'utilisateur a accès à un domaine donné.
   * Les ADMIN ont accès à tous les domaines.
   */
  const hasDomainAccess = (code: string): boolean => {
    if (isAdmin.value) return true
    return userDomains.value.includes(code)
  }

  return { hasDomainAccess }
}
