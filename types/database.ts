/* ══════════════════════════════════════════════════════
   Interfaces TypeScript pour les tables métier SOTREL
   Tables en lecture seule — aucun INSERT/UPDATE/DELETE
   ══════════════════════════════════════════════════════ */

/** SDO_SOT_01_RECHERCHE — Résultat de recherche assuré */
export interface SotrelRecherche {
  IDF_NOSS: string
  IDF_NODOSSIER: string
  TYPE_DOSSIER: string | null
  NOM: string
  PRENOM: string | null
  TYPE_SINISTRE: string | null
  DATE_SINISTRE: string | null
}

/** SDO_SOT_02_RG_ASSURE — Renseignements généraux de l'assuré */
export interface SotrelRgAssure {
  IDF_NODOSSIER: string
  NOM: string
  PRENOM: string | null
  IDF_NOSS: string
  IDF_FIT: string | null
  ADRESSE1: string | null
  ADRESSE2: string | null
  ADRESSE3: string | null
  CDPOST: string | null
  VILLE: string | null
  DATNAI: string | null
  AGE: number | null
  PROFESSION: string | null
  SITUATION_FAMILIALE: string | null
  SITUATION_CARCEPT: string | null
  TYPE_SINISTRE: string | null
  DATE_SINISTRE: string | null
  DATE_ARRET: string | null
  ORGANISME: string | null
  REFRENCE_ASSUREUR: string | null
  LIBRE_SERVICE: string | null
  CODE_ETAT: string | null
  DATE_ETAT: string | null
  // Historique des états (001 à 009)
  CODE_ETAT_001: string | null
  DATE_ETAT_001: string | null
  CODE_ETAT_002: string | null
  DATE_ETAT_002: string | null
  CODE_ETAT_003: string | null
  DATE_ETAT_003: string | null
  CODE_ETAT_004: string | null
  DATE_ETAT_004: string | null
  CODE_ETAT_005: string | null
  DATE_ETAT_005: string | null
  CODE_ETAT_006: string | null
  DATE_ETAT_006: string | null
  CODE_ETAT_007: string | null
  DATE_ETAT_007: string | null
  CODE_ETAT_008: string | null
  DATE_ETAT_008: string | null
  CODE_ETAT_009: string | null
  DATE_ETAT_009: string | null
  // Correspondant
  TITRE_CORRESPONDANT: string | null
  NOM_CORRESPONDANT: string | null
  ADRESSE1_CORRESPONDANT: string | null
  ADRESSE2_CORRESPONDANT: string | null
  ADRESSE3_CORRESPONDANT: string | null
  CP_CORRESPONDANT: string | null
  VILLE_CORRESP: string | null
  // Employeur
  NUMERO_FIRME: string | null
  RAISON_SOCIALE: string | null
  ADRESSE1_EMPLOYEUR: string | null
  ADRESSE2_EMPLOYEUR: string | null
  ADRESSE3_EMPLOYEUR: string | null
  CP_EMPLOYEUR: string | null
  VILLE_EMPLOYEUR: string | null
}

/** SDO_SOT_03_CAPITAL — Calcul du capital décès */
export interface SotrelCapital {
  IDF_NODOSSIER: string
  NOM: string
  PRENOM: string | null
  IDF_NOSS: string
  CODE_ETAT: string | null
  DATE_ETAT: string | null
  SALAIRE_TRIMESTRE_1: number | null
  SALAIRE_TRIMESTRE_2: number | null
  SALAIRE_TRIMESTRE_3: number | null
  SALAIRE_TRIMESTRE_4: number | null
  SALAIRE_ANNUEL: number | null
  SALAIRE_DE_REFERENCE: number | null
  POURCENTAGE1: number | null
  POURCENTAGE2: number | null
  POURCENTAGE3: number | null
  NOMBRE_24: number | null
  CAPITAL: number | null
  MAJORATION: number | null
  TOTAL: number | null
  DATE_PAIEMENT: string | null
  COMPLEMENT: number | null
  REVALORISATION: number | null
  DATE_COMPLEMENT: string | null
}

/** SDO_SOT_04_COURRIER — Courriers du dossier */
export interface SotrelCourrier {
  IDF_NODOSSIER: string
  NOM: string
  PRENOM: string | null
  IDF_NOSS: string
  CODE_ETAT: string | null
  DATE_ETAT: string | null
  REF_COURRIER: string | null
  LIBELLE_COURRIER: string | null
  DATE_COURRIER: string | null
}

