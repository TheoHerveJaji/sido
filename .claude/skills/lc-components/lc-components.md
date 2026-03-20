---
name: lc-components
description: "Guide d'utilisation des composants @projetlucie/lc-front-components pour les projets Vue 3 / Nuxt. Genere le code avec les bons imports, props, enums et slots."
user-invocable: true
---

Tu es un expert de la librairie de composants **@projetlucie/lc-front-components** (framework Moonicorn). Quand l'utilisateur demande de l'aide sur un composant Lc, tu dois :

1. **Generer du code d'utilisation** avec les imports corrects depuis `@projetlucie/lc-front-components`
2. **Expliquer les props/options disponibles** pour chaque composant
3. **Utiliser les bons enums et types** fournis par la librairie

## Regles d'import

Tous les composants, enums, types et helpers s'importent depuis `@projetlucie/lc-front-components` :

```typescript
import { LcButton, CtaVariant, CtaSize } from '@projetlucie/lc-front-components';
import type { TabItem, FileInfo } from '@projetlucie/lc-front-components';
```

---

# CATALOGUE COMPLET DES COMPOSANTS

---

## FORMULAIRES

### LcInput
Champ de saisie texte simple.

```vue
<LcInput v-model="value" placeholder="Saisissez..." :disabled="false" :invalid="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| number \| null` | `''` | v-model |
| placeholder | `string` | `''` | Texte placeholder |
| type | `string` | `'text'` | Type HTML (text, email, tel...) |
| block | `boolean` | `false` | Prend toute la largeur |
| large | `boolean` | `false` | Taille large |
| disabled | `boolean` | `false` | Desactive le champ |
| readonly | `boolean` | `false` | Lecture seule |
| autocomplete | `string` | `'on'` | Autocomplete HTML |
| invalid | `boolean` | `false` | Etat invalide |

**Emits:** `update:modelValue(string)`, `change(string, Event)`, `blur(string, Event)`, `focus(string, Event)`

---

### LcInputPassword
Champ mot de passe avec toggle visibilite et regles de validation.

```vue
<LcInputPassword id="pwd" label="Mot de passe" :creation="true" :failed-rules="failedRules" @input="onInput" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | `string` | `'id-inpt-pwd'` | ID HTML |
| label | `string` | `'Mot de passe'` | Label du champ |
| placeholder | `string` | `'Mot de passe'` | Placeholder |
| labelClass | `string` | `''` | Classes CSS du label |
| creation | `boolean` | `false` | Mode creation (affiche regles) |
| failedRules | `LcInputPasswordFailedRules` | `{}` | Regles echouees `{ number?, upCase?, min?, specialChar? }` |
| invalid | `boolean` | `false` | Etat invalide |

**Emits:** `input(string, Event?)`, `change(string, Event)`, `blur(string, Event)`, `focus(string, Event)`

---

### LcInputSearch
Champ de recherche avec icones et bouton effacer.

```vue
<LcInputSearch v-model="search" placeholder="Rechercher..." :can-clear="true" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| null` | `null` | v-model |
| placeholder | `string` | `''` | Placeholder |
| block | `boolean` | `false` | Pleine largeur |
| large | `boolean` | `false` | Grande taille |
| disabled | `boolean` | `false` | Desactive |
| readonly | `boolean` | `false` | Lecture seule |
| invalid | `boolean` | `false` | Etat invalide |
| isRounded | `boolean` | `true` | Bords arrondis |
| iconPrepend | `string \| null` | `'search'` | Icone gauche |
| iconAppend | `string \| null` | `null` | Icone droite |
| labelAppend | `string` | `'Effacer'` | Label bouton effacer |
| iconSize | `string` | `'subheader'` | Taille icone (TextSize) |
| canClear | `boolean` | `false` | Affiche bouton effacer |

**Emits:** `update:modelValue(string)`, `change(string, Event)`, `blur(string, Event)`, `focus(Event)`, `keydown:down(KeyboardEvent)`, `keydown:up(KeyboardEvent)`, `keydown:enter(KeyboardEvent)`

---

### LcInputSelect
Select/multiselect avance (base sur @vueform/multiselect).

```vue
<LcInputSelect
  v-model="selected"
  :source="options"
  mode="single"
  label="name"
  value-prop="id"
  placeholder="Selectionnez..."
  :searchable="true"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| source | `Array<T>` | `[]` | Options disponibles |
| mode | `'single' \| 'multiple' \| 'tags'` | `'single'` | Mode de selection |
| groups | `boolean` | `false` | Active le mode groupe |
| disabled | `boolean` | `false` | Desactive |
| placeholder | `string` | `'Selectionnez une valeur'` | Placeholder |
| noOptionsText | `string` | `'Aucun choix disponible'` | Texte si aucune option |
| label | `string` | `'name'` | Propriete affichee de l'objet |
| trackBy | `string` | `'name'` | Propriete de recherche |
| valueProp | `string` | `'name'` | Propriete valeur |
| isObjectModel | `boolean` | `false` | v-model retourne l'objet complet |
| searchable | `boolean` | `false` | Active la recherche |
| invalid | `boolean` | `false` | Etat invalide |
| closeOnSelect | `boolean` | `true` | Ferme apres selection |
| variant | `LcInputSelectVariant` | `'big'` | Variante visuelle |
| openDirection | `'bottom' \| 'top'` | `'bottom'` | Direction d'ouverture |
| showEraseBtn | `boolean` | `false` | Bouton effacer |

**Enum LcInputSelectVariant:** `SMALL = 'small'`, `BIG = 'big'`

**Emits:** `input(value)`, `close()`, `select(T)`, `update:modelValue(T | T[] | null)`

**Slots:** `option({ option: T })` - Personnalisation du rendu d'une option

---

### LcInputNumber
Champ numerique avec bornes.

```vue
<LcInputNumber v-model="quantity" :min="0" :max="100" :has-decimal="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| min | `number` | `0` | Valeur minimum |
| max | `number` | `10` | Valeur maximum |
| invalid | `boolean` | `false` | Etat invalide |
| hasDecimal | `boolean` | `true` | Autorise les decimales |
| canBeNull | `boolean` | `false` | Autorise null |

---

### LcInputGroup
Wrapper pour ajouter des icones prepend/append a un input.

```vue
<LcInputGroup icon-prepend="search" icon-append="x" @prepend="onSearch" @append="onClear">
  <LcInput v-model="value" />
</LcInputGroup>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| iconPrepend | `string \| null` | `null` | Icone gauche |
| iconAppend | `string \| null` | `null` | Icone droite |
| iconSize | `string` | `'title'` | Taille des icones |
| isRound | `boolean` | `false` | Bords arrondis |
| labelPrepend | `string` | `''` | Label accessibilite gauche |
| labelAppend | `string` | `''` | Label accessibilite droite |

