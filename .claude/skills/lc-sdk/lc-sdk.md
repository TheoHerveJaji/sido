---
name: lc-sdk
description: "Guide d'utilisation de @projetlucie/lc-front-sdk pour les projets Vue 3 / Nuxt du framework Moonicorn. Couvre la gestion d'état réactive (StoreValue, LcModule), HTTP (Http, HttpAuth), stockage chiffré (LocalStorageHelper), auth JWT, sérialisation, UI helpers et tous les utilitaires lib (string, date, array, object, types)."
user-invocable: true
---

Tu es un expert de la librairie **@projetlucie/lc-front-sdk** (framework Moonicorn). Quand l'utilisateur demande de l'aide sur cette couche SDK, tu dois :

1. **Générer du code d'utilisation** avec les imports corrects depuis `@projetlucie/lc-front-sdk`
2. **Expliquer les APIs disponibles** (stores, http, storage, auth, serialization, lib utilities)
3. **Utiliser les bons types, enums et patterns** fournis par la librairie

## Règle d'import

Tout s'importe depuis `@projetlucie/lc-front-sdk` :

```typescript
import { StoreValue, LcModule } from '@projetlucie/lc-front-sdk';
import { HttpAuth, Http } from '@projetlucie/lc-front-sdk';
import { LocalStorageHelper, SessionStorageHelper } from '@projetlucie/lc-front-sdk';
import { HttpAuthTokenHelper } from '@projetlucie/lc-front-sdk';
import { isValidEmail, capitalizeName, toEuro } from '@projetlucie/lc-front-sdk';
import { parseDate, dateFormatForAPI, DateFormats } from '@projetlucie/lc-front-sdk';
import { MESSAGE_TYPE } from '@projetlucie/lc-front-sdk';
import type { DeepReadonly, ClassFields } from '@projetlucie/lc-front-sdk';
```

---

# GESTION D'ÉTAT RÉACTIVE

## StoreValue\<T\>

Conteneur réactif générique basé sur RxJS `BehaviorSubject`. Garantit l'immuabilité via des copies profondes.

### Observables

| Observable | Comportement |
|---|---|
| `OnChange$` | Émet à chaque changement, **skip la valeur initiale**, **filtre les nulls** |
| `OnChangeNullable$` | Émet à chaque changement (null inclus), skip la valeur initiale |
| `OnChangeWithInitialValue$` | Émet immédiatement la valeur actuelle puis chaque changement |

### Getters

| Getter | Type | Description |
|---|---|---|
| `Value` | `T \| null` | Copie profonde de la valeur actuelle |
| `ReferenceValue` | `T \| null` | Référence directe — à utiliser avec précaution |
| `UUID` | `string` | Identifiant unique de l'instance |
| `IsObserved` | `boolean` | Indique si l'observable est écouté |
| `RxJsBehaviorSubject` | `BehaviorSubject<T \| null>` | **@deprecated** — usage interne uniquement |

### Méthodes

```typescript
value.set(newValue);                    // Met à jour et notifie les observateurs
value.set(newValue, { notify: false }); // Met à jour sans notifier
value.clear();                          // Remet à null
value.dispatch();                       // Réémet la valeur actuelle
value.tryGetValue();                    // Retourne la valeur ou lève StoreError si null
value.asObservable();                   // Retourne l'interface IStoreObservable<T>
```

### Exemple complet

```typescript
import { StoreValue } from '@projetlucie/lc-front-sdk';

const userStore = new StoreValue<User>(null);

// S'abonner aux changements
userStore.OnChange$.subscribe((user) => {
  console.log('Nouvel utilisateur :', user);
});

// Avec valeur initiale (utile dans ngOnInit / onMounted)
userStore.OnChangeWithInitialValue$.subscribe((user) => {
  if (user) renderUser(user);
});

// Mettre à jour
userStore.set({ id: 1, name: 'Alice' });

// Lire la valeur courante
const current = userStore.Value; // copie profonde
```

---

## LcModule

Classe abstraite injectable (Inversify `@injectable()`) à étendre pour créer des stores métier.

### Méthode protégée : `createValue<T>()`

