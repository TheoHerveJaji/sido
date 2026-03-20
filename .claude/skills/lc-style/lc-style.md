---
name: lc-style
description: "Guide d'utilisation des classes CSS utilitaires de @projetlucie/lc-front-components (flex, gap, margin, padding, text, sizing, grid, border, radius, shadow, display, cursor, background, transitions). Dépend de la skill lc-components."
user-invocable: true
---

Tu es un expert des classes CSS utilitaires de **@projetlucie/lc-front-components**. Cette skill est **dépendante de la skill lc-components** et doit être utilisée conjointement.

## Règle principale

**Toujours préférer les classes utilitaires du Design System** définies dans `src/assets/scss/` plutôt que d'écrire du CSS custom. Le CSS custom est accepté **uniquement** quand aucune classe utilitaire ne couvre le besoin.

> **Ne jamais modifier les fichiers SCSS utilitaires** — ils sont tous marqués "DON'T TOUCH THIS FILE".

---

# CLASSES UTILITAIRES DISPONIBLES

---

## FLEX (`flex.scss`)

Classe de base : `flex` (active `display: flex`)

### Inline
| Classe | CSS |
|--------|-----|
| `flex flex--inline` | `display: inline-flex` |

### Justify content
| Classe | CSS |
|--------|-----|
| `flex flex--justify-start` | `justify-content: start` |
| `flex flex--justify-left` | `justify-content: left` |
| `flex flex--justify-center` | `justify-content: center` |
| `flex flex--justify-end` | `justify-content: end` |
| `flex flex--justify-right` | `justify-content: right` |
| `flex flex--justify-between` | `justify-content: space-between` |
| `flex flex--justify-around` | `justify-content: space-around` |
| `flex flex--justify-evenly` | `justify-content: space-evenly` |
| `flex flex--justify-baseline` | `justify-content: baseline` |

### Justify self (enfant, sans préfixe `flex` sur l'enfant)
| Classe | CSS |
|--------|-----|
| `flex--justify-self-start` | `justify-self: start` |
| `flex--justify-self-end` | `justify-self: end` |
| `flex--justify-self-center` | `justify-self: center` |

### Align items
| Classe | CSS |
|--------|-----|
| `flex flex--align-start` | `align-items: flex-start` |
| `flex flex--align-center` | `align-items: center` |
| `flex flex--align-end` | `align-items: flex-end` |
| `flex flex--align-baseline` | `align-items: baseline` |
| `flex flex--align-stretch` | `align-items: stretch` |

### Align self (enfant, sans préfixe `flex` sur l'enfant)
| Classe | CSS |
|--------|-----|
| `flex--align-self-start` | `align-self: flex-start` |
| `flex--align-self-end` | `align-self: flex-end` |
| `flex--align-self-center` | `align-self: center` |

### Direction
| Classe | CSS |
|--------|-----|
| `flex flex--column` | `flex-direction: column` |
| `flex flex--column-reverse` | `flex-direction: column-reverse` |
| `flex flex--row` | `flex-direction: row` |
| `flex flex--row-reverse` | `flex-direction: row-reverse` |

### Wrap
| Classe | CSS |
|--------|-----|
| `flex flex--wrap` | `flex-wrap: wrap` |
| `flex flex--nowrap` | `flex-wrap: nowrap` |
| `flex flex--wrap-reverse` | `flex-wrap: wrap-reverse` |

### Flex sizing (indépendantes, pas besoin de `.flex` parent)
| Classe | CSS |
|--------|-----|
| `flex--0` | `flex: 0` |
| `flex--1` | `flex: 1` |
| `flex--none` | `flex: none` |

### Flex responsive
Suffixe par breakpoint : `flex_{breakpoint}` (ex: `flex_medium`, `flex_sm`).
Réplique les mêmes modificateurs avec le suffixe breakpoint.

---

## GAP (`gap.scss`)

S'utilise **sur un élément `.flex` ou `.grid`**.

### Tailles de gap
| Classe | Variable CSS |
|--------|-------------|
| `gap--nano` | `--gutters--nano` |
| `gap--macro` | `--gutters--macro` |
| `gap--micro` | `--gutters--micro` |
| `gap--small` | `--gutters--small` |
| `gap--medium` | `--gutters--medium` |
| `gap--regular` | `--gutters--regular` |
| `gap--regularer` | `--gutters--regularer` |
| `gap--large` | `--gutters--large` |
| `gap--larger` | `--gutters--larger` |
| `gap--big` | `--gutters--big` |
| `gap--bigger` | `--gutters--bigger` |
| `gap--jumbo` | `--gutters--jumbo` |
| `gap--super` | `--gutters--super` |

