/* ══════════════════════════════════════════════════
   Définitions des en-têtes LcTable par écran
   ══════════════════════════════════════════════════ */

import type { TableHeader } from '@projetlucie/lc-front-components'

// ── SOTREL : Recherche ──
export const RECHERCHE_HEADERS: TableHeader[] = [
  { text: 'N° SS',           value: 'IDF_NOSS',       sortable: true,  hasSlot: true },
  { text: 'N° Dossier',      value: 'IDF_NODOSSIER',  sortable: true },
  { text: 'Type dossier',    value: 'TYPE_DOSSIER',   sortable: true },
  { text: 'Nom',             value: 'NOM',            sortable: true },
  { text: 'Prénom',          value: 'PRENOM',         sortable: true },
  { text: 'Type sinistre',   value: 'TYPE_SINISTRE',  sortable: true,  hasSlot: true },
  { text: 'Date sinistre',   value: 'DATE_SINISTRE',  sortable: true,  hasSlot: true },
]

// ── SOTREL : Courriers ──
export const COURRIERS_HEADERS: TableHeader[] = [
  { text: 'Référence',  value: 'REF_COURRIER',     sortable: true },
  { text: 'Libellé',    value: 'LIBELLE_COURRIER',  sortable: true },
  { text: 'Date',        value: 'DATE_COURRIER',     sortable: true, hasSlot: true },
]

// ── SOTREL : Fonds ──
export const FONDS_HEADERS: TableHeader[] = [
  { text: 'Réf. Comptable', value: 'REF_COMPTABLE', sortable: true },
  { text: 'Réf. Courrier',  value: 'REF_COURRIER',  sortable: true },
  { text: 'Motif',          value: 'MOTIF',          sortable: true },
  { text: 'Montant',        value: 'MONTANT',        sortable: true, hasSlot: true, align: 'right', itemAlign: 'right' },
]

// ── SOTREL : Liste bénéficiaires ──
export const BENEF_LISTE_HEADERS: TableHeader[] = [
  { text: 'N° Bénéficiaire', value: 'IDF_NOBENEF',  sortable: true },
  { text: 'Titre',           value: 'TITRE_BENEF',   sortable: true },
  { text: 'Nom',             value: 'NOM_BENEF',     sortable: true },
  { text: 'Code état',       value: 'CODE_ETAT',     sortable: true },
  { text: 'Date état',       value: 'DATE_ETAT',     sortable: true, hasSlot: true },
]

// ── SOTREL : Désignation ──
export const DESIGNATION_HEADERS: TableHeader[] = [
  { text: 'Date déclaration', value: 'DATE_DECLARATION', sortable: true, hasSlot: true },
  { text: 'N° Participant',   value: 'NUM_PART',         sortable: true },
  { text: 'NIR',              value: 'IDF_NOSS',         sortable: true },
  { text: 'N° Firme',         value: 'NUM_FIRME',        sortable: true },
  { text: 'Nom',              value: 'NOM',              sortable: true },
  { text: 'Prénom',           value: 'PRENOM',           sortable: true },
  { text: 'Code bénéf.',      value: 'CODE_BENEF',       sortable: true },
  { text: 'Nom bénéf.',       value: 'NOM_BENEF',        sortable: true },
  { text: 'Montant',          value: 'MONTANT',          sortable: true, hasSlot: true, align: 'right', itemAlign: 'right' },
  { text: 'Date début',       value: 'DATEDEB',          sortable: true, hasSlot: true },
  { text: 'Date fin',         value: 'DATEFIN',          sortable: true, hasSlot: true },
]

// ── Admin : Utilisateurs ──
export const ADMIN_USERS_HEADERS: TableHeader[] = [
  { text: 'Nom',              value: 'display_name',  sortable: true },
  { text: 'Email',            value: 'email',         sortable: true },
  { text: 'Rôle',             value: 'role',          sortable: true, hasSlot: true },
  { text: 'Domaines',         value: 'domains',       sortable: false, hasSlot: true },
  { text: 'Statut',           value: 'is_active',     sortable: true, hasSlot: true },
  { text: 'Dernière connexion', value: 'last_login',  sortable: true, hasSlot: true },
  { text: 'Actions',          value: 'actions',       sortable: false, hasSlot: true },
]

