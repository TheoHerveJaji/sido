/* ══════════════════════════════════════════════════════════════
   Composable — Persistance de l'état de recherche SADE
   Survit aux navigations SPA (fiche → retour) grâce à useState.
   ══════════════════════════════════════════════════════════════ */

export const useSadeSearch = () => {
  /** Valeurs saisies dans le formulaire */
  const denomination = useState("sade:search:denomination", () => "");
  const numfirme = useState("sade:search:numfirme", () => "");
  const siren = useState("sade:search:siren", () => "");

  /** Critères appliqués (après clic sur Rechercher) */
  const appliedDenomination = useState(
    "sade:search:appliedDenomination",
    () => "",
  );
  const appliedNumfirme = useState("sade:search:appliedNumfirme", () => "");
  const appliedSiren = useState("sade:search:appliedSiren", () => "");

  /** Pagination et tri */
  const currentPage = useState("sade:search:currentPage", () => 1);
  const rowsPerPage = useState("sade:search:rowsPerPage", () => 25);
  const sortBy = useState<string[]>("sade:search:sortBy", () => ["DENSOC"]);
  const sortType = useState<string[]>("sade:search:sortType", () => ["asc"]);

  /** True si au moins une recherche a été lancée */
  const hasSearched = useState("sade:search:hasSearched", () => false);

  const reset = () => {
    denomination.value = "";
    numfirme.value = "";
    siren.value = "";
    appliedDenomination.value = "";
    appliedNumfirme.value = "";
    appliedSiren.value = "";
    hasSearched.value = false;
    currentPage.value = 1;
  };

  return {
    denomination,
    numfirme,
    siren,
    appliedDenomination,
    appliedNumfirme,
    appliedSiren,
    currentPage,
    rowsPerPage,
    sortBy,
    sortType,
    hasSearched,
    reset,
  };
};