### Gap responsive
Suffixe breakpoint : `gap--{size}_{breakpoint}` (ex: `gap--small_medium`, `gap--regular_sm`).

---

## MARGIN (`margin.scss`)

### Nomenclature
| Préfixe | Côté |
|---------|------|
| `m--{size}` | all |
| `mt--{size}` | top |
| `mr--{size}` | right |
| `mb--{size}` | bottom |
| `ml--{size}` | left |
| `mx--{size}` | left + right |
| `my--{size}` | top + bottom |
| `mx--auto` | `margin-left: auto; margin-right: auto` |

### Tailles (identiques aux gutters)
`none`, `nano`, `macro`, `micro`, `small`, `medium`, `regular`, `regularer`, `large`, `larger`, `big`, `bigger`, `jumbo`, `super`

**Exemples :** `m--regular`, `mt--small`, `mx--auto`, `mb--large`

### Margin responsive
Suffixe breakpoint : `m--{size}_{breakpoint}`, `mt--{size}_{breakpoint}`, etc.

---

## PADDING (`padding.scss`)

### Nomenclature
| Préfixe | Côté |
|---------|------|
| `p--{size}` | all |
| `pt--{size}` | top |
| `pr--{size}` | right |
| `pb--{size}` | bottom |
| `pl--{size}` | left |
| `px--{size}` | left + right |
| `py--{size}` | top + bottom |

### Tailles
Identiques aux gutters : `none`, `nano`, `macro`, `micro`, `small`, `medium`, `regular`, `regularer`, `large`, `larger`, `big`, `bigger`, `jumbo`, `super`

**Exemples :** `p--regular`, `px--small`, `py--medium`, `pt--large`

### Padding responsive
Suffixe breakpoint : `p--{size}_{breakpoint}`, `pt--{size}_{breakpoint}`, etc.

---

## TEXT (`text.scss`)

### Classe de base
`text` — applique font-size body, font-family primary, color neutral-700, font-weight normal.

### Font family
| Classe | CSS |
|--------|-----|
| `font--primary` | `font-family: var(--fonts--primary)` |
| `font--secondary` | `font-family: var(--fonts--secondary)` |

### Font weight
| Classe | CSS |
|--------|-----|
| `text--light` | `font-weight: var(--fonts--weight-light)` |
| `text--normal` | `font-weight: var(--fonts--weight-normal)` |
| `text--semibold` | `font-weight: var(--fonts--weight-semibold)` |
| `text--bold` | `font-weight: var(--fonts--weight-bold)` |
| `text--black` | `font-weight: var(--fonts--weight-black)` |
| `text--weight-numeric` | `font-weight: var(--fonts--weight-numeric)` |
| `text--weight-subtitle` | `font-weight: var(--fonts--weight-subtitle)` |

### Font style
| Classe | CSS |
|--------|-----|
| `text--italic` | `font-style: italic` |

### Text align
| Classe | CSS |
|--------|-----|
| `text--left` | `text-align: left` |
| `text--center` | `text-align: center` |
| `text--right` | `text-align: right` |

### Text transform
| Classe | CSS |
|--------|-----|
| `text--uppercase` | `text-transform: uppercase` |
| `text--capitalize` | `text-transform: capitalize` |
| `text--lowercase` | `text-transform: lowercase` |

### White space / overflow
| Classe | CSS |
|--------|-----|
| `text--nowrap` | `white-space: nowrap` |
| `white--space-pre-wrap` | `white-space: pre-wrap` |
| `text--truncate` | `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` |
| `text--word-break` | `word-break: break-word` |
| `text--wrap-no-wrap` | `text-wrap: nowrap` |

### Text decoration
| Classe | CSS |
|--------|-----|
| `text--underline` | `text-decoration: underline` |
| `text--decoration-none` | `text-decoration: none` |

### Headings (shorthand font)
`text--h1`, `text--h1-primary`, `text--h1-secondary`, `text--h2`, `text--h2-primary`, `text--h2-secondary`, `text--h3`, `text--h3-primary`, `text--h3-secondary`, `text--h4`, `text--h4-primary`, `text--h4-secondary`, `text--h5`, `text--h5-primary`, `text--h5-secondary`