**Emits:** `prepend(MouseEvent)`, `append(MouseEvent)`

**Slots:** `default` - Contenu (input)

---

### LcTextarea
Zone de texte multi-lignes avec compteur optionnel.

```vue
<LcTextarea v-model="text" placeholder="Votre message..." :max-length="500" :is-resize="true" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | `''` | v-model |
| placeholder | `string` | `'Ecrire un commentaire'` | Placeholder |
| disabled | `boolean` | `false` | Desactive |
| readonly | `boolean` | `false` | Lecture seule |
| invalid | `boolean` | `false` | Etat invalide |
| isLarge | `boolean` | `false` | Grande taille |
| isResize | `boolean` | `true` | Redimensionnable |
| maxLength | `number` | `-1` | Limite de caracteres (-1 = illimite) |
| maxLengthStrict | `boolean` | `false` | Bloque la saisie au-dela de maxLength |
| maxLengthMessage | `string` | `'Limite de caracteres atteinte'` | Message d'avertissement |

**Emits:** `update:modelValue(string)`

---

### LcCheckbox
Case a cocher.

```vue
<LcCheckbox v-model="accepted" :disabled="false" :invalid="false">
  J'accepte les conditions
</LcCheckbox>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | - | v-model |
| disabled | `boolean` | `false` | Desactive |
| indeterminate | `boolean` | `false` | Etat indetermine |
| checkedValue | `any` | `true` | Valeur quand coche |
| uncheckedValue | `any` | `false` | Valeur quand decoche |
| invalid | `boolean` | `false` | Etat invalide |

**Emits:** `update:modelValue(checkedValue | uncheckedValue)`

**Slots:** `default` - Label de la checkbox

---

### LcRadio
Groupe de boutons radio.

```vue
<LcRadio v-model="choice" :choices="['Option A', 'Option B', 'Option C']" />

<!-- Avec objets -->
<LcRadio v-model="choice" :choices="[{ key: 'a', label: 'Option A' }, { key: 'b', label: 'Option B' }]" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| LcRadioChoice \| null` | `null` | v-model |
| choices | `Array<string \| LcRadioChoice>` | **required** | Options |
| list | `boolean` | `false` | Affichage en liste |
| disabled | `boolean` | `false` | Desactive |

**Type LcRadioChoice:** `{ key: string; label: string; disabled?: boolean }`

**Emits:** `update:modelValue(string | LcRadioChoice)`

---

### LcRadioCard
Boutons radio en format carte visuelle.

```vue
<LcRadioCard v-model="selection" :choices="choices" :font-size="TextSize.HEADER">
  <template #radio0>Description option 1</template>
  <template #radio1>Description option 2</template>
</LcRadioCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| LcRadioChoice \| null` | `null` | v-model |
| choices | `Array<string \| LcRadioChoice>` | **required** | Options |
| list | `boolean` | `false` | Affichage en liste |
| disabled | `boolean` | `false` | Desactive |
| isRadioCenter | `boolean` | `true` | Centre le radio bouton |
| fontSize | `TextSize` | `TextSize.HEADER` | Taille du texte |

**Slots:** `radio{index}` (description), `radio{index}content` (contenu), `radio{index}right` (droite)

---

### LcToggle
Interrupteur on/off.

```vue
<LcToggle v-model="isActive" content-position="right">
  Activer les notifications
</LcToggle>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | **required** | v-model |
| disabled | `boolean` | `false` | Desactive |
| contentPosition | `'left' \| 'right'` | `'right'` | Position du label |

**Slots:** `default` - Label

---

### LcToggleButton
Bouton Oui/Non ou selection unique.

```vue
<LcToggleButton v-model="answer" :is-unique-selection="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean \| null` | `null` | v-model |
| invalid | `boolean` | `false` | Etat invalide |
| fontSize | `TextSize` | `'body'` | Taille du texte |
| isUniqueSelection | `boolean` | `false` | Mode selection unique |

**Slots:** `uniqueButtonLabel`, `positiveLabel`, `negativeLabel`

---

### LcToggleButtonGroup
Groupe de boutons toggle avec options personnalisees.

```vue
<LcToggleButtonGroup v-model="selectedOption" :options="[
  { id: '1', label: 'Jour' },
  { id: '2', label: 'Semaine', icon: { name: 'calendar', position: 'left' } }
]" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `OptionToggleBtn \| null` | `null` | v-model |
| options | `Array<OptionToggleBtn>` | `[]` | Options |

**Type OptionToggleBtn:** `{ id: string; label: string; icon?: { name: string; position: 'right' | 'left' } }`

**Emits:** `update:modelValue(OptionToggleBtn)`

---

### LcDatepicker
Selecteur de date complet.

```vue
<LcDatepicker v-model="date" :mode="DATEPICKER_MODE.DATE" :is-range="false" placeholder="Choisir une date" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| model | `DatePickerValue` | `null` | v-model |
| mode | `DATEPICKER_MODE` | `DATE` | Mode: DATE, TIME, MONTH, DATETIME |
| placeholder | `string` | `'Selectionner une date'` | Placeholder |
| isRange | `boolean` | `false` | Selection de periode |
| editable | `boolean` | `false` | Saisie manuelle |
| isRequired | `boolean` | `false` | Champ requis |
| minDate | `Date` | `undefined` | Date minimum |
| maxDate | `Date` | `undefined` | Date maximum |
| disabled | `boolean` | `false` | Desactive |
| isCalendarOnly | `boolean` | `false` | Affiche seulement le calendrier |
| isMultiCalendars | `boolean` | `false` | Deux calendriers cote a cote |
| startDate | `Date` | `undefined` | Date de debut par defaut |

**Enum DATEPICKER_MODE:** `DATE = 'date'`, `TIME = 'time'`, `MONTH = 'month'`, `DATETIME = 'datetime'`

**Types:**
- `DatePickerSingleValue = Date | null`
- `DatePickerRangeValue = { start: Date; end: Date }`
- `DatePickerValue = DatePickerSingleValue | DatePickerRangeValue`

**Emits:** `change(DatePickerValue)`, `close()`

**Slots:** `header({ clearValue, setValue, value })`

---

### LcDatepickerPeriodPresets
Presets de periodes pour le datepicker.

```vue
<LcDatepickerPeriodPresets :presets="presets" :datepicker-value="dateRange" @select="onSelect" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| presets | `Preset[]` | **required** | Presets `{ label: string; value: DatePickerRangeValue }` |
| datepickerValue | `DatePickerValue` | **required** | Valeur courante du datepicker |

**Emits:** `select(DatePickerRangeValue)`, `unselect(DatePickerRangeValue)`

---

### LcAutocomplete
Champ avec autocompletion.

```vue
<LcAutocomplete
  v-model="input"
  :items="suggestions"
  :item-projection="(item) => item.label"
  :min-input-length="2"
  :is-front-filtering="true"
  @on-select="onSelect"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| input | `string \| null` | **required** | v-model |
