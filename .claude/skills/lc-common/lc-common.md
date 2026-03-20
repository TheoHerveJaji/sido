---
name: lc-common
description: "Guide d'utilisation de @projetlucie/lc-front-common pour les projets Vue 3 / Nuxt du framework Moonicorn. Couvre l'initialisation, les modules (Person, Toast, Loader), les validators vee-validate, la directive v-test-id, les stores de base et les utilitaires (SecureRoute, ActivityTracker)."
user-invocable: true
---

Tu es un expert de la librairie **@projetlucie/lc-front-common** (framework Moonicorn). Quand l'utilisateur demande de l'aide sur cette couche commune, tu dois :

1. **Générer du code d'utilisation** avec les imports corrects depuis `@projetlucie/lc-front-common`
2. **Expliquer les APIs disponibles** (modules, stores, validators, directives, utils)
3. **Utiliser les bons enums et types** fournis par la librairie

## Règle d'import

Tout s'importe depuis `@projetlucie/lc-front-common` :

```typescript
import { PersonModuleV2, ToastModule, LoaderModule, LcAppTool } from '@projetlucie/lc-front-common';
import { ibanValid, frenchPhone, validateAdult } from '@projetlucie/lc-front-common';
import { ROLE_ENUM, LIBELLE_ROLE_ENUM, UserSessionResult } from '@projetlucie/lc-front-common';
import { SecureRouteHelper, LcWatcher, vTestId } from '@projetlucie/lc-front-common';
```

---

# INITIALISATION

## LcAppTool — Point d'entrée principal

`LcAppTool` est un singleton qui initialise l'ensemble des outils de la couche commune (HTTP, auth, localStorage, thème, container Inversify).

```typescript
import { LcAppTool } from '@projetlucie/lc-front-common';
import type { InitThemeHelperParams } from '@projetlucie/lc-front-theme';

// Dans main.ts ou un fichier de boot
const appTool = LcAppTool.Instance(
  'ma-cle-de-chiffrement',   // clé secrète pour le localStorage
  false,                      // disableEncryption (true en dev si besoin)
  {
    metaUrl: import.meta.url,
    themeModule: `../node_modules/@projetlucie/lc-front-theme/${themeName}`,
    isHotReloadActivated: import.meta.hot ? true : false
  } satisfies InitThemeHelperParams
);

// Accès aux outils exposés
const {
  LcLocalStorage,     // LocalStorageHelper — stockage chiffré
  LcSessionStorage,   // SessionStorageHelper — session chiffrée
  LcAuthTokenHelper,  // HttpAuthTokenHelper — gestion JWT
  LcHttp,             // Http — client HTTP sans auth
  LcHttpAuth,         // HttpAuth — client HTTP avec auth (Bearer token)
  LcThemeHelper,      // ThemeHelper — gestion du thème dynamique
  LcStoreContainer    // Container Inversify — DI des stores
} = appTool;
```

### useStore / useStores — Enregistrement des modules dans le container

```typescript
// Enregistrer et récupérer un module singleton
const personModule = appTool.useStore(PersonModuleV2, localStorage, tokenHelper);

// Enregistrer plusieurs modules d'un coup
const [person, toast, loader] = appTool.useStores(PersonModuleV2, ToastModule, LoaderModule);
```

---

# MODULES

## PersonModuleV2 ✅ (recommandé)

Gère la session utilisateur avec des observables réactifs. Marqué `@injectable()` pour Inversify.

> **Note :** `PersonModule` est **deprecated**, utiliser `PersonModuleV2`.

### Observables

| Observable | Type | Description |
|---|---|---|
| `userSessionResult` | `Observable<UserSessionResult \| undefined>` | Session utilisateur courante |
| `userToken` | `Observable<UserTokenInfosDTO \| undefined>` | Token JWT décodé |
| `needToReconnect` | `Observable<boolean>` | Token expiré depuis < 1h |
| `needToDeconnect` | `Observable<boolean>` | Token expiré depuis > 1h |

> Compatibilité legacy via `userConnectedChange$`, `userTokenChange$`, `needToReconnect$`, `needToDeconnect$` (BehaviorSubject RxJS — deprecated).

### Méthodes