### Typographie (shorthand font via `$fonts`)
`text--small`, `text--small-light`, `text--small-semibold`, `text--small-black`, `text--small-bold`, `text--caption`, `text--caption-light`, `text--caption-semibold`, `text--caption-black`, `text--caption-bold`, `text--body`, `text--body-light`, `text--body-semibold`, `text--body-black`, `text--body-bold`, `text--subheader`, `text--subheader-light`, `text--subheader-semibold`, `text--subheader-black`, `text--subheader-bold`, `text--header`, `text--header-light`, `text--header-semibold`, `text--header-black`, `text--header-bold`, `text--title`, `text--title-light`, `text--title-semibold`, `text--title-black`, `text--title-bold`, `text--headline`, `text--headline-light`, `text--headline-semibold`, `text--headline-black`, `text--headline-bold`, `text--subdisplay`, `text--subdisplay-light`, `text--subdisplay-semibold`, `text--subdisplay-black`, `text--subdisplay-bold`, `text--display`, `text--display-light`, `text--display-semibold`, `text--display-black`, `text--display-bold`, `text--jumbo`, `text--jumbo-light`, `text--jumbo-semibold`, `text--jumbo-black`, `text--jumbo-bold`

### Paragraphes (shorthand font via `$paragraphs`)
Même nomenclature avec préfixe `paragraph--` : `paragraph--body`, `paragraph--body-semibold`, etc.

### Font size uniquement
`text--size-small`, `text--size-caption`, `text--size-body`, `text--size-subheader`, `text--size-header`, `text--size-title`, `text--size-headline`, `text--size-subdisplay`, `text--size-display`, `text--size-jumbo`

### Line height
`line-height--{gutter}` (ex: `line-height--regular`, `line-height--small`)

### Text color (via `$colors`)
`text--{color}` (ex: `text--primary`, `text--neutral-700`, `text--danger`, `text--success-500`)

### Spécial
| Classe | CSS |
|--------|-----|
| `text--numeric` | `font-family: var(--fonts--number)` |
| `text--recommandee` | `color: var(--badge--recommandee--text)` |

### Text responsive
Tous les modificateurs acceptent un suffixe breakpoint : `text--center_sm`, `text--h2_medium`, `text--bold_md`, etc.

---

## SIZING (`sizing.scss`)

### Width
| Pattern | CSS | Range |
|---------|-----|-------|
| `w--{0-100}` | `width: {n}%` | 0–100 |
| `w--{0-100}vw` | `width: {n}vw` | 0–100 |
| `w--auto` | `width: auto` | — |
| `w--min-content` | `width: min-content` | — |
| `w--max-content` | `width: max-content` | — |

### Height
| Pattern | CSS | Range |
|---------|-----|-------|
| `h--{0-100}` | `height: {n}%` | 0–100 |
| `h--{0-100}vh` | `height: {n}vh` | 0–100 |
| `h--auto` | `height: auto` | — |
| `h--fit` | `height: fit-content` | — |
| `h--min-content` | `height: min-content` | — |
| `h--max-content` | `height: max-content` | — |

### Min/Max
| Pattern | CSS |
|---------|-----|
| `min-w--{0-100}` | `min-width: {n}%` |
| `min-w--{0-100}vw` | `min-width: {n}vw` |
| `min-h--{0-100}` | `min-height: {n}%` |
| `min-h--{0-100}vh` | `min-height: {n}vh` |
| `max-w--{0-100}` | `max-width: {n}%` |
| `max-w--{0-100}vw` | `max-width: {n}vw` |
| `max-h--{0-100}` | `max-height: {n}%` |
| `max-h--{0-100}vh` | `max-height: {n}vh` |

### Sizing responsive
Suffixe breakpoint : `w--50_sm`, `h--100vh_medium`, `w--auto_md`, etc.

---

## DISPLAY (`display.scss`)

### Display mode
| Classe | CSS |
|--------|-----|
| `display--none` | `display: none` |
| `display--block` | `display: block` |
| `display--inline-block` | `display: inline-block` |

### Position
| Classe | CSS |
|--------|-----|
| `position--relative` | `position: relative` |
| `position--absolute` | `position: absolute` |
| `position--fixed` | `position: fixed` |
| `position--sticky` | `position: sticky` |
| `position--inherit` | `position: inherit` |
| `position--unset` | `position: unset` |

### Sticky
| Classe | CSS |
|--------|-----|
| `sticky--bottom` | `position: sticky; bottom: var(--gutters--regular)` |

### Scroll / Overflow
| Classe | CSS |
|--------|-----|
| `scroll--none` | `overflow: hidden` |
| `scroll--y-none` | `overflow-y: hidden` |
| `scroll--x-none` | `overflow-x: hidden` |
| `scroll--x` | `overflow-x: auto` |
| `scroll--y` | `overflow-y: auto` |

### Display responsive
Suffixe breakpoint : `display--none_sm`, `display--block_medium`, `position--sticky_md`, etc.