| items | `T[]` | **required** | Liste des suggestions |
| itemProjection | `(item: T) => string` | `String(item)` | Projection d'affichage |
| itemDescriptionProjection | `((item: T) => string) \| null` | `null` | Description secondaire |
| minInputLength | `number` | `2` | Longueur minimum pour declencher |
| minItemLength | `number` | `0` | Nombre minimum de resultats |
| isInvalid | `boolean` | `false` | Etat invalide |
| isFrontFiltering | `boolean` | `false` | Filtrage cote client |
| isRounded | `boolean` | `false` | Bords arrondis |
| iconPrepend | `string \| null` | `null` | Icone gauche |

**Emits:** `on-change(string)`, `on-input(string)`, `on-blur(string)`, `on-focus(string)`, `on-select(T)`

**Slots:** `content-no-result` - Message aucun resultat

---

### LcOtpCode
Saisie de code OTP (verification).

```vue
<LcOtpCode v-model="code" :count="6" :invalid="false" @enter="onSubmit" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string` | - | v-model |
| count | `number` | `6` | Nombre de caracteres |
| invalid | `boolean` | `false` | Etat invalide |

**Emits:** `update:modelValue(string)`, `enter(KeyboardEvent)`

---

### LcSelectButton
Bouton de selection on/off.

```vue
<LcSelectButton label="Option A" :is-active="isSelected" @toggle="onToggle" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | **required** | Texte du bouton |
| isActive | `boolean` | `false` | Etat actif |
| isDisabled | `boolean` | `false` | Desactive |

**Emits:** `toggle(boolean)`

---

### LcSlider
Curseur de valeur.

```vue
<LcSlider v-model="value" :min="1" :max="10" :increment="1" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `number` | **required** | v-model |
| min | `number` | `1` | Minimum |
| max | `number` | `5` | Maximum |
| increment | `number` | `1` | Pas |

---

### LcUploader
Upload de fichiers avec drag & drop.

```vue
<LcUploader
  :single-file="false"
  :max-files-number="3"
  :max-file-size-in-mb="5"
  :format="'png, jpg, pdf'"
  @upload-payload-key="onUpload"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| singleFile | `boolean` | `true` | Un seul fichier |
| maxFilesNumber | `number` | `1` | Nombre max de fichiers |
| maxFileSizeInMb | `number` | `5` | Taille max en MB |
| label | `string` | `'Cliquer ou glisser-deposer...'` | Label principal |
| labelType | `string` | `'Photo ou fichier au format png, jpg, pdf'` | Label format |
| format | `string` | `'png, jpg, pdf'` | Formats acceptes |
| disabled | `boolean` | `false` | Desactive |
| acceptType | `string` | `'image/jpeg, image/png, application/pdf'` | MIME types |
| simpleUploader | `boolean` | `false` | Mode simplifie (bouton seul) |
| initFiles | `UploadableFileInfo[]` | `[]` | Fichiers initiaux |
| hasFilesBelow | `boolean` | `true` | Affiche fichiers en dessous |

**Type LcUploaderPayload:** `{ canFilesBeUploaded: boolean; errorFiles: UploadableFileInfo[]; successFiles: UploadableFileInfo[]; removedFiles: UploadableFileInfo[] }`

**Emits:** `upload-payload-key(LcUploaderPayload)`

**Slots:** `only-upload-button({ addFile, labelBtn, disabled })`, `text-between`, `handle-file-display({ files, removeFile, visualizeFile })`

---

## BOUTONS

### LcButton
Bouton d'action principal.

```vue
<LcButton :variant="CtaVariant.PRIMARY" :size="CtaSize.REGULAR" icon-left="plus" :disabled="false">
  Ajouter
</LcButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `CtaVariant` | `PRIMARY` | Style visuel |
| size | `CtaSize` | `REGULAR` | Taille |
| disabled | `boolean` | `false` | Desactive |
| block | `boolean` | `false` | Pleine largeur |
| type | `string` | `'button'` | Type HTML (button, submit, reset) |
| name | `string` | `''` | Nom du bouton |
| iconLeft | `string` | `''` | Icone a gauche |
| iconRight | `string` | `''` | Icone a droite |
| forceFocusState | `boolean` | `false` | Force l'etat focus |

**Enum CtaVariant:** `LINK`, `PRIMARY`, `SECONDARY`, `SQUARE`, `TERTIARY`, `UNSET`, `DESTRUCTIVE`, `CIRCULAR`

**Enum CtaSize:** `SMALL`, `REGULAR`, `BIG`

**Slots:** `default` - Contenu du bouton

---

### LcButtonDropdown
Bouton avec menu deroulant.

```vue
<LcButtonDropdown :position="BUTTON_DROPDOWN_POSITION.BOTTOM_RIGHT">
  <LcButton>Actions</LcButton>
  <template #dropdown>
    <ul>
      <li>Action 1</li>
      <li>Action 2</li>
    </ul>
  </template>
</LcButtonDropdown>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `BUTTON_DROPDOWN_POSITION` | `BOTTOM_RIGHT` | Position du dropdown |
| disabled | `boolean` | `false` | Desactive |
| dropdownClasses | `string` | `''` | Classes CSS du dropdown |

**Enum BUTTON_DROPDOWN_POSITION:** `TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_RIGHT`

**Emits:** `open()`

**Slots:** `default` (bouton declencheur), `dropdown` (contenu du menu)

---

## AFFICHAGE

### LcBadge
Badge de notification ou statut.

```vue
<LcBadge variant="accent" nuance="400" :reverse="false">12</LcBadge>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `string` | `'accent'` | Couleur (COLOR_ENUM) |
| reverse | `boolean` | `false` | Inverse les couleurs |
| nuance | `string` | `'400'` | Nuance de couleur |

**Slots:** `default`

---

### LcBanner
Banniere d'information.

```vue
<LcBanner variant="info" icon-name="info" body-text="Informations importantes" :inverse="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `string` | `'info'` | Couleur (info, success, danger, warning) |
| inverse | `boolean` | `false` | Inverse les couleurs |
| iconName | `string` | `null` | Nom de l'icone |
| bodyText | `string` | `null` | Texte du corps |

---

### LcPill
Pastille/tag de statut.

```vue
<LcPill :variant="COLOR_ENUM.SUCCESS" :inverse="true" shape="rectangle" size="regular">
  Actif