// ── Admin : Domaines ──
export const ADMIN_DOMAINS_HEADERS: TableHeader[] = [
  { text: 'Code',        value: 'code',        sortable: true },
  { text: 'Libellé',     value: 'label',       sortable: true },
  { text: 'Description', value: 'description', sortable: false },
  { text: 'Route',       value: 'route',       sortable: false },
  { text: 'Statut',      value: 'is_active',   sortable: true, hasSlot: true },
  { text: 'Actions',     value: 'actions',     sortable: false, hasSlot: true },
]

// ── Admin : Logs ──
export const ADMIN_LOGS_HEADERS: TableHeader[] = [
  { text: 'Date',        value: 'created_at',  sortable: true, hasSlot: true },
  { text: 'Utilisateur', value: 'display_name', sortable: true },
  { text: 'Email',       value: 'email',       sortable: true },
  { text: 'Action',      value: 'action',      sortable: true, hasSlot: true },
  { text: 'IP',          value: 'ip_address',  sortable: false },
  { text: 'Détails',     value: 'details',     sortable: false },
]

// ── SADE : Recherche ──
export const SADE_RECHERCHE_HEADERS: TableHeader[] = [
  { text: 'N° Firme',      value: 'IDF_KNUMADH',  sortable: true },
  { text: 'Type entité',   value: 'TYPE_ENTITE',  sortable: true, hasSlot: true },
  { text: 'Dénomination',  value: 'DENSOC',       sortable: true },
  { text: 'SIREN',         value: 'SIREN',        sortable: true },
  { text: 'Code postal',   value: 'CPOSTAL',      sortable: true },
]

// ── SADE : Libre-Service ──
export const SADE_LIBSER_HEADERS: TableHeader[] = [
  { text: 'N° Ordre',  value: 'NUMORD',  sortable: true },
  { text: 'Date MAJ',  value: 'DATEMAJ', sortable: true, hasSlot: true },
  { text: 'Libellé',   value: 'LIBSER',  sortable: false },
]

// ── SADE : Prédécesseurs / Successeurs ──
export const SADE_PREDSUC_HEADERS: TableHeader[] = [
  { text: 'N° Prédec./Succ.', value: 'IDF_NUMFIRME_PS', sortable: true },
  { text: 'Dénomination',     value: 'DENSOC_PS',       sortable: true },
  { text: 'Type P/S',         value: 'TYPE_PS',         sortable: true },
  { text: 'L.F.B.G',          value: 'LFBG',            sortable: true },
  { text: 'Date',             value: 'DATE',            sortable: true, hasSlot: true },
]

// ── SADE : Groupes ──
export const SADE_GROUPES_HEADERS: TableHeader[] = [
  { text: 'N° Groupe',   value: 'IDF_NUMFIRME_GP', sortable: true },
  { text: 'Dénomination', value: 'DENSOC_GP',      sortable: true },
  { text: 'Type',        value: 'TYPE',           sortable: true },
  { text: 'Pourcentage', value: 'POURCENTAGE',    sortable: true, hasSlot: true, align: 'right', itemAlign: 'right' },
  { text: 'Date début',  value: 'DATE_DEBUT',     sortable: true, hasSlot: true },
  { text: 'Date fin',    value: 'DATE_FIN',       sortable: true, hasSlot: true },
]

// ── SADE : Liste Contrats ──
export const SADE_CONTRATS_HEADERS: TableHeader[] = [
  { text: 'N° Produit',      value: 'NUM_PRODUIT', sortable: true },
  { text: 'Libellé',         value: 'LIBELLE',     sortable: true },
  { text: 'Catégorie Prof.', value: 'CAT_PROF',    sortable: true },
  { text: 'Date effet',      value: 'DATE_EFFET',  sortable: true, hasSlot: true },
  { text: 'Date début',      value: 'DATE_DEBUT',  sortable: true, hasSlot: true },
  { text: 'Date fin',        value: 'DATE_FIN',    sortable: true, hasSlot: true },
  { text: 'Motif',           value: 'MOTIF',       sortable: true },
]

// ── SADE : Dates Contrat ──
export const SADE_DATES_HEADERS: TableHeader[] = [
  { text: 'Date début',      value: 'DATE_DEBUT',     sortable: true, hasSlot: true },
  { text: 'MAJ début',       value: 'DATE_DEBUT_MAJ', sortable: true, hasSlot: true },
  { text: 'Date fin',        value: 'DATE_FIN',       sortable: true, hasSlot: true },
  { text: 'MAJ fin',         value: 'DATE_FIN_MAJ',   sortable: true, hasSlot: true },
  { text: 'Motif',           value: 'MOTIF',          sortable: true },
]