```typescript
// Initialiser depuis le token stocké
await personModule.initUserConnectedFromToken(canReconnect?: boolean): Promise<void | null>

// Mettre à jour la session
personModule.setUserConnected(user: UserSessionResult): void
personModule.setUserToken(token: UserTokenInfosDTO): void
personModule.setNeedToReconnect(value: boolean): void
personModule.setNeedToDeconnect(value: boolean): void  // reset needToReconnect automatiquement

// Rôles
personModule.isUserManager(): boolean
personModule.isUserCare(): boolean
personModule.getUserRole(): LIBELLE_ROLE_ENUM  // 'Care' | 'Manager' | 'Adhérent'

// Storage
personModule.getFromStorage<T>(key: string, type?: new() => T): T | null
```

### Usage en Vue 3 (Composition API)

```typescript
import { useObservableRef } from '@projetlucie/lc-front-sdk';
import { PersonModuleV2 } from '@projetlucie/lc-front-common';

const personModule = appTool.useStore(PersonModuleV2, ...);

// Convertir observable en ref Vue réactive
const userSession = useObservableRef(personModule.userSessionResult);
const needToReconnect = useObservableRef(personModule.needToReconnect);
```

---

## ToastModule

Gère les notifications toast globales.

### Observables

| Observable | Type | Description |
|---|---|---|
| `toastMessageChange$` | `BehaviorSubject<ToastMessage \| null>` | Message toast actif |
| `toastClickedChange$` | `BehaviorSubject<boolean>` | État du clic sur le toast |

### Méthodes

```typescript
import { ToastModule } from '@projetlucie/lc-front-common';
import { MESSAGE_TYPE } from '@projetlucie/lc-front-sdk';

const toast = appTool.useStore(ToastModule);

// Méthode complète
toast.createAndPushToast(
  'Titre',        // string | null
  'Message',      // string
  true,           // isTimeoutActive
  MESSAGE_TYPE.SUCCESS  // MESSAGE_TYPE enum
);

// Raccourci erreur (titre: 'Erreur', timeout: true, type: DEFAULT)
toast.createAndPushError('Une erreur est survenue');

// Gestion du clic
toast.toastIsClicked();          // toggle
toast.setToastClicked(true);
toast.toastClicked;              // getter boolean
```

### MESSAGE_TYPE (depuis @projetlucie/lc-front-sdk)

```typescript
MESSAGE_TYPE.DEFAULT
MESSAGE_TYPE.SUCCESS
MESSAGE_TYPE.ERROR
MESSAGE_TYPE.WARNING
MESSAGE_TYPE.INFO
```

---

## LoaderModule

Gère la visibilité du loader global.

### Observable

```typescript
loaderVisibilityChange$: BehaviorSubject<boolean>
```

### Méthodes

```typescript
import { LoaderModule } from '@projetlucie/lc-front-common';

const loader = appTool.useStore(LoaderModule);

await loader.setLoaderVisibility(true);   // afficher
await loader.setLoaderVisibility(false);  // masquer
loader.isLoaderVisible;  // getter boolean
```

---

# UTILITAIRES

## SecureRouteHelper — Guards de navigation

Utilisé dans `router.beforeEach` pour sécuriser les routes.

```typescript
import { SecureRouteHelper } from '@projetlucie/lc-front-common';

router.beforeEach(async (to, from, next) => {
  const guard = new SecureRouteHelper(
    to,
    from,
    next,
    appTool.useStore(ToastModule),
    appTool.LcAuthTokenHelper
  );

  // Vérifier si le token est valide (redirige vers pathOnFail si non)
  const isAuth = await guard.isAuthenticated(
    null,                   // onSuccessAction callback (token, next) => void | null
    '/connexion',           // pathToRedirectToOnFail
    true,                   // withRedirectionOnSuccess (appelle next())
    true                    // withRedirectionOnFail
  );
  if (!isAuth) return;

  // Vérifier les droits (scope du token vs domaine courant)
  const isAuthorized = await guard.isAuthorized(
    null,
    '/connexion',
    true,
    true,
    'localhost'   // currentDomain (seulement en local)
  );
  if (!isAuthorized) return;
});
```

### isAuthenticatedWithoutRedirect

Vérifie silencieusement l'authentification sans redirection, retourne un boolean.

```typescript
const isAuth = await guard.isAuthenticatedWithoutRedirect(
  personModule,      // PersonModule | PersonModuleV2
  canReconnect       // boolean, default: false
);
```

---

## LcWatcher — Suivi d'activité & Refresh token

Surveille l'activité utilisateur et rafraîchit le token automatiquement.

