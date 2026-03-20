# SIDO Sarcophage — Architecture

## Vue d'ensemble

Application Nuxt 3 SPA (`ssr: false`) d'archivage de données legacy. Premier domaine : **SOTREL** (prestations décès/invalidité).

## Structure des fichiers

```
sido-sarcophage/
├── assets/css/          → Thème Klesia + styles globaux
├── components/
│   ├── DomainHeader.vue → Header fixe contextuel
│   ├── AppBreadcrumb.vue→ Fil d'Ariane dynamique
│   ├── sotrel/          → Composants métier SOTREL (8 fichiers)
│   └── admin/           → Modals admin (UserFormModal, DomainEditModal)
├── composables/
│   ├── useAuth.ts       → Cycle auth MSAL + timer inactivité
│   ├── useDomain.ts     → Persistance domaine courant (sessionStorage)
│   └── useUserAccess.ts → Vérification accès domaine
├── layouts/
│   ├── login.vue        → Page épurée sans header
│   ├── domaines.vue     → Header minimal + contenu centré
│   └── domain.vue       → Header fixe + breadcrumb + contenu
├── middleware/
│   └── auth.global.ts   → Protection routes + vérification domaine
├── pages/               → Routing Nuxt file-based
├── plugins/
│   ├── 00.reflect-metadata.ts
│   └── msal.client.ts   → Initialisation MSAL (client-only)
├── server/
│   ├── api/             → Endpoints REST (auth, sotrel, admin)
│   ├── mocks/           → Données mock (12 fichiers)
│   └── utils/           → Pool MySQL + mock pool
├── types/               → Interfaces TypeScript
└── utils/               → Formatters (date, currency, NIR)
```

## Conventions de nommage

- **Pages** : `pages/[domaine]/index.vue`, `pages/[domaine]/[param].vue`
- **Composants** : PascalCase, préfixés par domaine (`sotrel/TabCapital.vue`)
- **API** : `server/api/[domaine]/[resource].get.ts`
- **Types** : interfaces en PascalCase (`SotrelRecherche`)

## Flux d'authentification

1. `/login` → `useAuth().login()` → MSAL popup → token JWT
2. `POST /api/auth/sync` → upsert utilisateur + retour domaines
3. Navigation vers `/domaines`
4. Timer inactivité 30min → auto-déconnexion

## Système de mock

Activé via `USE_MOCK=true` dans `.env`. Le pool MySQL est remplacé par un mock qui parse les requêtes SQL et retourne les données statiques. Permet le développement sans base de données.

## Ajout d'un nouveau domaine

1. Créer `pages/[domaine]/` avec les pages
2. Créer `components/[domaine]/` avec les composants
3. Créer `server/api/[domaine]/` avec les endpoints
4. Ajouter les types dans `types/database.ts`
5. Ajouter les headers dans `types/table-headers.ts`
6. Ajouter les mocks dans `server/mocks/`
7. Insérer le domaine dans `SDO_DOMAINS`