```typescript
import { LcModule, StoreValue } from '@projetlucie/lc-front-sdk';
import { injectable } from 'inversify';

@injectable()
export class MonModule extends LcModule {
  // Créer des valeurs réactives via createValue()
  private readonly _user = this.createValue<User>(null);
  private readonly _items = this.createValue<Item[]>([]);

  // Exposer les observables
  public readonly user$ = this._user.OnChange$;
  public readonly items$ = this._items.OnChangeWithInitialValue$;

  // Exposer les getters
  public get user(): User | null {
    return this._user.Value;
  }

  // Exposer les setters
  public setUser(user: User): void {
    this._user.set(user);
  }

  public addItem(item: Item): void {
    const current = this._items.Value ?? [];
    this._items.set([...current, item]);
  }
}
```

### Observable d'erreur

```typescript
monModule.OnError$.subscribe((error) => {
  console.error('Erreur store :', error);
});
```

### Nettoyage

```typescript
monModule.clear(); // Remet toutes les valeurs créées avec createValue() à null
```

### Options debug (StoreValueOptions)

```typescript
// Activer le mode debug pour tracer les mutations
private readonly _user = this.createValue<User>(null, { name: 'user', debug: true });
```

---

## StoreError

```typescript
import { StoreError } from '@projetlucie/lc-front-sdk';

// Créer une erreur custom
const error = new StoreError('MON_CODE_ERREUR', 'Description optionnelle');

// Erreurs prédéfinies
StoreError.TRY_GET_VALUE_FAILURE()       // Levée par tryGetValue() si null
StoreError.MISSING_STORE_VALUE_NAME()    // Mode debug sans nom de store
```

---

# HTTP

## HttpAuth — Client HTTP authentifié (Singleton)

```typescript
import { HttpAuth, LocalStorageHelper } from '@projetlucie/lc-front-sdk';

const http = HttpAuth.Instance(LocalStorageHelper.Instance);

// Configuration
http.withUrl('https://api.exemple.com');
http.withBearer(accessToken);    // Ajoute Authorization: Bearer <token>
http.sync();                     // Récupère le token depuis le localStorage et l'applique

// Requêtes avec auto-mapping (json-object-mapper)
const user = await http.getSingleWithAutoMap(UserDTO, '/users/1');
const users = await http.getArrayWithAutoMap(UserDTO, '/users');

// Axios brut
await http.axios.post('/endpoint', payload);
await http.axios.put('/endpoint/1', payload);
await http.axios.delete('/endpoint/1');
```

## Http — Client HTTP sans auth (Singleton)

```typescript
import { Http, LocalStorageHelper } from '@projetlucie/lc-front-sdk';

const http = Http.Instance(LocalStorageHelper.Instance);
http.withUrl('https://api.exemple.com');

const data = await http.getSingleWithAutoMap(MyDTO, '/public/endpoint');
```

### Auto-mapping avec json-object-mapper

Décorer les classes DTO avec `@JsonProperty` :

```typescript
import { JsonProperty } from 'json-object-mapper';

class UserDTO {
  @JsonProperty('first_name')
  firstName: string = '';

  @JsonProperty('last_name')
  lastName: string = '';
}

const user = await http.getSingleWithAutoMap(UserDTO, '/users/1');
// user.firstName est automatiquement mappé depuis first_name
```

---

# STOCKAGE CHIFFRÉ

## LocalStorageHelper — Singleton chiffré

```typescript
import { LocalStorageHelper } from '@projetlucie/lc-front-sdk';

const storage = LocalStorageHelper.Instance;

// Personnaliser la clé de chiffrement (appeler au démarrage de l'app)
storage.customSecret('ma-cle-secrete');

// Désactiver le chiffrement (utile en dev)
storage.disableEncryption(true);

// Stocker / lire
storage.setItem('user', { id: 1, name: 'Alice' });
const user = storage.getItem<User>('user');        // null si expiré ou absent

// Stocker avec durée de validité personnalisée (secondes)
storage.setItem('token', accessToken, 3600);       // 1 heure

// Stocker avec sérialisation (json-object-mapper)
storage.setSerializedItem('user', userInstance);
const user = storage.getDeserializedItem('user', UserDTO);
const items = storage.getDeserializedArray('items', ItemDTO);

// Supprimer / vider
storage.removeItem('user');
storage.clear();
```

## SessionStorageHelper

