/**
 * SDO_SAD_04_PRED_SUCC — Prédécesseurs et Successeurs (schéma V2)
 * TYPE_PS : P = Prédécesseur, S = Successeur
 * LFBG : Légal, Fait, Branche, Gérance
 */
export const MOCK_SAD_04 = [
  // —— Firme 000000000002 — TRN a absorbé FRETEX NORD (prédécesseur) ——
  {
    IDF_NUMFIRME:    '000000000002',
    DENSOC:          'TRANSPORT ROUTIER DU NORD SA',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_PS: '000000000009',
    DENSOC_PS:       'FRETEX NORD SARL',
    TYPE_PS:         'P',
    LFBG:            'L',
    DATE:            '20191101',
  },

  // —— Firme 000000000003 — BTP est une filiale de HIF ——
  {
    IDF_NUMFIRME:    '000000000003',
    DENSOC:          'BTP CONSTRUCTION RHONE-ALPES',
    TYPENT:          'ENTR',
    SITENT:          'PER',
    IDF_NUMFIRME_PS: '000000000008',
    DENSOC_PS:       'HOLDING INDUSTRIE FRANCE',
    TYPE_PS:         'S',
    LFBG:            'F',
    DATE:            '20050101',
  },

  // —— Firme 000000000007 — MENUISERIE DUPONT reprise par CONSTRUCTIONS BOIS EST ——
  {
    IDF_NUMFIRME:    '000000000007',
    DENSOC:          'MENUISERIE DUPONT FILS',
    TYPENT:          'ENTR',
    SITENT:          'DEF',
    IDF_NUMFIRME_PS: '000000000013',
    DENSOC_PS:       'CONSTRUCTIONS BOIS EST SAS',
    TYPE_PS:         'S',
    LFBG:            'L',
    DATE:            '20160101',
  },

  // —— Firme 000000000008 — HIF successeur de plusieurs entités ——
  {
    IDF_NUMFIRME:    '000000000008',
    DENSOC:          'HOLDING INDUSTRIE FRANCE',
    TYPENT:          'GRP',
    SITENT:          'PER',
    IDF_NUMFIRME_PS: '000000000014',
    DENSOC_PS:       'FRANCE INDUSTRIES REUNIES SA',
    TYPE_PS:         'P',
    LFBG:            'F',
    DATE:            '19991201',
  },
  {
    IDF_NUMFIRME:    '000000000008',
    DENSOC:          'HOLDING INDUSTRIE FRANCE',
    TYPENT:          'GRP',
    SITENT:          'PER',
    IDF_NUMFIRME_PS: '000000000015',
    DENSOC_PS:       'METALLURGIE CENTRE EST',
    TYPE_PS:         'P',
    LFBG:            'L',
    DATE:            '20030615',
  },

  // —— Firme 000000000009 — USINE PROD MARSEILLE (fermée, successeur = BTP) ——
  {
    IDF_NUMFIRME:    '000000000009',
    DENSOC:          'USINE PROD MARSEILLE',
    TYPENT:          'ETAB',
    SITENT:          'DEF',
    IDF_NUMFIRME_PS: '000000000003',
    DENSOC_PS:       'BTP CONSTRUCTION RHONE-ALPES',
    TYPE_PS:         'S',
    LFBG:            'L',
    DATE:            '20210101',
  },
]