---

## GRID (`grid.scss`)

Classe de base : `grid` (active `display: grid; max-width: 1440px`)

### Variantes
| Classe | CSS |
|--------|-----|
| `grid grid--flex` | `display: flex; flex-wrap: wrap` |
| `grid grid--fluid` | `max-width: 100%` |
| `grid grid--flow-row` | `grid-auto-flow: row` |
| `grid grid--flow-col` | `grid-auto-flow: column` |
| `grid grid--self-start` | `align-self: flex-start` |
| `grid grid--align-end` | `align-items: end` |
| `grid grid--fit-children` | enfants `height: fit-content` |

### Colonnes
`grid--1-col` à `grid--12-col` → `grid-template-columns: repeat(N, 1fr)`

### Lignes
`grid--1-row` à `grid--12-row` → `grid-template-rows: repeat(N, 1fr)`

### Gap grid (ancien)
`grid--gap-1` (4px), `grid--gap-2` (8px), `grid--gap-3` (16px), `grid--gap-4` (24px), `grid--gap-5` (48px)
`grid--col-gap-{1-5}`, `grid--row-gap-{1-5}`

### Gap grid (tokens)
`grid--gap-{gutter}`, `grid--col-gap-{gutter}`, `grid--row-gap-{gutter}`

> **Note :** Sur mobile (≤720px), la grille passe automatiquement en 1 colonne sauf si `.grid--force-mobile` ou `.grid--responsive` est présent.

---

## BORDER (`border.scss`)

### Classe de base
`border` — applique `border: 1px solid var(--colors--neutral-200)`

### Taille de bordure
`border--none`, `border--nano`, `border--macro`, `border--micro`, `border--small`, `border--medium`

### Style de bordure
`border--solid`, `border--dashed`, `border--dotted`, `border--double`

### Côté de bordure
`border--top`, `border--right`, `border--bottom`, `border--left`, `border--horizontal`, `border--vertical`

### Couleur de bordure (via `$colors`)
`border--{color}` (ex: `border--primary`, `border--danger`, `border--neutral-300`)

### Bordures spéciales
`border--encart-info`, `border--encart-annotation`, `border--encart-recommandee`

### Border responsive
Suffixe breakpoint : `border--{color}_{breakpoint}`

---

## RADIUS (`radius.scss`)

### Classe de base
`radius` — applique `border-radius: var(--radius--medium)`

### Toutes les tailles (via `$gutters`)
`radius--{size}` (ex: `radius--small`, `radius--regular`, `radius--large`)

### Par côté
| Pattern | Côtés affectés |
|---------|---------------|
| `radius--{size}-top` | top-left + top-right |
| `radius--{size}-top-left` | top-left |
| `radius--{size}-top-right` | top-right |
| `radius--{size}-bottom` | bottom-left + bottom-right |
| `radius--{size}-bottom-left` | bottom-left |
| `radius--{size}-bottom-right` | bottom-right |
| `radius--{size}-left` | top-left + bottom-left |
| `radius--{size}-right` | top-right + bottom-right |

### Radius responsive
Suffixe breakpoint : `radius--{size}_{breakpoint}`, `radius--{size}-top_{breakpoint}`, etc.

---

## SHADOWS (`shadows.scss`)

| Classe | CSS |
|--------|-----|
| `shadow` | `box-shadow: var(--shadows)` |
| `shadow--important` | `box-shadow: var(--shadows--important)` |
| `shadow--modal` | `box-shadow: var(--shadows--modal)` |
| `shadow--dark` | `box-shadow: var(--shadows--dark)` |
| `shadow--none` | `box-shadow: none` |
| `shadow--hover` | `box-shadow: var(--shadows--hover)` au hover |

### Shadow responsive
Suffixe breakpoint : `shadow_{breakpoint}`, `shadow--none_{breakpoint}`, etc.

---

## BACKGROUND (`background.scss`)

### Couleurs (via `$colors`)
`bg--{color}` (ex: `bg--primary`, `bg--neutral-100`, `bg--success-200`)

### Offres
`bg--offre-1`, `bg--offre-2`, `bg--offre-3`, `bg--offre-4`, `bg--offre-reduit-1`, `bg--offre-reduit-2`

### Encarts
`bg--encart-info`, `bg--encart-annotation`, `bg--encart-recommandee`

### Offre avantages (avec background-image décoratif)
`bg--offre-avantage-1`, `bg--offre-avantage-2`, `bg--offre-avantage-3`

### Background responsive
Suffixe breakpoint : `bg--{color}_{breakpoint}`

---

## CURSOR (`cursor.scss`)