/** SDO_SOT_05_FONDS — Demandes de fonds */
export interface SotrelFonds {
  IDF_NODOSSIER: string
  NOM: string
  PRENOM: string | null
  IDF_NOSS: string
  CODE_ETAT: string | null
  DATE_ETAT: string | null
  REF_COMPTABLE: string | null
  REF_COURRIER: string | null
  MOTIF: string | null
  MONTANT: number | null
}

/** SDO_SOT_06_LISTE_BENEF — Liste des bénéficiaires (résumé) */
export interface SotrelListeBenef {
  IDF_NODOSSIER: string
  NOM: string
  PRENOM: string | null
  IDF_NOSS: string
  CODE_ETAT: string | null
  DATE_ETAT: string | null
  IDF_NOBENEF: string | null
  TITRE_BENEF: string | null
  NOM_BENEF: string | null
}

/** SDO_SOT_07_BENEF — Détail d'un bénéficiaire */
export interface SotrelBenefDetail {
  IDF_NODOSSIER: string
  NOM: string
  PRENOM: string | null
  IDF_NOSS: string
  CODE_ETAT: string | null
  DATE_ETAT: string | null
  NUM_BENEF: string | null
  TITRE_BENF: string | null
  NOM_BENEF: string | null
  ADRESSE1_BENEF: string | null
  ADRESSE2_BENEF: string | null
  ADRESSE3_BENEF: string | null
  CODE_POSTAL_BENEF: string | null
  VILLE_BENEF: string | null
  CAPITAL_BENEF: number | null
  DESTINATAIRE_BENEF: number | null
  ENFANT_BENEF: number | null
  DATE_CAPITAL_BENEF: string | null
  MODE_PAIE_BENEF: string | null
  DOMICILIATION_BENEF: string | null
  CODE_BQ_BENEF: string | null
  GUICHET_BENEF: string | null
  COMPTE_BENEF: string | null
  CLE_BENEF: string | null
  COMPLEMENT_BENEF: number | null
  DESTINATAIRE_COMPL_BENEF: number | null
  ENFANT_COMPL_BENEF: number | null
  DATE_COMPL_BENEF: string | null
  CHARGE_001_BENEF: string | null
  CHARGE_002_BENEF: string | null
  CHARGE_003_BENEF: string | null
}

/** SDO_SOT_08_DESIGNATION — Désignation de bénéficiaires */
export interface SotrelDesignation {
  IDF_NODOSSIER: string
  DATE_DECLARATION: string | null
  NUM_PART: string | null
  IDF_NOSS: string | null
  NUM_FIRME: string | null
  NOM: string | null
  PRENOM: string | null
  ADRESSE1: string | null
  ADRESSE2: string | null
  ADRESSE3: string | null
  CODE_POSTAL: string | null
  VILLE: string | null
  CODE_BENEF: string | null
  NOM_BENEF: string | null
  ADRESSE1_BENEF: string | null
  ADRESSE2_BENEF: string | null
  ADRESSE3_BENEF: string | null
  CODE_POSTAL_BENEF: string | null
  VILLE_BENEF: string | null
  MONTANT: number | null
  DATEDEB: string | null
  DATEFIN: string | null
}

/* ══════════════════════════════════════════════════
   Interfaces SADE — Suivi Administratif des Entreprises
   Tables en lecture seule — aucun INSERT/UPDATE/DELETE
   Schéma aligné sur Spécifications V2 (13/04/2026)
   ══════════════════════════════════════════════════ */

/** SDO_SAD_01_RECHERCHE — Résultat de recherche entreprise */
export interface SadeRecherche {
  IDF_KNUMADH: string
  TYPE_ENTITE: string | null
  DENSOC: string | null
  SIREN: string | null
  CPOSTAL: string | null
}

