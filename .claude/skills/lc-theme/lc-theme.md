---
name: lc-theme
description: "Guide d'utilisation du package @projetlucie/lc-front-theme pour les projets Moonicorn. Fournit les tokens CSS, les variables de design, ThemeHelper et les enums d'assets."
user-invocable: true
---

Tu es un expert du package de theming **@projetlucie/lc-front-theme** (framework Moonicorn). Quand l'utilisateur pose des questions sur le thème, les tokens CSS, les assets ou la configuration multi-brand, tu dois :

1. **Expliquer les tokens CSS disponibles** (couleurs, typographie, espacements, ombres, rayons)
2. **Générer du code d'utilisation** avec les bons imports depuis `@projetlucie/lc-front-theme`
3. **Guider l'intégration des assets** (logos, illustrations, icônes, favicons) via `ThemeHelper`
4. **Référencer les variables CSS** exactes à utiliser dans les styles

## Règles d'import

Tous les exports TypeScript s'importent depuis `@projetlucie/lc-front-theme` :

```typescript
import { THEME_IMG, ASSETS_TYPE, ThemeHelper } from '@projetlucie/lc-front-theme';
import type { InitThemeHelperParams } from '@projetlucie/lc-front-theme';
```

Les fichiers CSS s'importent depuis le dossier `dist` du package :

```typescript
// Dans un projet Vite/Nuxt
import '@projetlucie/lc-front-theme/dist/jaji/styles/_base.css';
// ou en HTML
// <link rel="stylesheet" href="/node_modules/@projetlucie/lc-front-theme/dist/jaji/styles/_base.css">
```

---

# THEMES DISPONIBLES

| Thème | Brand | Dossier | Usage |
|-------|-------|---------|-------|
| `jaji` | Jaji | `dist/jaji/` | Production Jaji |
| `jaji-preview` | Jaji Preview | `dist/jaji-preview/` | Staging Jaji |
| `kmut` | KLESIA Mut' | `dist/kmut/` | Production KLESIA |
| `base` | Générique | `dist/base/` | Thème de fallback |

---

# THEMEHELPER — Résolution dynamique des assets

`ThemeHelper` est un singleton qui génère les URLs d'assets selon le thème actif.

## Initialisation (une seule fois, au démarrage de l'app)

```typescript
import { ThemeHelper, THEME_IMG, ASSETS_TYPE } from '@projetlucie/lc-front-theme';

const themeHelper = ThemeHelper.Instance({
  metaUrl: import.meta.url,       // URL du module courant (Vite)
  themeModule: 'jaji',             // Nom du thème ('jaji' | 'jaji-preview' | 'kmut' | 'base')
  isHotReloadActivated: import.meta.hot !== undefined  // true en dev, false en prod
});
```

## Obtenir l'URL d'un asset

```typescript
// Logo principal couleur
const logoUrl = themeHelper.getAssetFromTheme(ASSETS_TYPE.LOGOS, THEME_IMG.LOGO_SIMPLE_COLOR);

// Illustration
const illusUrl = themeHelper.getAssetFromTheme(ASSETS_TYPE.ILLUSTRATIONS, THEME_IMG.ADH);

// Icône
const iconUrl = themeHelper.getAssetFromTheme(ASSETS_TYPE.ICONS, THEME_IMG.ICON_COLOR);

// Favicon
const faviconUrl = themeHelper.getAssetFromTheme(ASSETS_TYPE.FAVICONS, THEME_IMG.FAVICON);
```

## Mise à jour de l'instance (changement de thème dynamique)

```typescript
themeHelper.updateInstance({
  metaUrl: import.meta.url,
  themeModule: 'kmut',
  isHotReloadActivated: false
});
```

---

# ASSETS_TYPE — Catégories d'assets