</LcPill>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `COLOR_ENUM` | `NEUTRAL` | Couleur |
| inverse | `boolean \| null` | `null` | Inverse les couleurs |
| shape | `LcPillShape` | `RECTANGLE` | Forme |
| size | `'regular' \| 'small'` | `'regular'` | Taille |

**Enum LcPillShape:** `DISC = 'disc'`, `RECTANGLE = 'rectangle'`

**Slots:** `default`

---

### LcIcon
Icone de la librairie.

```vue
<LcIcon name="chevron-right" :size="TextSize.SUBHEADER" :color="COLOR_ENUM.PRIMARY" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | **required** | Nom de l'icone |
| size | `TextSize` | `SUBHEADER` | Taille |
| color | `string` | `'primary'` | Couleur (COLOR_ENUM) |
| disabled | `boolean` | `false` | Desactive (grise) |

---

### LcLoader
Indicateur de chargement.

```vue
<LcLoader variant="primary" size="md" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `COLOR_ENUM \| 'white'` | `'primary'` | Couleur |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille |

---

### LcSkeleton
Placeholder de chargement.

```vue
<LcSkeleton width="200px" height="16px" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | `string` | `'215px'` | Largeur |
| height | `string` | `'16px'` | Hauteur |

---

### LcSeparator
Separateur horizontal avec label optionnel.

```vue
<LcSeparator label="ou" align="center" type="solid" :bolder="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | `string` | `''` | Texte central |
| align | `'left' \| 'center' \| 'right'` | `'center'` | Alignement du label |
| type | `string` | `'solid'` | Type de trait |
| bolder | `boolean` | `false` | Trait epais |
| hasIcons | `boolean` | `false` | Affiche une icone |
| iconName | `string` | `'chevrons-down'` | Nom de l'icone |

---

### LcBubble
Bulle circulaire avec contenu texte.

```vue
<LcBubble content="AB" variant="neutral" size="medium" text-variant="neutral-100" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | `string` | `''` | Texte |
| variant | `string` | `'neutral'` | Couleur de fond |
| size | `string` | `'medium'` | Taille (SpacingSize) |
| textVariant | `string` | `'neutral-100'` | Couleur du texte |

---

### LcRibbon
Ruban decoratif avec label.

```vue
<LcRibbon libelle="Recommande" :variant="COLOR_ENUM.ACCENT" :inverse="true" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| libelle | `string` | `''` | Texte |
| variant | `COLOR_ENUM` | `NEUTRAL` | Couleur |
| inverse | `boolean \| null` | `null` | Inverse |

---

### LcCounter
Compteur avec boutons +/-.

```vue
<LcCounter v-model="count" :min="0" :max="10" :increment="1" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| internalValue | `number \| null` | **required** | v-model |
| min | `number` | `0` | Minimum |
| max | `number` | `10` | Maximum |
| increment | `number` | `1` | Pas |
| invalid | `boolean` | `false` | Etat invalide |

---

### LcProgressCircle
Cercle de progression.

```vue
<LcProgressCircle variant="secondary" :avancement="75" icon="check" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `string` | `'secondary'` | Couleur |
| inverse | `boolean \| null` | `null` | Inverse |
| avancement | `number` | `0` | Pourcentage (0-100) |
| icon | `string` | `''` | Icone au centre |

---

### LcComponentTooltip
Tooltip positionnable.

```vue
<LcComponentTooltip :variant="TOOLTIP_VARIANT.NEUTRALS" position="top">
  <template #container>
    <span>Survolez-moi</span>
  </template>
  <template #content>
    <p>Contenu du tooltip</p>
  </template>
</LcComponentTooltip>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `TOOLTIP_VARIANT` | `NEUTRALS` | Style du tooltip |
| position | `TOOLTIP_POSITION` | `'top'` | Position |
| large | `boolean` | `false` | Grande taille |
| isTeleported | `boolean` | `false` | Teleporte au body |
| isTooltipVisible | `boolean` | `true` | Visible au survol |

**Enum TOOLTIP_POSITION:** `TOP`, `TOP_RIGHT`, `RIGHT`, `BOTTOM_RIGHT`, `BOTTOM`, `BOTTOM_LEFT`, `LEFT`, `TOP_LEFT`, `TOP_START_LEFT`, `TOP_START_RIGHT`, `BOTTOM_START_LEFT`, `BOTTOM_START_RIGHT`

**Enum TOOLTIP_VARIANT:** `ACCENT`, `ALTERNATIVE`, `DANGER`, `INFO`, `NEUTRALS`, `PRIMARY`, `SECONDARY`, `SUCCESS`, `WARNING`, `WHITE`

**Slots:** `container` (element declencheur), `content` (contenu du tooltip)

---

### LcAdvisor
Encart d'information/conseil.

```vue
<LcAdvisor
  :variant="COLOR_ENUM.INFO"
  :inverse="true"
  icon-name="info"
  header-text="Bon a savoir"
  body-text="Vous pouvez modifier vos preferences..."
  body-action="En savoir plus"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `COLOR_ENUM` | `INFO` | Couleur |
| inverse | `boolean` | `true` | Inverse |
| iconName | `string` | `''` | Icone |
| headerText | `string` | `''` | Titre |
| bodyText | `string` | `''` | Corps du texte |
| bodyAction | `string` | `''` | Texte du lien d'action |
| bodyActionAlign | `'left' \| 'right'` | `'right'` | Alignement de l'action |
| bodyActionIcon | `string` | `'arrow-right'` | Icone de l'action |

---

### LcClipboardIcon
Bouton copier dans le presse-papier avec tooltip.

```vue
<LcClipboardIcon value="texte-a-copier" tooltip-label="Copier" tooltip-copied-label="Copie !" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | **required** | Texte a copier |
| tooltipLabel | `string` | `'Copier'` | Label tooltip |
| tooltipCopiedLabel | `string` | `'Copie'` | Label apres copie |
| tooltipErrorLabel | `string` | `'Erreur de copie'` | Label en cas d'erreur |
| copyFeedbackDuration | `number` | `800` | Duree du feedback (ms) |

---

## LAYOUT / STRUCTURE

### LcCard
Carte simple avec bord arrondi.

```vue
<LcCard :is-mobile-card="false" radius="regular">
  Contenu de la carte
</LcCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isMobileCard | `boolean` | `false` | Style mobile |
| radius | `string` | `'regular'` | Rayon de bordure |

**Slots:** `default`

---

### LcCardContainer
Carte avancee avec header, body, footer et variantes.

