# SIDO Sarcophage — Guidelines

## TypeScript
- `<script setup lang="ts">` obligatoire
- TypeScript strict mode activé
- Interfaces dans `types/` pour toutes les structures de données

## Composants Lucie (Moonicorn)
- **Imports** : tout depuis `@projetlucie/lc-front-components`
- **Enums obligatoires** : `COLOR_ENUM`, `titleEnum`, `LC_CARD_CONTAINER_VARIANT`, `TabItem`
- **CtaVariant/CtaSize** : strings magiques (`"primary"`, `"secondary"`, `"small"`, etc.)
- **Ne jamais inventer de props** — utiliser uniquement les props documentées

## CSS
- Tokens CSS du thème : `var(--gutters--*)`, `var(--colors--*)`, `var(--fonts--*)`, `var(--radius--*)`
- Ne jamais hardcoder de couleurs (sauf `#ffffff` pour le texte sur header sombre)
- Classes utilitaires dans `assets/css/main.css` : `.flex`, `.detail-grid`, `.page-section`, etc.

## Endpoints serveur
- Pattern : `defineEventHandler(async (event) => { ... })`
- Pool MySQL via `getPool()` depuis `server/utils/db.ts`
- Pagination via `executePagedQuery()` pour les LcTable
- Réponse standard : `{ data: T | T[], total?: number }`

## Formatters
- `formatDate()` — DD/MM/YYYY (accepte YYYY-MM-DD, YYYYMMDD)
- `formatCurrency()` — Intl.NumberFormat fr-FR EUR
- `formatNIR()` — X XX XX XX XXX XXX XX

## Pagination serveur (LcTable)
```vue
<LcTable
  :handle-pagination="true"
  :total-items-length="data?.total ?? 0"
  :is-pagination="true"
  @update:current-page="currentPage = $event"
/>
```

## Persistance domaine
- Clé sessionStorage : `sido:current-domain`
- Composable `useDomain()` : `currentDomain`, `setDomain(code)`, `clearDomain()`
- Au clic tuile → `setDomain(code)` + `navigateTo(route)`
- Au "Changer de domaine" → `clearDomain()` + `navigateTo('/domaines')`