/** SDO_SAD_02_RENSEIGNEMENTS — Renseignements généraux entreprise */
export interface SadeRenseignements {
  IDF_KNUMADH: string
  // Identité
  DENSOC: string | null
  DENSOC1: string | null
  DENSOC_COURTE: string | null
  SIGLE: string | null
  ENSEIGNE: string | null
  // Adresse
  ADRESSE1: string | null
  ADRESSE2: string | null
  ADRESSE3: string | null
  ADRESSE4: string | null
  CDPOST: string | null
  VILLE: string | null
  CODE_PAYS: string | null
  BOITE_POSTALE: string | null
  CDPOST_CEDEX: string | null
  VILLE_CEDEX: string | null
  // Contact
  EMAIL: string | null
  TELEPHONE: string | null
  FAX: string | null
  PORTABLE: string | null
  // Dates & juridique
  DATE_OUV: string | null
  DATE_1_CRE: string | null
  DATE_CRE: string | null
  ADH_ORG: string | null
  DATE_CESS: string | null
  DATE_MAJ_CESS: string | null
  MOTIF_CESS: string | null
  TYPE_SOC: string | null
  FORME_JUR: string | null
  CODE_JUR: string | null
  SIRET: string | null
  NPAI: string | null
  TYPE_ENTITE: string | null
  SITUATION: string | null
  CODE_ETAT: string | null
  DEPT: string | null
  SECT_ACT: string | null
  VFIL: string | null
  TRANS_URBAIN: string | null
  CHAMBRE_METIER: string | null
  TRANS_MULTIPLES: string | null
  CODE_NACE: string | null
  VIP: string | null
  REFER_SIEGE: string | null
  DATE_ATTRIBUTION: string | null
  NUM_GESTION: string | null
  VILLE_ACTUELLE: string | null
  EFFECTIF: string | null
  DATE_EFF_MAJ: string | null
  DATE_ENREGISTREMENT: string | null
  VILLE_ORIGINE: string | null
  NUMERO_URSSAF: string | null
  ATTES_CAPACITE: string | null
  NOEMIE: string | null
  // Divers
  CONCOL: string | null
  SYNDICAT: string | null
  CAISSE_CP: string | null
  CAISSE_TA: string | null
  IDENTIFIANT_TA: string | null
  CAISSE_TB: string | null
  IDENTIFIANT_TB: string | null
  CAISSE_NC: string | null
  IDENTIFIANT_NC: string | null
  CAISSE_PR: string | null
  IDENTIFIANT_PR: string | null
}

/** SDO_SAD_03_LIBSER — Libre-service */
export interface SadeLibreService {
  IDF_NUMFIRME: string
  DENSOC: string | null
  TYPENT: string | null
  SITENT: string | null
  NUMORD: string | null
  DATEMAJ: string | null
  LIBSER: string | null
}

/** SDO_SAD_04_PRED_SUCC — Prédécesseurs et Successeurs */
export interface SadePredSuc {
  IDF_NUMFIRME: string
  DENSOC: string | null
  TYPENT: string | null
  SITENT: string | null
  IDF_NUMFIRME_PS: string | null
  DENSOC_PS: string | null
  TYPE_PS: string | null
  LFBG: string | null
  DATE: string | null
}

/** SDO_SAD_05_GROUPE — Groupes d'appartenance */
export interface SadeGroupe {
  IDF_NUMFIRME: string
  DENSOC: string | null
  TYPENT: string | null
  SITENT: string | null
  IDF_NUMFIRME_GP: string | null
  DENSOC_GP: string | null
  TYPE: string | null
  POURCENTAGE: string | null
  DATE_DEBUT: string | null
  DATE_FIN: string | null
}

/** SDO_SAD_06_LISTE_CONTRATS — Liste des contrats */
export interface SadeListeContrats {
  IDF_NUMFIRME: string
  DENSOC: string | null
  TYPENT: string | null
  SITENT: string | null
  NUM_PRODUIT: string | null
  LIBELLE: string | null
  CAT_PROF: string | null
  DATE_EFFET: string | null
  DATE_DEBUT: string | null
  DATE_FIN: string | null
  MOTIF: string | null
}

/** SDO_SAD_07_CONTRAT — Renseignements contrat (détail) */
export interface SadeContrat {
  IDF_NUMFIRME: string
  DENSOC: string | null
  TYPENT: string | null
  SITENT: string | null
  NUM_PRODUIT: string | null
  LIBELLE: string | null
  CODE: string | null
  INSTITUTION: string | null
  CAT_PROF: string | null
  CAT_CCN: string | null
  DATE_EFFET: string | null
  DATE_OUVERT: string | null
  DATE_SUSP: string | null
  DATE_PAIE: string | null
  DATE_RES: string | null
  EFFECTIF: string | null
  DATE_EFF_MAJ: string | null
  ORIGINE: string | null
  ORG_GESTION: string | null
  RETROC: string | null
  PER_COT: string | null
}

/** SDO_SAD_08_DATES — Dates du contrat */
export interface SadeDatesContrat {
  IDF_NUMFIRME: string
  NUM_PRODUIT: string
  DATE_DEBUT: string | null
  DATE_DEBUT_MAJ: string | null
  DATE_FIN: string | null
  DATE_FIN_MAJ: string | null
  MOTIF: string | null
}
