/**
 * SDO_SAD_05_GROUPE — Groupes d'appartenance (schéma V2)
 * TYPE : P = principal, S = secondaire
 * POURCENTAGE : taux de rattachement au groupe
 */
export const MOCK_SAD_05 = [
  // —— Firme 000000000002 — TRN appartient au groupe HIF ——
  {
    IDF_NUMFIRME:    '000000000002',
    DENSOC:          'TRANSPORT ROUTIER DU NORD SA',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_GP: '000000000008',
    DENSOC_GP:       'HOLDING INDUSTRIE FRANCE',
    TYPE:            'P',
    POURCENTAGE:     '100',
    DATE_DEBUT:      '20050101',
    DATE_FIN:        null,
  },

  // —— Firme 000000000003 — BTP RHONE-ALPES appartient au groupe HIF ——
  {
    IDF_NUMFIRME:    '000000000003',
    DENSOC:          'BTP CONSTRUCTION RHONE-ALPES',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_GP: '000000000008',
    DENSOC_GP:       'HOLDING INDUSTRIE FRANCE',
    TYPE:            'P',
    POURCENTAGE:     '100',
    DATE_DEBUT:      '20050601',
    DATE_FIN:        null,
  },

  // —— Firme 000000000004 — AGENCE PARIS 8EME est un étab de TRN ——
  {
    IDF_NUMFIRME:    '000000000004',
    DENSOC:          'AGENCE PARIS 8EME',
    TYPENT:          'ETAB',
    SITENT:          'PER',
    IDF_NUMFIRME_GP: '000000000002',
    DENSOC_GP:       'TRANSPORT ROUTIER DU NORD SA',
    TYPE:            'P',
    POURCENTAGE:     '100',
    DATE_DEBUT:      '20030901',
    DATE_FIN:        null,
  },

  // —— Firme 000000000011 — SIL appartient partiellement à KLESIA et HIF ——
  {
    IDF_NUMFIRME:    '000000000011',
    DENSOC:          'SERVICES INFORMATIQUES LYON',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_GP: '000000000001',
    DENSOC_GP:       'KLESIA MUTUALITE',
    TYPE:            'S',
    POURCENTAGE:     '40',
    DATE_DEBUT:      '20150101',
    DATE_FIN:        null,
  },
  {
    IDF_NUMFIRME:    '000000000011',
    DENSOC:          'SERVICES INFORMATIQUES LYON',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_GP: '000000000008',
    DENSOC_GP:       'HOLDING INDUSTRIE FRANCE',
    TYPE:            'P',
    POURCENTAGE:     '60',
    DATE_DEBUT:      '20150101',
    DATE_FIN:        null,
  },

  // —— Firme 000000000012 — LEA filiale TRN ——
  {
    IDF_NUMFIRME:    '000000000012',
    DENSOC:          'LOGISTIQUE EXPRESS ATLANTIQUE',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_GP: '000000000002',
    DENSOC_GP:       'TRANSPORT ROUTIER DU NORD SA',
    TYPE:            'P',
    POURCENTAGE:     '100',
    DATE_DEBUT:      '20080101',
    DATE_FIN:        null,
  },
]