```typescript
enum ASSETS_TYPE {
  GLOBAL_ILLUS = 'global/illustrations',  // Illustrations partagées tous thèmes
  GLOBAL_LOGOS = 'global/logos',          // Logos partagés tous thèmes
  ILLUSTRATIONS = 'illustrations',         // Illustrations spécifiques au thème
  ICONS = 'icons',                         // Icônes spécifiques au thème
  LOGOS = 'logos',                         // Logos spécifiques au thème
  STYLES = 'styles',                       // Fichiers CSS
  FAVICONS = 'favicons'                    // Favicons
}
```

---

# THEME_IMG — Catalogue complet des images

## Logos

| Enum | Fichier | Description |
|------|---------|-------------|
| `LOGO_SIMPLE_COLOR` | `logo_simple_color.svg` | Logo simple couleur (usage principal) |
| `LOGO_SIMPLE_MONOBLACK` | `logo_simple_monoblack.svg` | Logo simple noir |
| `LOGO_SIMPLE_MONOWHITE` | `logo_simple_monowhite.svg` | Logo simple blanc |
| `LOGO_SIMPLE_WHITE` | `logo_simple_white.svg` | Logo simple blanc variante |
| `LOGO_BASELINE_COLOR` | `logo_baseline_color.svg` | Logo avec baseline couleur |
| `LOGO_BASELINE_MONOBLACK` | `logo_baseline_monoblack.svg` | Logo avec baseline noir |
| `LOGO_BASELINE_MONOWHITE` | `logo_baseline_monowhite.svg` | Logo avec baseline blanc |
| `LOGO_BASELINE_WHITE` | `logo_baseline_white.svg` | Logo avec baseline blanc variante |
| `LOGO_MON_ASSISTANCE` | `logo_mon_assistance.svg` | Logo Mon Assistance |
| `LOGO_WE_CARE` | `logo_we_care.svg` | Logo We Care |
| `ICON_COLOR` | `icon_color.svg` | Icône app couleur |
| `ICON_MONOBLACK` | `icon_monoblack.svg` | Icône app noir |
| `ICON_MONOWHITE` | `icon_monowhite.svg` | Icône app blanc |
| `ICON_WHITE` | `icon_white.svg` | Icône app blanc variante |
| `ICON_MESSAGING` | `icon_messaging.svg` | Icône messagerie |
| `APP_COLOR` | `app_color.svg` | Icône application couleur |

> **Deprecated** : `SIMPLE_LOGO` → utiliser `LOGO_SIMPLE_COLOR` ; `ICON_LOGO` → utiliser `ICON_COLOR` ; `ICON_WHITE_LOGO` → utiliser `ICON_WHITE` ; `APP_ICON` → utiliser `APP_COLOR`

## Illustrations — États de pages

| Enum | Description |
|------|-------------|
| `PAGE_ERROR` | Page erreur générique |
| `PAGE_SUCCESS` | Page succès |
| `PAGE_CTA` | Page avec CTA |
| `PAGE_CTA_DISABLED` | Page CTA désactivé |
| `PAGE_SECURITY` | Page sécurité |
| `PAGE_SECURITY_DISABLED` | Page sécurité désactivée |
| `PAGE_REMB_ERROR` | Page remboursement erreur |
| `PAGE_REMB_SUCCESS` | Page remboursement succès |
| `PAGE_TRANSMISSION_ERROR` | Page transmission erreur |
| `PAGE_TRANSMISSION_SUCCESS` | Page transmission succès |
| `ERROR_403` | Page 403 Forbidden |
| `ERROR_404` | Page 404 Not Found |
| `MAINTENANCE` | Page maintenance |
| `MAINTENANCE_DESKTOP` | Page maintenance (desktop) |
| `NO_RESULT` | Aucun résultat |
| `NO_RESULT_BOX` | Aucun document |
| `NO_RESULT_SEARCH` | Aucun résultat recherche |

## Illustrations — Adhérent / Remboursement

