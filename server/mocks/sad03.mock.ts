/**
 * SDO_SAD_03_LIBSER — Libre-service (schéma V2)
 * Plusieurs entrées possibles par entreprise (NUMORD)
 */
export const MOCK_SAD_03 = [
  // —— Firme 000000000001 — KLESIA MUTUALITE : 3 libellés ——
  {
    IDF_NUMFIRME: '000000000001',
    DENSOC:       'KLESIA MUTUALITE',
    TYPENT:       'GRP',
    SITENT:       'PER',
    NUMORD:       '000001',
    DATEMAJ:      '20120315',
    LIBSER:       'Siège social du groupe KLESIA. Contact : Direction des Relations Entreprises - 01 53 67 67 00.',
  },
  {
    IDF_NUMFIRME: '000000000001',
    DENSOC:       'KLESIA MUTUALITE',
    TYPENT:       'GRP',
    SITENT:       'PER',
    NUMORD:       '000002',
    DATEMAJ:      '20180601',
    LIBSER:       'Fusion avec ISICA en 2013. Accord de branche Transport applicable depuis le 01/01/2018.',
  },
  {
    IDF_NUMFIRME: '000000000001',
    DENSOC:       'KLESIA MUTUALITE',
    TYPENT:       'GRP',
    SITENT:       'PER',
    NUMORD:       '000003',
    DATEMAJ:      '20231001',
    LIBSER:       'Mise à jour coordonnées suite déménagement direction technique. Nouveau bâtiment : Tour B, 21 Rue Balzac 75008 Paris.',
  },

  // —— Firme 000000000002 — TRANSPORT ROUTIER DU NORD : 2 libellés ——
  {
    IDF_NUMFIRME: '000000000002',
    DENSOC:       'TRANSPORT ROUTIER DU NORD SA',
    TYPENT:       'ENTR',
    SITENT:       'PER',
    NUMORD:       '000001',
    DATEMAJ:      '20050901',
    LIBSER:       'Entreprise adhérente depuis 1995. Accord de prévoyance signé avec les représentants syndicaux le 15/06/2005.',
  },
  {
    IDF_NUMFIRME: '000000000002',
    DENSOC:       'TRANSPORT ROUTIER DU NORD SA',
    TYPENT:       'ENTR',
    SITENT:       'PER',
    NUMORD:       '000002',
    DATEMAJ:      '20191115',
    LIBSER:       'Rachat de la société FRETEX NORD en novembre 2019. Intégration des salariés prévue Q1 2020. Effectif passé de 280 à 420 personnes.',
  },

  // —— Firme 000000000008 — HOLDING INDUSTRIE FRANCE : 1 libellé ——
  {
    IDF_NUMFIRME: '000000000008',
    DENSOC:       'HOLDING INDUSTRIE FRANCE',
    TYPENT:       'GRP',
    SITENT:       'PER',
    NUMORD:       '000001',
    DATEMAJ:      '20150301',
    LIBSER:       'Groupe coté en bourse depuis 2002 (Euronext Paris - code HIF). Holdings sur 4 filiales dont BTP CONSTRUCTION RHONE-ALPES (001) et USINE PROD MARSEILLE.',
  },

  // —— Firme 000000000011 — SERVICES INFORMATIQUES LYON : 2 libellés ——
  {
    IDF_NUMFIRME: '000000000011',
    DENSOC:       'SERVICES INFORMATIQUES LYON',
    TYPENT:       'ENTR',
    SITENT:       'PER',
    NUMORD:       '000001',
    DATEMAJ:      '20120101',
    LIBSER:       'Interlocuteur RH : Mme BERTRAND - 04 78 99 11 22 poste 234. Préférence contact par email pour les avenants.',
  },
  {
    IDF_NUMFIRME: '000000000011',
    DENSOC:       'SERVICES INFORMATIQUES LYON',
    TYPENT:       'ENTR',
    SITENT:       'PER',
    NUMORD:       '000002',
    DATEMAJ:      '20220601',
    LIBSER:       'Télétravail généralisé depuis 2021. Les justificatifs de présence sont à adresser au siège social uniquement.',
  },
]