```typescript
import { LcWatcher } from '@projetlucie/lc-front-common';

// Dans main.ts, après initialisation du PersonModuleV2
LcWatcher.initTokenRefreshRoutine(
  window,
  async (idu: number, refreshToken: string | null) => {
    // Appel API de refresh — doit retourner un TokenDTO
    return await authService.refreshToken(idu, refreshToken);
  },
  personModule,              // PersonModule | PersonModuleV2
  appTool.LcAuthTokenHelper,
  canReconnect               // boolean, default: false
);
```

**Comportement automatique :**
- Rafraîchit le token avant expiration (1 min avant)
- Détecte l'inactivité après 5 min → stoppe le refresh
- Déclenche `needToReconnect` après 10 min d'inactivité
- Écoute : `mousemove`, `click`, `scroll`, `keypress`, `touchmove`

---

# DIRECTIVE v-test-id

Génère des attributs `data-test-id` hiérarchiques pour les tests automatisés. Les IDs enfants héritent du chemin parent automatiquement.

### Enregistrement global (main.ts)

```typescript
import { vTestId } from '@projetlucie/lc-front-common';

app.directive('test-id', vTestId);
```

### Usage dans les templates

```vue
<template>
  <!-- Parent reçoit: data-test-id="user-card" -->
  <div v-test-id="'user-card'">

    <!-- Enfant reçoit: data-test-id="user-card-name" -->
    <span v-test-id="'name'">{{ user.name }}</span>

    <!-- Enfant reçoit: data-test-id="user-card-actions" -->
    <div v-test-id="'actions'">

      <!-- Petit-enfant reçoit: data-test-id="user-card-actions-edit" -->
      <button v-test-id="'edit'">Modifier</button>
    </div>
  </div>
</template>
```

**Résultat HTML :**
```html
<div data-test-id="user-card">
  <span data-test-id="user-card-name">John</span>
  <div data-test-id="user-card-actions">
    <button data-test-id="user-card-actions-edit">Modifier</button>
  </div>
</div>
```

> Gère les mutations DOM dynamiques via `MutationObserver` — les IDs sont recalculés si le DOM change.

---

# VALIDATORS vee-validate

