/* ══════════════════════════════════════════════════════
   Interfaces TypeScript pour les tables métier SOTREL
   Tables en lecture seule — aucun INSERT/UPDATE/DELETE
   ══════════════════════════════════════════════════════ */

/** SDO_SOT_01_RECHERCHE — Résultat de recherche assuré */
export interface SotrelRecherche {
  IDF_NOSS: string
  IDF_NODOSS: string
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
