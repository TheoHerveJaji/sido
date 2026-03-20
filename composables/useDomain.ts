/* ══════════════════════════════════════════════════════════════
   Composable de gestion du domaine courant
   Persiste le domaine sélectionné en sessionStorage pour
   survivre aux rafraîchissements de page dans un même onglet.
   Clé sessionStorage : "sido:current-domain"
   ══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'sido:current-domain'

export const useDomain = () => {
  /**
   * État réactif du domaine courant.
   * Initialisé depuis sessionStorage au premier accès côté client.
   */
  const currentDomain = useState<string | null>('domain:current', () => {
    if (import.meta.client) {
      return sessionStorage.getItem(STORAGE_KEY) ?? null
    }
    return null
  })

  /**
   * Définit le domaine courant et le persiste en sessionStorage.
   * Appelé au clic sur une tuile de domaine dans /domaines.
   */
  const setDomain = (code: string) => {
    currentDomain.value = code
    if (import.meta.client) {
      sessionStorage.setItem(STORAGE_KEY, code)
    }
  }

  /**
   * Efface le domaine courant (retour à /domaines ou déconnexion).
   */
  const clearDomain = () => {
    currentDomain.value = null
    if (import.meta.client) {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  return { currentDomain, setDomain, clearDomain }
}
