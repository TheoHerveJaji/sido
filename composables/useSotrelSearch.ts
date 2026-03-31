/* ══════════════════════════════════════════════════════════════
   Composable — Persistance de l'état de recherche SOTREL
   Survit aux navigations SPA (dossier → retour) grâce à useState.
   ══════════════════════════════════════════════════════════════ */

export const useSotrelSearch = () => {
  /** Valeurs saisies dans le formulaire */
  const noss = useState('sotrel:search:noss', () => '')
  const nom = useState('sotrel:search:nom', () => '')
  const nodoss = useState('sotrel:search:nodoss', () => '')

  /** Critères appliqués (après clic sur Rechercher) */
  const appliedNoss = useState('sotrel:search:appliedNoss', () => '')
  const appliedNom = useState('sotrel:search:appliedNom', () => '')
  const appliedNodoss = useState('sotrel:search:appliedNodoss', () => '')

  /** Pagination et tri */
  const currentPage = useState('sotrel:search:currentPage', () => 1)
  const rowsPerPage = useState('sotrel:search:rowsPerPage', () => 25)
  const sortBy = useState<string[]>('sotrel:search:sortBy', () => ['NOM'])
  const sortType = useState<string[]>('sotrel:search:sortType', () => ['asc'])

  /** True si au moins une recherche a été lancée */
  const hasSearched = useState('sotrel:search:hasSearched', () => false)

  const reset = () => {
    noss.value = ''
    nom.value = ''
    nodoss.value = ''
    appliedNoss.value = ''
    appliedNom.value = ''
    appliedNodoss.value = ''
    hasSearched.value = false
    currentPage.value = 1
  }

  return {
    noss,
    nom,
    nodoss,
    appliedNoss,
    appliedNom,
    appliedNodoss,
    currentPage,
    rowsPerPage,
    sortBy,
    sortType,
    hasSearched,
    reset,
  }
}