| Enum | Description |
|------|-------------|
| `ADH` | Adhérent |
| `ADH_DISABLED` | Adhérent désactivé |
| `ADH_ERROR` | Adhérent erreur |
| `ADH_SUCCESS` | Adhérent succès |
| `ADH_TP` | Adhérent tiers payant |
| `ADH_TP_DISABLED` | Adhérent tiers payant désactivé |
| `REMB` | Remboursement |
| `REMB_ERROR` | Remboursement erreur |
| `REMB_SUCCESS` | Remboursement succès |
| `REMB_TIME` | Remboursement délai |

## Illustrations — Fichiers / Documents

| Enum | Description |
|------|-------------|
| `FILE` | Fichier générique |
| `FILE_DISABLED` | Fichier désactivé |
| `FILE_ERROR` | Fichier erreur |
| `FILE_SEARCH` | Fichier vide/recherche |
| `FILE_SIGN` | Fichier à signer |
| `FILE_SIGN_DISABLED` | Fichier signature désactivée |
| `SIGNED` | Fichier signé / succès |
| `FILES_UPLOAD` | Upload fichier |
| `FILE_UPLOAD_ERROR` | Upload erreur |
| `FILE_UPLOAD_SUCCESS` | Upload succès |
| `FILES_RIB` | RIB |
| `RIB_DISABLED` | RIB désactivé |
| `FILES_RIB_SUCCESS` | RIB succès |
| `RIB_ERROR` | RIB erreur |
| `RIB_SIGN` | RIB à signer |
| `RIB_SIGN_DISABLED` | RIB signature désactivée |
| `FILES_SECURITE_SOCIALE` | Attestation Ameli |
| `FILES_SHIELD` | Fichier protégé |
| `ATTESTATION_VITALE_EXEMPLE` | Exemple attestation vitale |

## Illustrations — Emails / Communication

| Enum | Description |
|------|-------------|
| `EMAIL_RECEIVED` | Email reçu (boîte réception) |
| `EMAIL_SENT_V1` | Email envoyé v1 |
| `EMAIL_SENT_V2` | Email envoyé v2 |
| `EMAIL_SENT_V2_DISABLED` | Email envoyé désactivé |
| `SEND_MAIL_DISABLED` | Envoi mail désactivé |
| `AFFILIATION_BENEFICIAIRE` | Boîte envoi désactivée |
| `CONTACT_ILLUSTRATION` | Illustration contact |

## Illustrations — Garanties

| Enum | Description |
|------|-------------|
| `DENTAIRE` | Garantie dentaire |
| `OPTIQUE` | Garantie optique |
| `HOSPITALISATION` | Garantie hospitalisation |
| `CURE_THERMALE` | Garantie cure thermale |
| `AIDES_AUDITIVES` | Garantie aides auditives |
| `MEDECINES_ALTER` | Garanties alternatives |
| `SOINS_COURANTS` | Soins courants |
| `NAISSANCE_ADOPTION` | Naissance/adoption |

## Illustrations — Sécurité / Données

| Enum | Description |
|------|-------------|
| `DATA_SECURITY` | Sécurité données |
| `DATA_SECURITY_DISABLED` | Sécurité désactivée |
| `VERROU` | Données verrouillées |
| `DATA_DISABLED` | Données désactivées |
| `PASSWORD` | Mot de passe |
| `FORBIDDEN` | Lien sécurité/interdit |
| `LIEN_ERROR` | Lien erreur |
| `LIEN_SUCCESS` | Lien succès |

## Illustrations — Divers

| Enum | Description |
|------|-------------|
| `CALENDAR_MONEY` | Calendrier/argent |
| `CARTE_TP` | Carte tiers payant |
| `REDIRECTION_MOBILE` | Changement appareil |
| `IDEAS` | Idées |
| `SHARE_THEME` | Partage désactivé |
| `MUTUAL_DOCUMENT` | Document mutuelle |
| `BIENVENUE_LIGNE` | Soulignement bienvenue |
| `BIENVENUE_LIGNE_LARGE` | Soulignement large |
| `DOUBLE_QUOTE_OUVRANTE` | Guillemet ouvrant |
| `DOUBLE_QUOTE_FERMANTE` | Guillemet fermant |
| `DATE_ERROR` | Date erreur |
| `DATE_SUCCESS` | Date succès |
| `FAVICON` | Favicon 32x32 |