```typescript
import { SessionStorageHelper } from '@projetlucie/lc-front-sdk';

const session = SessionStorageHelper.Instance;
// Mêmes méthodes que LocalStorageHelper
```

> **Durée de validité par défaut** : 30 jours. Les items expirés sont automatiquement supprimés à la lecture.

---

# AUTHENTIFICATION JWT

## HttpAuthTokenHelper

```typescript
import { HttpAuthTokenHelper, LocalStorageHelper } from '@projetlucie/lc-front-sdk';

const tokenHelper = new HttpAuthTokenHelper(LocalStorageHelper.Instance);

// Lecture / écriture du token
tokenHelper.setToken({ accessToken, refreshToken, numeroPersonnePhysique, idUtilisateur, email });
tokenHelper.clearToken();
tokenHelper.getToken();                         // Lit depuis localStorage (ou query param si RouteLocation fourni)
tokenHelper.getAccessTokenFromLocalStorage();
tokenHelper.getRefreshTokenFromLocalStorage();

// Validation
tokenHelper.isExpired(token);                   // true si expiré
tokenHelper.isExpiredFromLessThanOneHour(token); // expiré mais depuis < 1h (reconnexion possible)
tokenHelper.isExpiredSinceOneHour(token);        // expiré depuis > 1h (déconnexion forcée)
tokenHelper.isRealToken(token);                  // true si c'est un vrai JWT (contient '.')
tokenHelper.getExpirationTime(token);            // timestamp UNIX d'expiration

// Décodage
const decoded = tokenHelper.decode<MonJwtCustom>(token);
tokenHelper.getRoleId(token);                    // Retourne idr depuis le JWT

// Scope (multi-domaine)
tokenHelper.isTokenValidForScope(token, 'monapp.example.com');

// Échange refresh token → access token
const realToken = await tokenHelper.getRealToken(
  (refToken) => authApi.exchangeToken(refToken),
  potentialRefreshToken
);
```

### Interfaces JWT

```typescript
import type { JwtToken, TokenDTO } from '@projetlucie/lc-front-sdk';

// JwtToken : { exp, idr, sar, ... }
// TokenDTO : { accessToken, refreshToken, numeroPersonnePhysique, idUtilisateur, email }
```

---

# SÉRIALISATION

```typescript
import { serialize, deserialize, deserializeArray } from '@projetlucie/lc-front-sdk';

// Sérialiser un objet (json-object-mapper)
const json = serialize(myInstance);

// Désérialiser
const instance = deserialize(MyClass, jsonData);
const instances = deserializeArray(MyClass, jsonArrayData);
```

---

# UI — NAVIGATION

## AbstractQueryParams

Classe abstraite pour encapsuler les query params de l'URL.

```typescript
import { AbstractQueryParams } from '@projetlucie/lc-front-sdk';

class SearchParams extends AbstractQueryParams {
  get page(): number | null {
    return this.getNumberValue('page');
  }
  set page(value: number | null) {
    this.setValue('page', value);
  }

  get query(): string | null {
    return this.getStringValue('query');
  }
  set query(value: string | null) {
    this.setValue('query', value);
  }

  get onlyActive(): boolean {
    return this.getBooleanValue('onlyActive');
  }
  set onlyActive(value: boolean) {
    this.setBooleanValue('onlyActive', value);
  }
}

// Usage
const params = new SearchParams(route.query as unknown as URLSearchParams);
params.page = 2;
params.query = 'alice';

// Passer au router
router.push({ query: params.toObject() });

// Passer à axios
http.axios.get('/search', { params: new URLSearchParams(params.toString()) });
```

## GlobalHelper / Navigation helpers

```typescript
import { encodeUri, openNewTab } from '@projetlucie/lc-front-sdk';

encodeUri('mon texte à encoder');   // Encode l'URI
openNewTab('https://example.com'); // Ouvre un onglet
```

---

# UI — FORMULAIRES (Validators)

```typescript
import {
  isValidState, isInvalidState,
  // validators vee-validate internes
} from '@projetlucie/lc-front-sdk';

// Aide à l'état Bootstrap/vee-validate
isValidState(meta);    // true si touched && valid
isInvalidState(meta);  // true si touched && invalid
```

---

# UI — VIEWPORT

```typescript
import { ScrollEvent, scrollOnEvent } from '@projetlucie/lc-front-sdk';

scrollOnEvent(myScrollEvent); // Déclenche le scroll vers une cible
```