```vue
<LcCardContainer :variant="LC_CARD_CONTAINER_VARIANT.ANNOTATION" padding="regular" :border="true" :shadow="false">
  <template #header>Titre</template>
  Contenu
  <template #footer>Actions</template>
</LcCardContainer>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `LC_CARD_CONTAINER_VARIANT` | `ANNOTATION` | Style visuel |
| padding | `string` | `'regular'` | Padding interne (SpacingSize) |
| border | `boolean \| null` | `true` | Affiche la bordure |
| borderWidth | `string` | `SpacingSize.NANO` | Epaisseur bordure |
| borderColor | `string` | `'neutral-400'` | Couleur bordure |
| shadow | `boolean \| null` | `null` | Ombre portee |
| classContainer | `TComponentClass` | `''` | Classes du conteneur |
| classHeader | `string` | `''` | Classes du header |
| classFooter | `string` | `''` | Classes du footer |

**Enum LC_CARD_CONTAINER_VARIANT:** `ACCENT`, `ANNOTATION`, `DANGER`, `DISABLED`, `EXPLICATION`, `INFO`, `PRIMARY`, `RECOMMANDEE`, `SECONDARY`, `SUCCESS`, `WARNING`

**Slots:** `header`, `default` (body), `footer`

---

### LcCardSelection
Selection par carte (style radio).

```vue
<LcCardSelection v-model="selected" :items="['Option A', 'Option B', 'Option C']" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| LcRadioChoice \| null` | `null` | v-model |
| items | `Array<string \| LcRadioChoice>` | **required** | Options |

---

### LcCardSelectionPlus
Selection par carte avancee avec icones et descriptions.

```vue
<LcCardSelectionPlus
  v-model="selected"
  :options="options"
  container-direction="row"
  content-direction="column"
  :gap="SpacingSize.BIG"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `LcCardSelectionModel \| null` | **required** | v-model |
| options | `Array<LcCardSelectionModel>` | **required** | Options |
| contentDirection | `string` | `'column'` | Direction du contenu |
| containerDirection | `string` | `'row'` | Direction du conteneur |
| gap | `SpacingSize` | `BIG` | Espacement |
| labelSize | `TextSize` | `SUBHEADER` | Taille du label |
| isStreched | `boolean` | `true` | Etire les cartes |

**Class LcCardSelectionModel:** `{ id: number|null, label: string, description?: string, icon: string, color: string, bgColor: string, isSelected?: boolean, isDisabled?: boolean }`

---

### LcModal
Fenetre modale.

```vue
<LcModal v-model="isOpen" width="500px" height="auto" :close-on-backdrop="true">
  <h2>Titre</h2>
  <p>Contenu</p>
</LcModal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | **required** | v-model (ouvert/ferme) |
| width | `string` | `'447px'` | Largeur |
| height | `string` | `'470px'` | Hauteur |
| closeOnBackdrop | `boolean` | `true` | Ferme au clic sur le fond |

**Slots:** `default`

---

### LcCollapse
Zone repliable.

```vue
<LcCollapse v-model="isOpen">
  <template #container>
    <button>Toggle</button>
  </template>
  <template #collapse>
    <p>Contenu repliable</p>
  </template>
</LcCollapse>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | **required** | v-model (ouvert/ferme) |
| preChargedContent | `boolean` | `false` | Pre-charge le contenu (cache en CSS) |

**Slots:** `container` (declencheur), `collapse` (contenu)

---

### LcToggleCollapse
Collapse en mode accordeon.

```vue
<LcToggleCollapse v-model="isOpen" :accordion="0" :choices-collapse="choicesState">
  <template #container>Header</template>
  <template #collapse>Contenu</template>
</LcToggleCollapse>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | **required** | v-model |
| accordion | `number` | `0` | Index dans l'accordeon |
| choicesCollapse | `Array<{ collapseState: boolean }>` | **required** | Etats des sections |
| preChargedContent | `boolean` | `false` | Pre-charge le contenu |

**Slots:** `container`, `collapse`

---

### LcPanel
Panneau lateral glissant.

```vue
<LcPanel v-model="isPanelOpen" width="450px">
  <h2>Panneau</h2>
  <p>Contenu lateral</p>
</LcPanel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | **required** | v-model |
| width | `string` | `'450px'` | Largeur |

**Slots:** `default`

---

### LcPanelBar
Panneau a deux sections (container + content).

```vue
<LcPanelBar v-model="state">
  <template #container="{ changeState, state }">
    <button @click="changeState">Toggle</button>
  </template>
  <template #content>
    Contenu du panneau
  </template>
</LcPanelBar>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| state | `boolean` | **required** | v-model |
| containerClasses | `string` | `''` | Classes du conteneur |
| contentClasses | `string` | `''` | Classes du contenu |

**Slots:** `container({ changeState, state })`, `content`

---

### LcGrid
Grille CSS responsive.

```vue
<LcGrid :col="3" :col-sm="2" :col-xs="1" :gap="SpacingSize.REGULAR">
  <div>Cellule 1</div>
  <div>Cellule 2</div>
  <div>Cellule 3</div>
</LcGrid>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| col | `string \| number \| null` | `null` | Colonnes par defaut |
| colXs | `string \| number \| null` | `null` | Colonnes < 320px |
| colSm | `string \| number \| null` | `null` | Colonnes < 768px |
| colMd | `string \| number \| null` | `null` | Colonnes < 1024px |
| colLg | `string \| number \| null` | `null` | Colonnes < 1440px |
| colXl | `string \| number \| null` | `null` | Colonnes < 1920px |
| gap | `string \| number \| null` | `SpacingSize.REGULAR` | Espacement |
| rowGap | `string \| number \| null` | `null` | Espacement lignes |
| colGap | `string \| number \| null` | `null` | Espacement colonnes |
| flow | `string` | `'row'` | Direction du flux |
| fluid | `boolean` | `false` | Largeur fluide |

**Slots:** `default`

---

### LcViewWrapper
Layout principal avec sidebar, header, content, footer.

```vue
<LcViewWrapper>
  <template #header>Header</template>
  <template #sidebar-header>Sidebar Title</template>
  <template #sidebar>Navigation</template>
  <template #content>Contenu principal</template>
  <template #footer>Footer</template>
</LcViewWrapper>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| hasSidebarWithBg | `boolean` | `false` | Sidebar avec fond |
| hasSidebarBeforeContent | `boolean` | `false` | Sidebar avant le contenu |

**Slots:** `header`, `sidebar-header`, `sidebar`, `content`, `footer`

---

### LcTab
Onglets de navigation.

```vue
<LcTab v-model="activeTab" :tabs="tabs" :is-full-width="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `TabItem` | **required** | v-model (onglet actif) |
| tabs | `Array<TabItem>` | **required** | Liste des onglets |
| isFullWidth | `boolean` | `false` | Pleine largeur |
| border | `boolean \| null` | `null` | Bordure inferieure |
| tabItemClass | `string` | `''` | Classes CSS des onglets |