## Illustrations — Remboursement Guide (App/Desktop)

| Enum | Description |
|------|-------------|
| `REMBOURSEMENT_APP_NON_REMBOURSE` | App - non remboursé |
| `REMBOURSEMENT_APP_PARTIEL` | App - remboursement partiel |
| `REMBOURSEMENT_DESKTOP_NON_REMBOURSE` | Desktop - non remboursé |
| `REMBOURSEMENT_DESKTOP_PARTIEL` | Desktop - remboursement partiel |

## Assets externes (Stores & Partenaires)

| Enum | Description |
|------|-------------|
| `APPLE_APP_STORE` | Badge Apple App Store |
| `GOOGLE_PLAY_STORE` | Badge Google Play Store |
| `ALMERYS_WHITE` | Logo Almerys blanc |
| `APP_MOBILE` | App mobile mockup |

## Images PNG — Ressources Marketing

| Enum | Fichier | Description |
|------|---------|-------------|
| `SCENE_ADHERENT` | `scene-adherent.png` | Scène adhérent |
| `SCENE_BO` | `scene-bo.png` | Scène back-office |
| `SCENE_EMPLOYEUR` | `scene-employeur.svg` | Scène employeur |
| `ABSENTEISME_TRAVAIL` | `absenteisme-travail.png` | Absentéisme travail |
| `SALARIE_EN_ARRET_MALADIE` | `salarie-arret-maladie.png` | Salarié arrêt maladie |
| `SALARIE_PERSONNE_AIDANTE` | `salarie-personne-aidante.png` | Salarié aidant |
| `SANTE_RESPONSABLE` | `sante-responsable.png` | Santé responsable |
| `EBOOK_AVANTAGES_SALARIES` | `ebook-avantages-salaries.png` | Ebook avantages salariés |
| `RAPPORT_MISSION_2023` | `rapport-mission-2023.svg` | Rapport mission 2023 |

---

# TOKENS CSS — Variables à utiliser dans les styles

> Toutes les variables sont définies sur `:root` via les fichiers CSS du thème actif.

## Couleurs (`vars_colors.css`)

### Neutrals (gris / bleu nuit)
```css
--colors--neutral         /* #355070 — Bleu principal */
--colors--neutral-100     /* #ffffff */
--colors--neutral-200     /* #f5f6f7 */
--colors--neutral-300     /* #ebeff5 */
--colors--neutral-400     /* #e1e5ea */
--colors--neutral-500     /* #cdd3db */
--colors--neutral-600     /* #8696a9 */
--colors--neutral-700     /* #5d738d */
--colors--neutral-800     /* #355070 */
--colors--neutral-900     /* #00224b */
```

### Primary (alias neutral)
```css
--colors--primary         /* #355070 */
--colors--primary-100 à --colors--primary-900  /* identiques aux neutrals */
```

### Secondary (bleu clair)
```css
--colors--secondary       /* #75a3e3 */
--colors--secondary-100   /* #edf4ff */
--colors--secondary-200   /* #d5e4f6 */
--colors--secondary-300   /* #acc8ee */
--colors--secondary-400   /* #91b5e9 */
--colors--secondary-500   /* #75a3e3 */
--colors--secondary-600   /* #5e82b6 */
--colors--secondary-700   /* #466288 */
```

### Accent (jaune doré)
```css
--colors--accent          /* #ffbe1a */
--colors--accent-100      /* #fff8ed */
--colors--accent-200      /* #ffefc7 */
--colors--accent-300      /* #ffe7aa */
--colors--accent-400      /* #ffd466 */
--colors--accent-500      /* #ffbe1a */
--colors--accent-600      /* #cc9200 */
--colors--accent-700      /* #996e00 */
```