---

# DOM — ScriptHelper

Injecter dynamiquement des scripts tiers.

```typescript
import { ScriptHelper } from '@projetlucie/lc-front-sdk';

ScriptHelper.injectScript('https://cdn.example.com/lib.js', 'my-script-id');
ScriptHelper.removeScript('my-script-id');
```

---

# ENUMS

## MESSAGE_TYPE

```typescript
import { MESSAGE_TYPE } from '@projetlucie/lc-front-sdk';

MESSAGE_TYPE.SUCCESS   // 'success'
MESSAGE_TYPE.ERROR     // 'error'
MESSAGE_TYPE.DEFAULT   // 'default'
MESSAGE_TYPE.INFO      // 'info'
MESSAGE_TYPE.WARNING   // 'warning'
// MESSAGE_TYPE.DANGER  — @deprecated, utiliser ERROR
```

## DateFormats

```typescript
import { DateFormats } from '@projetlucie/lc-front-sdk';

DateFormats.DAY_MONTH_YEAR                    // 'DD/MM/YYYY'
DateFormats.YEAR_MONTH_DAY                    // 'YYYY-MM-DD'
DateFormats.DAY_MONTH_YEAR_HOUR_MIN_SEC       // 'DD/MM/YYYY HH:mm:ss'
DateFormats.YEAR_MONTH_DAY_T_HOUR_MIN_SEC     // 'YYYY-MM-DDTHH:mm:ss'
DateFormats.HOUR_MIN                          // 'HH:mm'
DateFormats.MONTH_YEAR                        // 'MM/YYYY'
DateFormats.MONTH_YEAR_FULL_LETTERS           // 'MMMM YYYY'
DateFormats.DAY_MONTH_FULL_LETTERS            // 'DD MMMM'
DateFormats.MONTH_FULL_LETTERS                // 'MMMM'
DateFormats.YEAR_FULL_DIGITS                  // 'YYYY'
DateFormats.DAY_MONTH_YEAR_HYPHEN             // 'DD-MM-YYYY'
DateFormats.HOUR_MIN_SEC                      // 'HH:mm:ss'
```

## EnvMode / EnvName

```typescript
import { EnvMode, EnvName } from '@projetlucie/lc-front-sdk';

EnvMode.DEVELOPMENT
EnvMode.PRODUCTION

EnvName.LOCAL
EnvName.DEV
EnvName.STAGING
EnvName.PROD
```

---

# LIB — UTILITAIRES STRING

```typescript
import {
  // Vérifications
  isEmpty, IsNullOrEmpty, IsNullOrZero, isNotEmpty,
  isValidEmail, isValidPassword, isValidFrenchPhone, isValidPhoneMobileOnly,
  isValidFrenchIBAN, isValidIBANLength, isValidCredential,
  isFrenchPhoneNumber, isContainedIn,
  hasCapitalLetter, hasSpecialCharacter, hasAtLeast8Characters, hasOneNumber,
  // Formatage
  capitalizeName, capitalizeFirstLetter, firstLettertoUpperCase, getCapitalizedFirstLetter,
  toEuro, toPercent, toFloat, roundToTwoDecimals,
  formatAmount, formatWithMask, formatRIBWithMask,
  toPascalCase, toUpperCase,
  // Manipulation
  cleanMultipleSpaces, removeSpaces, removeSymbols,
  truncate, splitFirstAndLastName, concatName, concatString,
  concatStringWithCapitalize, concatTitle, concatArrayToString,
  anonymiseIBAN, getInitials, initialFullname, getUrlParams,
  stringOrNull, valueOrHyphen, valueOrSymbol, unformat,
  searchWordInText, replaceNewLinesWithSpace,
  // Divers
  generateUniqueID, hashCode, mDecodeURI, prefixLocalFilePath,
  getOnlyDigitsNumOrga
} from '@projetlucie/lc-front-sdk';

// Exemples fréquents
isEmpty('');                                 // true
IsNullOrEmpty(null);                         // true
IsNullOrEmpty('');                           // true
isValidEmail('test@test.com');               // true
isValidPassword('Abc@1234');                 // true
capitalizeName('jean-pierre dupont');        // 'Jean-Pierre Dupont'
toEuro(1234.5);                              // '1 234,50 €'
toPercent(0.1234);                           // '12,34 %'
truncate('Long text here', 10);              // 'Long text…'
splitFirstAndLastName('Alice Dupont');       // { firstName: 'Alice', lastName: 'Dupont' }
anonymiseIBAN('FR7612345678901234567890189'); // 'FR76 **** **** **** **** **** 189'
```