| Classe | CSS |
|--------|-----|
| `cursor--pointer` | `cursor: pointer` |
| `cursor--default` | `cursor: default` |
| `cursor--not-allowed` | `cursor: not-allowed` |
| `cursor--grab` | `cursor: grab` |
| `cursor--grabbing` | `cursor: grabbing` |
| `cursor--text` | `cursor: text` |
| `cursor--move` | `cursor: move` |
| `cursor--help` | `cursor: help` |
| `cursor--wait` | `cursor: wait` |
| `cursor--auto` | `cursor: auto` |

---

## TRANSITIONS (`transition.scss`)

Transitions Vue.js prêtes à l'emploi :

| Nom de transition | Effet |
|-------------------|-------|
| `fade` | Fondu opacity (0.6s) |
| `slide` | Slide depuis la droite (0.6s, translateX) |

Usage : `<Transition name="fade">` ou `<Transition name="slide">`

---

## ICONS (`icons.scss`)

### Taille d'icône
`icon icon-size--{font-size}` (ex: `icon icon-size--body`, `icon icon-size--header`, `icon icon-size--jumbo`)

Tailles disponibles : `small`, `caption`, `body`, `subheader`, `header`, `title`, `headline`, `subdisplay`, `display`, `jumbo`

### Couleur d'icône
`icon icon-color--{color}` (ex: `icon icon-color--primary`, `icon icon-color--danger`)

---

# BREAKPOINTS DISPONIBLES

| Nom | Max-width |
|-----|-----------|
| `small` | 540px |
| `medium` | 720px |
| `regular` | 960px |
| `regularer` | 1140px |
| `large` | 1440px |
| `xs` | 320px |
| `sm` | 768px |
| `md` | 1024px |
| `lg` | 1440px |
| `xl` | 1920px |
| `xxl` | 100% |

Syntaxe responsive : `{classe}_{breakpoint}` (ex: `flex--column_medium`, `display--none_sm`, `text--center_md`)

---

# TOKENS / VARIABLES CSS

## Gutters (espacements)
`--gutters--none`, `--gutters--nano`, `--gutters--macro`, `--gutters--micro`, `--gutters--small`, `--gutters--medium`, `--gutters--regular`, `--gutters--regularer`, `--gutters--large`, `--gutters--larger`, `--gutters--big`, `--gutters--bigger`, `--gutters--jumbo`, `--gutters--super`

## Couleurs
Palettes : `neutral`, `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `danger`, `alternative`
Chaque palette a des variantes de `100` à `900` (ex: `--colors--primary-500`)

---

# RÈGLES D'UTILISATION

1. **Toujours utiliser les classes utilitaires** quand elles existent — ne jamais écrire `display: flex; justify-content: space-between; align-items: center;` en CSS custom, utiliser `class="flex flex--justify-between flex--align-center"`.

2. **Composition de classes** : combiner plusieurs classes utilitaires sur le même élément.
   ```html
   <div class="flex flex--justify-between flex--align-center gap--regular p--regular">
   ```

3. **Espacements** : utiliser `m--{size}` / `p--{size}` et variantes, jamais de `margin: 16px` ou `padding: 8px` en custom.

4. **Typographie** : utiliser les classes `text--*` pour le style de texte. Ne pas écrire `font-size`, `font-weight`, `font-family`, `color`, ou `text-align` en CSS custom si une classe utilitaire existe.

5. **Couleurs** : utiliser `text--{color}`, `bg--{color}`, `border--{color}`. Pour du CSS custom, référencer les variables CSS : `var(--colors--primary)`, jamais de couleurs en dur (#hex, rgb).

6. **Sizing** : utiliser `w--{n}`, `h--{n}` et variantes. Ne pas écrire `width: 100%` en custom → utiliser `class="w--100"`.

7. **Responsive** : utiliser les suffixes breakpoint (`_sm`, `_md`, `_medium`, etc.) plutôt que d'écrire des media queries custom.

8. **CSS custom autorisé** quand :
   - Aucune classe utilitaire ne couvre le besoin (ex: `transform`, `animation`, `z-index`, `opacity`, `filter`, etc.)
   - Un style très spécifique au composant (ex: positionnement absolu avec des valeurs `top/left` précises)
   - Dans ce cas, utiliser les **variables CSS du Design System** (`var(--colors--*)`, `var(--gutters--*)`, `var(--fonts--*)`, `var(--shadows--*)`, `var(--radius--*)`) autant que possible.

9. **Pas de valeurs magiques** : toujours passer par les tokens du Design System pour les couleurs, espacements, typographies et ombres.