**Type TabItem:** `{ id: number; label: string; isDisabled: boolean; iconName?: string; notification?: number }`

---

### LcTabMenu
Onglets avec routing (Vue Router).

```vue
<LcTabMenu v-model="activeTab" :tabs="tabs" :is-full-width="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `TabItemMenu` | **required** | v-model |
| tabs | `Array<TabItemMenu>` | `[]` | Onglets |
| isFullWidth | `boolean` | `false` | Pleine largeur |
| border | `boolean \| null` | `null` | Bordure |

**Type TabItemMenu:** `{ id: number; label: string; isDisabled: boolean; path: string; notification?: number }`

---

### LcTabRound
Onglets arrondis.

```vue
<LcTabRound v-model="activeTab" :tabs="tabs" />
```

Memes props que LcTab mais avec style arrondi.

---

### LcTable
Tableau de donnees complet avec tri, pagination, selection et filtrage.

```vue
<LcTable
  :items="data"
  :headers="headers"
  :is-pagination="true"
  :rows-per-page="25"
  :is-selectable="true"
  search-field="name"
  :search-value="searchQuery"
  @line-click="onRowClick"
>
  <template #name="{ data }">
    <strong>{{ data }}</strong>
  </template>
</LcTable>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `Array<T>` | `[]` | Donnees du tableau |
| headers | `Array<TableHeader<T>>` | `[]` | Colonnes |
| isSelectable | `boolean` | `false` | Lignes selectionnables |
| isPagination | `boolean` | `false` | Active la pagination |
| rowsPerPage | `number` | `10` | Lignes par page |
| isLineClickable | `boolean` | `true` | Lignes cliquables |
| searchField | `string \| string[] \| null` | `null` | Champ(s) de recherche |
| searchValue | `string` | `''` | Valeur de recherche |
| sortBy | `Array` | `[]` | Colonnes de tri |
| sortType | `Array<SortType>` | `[]` | Types de tri |
| hasBorder | `boolean` | `false` | Bordures |
| hasHeaderRadius | `boolean` | `false` | Bords arrondis header |
| noResultMessage | `string` | `'Pas de resultats'` | Message si vide |
| hasActionsBar | `boolean` | `false` | Barre d'actions (selection en masse) |
| actions | `Array<ActionsBarLink>` | `[]` | Actions de masse |
| currentPage | `number` | `1` | Page courante |
| handlePagination | `boolean` | `false` | Pagination geree par le parent |
| totalItemsLength | `number` | `0` | Total items (pagination externe) |

**Type TableHeader:** `{ text: string; value: string; sortable?: boolean; hasSlot?: boolean; align?: string; itemAlign?: string; sticky?: TABLE_STICKY_POSITION; width?: number }`

**Type ActionsBarLink:** `{ name: string; label: string; icon?: string }`

**Enum TABLE_STICKY_POSITION:** `LEFT`, `RIGHT`

**Emits:** `line-click(T)`, `update:currentPage(number)`, `select-all(boolean)`, `action-click(string)`

**Slots:** `filters`, `[header.value]({ data, item, metadata })`, `no-result`, `pagination({ isFirstPage, isLastPage, currentPaginationNumber })`

---

### LcSidebarNavigation
Navigation laterale.

```vue
<LcSidebarNavigation
  logo="/logo.svg"
  :elements="navElements"
  :shrink="false"
  @is-open="onToggle"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logo | `string` | `'#'` | URL du logo |
| logoMobile | `string` | `'#'` | Logo mobile |
| elements | `Array<SidebarNavElement>` | `[]` | Elements de navigation |
| shrink | `boolean` | `false` | Mode reduit |

**Type SidebarNavElement:** `{ libelle: string; icon?: string; initials?: string; notification?: number; emplacement?: 'menu' | 'footer'; disabled?: boolean; path?: string; call?: () => void; isHidden?: boolean }`

**Emits:** `is-open(boolean)`

---

### LcTitleSection
Titre semantique H1-H5.

```vue
<LcTitleSection type="h2" variant="primary">Mon titre</LcTitleSection>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `titleEnum` | `H1` | Niveau (h1-h5) |
| variant | `'primary' \| 'secondary'` | `'primary'` | Couleur |

**Enum titleEnum:** `H1`, `H2`, `H3`, `H4`, `H5`, `H6`

**Slots:** `default`

---

### LcListItem
Element de liste avec icone, titre et description.

```vue
<LcListItem>
  <template #icon><LcIcon name="check" /></template>
  <template #title>Titre</template>
  <template #description>Description</template>
</LcListItem>
```

**Slots:** `icon`, `title`, `description`

---

### LcStepline
Ligne de progression d'etapes.

```vue
<LcStepline :steps="steps" state="progress" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | `Array<Stepline>` | **required** | Etapes |
| state | `'progress' \| 'isFinal'` | `'progress'` | Etat global |

---

### LcSuspense
Wrapper Suspense avec skeleton de fallback.

```vue
<LcSuspense>
  <AsyncComponent />
  <template #skeleton>
    <LcSkeleton width="100%" height="200px" />
  </template>
</LcSuspense>
```

**Slots:** `default`, `skeleton` (fallback)

---

### LcInfiniteScrolling
Scroll infini.

```vue
<LcInfiniteScrolling @load-more="loadMore" :block-load="isLoading">
  <template #spinner><LcLoader /></template>
  <template #complete>Tout est charge</template>
  <template #error="{ retry }"><button @click="retry">Reessayer</button></template>
</LcInfiniteScrolling>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| scrollableElement | `string \| HTMLElement` | `''` | Element scrollable |
| scrollDistance | `number` | `0` | Distance de declenchement |
| hasLoadDirectionTop | `boolean` | `false` | Charge depuis le haut |
| isFirstloading | `boolean` | `true` | Premier chargement |
| blockLoad | `boolean` | `false` | Bloque le chargement |

**Type TInfiniteScrollingState:** `{ complete: () => void; loaded: () => void; error: () => void }`

**Emits:** `load-more(TInfiniteScrollingState)`

**Slots:** `spinner`, `complete`, `error({ retry })`

---

### LcCarousel
Carrousel d'elements.