### Sémantiques
```css
/* Succès (bleu-vert) */
--colors--success         /* #4894a3 */
--colors--success-100 à --colors--success-700

/* Warning (rose saumon) */
--colors--warning         /* #ff9184 */
--colors--warning-100 à --colors--warning-700

/* Danger (rouge) */
--colors--danger          /* #ee6368 */
--colors--danger-100 à --colors--danger-700

/* Info (violet) */
--colors--info            /* #866c96 */
--colors--info-100 à --colors--info-700

/* Alternative (alias success) */
--colors--alternative     /* #4894a3 */
--colors--alternative-100 à --colors--alternative-700
```

### Offres (dégradés)
```css
--colors--offre-1         /* linear-gradient — vert bleu */
--colors--offre-2         /* linear-gradient — bleu clair */
--colors--offre-3         /* linear-gradient — violet */
--colors--offre-4         /* linear-gradient — gris bleu */
--colors--offre-reduit-1  /* transparent */
--colors--offre-reduit-2  /* transparent */
```

### Divers
```css
--colors--transparent     /* rgb(255 255 255 / 0%) */
--colors--recommandee     /* var(--colors--accent-700) */
```

---

## Typographie (`vars_fonts.css`)

### Familles
```css
--fonts--primary          /* 'Source Sans Pro', sans-serif */
--fonts--secondary        /* 'Prompt', sans-serif */
--fonts--number           /* var(--fonts--secondary) */
```

### Graisses
```css
--fonts--weight-light     /* 300 */
--fonts--weight-normal    /* 400 */
--fonts--weight-semibold  /* 500 */
--fonts--weight-black     /* 600 */
--fonts--weight-bold      /* 700 */
--fonts--weight-numeric   /* var(--fonts--weight-semibold) */
--fonts--weight-subtitle  /* var(--fonts--weight-black) */
```

### Tailles
```css
--fonts--size-small       /* 10px */
--fonts--size-caption     /* 12px */
--fonts--size-body        /* 14px */
--fonts--size-subheader   /* 16px */
--fonts--size-header      /* 18px */
--fonts--size-title       /* 20px */
--fonts--size-headline    /* 24px */
--fonts--size-subdisplay  /* 32px */
--fonts--size-display     /* 36px */
--fonts--size-jumbo       /* 48px */
```

### Hauteurs de ligne (Headings)
```css
--fonts--lineheight-small       /* 12px */
--fonts--lineheight-caption     /* 14px */
--fonts--lineheight-body        /* 16px */
--fonts--lineheight-subheader   /* 20px */
--fonts--lineheight-header      /* 22px */
--fonts--lineheight-title       /* 24px */
--fonts--lineheight-headline    /* 32px */
--fonts--lineheight-subdisplay  /* 42px */
--fonts--lineheight-display     /* 48px */
--fonts--lineheight-jumbo       /* 64px */
```

### Hauteurs de ligne (Paragraphes)
```css
--paragraph--lineheight-small      /* 16px */
--paragraph--lineheight-caption    /* 20px */
--paragraph--lineheight-body       /* 24px */
--paragraph--lineheight-subheader  /* 28px */
--paragraph--lineheight-header     /* 32px */
--paragraph--lineheight-title      /* 32px */
--paragraph--lineheight-headline   /* 44px */
--paragraph--lineheight-subdisplay /* 60px */
--paragraph--lineheight-display    /* 64px */
--paragraph--lineheight-jumbo      /* 80px */
```