---

# LIB — UTILITAIRES DATE

```typescript
import {
  parseDate, parseDateTime, parseLucieDate, stringDateToMs,
  dateFormatForAPI, dateToString, msDateToString, formatDate,
  getAge, yearDiffToday, getDiffBetween, getDiffBetweenTwoDates,
  getStartOfDay, getEndOfDay, getDateOnStartOfDay, getDateOnEndOfDay, getStartOfMonth,
  getDatetimeLocal, getDateInFuture, getToday, getTodayDate,
  addToDate, isAdult, hasAdultTeeth, isOverOrEqualEmancipationAge,
  DateFormats
} from '@projetlucie/lc-front-sdk';

// Parsing
parseDate('25/01/2024');                     // Dayjs object (format JJ/MM/AAAA)
parseDateTime('2024-01-25T10:30:00');        // Dayjs object ISO
parseLucieDate('2024-01-25');               // Dayjs object format API Lucie

// Formatage
dateFormatForAPI(new Date());                // '2024-01-25' (YYYY-MM-DD)
dateToString(new Date(), DateFormats.DAY_MONTH_YEAR);  // '25/01/2024'
msDateToString(1706173800000, DateFormats.DAY_MONTH_YEAR); // depuis timestamp ms

// Calculs
getAge('1990-01-25');                        // nombre d'années
yearDiffToday('2020-01-25');                 // différence en années jusqu'à aujourd'hui
getDiffBetween(date1, date2, 'day');         // différence en unité dayjs
isAdult('1990-01-25');                       // true si >= 18 ans

// Bornes
getStartOfDay(new Date());                   // début de journée (00:00:00)
getEndOfDay(new Date());                     // fin de journée (23:59:59)
getStartOfMonth(new Date());                 // 1er du mois

// Manipulation
addToDate(new Date(), 7, 'day');             // +7 jours
getDateInFuture(30);                         // dans 30 jours
getToday();                                  // Dayjs d'aujourd'hui
getTodayDate();                              // Date JS d'aujourd'hui

// HTML datetime-local
getDatetimeLocal(new Date());               // '2024-01-25T10:30' (pour <input type="datetime-local">)
```

---

# LIB — UTILITAIRES ARRAY

```typescript
import {
  changeElementPositionInArray,
  removeFromArray,
  groupBy,
  paginateArray,
  getMapResults,
  isEmptyArray
} from '@projetlucie/lc-front-sdk';

isEmptyArray([]);                                    // true
isEmptyArray(null);                                  // true
groupBy(['a', 'bb', 'ccc'], (s) => s.length);        // Map { 1: ['a'], 2: ['bb'], 3: ['ccc'] }
paginateArray([1,2,3,4,5], 2, 2);                    // [3,4] (page 2, taille 2)
removeFromArray(arr, itemRef);                       // retire l'élément par référence
changeElementPositionInArray(arr, 0, 2);             // déplace l'élément de l'index 0 à 2
```

---

# LIB — UTILITAIRES OBJECT

```typescript
import {
  convertObjectToFormData,
  convertObjectToQueryString,
  createInstance,
  createNullObject,
  deepFreeze
} from '@projetlucie/lc-front-sdk';

convertObjectToFormData({ name: 'Alice', file: myFile }); // FormData
convertObjectToQueryString({ page: 1, q: 'test' });       // 'page=1&q=test'
deepFreeze(myObject);                                      // Freeze récursif
```

---

# LIB — TYPES TYPESCRIPT

```typescript
import type { DeepReadonly, OmitFunctions, OnlyFunctions, ClassFields } from '@projetlucie/lc-front-sdk';

// DeepReadonly<T> — rend toutes les propriétés imbriquées readonly
type ImmutableUser = DeepReadonly<User>;

// OmitFunctions<T> — ne garde que les propriétés (pas les méthodes)
type UserData = OmitFunctions<UserClass>;

// OnlyFunctions<T> — ne garde que les méthodes
type UserMethods = OnlyFunctions<UserClass>;

// ClassFields<T> — idem OmitFunctions, pour passer des données à un constructeur/update
type UserFields = ClassFields<UserClass>;
```