Tous les validators retournent `true` si valide, ou un `string` (message d'erreur) si invalide.

Import :
```typescript
import { ibanValid, bicValid, frenchDate, validateAdult, frenchPhone, zipCode, ssNumber, upCase } from '@projetlucie/lc-front-common';
```

Usage avec vee-validate :
```vue
<Field name="iban" :rules="ibanValid" />
```

Ou composition de règles :
```typescript
import { defineRule } from 'vee-validate';
import { ibanValid } from '@projetlucie/lc-front-common';
defineRule('iban', ibanValid);
```

---

## Validators Bancaires

| Fonction | Signature | Erreur |
|---|---|---|
| `ibanValid` | `(iban: string) => boolean \| string` | "L'IBAN n'est pas valide" |
| `bicValid` | `(bic: string) => boolean \| string` | "Le BIC n'est pas valide" |

---

## Validators de Date

| Fonction | Signature | Description |
|---|---|---|
| `validateAdult` | `(value: string \| null) => boolean \| string` | Vérifie que la personne est majeure |
| `frenchDate` | `(value: string \| null \| undefined) => boolean \| string` | Format JJ/MM/AAAA, date valide, âge max |
| `frenchDateBirthday` | `(value: string \| null \| undefined) => boolean \| string` | Date de naissance au format français |
| `isNotInFutur` | `(value: string \| null \| undefined) => boolean \| string` | La date ne doit pas être dans le futur |
| `affiliationBirthDate` | `(value: string \| null \| undefined) => boolean \| string` | Date de naissance pour affiliation |
| `isEmancipationAyd` | `(value: string \| null \| undefined) => boolean \| string` | Vérifie l'émancipation d'un ayant droit |
| `isValidHour` | `(value: string \| null \| undefined) => boolean \| string` | Heure valide |
| `allDates` | `(value: string \| null \| undefined) => boolean \| string` | Validation combinée de dates |

---

## Validators de Mot de passe

| Fonction | Signature | Erreur |
|---|---|---|
| `upCase` | `(value: string \| null \| undefined) => boolean \| string` | Doit contenir une majuscule |
| `number` | `(value: string \| null \| undefined) => boolean \| string` | Doit contenir un chiffre |
| `specialChar` | `(value: string \| null \| undefined) => boolean \| string` | Doit contenir un caractère spécial |

---

## Validators Numériques

| Fonction | Signature | Description |
|---|---|---|
| `frenchPhone` | `(value: string \| null) => boolean \| string` | Commence par 06 ou 07 |
| `frenchPhoneSize` | `(value: string \| null) => boolean \| string` | Longueur du numéro français |
| `internationalPhone` | `(value: string \| null) => boolean \| string` | Format international |
| `zipCode` | `(value: string \| null) => boolean \| string` | 5 chiffres obligatoires |
| `numberPers` | `(value: string \| null) => boolean \| string` | Numéro de personne |
| `positivNumberWithTwoDecimalMax` | `(value: string \| null) => boolean \| string` | Nombre positif ≤ 2 décimales |

---

## Validators Numéro de Sécurité Sociale

| Fonction | Signature | Description |
|---|---|---|
| `ssNumber` | `(value: string) => boolean \| string` | NIR complet (15 chiffres, clé Luhn) |
| `birthdayFromSN` | `(value: string) => boolean \| string` | Date de naissance cohérente avec le NIR |
| `isValidOrganismForNoemie` | `(value: string) => boolean \| string` | Organisme valide pour Noémie |

---

## Validators Nom

| Fonction | Signature | Description |
|---|---|---|
| `personNameCharacters` | `(value: string) => boolean \| string` | Caractères autorisés pour un nom |
| `personSearchCharacters` | `(value: string) => boolean \| string` | Caractères autorisés en recherche |

---

## Validators Uploader

| Fonction | Signature | Description |
|---|---|---|
| `uploaderCanUpload` | `(value: File[]) => boolean \| string` | Vérifie que l'upload est autorisé |
| `uploaderSize` | `(value: File[]) => boolean \| string` | Vérifie la taille des fichiers |

---

## Validators Required (dates spéciales)

| Fonction | Description |
|---|---|
| `requiredBirthday` | Champ date de naissance obligatoire |
| `requiredBirthdayConjoint` | Date de naissance du conjoint obligatoire |

---

# STORES DE BASE

## BaseMessagerieStore (abstract)

Classe abstraite à étendre pour implémenter la messagerie.

### Observables disponibles

| Observable | Type | Description |
|---|---|---|
| `conversationsEnCoursChange$` | `BehaviorSubject<MessagerieConversation[] \| null>` | Conversations en cours |
| `conversationsClotureesChange$` | `BehaviorSubject<MessagerieConversation[] \| null>` | Conversations clôturées |
| `conversationDetailChange$` | `BehaviorSubject<MessagerieConversation \| null>` | Détail conversation sélectionnée |
| `conversationMessagesChange$` | `BehaviorSubject<MessagerieMessage[] \| null>` | Messages de la conversation |
| `conversationsStatsChange$` | `BehaviorSubject<MessagerieStatsConversations \| null>` | Stats globales |
| `conversationsPersonneStatsChange$` | `BehaviorSubject<MessagerieStatsConversations \| null>` | Stats par personne |
| `conversationTypesDemandeChange$` | `BehaviorSubject<MessagerieTypeDemande[] \| null>` | Types de demandes |
| `creationConversationChange$` | `BehaviorSubject<PremierMessageQuery>` | Query de création |
| `messagerieNavigationChange$` | `BehaviorSubject<ResponsiveNavigationVM>` | Navigation responsive |
| `paginationOptions$` | `BehaviorSubject<PaginationOptions \| null>` | Options de pagination |

### Méthodes abstraites à implémenter

```typescript
abstract setConversationsEnCours(numeroPersonne?: string): Promise<boolean>
abstract setConversationsCloturees(numeroPersonne?: string): Promise<boolean>
abstract setStorageDetailsConversation(idConversation: number | null): boolean
abstract getMessages(idConversation: number | null): Promise<boolean>
abstract sendMessage(payload: ConversationNouveauMessage): Promise<boolean>
abstract tagMessagesRead(idConversation: number | null): Promise<boolean>
abstract updateStats(): Promise<boolean>
abstract updatePersonneStats(numeroPersonne: string): Promise<boolean>
abstract typesDemande(idRoleDestinataire?: number): Promise<void>
abstract prepareCreateConversation(query: PremierMessageQuery): Promise<void>
abstract createConversation(payload: PremierMessageQuery): Promise<boolean | number>
```

### Méthodes concrètes disponibles

```typescript
getConversationById(idConversation: number | null): MessagerieConversation | null
setMessagerieNavigation(navigation: ResponsiveNavigationVM): void
updateMessagerieNavigation(newValues: ClassFields<ResponsiveNavigationVM>): void
setConversationMessages(messages: MessagerieMessage[]): void
resetStore(): void
static isCareStore(value): value is BaseMessagerieCareStore  // type guard
```

---

## BaseTableauGarantiesStore

Store singleton pour le tableau des garanties.

```typescript
import { BaseTableauGarantiesStore } from '@projetlucie/lc-front-common';

const store = BaseTableauGarantiesStore.Instance;

// Observable
store.offrePositionCarouselChange$  // BehaviorSubject<number>

// Méthodes
store.setOffrePositionCarousel(2);
store.offrePositionCarousel;  // getter BehaviorSubject
```

---

# MODÈLES & ENUMS

## ROLE_ENUM

```typescript
import { ROLE_ENUM } from '@projetlucie/lc-front-common';

ROLE_ENUM.ADHERENT                       // '4'
ROLE_ENUM.AYANT_DROIT                    // '5'
ROLE_ENUM.PROFESSIONNEL_DE_SANTE         // '6'
ROLE_ENUM.REPRESENTANT_LEGAL             // '8'
ROLE_ENUM.ADMINISTRATEUR_METIER          // '13'
ROLE_ENUM.CARE_PRESTATION_SANTE_JUNIOR   // '14'
ROLE_ENUM.CARE_PRESTATION_SANTE_CONFIRME // '15'
ROLE_ENUM.CARE_PRESTATION_SANTE_EXPERT   // '16'
ROLE_ENUM.CARE_COTISATION_SANTE_JUNIOR   // '17'
ROLE_ENUM.CARE_COTISATION_SANTE_CONFIRME // '18'
ROLE_ENUM.CARE_COTISATION_SANTE_EXPERT   // '19'
ROLE_ENUM.MANAGER_CARE_SANTE             // '24'
ROLE_ENUM.SALARIE                        // '28'
ROLE_ENUM.SALES_MANAGER                  // '30'
ROLE_ENUM.SALES                          // '31'
```

## LIBELLE_ROLE_ENUM

```typescript
import { LIBELLE_ROLE_ENUM } from '@projetlucie/lc-front-common';

LIBELLE_ROLE_ENUM.ADHERENT                       // 'Adhérent'
LIBELLE_ROLE_ENUM.CARE                           // 'Care'
LIBELLE_ROLE_ENUM.MANAGER                        // 'Manager'
LIBELLE_ROLE_ENUM.MANAGER_CARE_SANTE             // 'Manager Care santé'
// ... (correspond aux ROLE_ENUM avec libellés lisibles)
```

## UserSessionResult

```typescript
import { UserSessionResult } from '@projetlucie/lc-front-common';

// Modèle de session utilisateur connecté
// Désérialisable depuis localStorage via getFromStorage(key, UserSessionResult)
```

## ToastMessage

```typescript
import { ToastMessage } from '@projetlucie/lc-front-common';
import { MESSAGE_TYPE } from '@projetlucie/lc-front-sdk';

const toast = new ToastMessage(
  'Titre',              // string | null
  'Corps du message',   // string
  MESSAGE_TYPE.SUCCESS, // MESSAGE_TYPE
  true                  // isTimeoutActive
);
```

---

# PATTERN COMPLET — Initialisation d'une app

```typescript
// main.ts
import 'reflect-metadata'; // obligatoire pour Inversify
import { createApp } from 'vue';
import { LcAppTool, PersonModuleV2, ToastModule, LoaderModule, LcWatcher, vTestId } from '@projetlucie/lc-front-common';

const appTool = LcAppTool.Instance(
  import.meta.env.VITE_CRYPT_KEY,
  import.meta.env.DEV,
  {
    metaUrl: import.meta.url,
    themeModule: `../node_modules/@projetlucie/lc-front-theme/${import.meta.env.VITE_THEME}`,
    isHotReloadActivated: !!import.meta.hot
  }
);

const { LcLocalStorage, LcAuthTokenHelper } = appTool;

// Instancier les modules dans le container Inversify
const [personModule, toastModule, loaderModule] = appTool.useStores(
  PersonModuleV2,
  ToastModule,
  LoaderModule
);

// Pour PersonModuleV2 qui nécessite des args :
// appTool.useStore(PersonModuleV2, LcLocalStorage, LcAuthTokenHelper);

// Démarrer le suivi d'activité & refresh automatique du token
LcWatcher.initTokenRefreshRoutine(
  window,
  (idu, refreshToken) => authApi.refresh(idu, refreshToken),
  personModule,
  LcAuthTokenHelper
);

const app = createApp(App);
app.directive('test-id', vTestId);
app.mount('#app');
```