### Presets de titres
```css
--fonts--h1               /* Prompt semibold 32px/42px */
--fonts--h1-secondary     /* Prompt semibold 24px/32px */
--fonts--h2               /* Prompt semibold 24px/32px */
--fonts--h2-secondary     /* Prompt semibold 20px/24px */
--fonts--h3               /* Prompt semibold 20px/24px */
--fonts--h3-secondary     /* Prompt semibold 18px/22px */
--fonts--h4               /* Prompt semibold 18px/22px */
--fonts--h4-secondary     /* Prompt semibold 16px/20px */
--fonts--h5               /* Prompt semibold 16px/20px */
--fonts--h5-secondary     /* Prompt semibold 14px/22px */
```

### Presets de texte (format: `--fonts--{niveau}-{graisse}`)
Niveaux disponibles : `small`, `caption`, `body`, `subheader`, `header`, `title`, `headline`, `subdisplay`, `display`, `jumbo`
Graisses disponibles : *(sans suffixe = normal)*, `-light`, `-semibold`, `-black`, `-bold`

```css
--fonts--body             /* Source Sans Pro normal 14px/16px */
--fonts--body-semibold    /* Source Sans Pro semibold 14px/16px */
--fonts--subheader-bold   /* Source Sans Pro bold 16px/20px */
/* etc. */
```

### Presets paragraph (avec line-height paragraphe)
```css
--paragraph-body          /* Source Sans Pro normal 14px/24px */
--paragraph-body-semibold /* Source Sans Pro semibold 14px/24px */
/* même pattern : --paragraph-{niveau}-{graisse} */
```

**Utilisation CSS :**
```css
.mon-element {
  font: var(--fonts--body);
  color: var(--colors--neutral-800);
}

h1 {
  font: var(--fonts--h1);
  color: var(--colors--primary);
}
```

---

## Espacements (`vars_gutters.css`)

```css
--gutters--nano       /* 1px */
--gutters--macro      /* 2px */
--gutters--micro      /* 4px */
--gutters--small      /* 8px */
--gutters--medium     /* 12px */
--gutters--regular    /* 16px */
--gutters--regularer  /* 20px */
--gutters--large      /* 24px */
--gutters--larger     /* 28px */
--gutters--big        /* 32px */
--gutters--bigger     /* 36px */
--gutters--jumbo      /* 42px */
--gutters--super      /* 48px */
```

**Utilisation CSS :**
```css
.card {
  padding: var(--gutters--large);
  gap: var(--gutters--medium);
  margin-bottom: var(--gutters--big);
}
```

---

## Rayons de bordure (`vars_radius.css`)

```css
--radius--small   /* 4px */
--radius--medium  /* 8px */
--radius--big     /* 16px */
--radius--bigger  /* 24px */
```

---

## Ombres (`vars_shadows.css`)

```css
--shadows           /* 0px 2px 4px 0px #172b4d26 — Ombre de base */
--shadows--hover    /* 0px 8px 12px 0px #172b4d29 — Survol */
--shadows--important /* 0px 8px 12px 0px #172b4d29 — Important */
--shadows--modal    /* 0px 16px 32px 0px #172b4d29 — Modales */
--shadows--dark     /* 0px 8px 12px 0px #172b4d — Sombre */
```

---

## Variables de boutons (`match_buttons.css`)

Les variables CTA sont utilisées par les composants `LcButton`. Ne les appliquer directement que si on crée un bouton custom qui doit respecter le thème.

```css
/* Format : --cta--{variant}--{property}[-{state}] */

/* Variants : primary, secondary, tertiary, destructive, link, contact */
/* States : (défaut), -hover, -focus, -disabled */
/* Properties : background, border, text */

--cta--primary--background        /* Fond par défaut */
--cta--primary--background-hover  /* Fond au survol */
--cta--primary--text              /* Couleur texte */
--cta--secondary--border          /* Bordure secondaire */
/* etc. */

/* Contact CTA spécial */
--cta--contact-bg-image           /* SVG en base64 */
--cta--contact-bg-color           /* var(--colors--secondary-200) */
--cta--contact-color              /* var(--colors--neutral) */
```

---