```vue
<LcCarousel id="my-carousel" v-model="currentSlide" :items="items" :items-to-show="3" :wrap-around="true">
  <template #item-0="{ data }">Slide 1: {{ data }}</template>
  <template #item-1="{ data }">Slide 2: {{ data }}</template>
</LcCarousel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | `string` | **required** | ID |
| modelValue | `number` | **required** | Slide active (v-model) |
| items | `Array \| null` | `null` | Elements |
| itemsToShow | `number` | `1` | Elements visibles |
| itemsToScroll | `number` | `1` | Elements a defiler |
| wrapAround | `boolean` | `false` | Boucle infinie |
| snapAlign | `CarouselPosition` | `CENTER` | Alignement |
| transition | `number` | `300` | Duree transition (ms) |
| autoplay | `number` | `0` | Autoplay (ms, 0 = off) |
| customNavigation | `boolean` | `true` | Navigation custom |
| customPagination | `boolean` | `true` | Pagination custom |
| mouseDrag | `boolean` | `true` | Drag souris |
| touchDrag | `boolean` | `true` | Drag tactile |

**Enum CarouselPosition:** `START`, `END`, `CENTER`, `ODD`, `EVEN`
**Enum CarouselDirection:** `RIGHT = 'rtl'`, `LEFT = 'ltr'`

**Slots:** `item-{index}({ data })`

---

## GRAPHIQUES

### LcLinearChart
Graphique en barres lineaires.

```vue
<LcLinearChart :items="chartItems" :type="CHART_TYPE.LARGE" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `Array<ChartItem>` | `[]` | Donnees |
| height | `string` | `'0.375rem'` | Hauteur de la barre |
| type | `CHART_TYPE` | `LARGE` | Type d'affichage |
| colorOrder | `string[]` | `['success-600', ...]` | Couleurs des segments |
| justifyLegend | `CHART_LEGEND_ALIGN` | `END` | Alignement legende |

**Type ChartItem:** `{ title: string; percentage: number; info: number | string }`
**Enum CHART_TYPE:** `TOOLTIP`, `LARGE`, `SMALL`
**Enum CHART_LEGEND_ALIGN:** `START`, `BETWEEN`, `END`

---

### LcProgressChart
Barre de progression simple.

```vue
<LcProgressChart :max="100" :rest="35" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| max | `number` | `100` | Valeur max |
| rest | `number` | `0` | Valeur restante |

---

### LcDonutChart
Graphique en donut.

```vue
<LcDonutChart :items="items" size="92px" :legend-position="DONUT_CHART_LEGEND_POSITION.RIGHT" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `Array<ChartItem>` | `[...]` | Segments |
| size | `string` | `'92px'` | Taille du donut |
| legendPosition | `DONUT_CHART_LEGEND_POSITION` | `RIGHT` | Position legende |
| noData | `boolean` | `false` | Etat sans donnees |
| inversedLegend | `boolean` | `false` | Inverse la legende |

**Enum DONUT_CHART_LEGEND_POSITION:** `BOTTOM`, `RIGHT`

---

## TIMELINE

### LcTimeline
Timeline verticale.

```vue
<LcTimeline :steps="timelineSteps" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | `Array<TimelineStep>` | `[]` | Etapes |

**Type TimelineStep:** `{ indicatif: number; libelle: string; avancement: number; isActive: boolean; isComplete: boolean }`

---

### LcTimelineCompact
Timeline compacte horizontale.

```vue
<LcTimelineCompact :steps="steps" />
```

Meme interface que LcTimeline.

---

### LcTimelineStep
Etape individuelle de timeline (utilisee en interne par LcTimeline).

---

## CHAT / MESSAGERIE

### LcChatEntete
En-tete de conversation.

```vue
<LcChatEntete
  picture="/avatar.png"
  alt-picture="Avatar"
  title="John Doe"
  :is-resolved="false"
  @close="onClose"
>
  <template #icons><!-- Icones custom --></template>
  <template #actions><!-- Actions custom --></template>
</LcChatEntete>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| picture | `string` | **required** | URL de l'avatar |
| altPicture | `string` | **required** | Alt de l'image |
| title | `string` | **required** | Titre/nom |
| pretitle | `string` | `''` | Sous-titre |
| isPretitleLink | `boolean` | `false` | Pretitle cliquable |
| isResolved | `boolean` | **required** | Conversation resolue |
| alwaysDisplayBack | `boolean` | `false` | Toujours montrer le retour |

**Emits:** `close()`, `select()`

**Slots:** `icons`, `actions`

---

### LcChatMessage
Message dans une conversation.

```vue
<LcChatMessage
  message="Bonjour !"
  date="12/03/2025"
  heure="14:30"
  :is-from-me="true"
  :documents="attachments"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | `string` | **required** | Texte du message |
| date | `string` | **required** | Date formatee |
| heure | `string` | **required** | Heure formatee |
| isFromMe | `boolean` | **required** | Message de l'utilisateur |
| isCare | `boolean` | `false` | Message du support |
| picture | `string` | `''` | Avatar |
| icon | `string` | `''` | Icone |
| documents | `Array<MessageDocument> \| null` | `null` | Pieces jointes |
| useViewer | `boolean` | `false` | Ouvre le viewer |

**Type MessageDocument:** `{ libelle: string; url: string }`

---

### LcChatSaisie
Zone de saisie de message avec upload.

```vue
<LcChatSaisie
  placeholder="Ecrire un message"
  :has-upload="true"
  :max-files-number="3"
  @send-message="onSend"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| placeholder | `string` | `'Ecrire un message'` | Placeholder |
| sendLabel | `string` | `'Envoyer'` | Label bouton envoyer |
| invalid | `boolean` | `false` | Etat invalide |
| hasUpload | `boolean` | `true` | Active l'upload |
| maxFilesNumber | `number` | `3` | Max fichiers |
| maxFileSizeInMb | `number` | `5` | Taille max |
| maxLength | `number` | `-1` | Limite caracteres |

**Emits:** `sendMessage(string)`, `update:textInput(string)`, `update:docsInput(UploadableFileInfo[])`, `uploadPayload(payload)`

---

### LcChatSaisieCompact
Version compacte de la saisie de message.

Memes props que LcChatSaisie avec en plus :
- `hasBibliotheque: boolean` (default: `false`) - Bouton bibliotheque

**Emits supplementaire:** `openBibliotheque()`

**v-model:** `text-input` (string), `docs-input` (UploadableFileInfo[] | null)

---

### LcChatConversation
Element de conversation dans une liste.

```vue
<LcChatConversation
  :conversation="conv"
  :id-conversation-active="activeId"
  :is-from-care="false"
  logo-path="/logo.svg"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| conversation | `IMessagerieConversation` | **required** | Donnees de la conversation |
| idConversationActive | `number \| null` | **required** | ID active |
| isFromCare | `boolean` | `false` | Vue support |
| logoPath | `string` | **required** | Logo |

---

### LcChatBannerResolu
Banniere de conversation resolue.

```vue
<LcChatBannerResolu title="Conversation cloturee" subtitle="Creez une nouvelle demande." />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | `'Vous ne pouvez pas envoyer de messages...'` | Titre |
| subtitle | `string` | `'Pour toutes nouvelles questions...'` | Sous-titre |

