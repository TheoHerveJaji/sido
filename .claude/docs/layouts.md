# SIDO Sarcophage — Layouts

## 3 layouts distincts

### 1. `layouts/login.vue`
- **Usage** : `pages/login.vue` uniquement
- **Structure** : fond neutre, contenu centré verticalement
- **Pas de header** ni de sidebar
- **Déclaration** : `definePageMeta({ layout: 'login' })`

### 2. `layouts/domaines.vue`
- **Usage** : `pages/domaines.vue` uniquement
- **Structure** : `LcHeaderBanner` (titre SIDO + user bubble + déconnexion) + contenu centré
- **Pas de breadcrumb** ni de navigation contextuelle
- **Déclaration** : `definePageMeta({ layout: 'domaines' })`

### 3. `layouts/domain.vue`
- **Usage** : toutes les pages `/sotrel/**` et `/admin/**`
- **Structure** : `DomainHeader` (header fixe) + `AppBreadcrumb` + `<slot />`
- **Le header affiche** : SIDO – [Nom du domaine] + nav admin + "Changer de domaine" + user + déconnexion
- **Déclaration** : `definePageMeta({ layout: 'domain' })`

## Mapping routes → layouts

| Route | Layout |
|-------|--------|
| `/login` | `login` |
| `/domaines` | `domaines` |
| `/` | redirect → `/domaines` |
| `/sotrel` | `domain` |
| `/sotrel/[nodossier]` | `domain` |
| `/admin/**` | `domain` |