# INTÉGRATION DANS UN PROJET VUE 3 / NUXT

## 1. Installation

```bash
pnpm add @projetlucie/lc-front-theme
```

## 2. Chargement du CSS (Nuxt — `nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  css: ['@projetlucie/lc-front-theme/dist/jaji/styles/_base.css']
});
```

## 3. Initialisation du ThemeHelper (plugin Nuxt ou composable)

```typescript
// plugins/theme.ts
import { ThemeHelper } from '@projetlucie/lc-front-theme';

export default defineNuxtPlugin(() => {
  ThemeHelper.Instance({
    metaUrl: import.meta.url,
    themeModule: 'jaji',
    isHotReloadActivated: import.meta.hot !== undefined
  });
});
```

## 4. Utilisation dans un composant Vue

```vue
<script setup lang="ts">
import { ThemeHelper, THEME_IMG, ASSETS_TYPE } from '@projetlucie/lc-front-theme';

const themeHelper = ThemeHelper.Instance({
  metaUrl: import.meta.url,
  themeModule: 'jaji',
  isHotReloadActivated: import.meta.hot !== undefined
});

const logoUrl = themeHelper.getAssetFromTheme(ASSETS_TYPE.LOGOS, THEME_IMG.LOGO_SIMPLE_COLOR);
const illustrationUrl = themeHelper.getAssetFromTheme(ASSETS_TYPE.ILLUSTRATIONS, THEME_IMG.ADH);
</script>

<template>
  <img :src="logoUrl" alt="Logo Jaji" />
  <img :src="illustrationUrl" alt="Adhérent" />
</template>
```

## 5. Utilisation des variables CSS dans les styles

```vue
<style scoped>
.my-card {
  background-color: var(--colors--neutral-100);
  border: 1px solid var(--colors--neutral-400);
  border-radius: var(--radius--medium);
  padding: var(--gutters--large);
  box-shadow: var(--shadows);
  font: var(--fonts--body);
  color: var(--colors--neutral-800);
}

.my-card:hover {
  box-shadow: var(--shadows--hover);
}

.my-title {
  font: var(--fonts--h2);
  color: var(--colors--primary);
  margin-bottom: var(--gutters--medium);
}
</style>
```

---

# IDENTITE MUTUELLE (par thème)

Chaque thème expose une configuration d'identité importable :

```typescript
// Import direct depuis le dossier public (pour usage dans le projet lc-front-theme lui-même)
import { identiteMutuelle } from '@projetlucie/lc-front-theme/public/jaji/identite';

// Structure disponible :
// identiteMutuelle.fr.identiteMutuelle.nom          → 'Jaji'
// identiteMutuelle.fr.identiteMutuelle.url.vitrine  → 'https://jaji.fr'
// identiteMutuelle.fr.identiteMutuelle.url.politiqueConfidentialite
// identiteMutuelle.fr.identiteMutuelle.url.conditionsGenerales
// identiteMutuelle.fr.identiteMutuelle.url.mentionsLegales
// identiteMutuelle.fr.identiteMutuelle.url.lienAssistance
```

---

# RÈGLES À RESPECTER

1. **Toujours utiliser les variables CSS** — jamais de valeurs en dur dans les styles (`#355070`, `16px`, etc.)
2. **ThemeHelper est un singleton** — l'initialiser une seule fois au démarrage, puis appeler `.Instance()` partout
3. **Utiliser les enums THEME_IMG** — jamais les noms de fichiers en dur (`'logo_simple_color.svg'`)
4. **Éviter les constantes deprecated** — `SIMPLE_LOGO`, `ICON_LOGO`, `ICON_WHITE_LOGO`, `APP_ICON` sont deprecated
5. **Ne pas modifier `match_buttons.css`** — seules les valeurs dans `var()` doivent changer, pas les noms de variables `--cta--*`
6. **Importer `_base.css`** — ce fichier importe tous les autres fichiers CSS du thème