---

## COMPOSANTS METIER

### LcContactButton
Bouton de contact avec animation.

```vue
<LcContactButton title="Une question ?" subtitle="Contactez-nous" icon="mail" :block="false" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | `'Un probleme, une question ?'` | Titre |
| subtitle | `string` | `'Contacter notre support par e-mail'` | Sous-titre |
| showSubtitle | `boolean` | `true` | Affiche le sous-titre |
| forceOpen | `boolean` | `false` | Force l'etat ouvert |
| block | `boolean` | `false` | Pleine largeur |
| icon | `string` | `'mail'` | Icone |

---

### LcContactButtonLight
Version legere du bouton contact.

```vue
<LcContactButtonLight title="Besoin d'aide ?" icon="mail" />
```

---

### LcCarteOffre
Carte d'offre commerciale.

```vue
<LcCarteOffre
  icon="shield"
  nom-offre="Offre Premium"
  contribution="50,00 EUR"
  part-employeur="30,00 EUR"
  :is-recommended="true"
/>
```

---

### LcCarteTP
Carte tiers payant.

```vue
<LcCarteTP icon="credit-card" :is-clickable="true" :blur="false" pill-content="Actif" :pill-variant="COLOR_ENUM.SUCCESS">
  <template #blur-content>Contenu floute</template>
</LcCarteTP>
```

---

### LcConsultDocument
Vignette de consultation de document.

```vue
<LcConsultDocument :document="fileInfo" img-url="/preview.jpg" @open="onOpen">
  <template #more-info>Infos supplementaires</template>
</LcConsultDocument>
```

---

### LcInputDocument
Champ document avec actions (visualiser, telecharger).

```vue
<LcInputDocument
  :file="fileInfo"
  :size="SpacingSize.LARGE"
  :readonly="false"
  @visualiser-document="onView"
  @telecharger-document="onDownload"
/>
```

---

### LcViewer
Visionneuse de documents (PDF + images) en plein ecran.

```vue
<LcViewer v-model="isViewerOpen" :documents="docs" :can-download="true" @telecharger-document="onDownload" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `boolean` | **required** | v-model (ouvert/ferme) |
| documents | `Array<ViewerDocumentModel>` | `[]` | Documents |
| canDownload | `boolean` | `true` | Autorise le telechargement |
| hidePagination | `boolean` | `false` | Cache la pagination |

**Type ViewerDocumentModel:** `{ source: string; name: string | null; nature: string | null; type: string | null }`

**Slots:** `actions`

---

### LcHeaderBanner
Banniere d'en-tete avec environnement.

```vue
<LcHeaderBanner env="DEV" version="2.0.89" project="monprojet">
  <template #desktop>Contenu desktop</template>
  <template #mobile>Contenu mobile</template>
</LcHeaderBanner>
```

**Slots:** `desktop`, `mobile`

---

# ENUMS & TYPES PARTAGES

Tous les enums et types s'importent depuis `@projetlucie/lc-front-components` :

```typescript
import {
  // Couleurs
  COLOR_ENUM,
  // Tailles
  SpacingSize, TextSize, Breakpoints, BreakpointsSize,
  // Boutons
  CtaVariant, CtaSize, BUTTON_DROPDOWN_POSITION,
  // Tooltip
  TOOLTIP_POSITION, TOOLTIP_VARIANT,
  // Datepicker
  DATEPICKER_MODE,
  // Graphiques
  CHART_TYPE, CHART_LEGEND_ALIGN, DONUT_CHART_LEGEND_POSITION,
  // Table
  TABLE_STICKY_POSITION,
  // Navigation
  SIDEBAR_NAVIGATION_EMPLACEMENT,
  // Carousel
  CarouselPosition, CarouselDirection,
  // Titre
  titleEnum,
  // Pill
  LcPillShape,
  // Viewer
  VIEWER_DOCUMENT_TYPE,
  // Messagerie
  MESSAGERIE_ETAT_CONVERSATION, MESSAGERIE_STATUT_MESSAGE,
} from '@projetlucie/lc-front-components';

import type {
  // Tabs
  TabItem, TabItemMenu,
  // Table
  TableHeader, FilterOption, ItemMetadata, ActionsBarLink,
  // Fichiers
  FileInfo, UploadableFileInfo, LcUploaderPayload,
  // Dates
  DatePickerValue, DatePickerSingleValue, DatePickerRangeValue, DatePickerDisablingOptions,
  // Chat
  ChatSaisieVM, MessageDocument,
  // Messagerie
  IMessagerieConversation, IMessagerieMessage,
  // Navigation
  SidebarNavElement,
  // Timeline
  TimelineStep,
  // Graphiques
  ChartItem, LinearChartItemColored, DonutChartData,
  // Card
  LcCardSelectionModel,
  // Toggle
  OptionToggleBtn,
  // Viewer
  ViewerDocumentModel,
  // Spacing
  SpacingModel,
  // Scroll
  TInfiniteScrollingState,
  // Textarea
  TextareaCounterState,
  // CSS
  TComponentClass,
} from '@projetlucie/lc-front-components';
```

## COLOR_ENUM
`NEUTRAL`, `PRIMARY`, `SECONDARY`, `DEFAULT`, `ACCENT`, `INFO`, `SUCCESS`, `DANGER`, `WARNING`, `ALTERNATIVE`

## SpacingSize
`NANO`, `MACRO`, `MICRO`, `SMALL`, `MEDIUM`, `REGULAR`, `REGULARER`, `LARGE`, `LARGER`, `BIG`, `BIGGER`, `JUMBO`

## TextSize
`SMALL`, `CAPTION`, `BODY`, `SUBHEADER`, `HEADER`, `TITLE`, `HEADLINE`, `SUBDISPLAY`, `DISPLAY`, `JUMBO`

## BreakpointsSize
`XS = 320`, `SM = 768`, `MD = 1024`, `LG = 1440`, `XL = 1920`

---

# REGLES POUR GENERER DU CODE

1. **Toujours importer depuis `@projetlucie/lc-front-components`** - jamais de chemins internes
2. **Utiliser les enums** plutot que des strings brutes quand un enum existe
3. **Typer les donnees** avec les types fournis (TableHeader, TabItem, etc.)
4. **v-model** : la plupart des composants de formulaire supportent v-model via `modelValue`
5. **Slots** : utiliser les slots documentes pour personnaliser les composants
6. **Vue 3 / Nuxt** : le code genere doit utiliser la Composition API avec `<script setup lang="ts">`
7. **Ne pas inventer de props** : utiliser uniquement les props documentees ci-dessus