---

# DOMAIN — FINANCE

```typescript
import { isValidIban, isValidBic, BankHelper } from '@projetlucie/lc-front-sdk';

isValidIban('FR7612345678901234567890189'); // true/false
isValidBic('BNPAFRPP');                    // true/false
```

---

# DOMAIN — SECURITÉ SOCIALE

```typescript
import { NIR_LENGTH, NIR_WITH_KEY_LENGTH } from '@projetlucie/lc-front-sdk';
// Constantes pour la validation du numéro de sécurité sociale
```

---

# DOMAIN — AGE

```typescript
import { EMANCIPATION_AGE, ADULT_AGE } from '@projetlucie/lc-front-sdk';
// Constantes françaises d'âge légal
```

---

# TESTS — useCallbackObserver

Utilitaire Vitest pour capturer les valeurs émises par des observables.

```typescript
import { useCallbackObserver } from '@projetlucie/lc-front-sdk';
import { vi, expect, it } from 'vitest';

it('émet la bonne valeur', () => {
  const store = new StoreValue<number>(null);
  const { values, observer } = useCallbackObserver<number>(vi);

  store.OnChange$.subscribe(observer);
  store.set(42);
  store.set(100);

  expect(values).deep.equals([42, 100]);
  expect(observer).toHaveBeenCalledTimes(2);
});
```

---

# PATTERN COMPLET — Créer un store métier

```typescript
// src/stores/cartModule.ts
import 'reflect-metadata'; // obligatoire pour Inversify
import { LcModule, StoreValue, StoreError } from '@projetlucie/lc-front-sdk';
import { injectable } from 'inversify';
import type { CartItem } from '@/models/CartItem';

@injectable()
export class CartModule extends LcModule {
  private readonly _items = this.createValue<CartItem[]>([], { name: 'items', debug: false });
  private readonly _total = this.createValue<number>(0, { name: 'total' });

  // Observables publics
  public readonly items$ = this._items.OnChangeWithInitialValue$;
  public readonly total$ = this._total.OnChange$;
  public readonly error$ = this.OnError$;

  // Getters
  public get items(): CartItem[] {
    return this._items.Value ?? [];
  }

  public get total(): number {
    return this._total.Value ?? 0;
  }

  // Mutations
  public addItem(item: CartItem): void {
    const current = this.items;
    this._items.set([...current, item]);
    this._total.set(current.reduce((sum, i) => sum + i.price, 0) + item.price);
  }

  public removeItem(id: number): void {
    const updated = this.items.filter((i) => i.id !== id);
    if (updated.length === this.items.length) {
      this.emitError(new StoreError('ITEM_NOT_FOUND', `Item ${id} introuvable`));
      return;
    }
    this._items.set(updated);
    this._total.set(updated.reduce((sum, i) => sum + i.price, 0));
  }
}
```

```typescript
// Usage dans un composant Vue 3
import { useObservableRef } from '@projetlucie/lc-front-common'; // bridge Vue/RxJS
import { cartModule } from '@/stores';

const items = useObservableRef(cartModule.items$);
const total = useObservableRef(cartModule.total$);
```

---

# PATTERN COMPLET — Service HTTP

```typescript
// src/services/userService.ts
import { HttpAuth, LocalStorageHelper, serialize, deserialize } from '@projetlucie/lc-front-sdk';
import { UserDTO } from '@/models/UserDTO';

export class UserService {
  private http = HttpAuth.Instance(LocalStorageHelper.Instance);

  async getUser(id: number): Promise<UserDTO> {
    return this.http.getSingleWithAutoMap(UserDTO, `/users/${id}`);
  }

  async getUsers(): Promise<UserDTO[]> {
    return this.http.getArrayWithAutoMap(UserDTO, '/users');
  }

  async createUser(data: Partial<UserDTO>): Promise<void> {
    await this.http.axios.post('/users', data);
  }

  async updateUser(id: number, data: Partial<UserDTO>): Promise<void> {
    await this.http.axios.put(`/users/${id}`, data);
  }
}
```
