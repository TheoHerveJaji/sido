## SARCOPHAGE SIDO

# Domaine SADE

# SARCOPHAGE SIDO

# Domaine SADE

            - DOSI Spécifications Édité le : 13/04/ SUIVI ADMINISTRATIF DES ENTREPRISES
               - Page 1 /

- 1 0 D. QUET Création du document 04 / 02 /202 Version Rédacteur Objet Date
- 1.0 A. POIRIER Initialisation du document 04/02/
- 1. CONTEXTE SOMMAIRE
- 2. OBJET
- 3. BESOIN FONCTIONNEL
     - 3.1. Ecrans et tables sources du domaine sade
       - 3.1.1. Ecran Authentification...........................................................................................................
       - 3.1.2. Ecran Recherche
       - 3.1.3. Ecran Résultat Recherche......................................................................................................
       - 3.1.4. Ecran 01 : Renseignements Généraux
       - 3.1.5. Ecran 02 : Complément Renseignements Généraux (1)
       - 3.1.6. Ecran 03 : Complément Renseignements Généraux (2)
       - 3.1.7. Ecran 05 : Prédécesseurs et Successeurs
       - 3.1.8. Ecran 11 : Libre-Service
       - 3.1.9. Ecran 12 : Liste des contrats
       - 3.1.10. Ecran 15 : Renseignements Produits Prévoyance Souscrits...........................................
       - 3.1.11. Ecran 19 : Groupes d’Appartenance
- 4. SPECIFICATIONS DE RESTITUTION DU SARCOPHAGE
     - 4.1. Reprise et les extractions cibles
       - 4.1.1. Profondeur des données et volumétrie
     - 4.2. Ecrans cibles et tables cibles du sarcophage du domaine SADE
       - 4.2.1. Ecran « Recherche Entreprise »
       - 4.2.2. Ecran « Renseignements Généraux Entreprise »
       - 4.2.3. Ecran « Libre-Service »
       - 4.2.4. Ecran « Prédécesseur - Successeur »
       - DOSI Spécifications Édité le : 13/04/ SUIVI ADMINISTRATIF DES ENTREPRISES
         - Page 2 /
     - 4.2.5. Ecran « Groupe d’appartenance »
     - 4.2.6. Ecran « Liste Contrats »
     - 4.2.7. Ecran « Renseignements Contrat »
  - 4.3. Modèle conceptuel de données et cinématique des écrans
- 5. ANNEXES
  - 5.1. Extractions pour constituer les tables cibles...............................................................................
    - 5.1.1. SDO_SAD_01_RECHERCHE
    - 5.1.2. SDO_SAD_02_RENSEIGNEMENTS
    - 5.1.3. SDO_SAD_03_LIBSER
    - 5.1.4. SDO_SAD_04_PRED_SUC
    - 5.1.5. SDO_SAD_05_GROUPE
    - 5.1.6. SDO_SAD_05_LISTE_CONTRATS
    - 5.1.7. SDO_SAD_06_CONTRAT......................................................................................................
    - 5.1.8. SDO_SAD_07_DATES

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 3 / 48
```

## 1. CONTEXTE SOMMAIRE

A des fins de problèmes d’obsolescence, de dépendance technologique, de sécurité informatique et de
rationalisation du SI KLESIA, des travaux ont été engagés pour décommissionner les SI historiques (SIGMA
et SIDO).

- Sigma a été décommissionné fin 2025.
- Le vidage de SIDO est en cours avec un dernier lot en juin 2026.

Le vidage fonctionnel de SIDO ne permet pas à lui seul de décommissionner SIDO, il faut pour cela
procéder au traitement des **applications périphériques et à l'archivage des données de SIDO**.

L’archivage des données a pour objectif de répondre aux besoins Métier et/ou réglementaires. Ces
archivages sont un prérequis aux opérations de décommissionnement de SIDO.

- Ces travaux sont portés par le « Programme Simplification SI GD ».

Le décommissionnement de SIDO est à réaliser pour fin décembre 2026.

En comité d’architecture du 23 janvier 2026, la solution technique ci-dessous a été validée.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 4 / 48
```

## 2. OBJET

Ce document a pour objet de spécifier les règles d’extraction, d’archivage et de restitution des données
de l’application SADE dont le périmètre fonctionnel est le suivi des entreprises (renseignements généraux
et contrats)

Les données relatives à ce périmètre seront archivées dans le domaine SADE du sarcophage SIDO.

SADE a été développé dans les années 199 5.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 5 / 48
```

## 3. BESOIN FONCTIONNEL

Lors des ateliers de spécification du sarcophage, le métier a précisé son besoin fonctionnel à travers le cas
d’usage ci-dessous :

```
 Consultation de SADE afin de vérifier les renseignements généraux de l’entreprise, des contrats
qui lui sont rattachés
```

Pour répondre à ce cas d’usage, il faudra fournir des extractions (format décrit plus bas) contenant toutes
les données utiles des écrans de SADE identifiées par le métier.

Une description des données par table est également prévue dans la suite du document.

Ces données seront à restituer dans le domaine SADE du Sarcophage.

La cinématique des écrans pourra être différente de celle de SADE, au regard des simplifications mises en
œuvre.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 6 / 48
```

#### 3.1. Ecrans et tables sources du domaine sade

##### 3.1.1. Ecran Authentification...........................................................................................................

Cet écran permet d’effectuer

- Une création d’entreprise, groupe, etc ....
- Une recherche
- Une visualisation à partir de la référence de la firme ou du numéro de SIRET
- Une modification à partir de la référence de la firme ou du numéro de SIRET
- Reconduction de l’écran dans le sarcophage : NON.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 7 / 48
```

##### 3.1.2. Ecran Recherche

A partir de cet écran, il est possible de combiner plusieurs critères de recherche et d’obtenir un résultat.

- Reconduction de l’écran dans le sarcophage : NON.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 8 / 48
```

##### 3.1.3. Ecran Résultat Recherche......................................................................................................

Cet écran permet d’afficher les entreprises recherchées, de sélectionner une entreprise pour consulter
ses renseignements dans les différents écrans de l’application.

- Reconduction de l’écran dans le sarcophage : NON.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 9 / 48
```

##### 3.1.4. Ecran 01 : Renseignements Généraux

Cet écran permet de connaitre la signalétique de l’entreprise : type, forme juridique, Siret, adresse.

Toutes les données de cet écran sont à reprendre sauf les données retraite ainsi que la notion de
nouvelle adresse, nouvelle dénomination sociale.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 10 / 48
```

- Tables sources et données utilisées :

TYPE DE DONNEES TABLE LIBELLE COLONNE DATA_TYPE

RENSEIGNEMENTS
ENTREPRISE

```
TDSADOP Numéro d'Entreprise Knumadh char(12)
TDSADEN Type Société Typjur char(4)
TDSADEN Forme juridique Forjur char(2)
TDSADEN Code Sexe Code_Sexe char(1)
TDSADOP Siret Numsir char(14)
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
TDSADEN Code Etat Codeta char(2)
Gespar Section TQFRESP2 (codges + code
accès)
```

```
buffer(1:4)
```

```
TDSADOP Gestion Codges char(2)
TDSADOP Département Origine codgeo char(2)
TDSADRENS Dénomination Sociale 1 Densoc char(38)
TDSADRENS Dénomination Sociale 2 Densoc1 char(38)
```

RENSEIGNEMENTS
ADRESSE

```
TDADRESSE Complément ADR_lig3 char(38)
TDADRESSE Voie1 Numéro Adr_Numero char(4)
TDADRESSE Voie 1 Type ADR_Typevoie varchar2(4)
TDADRESSE Voie1 ADR_Nomvoie varchar2(9)
TDADRESSE Voie2 ADR_lig4 varchar2(38)
TDADRESSE Lieu Dit ADR_lig5 varchar2(38)
TDADRESSE code Postal ADR_Codpost varchar2(5)
TDADRESSE bureau distributeur ADR_Burdist varchar2(33)
TDADRESSE Code pays ADR_code_pays varchar2(3)
```

RENSEIGNEMENTS
ENTREPRISE

```
Gespar Pays TGSADE02 char(80)
TDSADEN Code Courrier Codcou NON REPRIS
Nouvelle Adresse
NON REPRIS^
Nouvelle dénomination
Sociale
```

###### NON REPRIS

```
TDSADEN Inidcateur NPAI Code_npai char(1)
TDADRESSE Boite Postale ADR_Boipost varchar2(6)
TDADRESSE Cedex ADR_Codpost_cd varchar2(5)
TDADRESSE Cedex 1 ADR_Burdist_cd varchar2(33)
TDSADRENS RS Abregé Dencou char(38)
TDSADRENS Sigle Sigle char(32)
TDSADRENS Enseigne Enseig char(40)
TDSADRENS Adresse mail email char(80)
TDSADRENS Téléphone Numtel char(10)
TDSADRENS Fax Numfax char(10)
TDSADRENS Portable Numgsm char(10)
TDSADEN Référence Client Retraite Numret NON REPRIS
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 11 / 48
```

##### 3.1.5. Ecran 02 : Complément Renseignements Généraux (1)

## GENERAUX (1)

Cet écran permet de connaitre la signalétique complémentaire de l’entreprise : secteur d’activité, code
nace, etc

Toutes les données de cet écran sont à reprendre.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 12 / 48
```

- Tables sources et données utilisées :

###### TYPE DE DONNEES TABLE LIBELLE COLONNE DATA_TYPE

###### RENSEIGNEMENTS

###### ENTREPRISE

```
TDSADEN N° Entreprise knumadh char(12)
TDSADRENS Dénomination Sociale 1 Densoc char(38)
TDSADRENS Dénomination Sociale 2 Densoc1 char(38)
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

```
TDSADEN Secteur D'activité codsec char(1)
TDSADEN VFIL covfil char(1)
TDSADEN Transport urbain codurb char(1)
TDSADEN Chambre des métiers numcdm char(4)
Gamme
TDSADEN Transports multiples codmul char(1)
TDSADEN Code NACE Codnace char(5)
Libellé
TDSADEN Référence Client Siège idensi char(12)
TDSADOP Date d'attribution Datsit char(8)
TDSADEN N° Gestion numreg char(10)
TDSADEN Ville RC Act Comins_ac char(5)
TDSADEN Date d'enregistrement datreg char(8)
TDSADEN Ville RC Origine Comins_or char(5)
IP
TDSADEN N°URSSAF numurs char(16)
TDSADEN Att Cap attcap char(10)
TDSADEN Noemie codnoe char(1)
TDSADEN Tiers Payant codtie char(1)
TDSADEN Conv Coll Applicable Concol_01 char(15)
TDSADEN Conv Coll Appliquée Concol_02 char(15)
TDSADEN Syndicat nompat_01 char(15)
TDSADEN Syndicat nompat_02 char(15)
TDSADEN Effectif géré effent char(6)
TDSADEN Caisse CP numecp char(12)
TDSADEN Date de MAJ datmaj_en char(8)
TDSADEN VIP vipind char(1)
TDSADEN Code jur Insee codjur char(4)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 13 / 48
```

##### 3.1.6. Ecran 03 : Complément Renseignements Généraux (2)

## GENERAUX ( 2 )

Cet écran permet de connaitre la signalétique complémentaire de l’entreprise : dates de gestion :
ouverture, création, informations Caisse de retraite et le suivi géographique.
Toutes les données de cet écran sont à reprendre sauf les données retraite ainsi que la notion de Suivi
géographique.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 14 / 48
```

- Tables sources et données utilisées :

###### TYPE DE DONNES TABLES LIBELLE COLONNE DATA_TYPE

###### RENSEIGNEMENTS

###### ENTREPRISE

```
TDSADEN N° Entreprise knumadh char(12)
TDSADRENS Dénomination Sociale 1 Densoc char(38)
TDSADRENS Dénomination Sociale 2 Densoc1 char(38)
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

```
TDSADEN Ouverture du dossier datdos char(8)
1ère date d'enregistrement
TDSADEN Création de l'entreprise datcre char(8)
TDSADEN Date de Cessation datces char(8)
TDSADEN Motif motces char(2)
Histo
TDSADOP Date de bascule à l'euro dateur char(8)
TDSADEN Gérant sitcad char(4)
Rémunéré
TDSADOP Salariés Cadres TA Cairet_ta char(8)
TDSADOP Identifiant cainum_ta char(10)
TDSADOP Salariés Cadres TB/TC Cairet_tb char(8)
TDSADOP Identifiant cainum_tb char(10)
TDSADOP Salarié Non-Cadre cairet_nc char(10)
TDSADOP Identifiant cainum_nc char(15)
TDSADOP Caisse Prévoyance
Réglementaire
```

```
cairet_pr char(10)
```

```
TDSADOP Identifiant cainum_pr char(15)
```

RENSEIGNEMENTS
ARCHIVE

```
TDSADCH Carcept Situation codsit char(4)
TDSADCH Carcept Archive codins char(2)
TDSADCH Suivi Géographique numarch char(11)
Date
via
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 15 / 48
```

##### 3.1.7. Ecran 05 : Prédécesseurs et Successeurs

Cet écran permet de connaitre l’existence de prédécesseurs ou de successeurs de l’entreprise.
Toutes les données de cet écran sont à reprendre

- Tables sources et données utilisées :
  TYPE DE DONNES TABLES LIBELLE COLONNE DATA_TYPE
  RENSEIGNEMENTS
  ENTREPRISE

```
TDSADEN N° Entreprise knumadh char(12)
TDSADRENS Dénomination Sociale 1 Densoc char(38)
TDSADRENS Dénomination Sociale 2 Densoc1 char(38)
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

###### RENSEIGNEMENTS

###### PREDECESSEUR

###### SUCCESSEUR

```
TDSADPS N* numadh char(12)
TDSADRENS Raison Sociale densoc char(38)
```

```
TDSADPS Type typlie char(1)
TDSADPS Légal/fait/Branche/Gérance typleg char(1)
```

```
TDSADPS Date datsuc char(8)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 16 / 48
```

##### 3.1.8. Ecran 11 : Libre-Service

Cet écran permet de connaitre la présence d’un libre-service saisi par la gestion.

- Tables sources et données utilisées :
  TYPE DE DONNES TABLES LIBELLE COLONNE DATA_TYPE
  RENSEIGNEMENTS
  ENTREPRISE

```
TDSADEN N’entreprise knumadh char(12)
TDSADRENS Dénomination
Sociale 1
```

```
Densoc char(38)
```

```
TDSADRENS Dénomination
Sociale 2
```

```
Densoc1 char(38)
```

```
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

```
LIBRE SERVICE TDSADLIB Numéro d'ordre numord char(6)
TDSADLIB Date datmaj char(8)
TDSADLIB Libellé valibser char(600)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 17 / 48
```

##### 3.1.9. Ecran 12 : Liste des contrats

Cet écran permet de connaitre la liste des produits souscrits par l’entreprise.
Tous les produits souscrits sont repris sauf les produits « retraite »
Les dates avec les motifs ‘ER’ et ‘RC’ ne sont pas repris.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 18 / 48
```

- Tables sources et données utilisées :
  TYPE DE DONNES TABLES LIBELLE COLONNE DATA_TYPE
  RENSEIGNEMENTS
  ENTREPRISE

```
TDSADEN N° Entreprise knumadh char(12)
TDSADRENS Dénomination
Sociale 1
```

```
Densoc char(38)
```

```
TDSADRENS Dénomination
Sociale 2
```

```
Densoc1 char(38)
```

```
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

###### RENSEIGNEMENTS

###### PRODUIT

```
TDSADTC Produit connum char(4)
TDSADTC
Dénomination
Abregée
```

```
condem char(10)
```

```
TDSADTC Catégorie Profession. Concat_01 char(02)
```

```
Concat_02 char(02)
concat_03 char(02)
TDSADTC Date Effet condef char(08)
TDSADTC Date Début condeb char(08)
TDSADTC Date Fin confin char(08)
TDSADTC Motif conmot char(02)
```

##### 3.1.10. Ecran 15 : Renseignements Produits Prévoyance Souscrits...........................................

## PREVOYANCE SOUSCRITS

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 19 / 48
```

Cet écran permet de connaitre les caractéristiques du contrat souscrit par l’entreprise : numéro de
contrat, date d’effet, effectif, date de début et de fin de présence du personnel, etc ....

Les données sur le taux d’appel, de validation ou de forfait ne sont pas reprises car elles sont
consultables dans le fichier Excel PINS (Contrat-type) ainsi que la partie Prestations.

Les dates avec les motifs ‘ER’ et ‘RC’ ne sont pas repris.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/^

```
Page 20 / 48
```

- Tables sources et données utilisées.

###### TYPE DE DONNES TABLES LIBELLE COLONNE DATA_TYPE

###### RENSEIGNEMENTS

###### PRODUITS

```
TDSADEN N’entreprise knumadh char(12)
TDSADRENS Dénomination
Sociale 1
```

```
Densoc char(38)
```

```
TDSADRENS Dénomination
Sociale 2
```

```
Densoc1 char(38)
```

```
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

###### RENSEIGNEMENTS

###### CONTRATS

```
TDSADTC Produit connum char(4)
uges,TGSADE18 Libellé conreg=cle
TDSADPR Institution codins
N°Contrat
TDSADTC Catégories concat_01 char(2)
TDSADTC
concat_02 char(2)
TDSADTC
concat_03 char(2)
TDSADPR Cat Conv catcnv_01 char(2)
TDSADPR
catcnv_02 char(2)
TDSADPR
catcnv_03 char(2)
TDSADTC Date effet condef char(8)
TDSADTC Date ouverture condou char(8)
TDSADTC Effectif coneff char(6)
TDSADTC Date maj effectif datmaj char(8)
TDSADPR Origine conorg char(2)
TDSADPR Org.Gestion conges char(2)
TDSADPR Retroce conret char(3)
TDSADTC Périod Cot conper char(2)
TDSADTC Arch conarc char(4)
TDSADTC Code Sais consai char(1)
TDSADTC Taux Spécifique conspe char(1)
TDSADDA DADS condas char(6)
TDSADDA
conexe char(4)
TDSADFG Garantie conris char(4)
TDSADFG Catégorie 01 concat_01 char(2)
TDSADFG Catégorie 02 concat_02 char(2)
TDSADFG Catégorie 03 concat_03 char(2)
TDSADFG Catégorie 04 concat_04 char(2)
TDSADFG Catégorie 05 concat_05 char(2)
TDSADFG Hist conhis char(1)
TDSADFG FGF confgf char(6)
TDSADPR Date Suspension condsu char(8)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 21 / 48
```

```
TDSADPR Date de fin de
Paiement
```

```
condfp char(8)
```

```
TDSADPR Date de Résiliation condre char(8)
FFNCTCON Taux d'appel TA tabcot_001
Taux validation TA
Forfait TA
FFNCTCON Taux d'appel TB tabcot_002
Taux validation TB
Forfait TB
FFNCTCON Taux d'appel TC tabcot_003
Taux validation TC
Forfait TC
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 22 / 48
```

##### 3.1.11. Ecran 19 : Groupes d’Appartenance

Cet écran permet de savoir si l’entreprise appartient à un groupe.

- Tables sources et données utilisées.
  TYPE DE DONNES TABLES LIBELLE COLONNE DATA_TYPE
  RENSEIGNEMENTS
  ENTREPRISE

```
TDSADEN N°entreprise knumadh char(12)
TDSADRENS Dénomination
Sociale 1
```

```
Densoc char(38)
```

```
TDSADRENS Dénomination
Sociale 2
```

```
Densoc1 char(38)
```

```
TDSADOP Type Entité typent char(4)
TDSADOP Situation Entité sitent char(3)
```

```
Numéro Ordre
RENSEIGNEMENTS
GROUPE
D’APPARTENANCE
```

```
TDSADAP Numéro numadh char(12)
TDSADRENS Raison Sociale densoc char(38)
TDSADAP % d'appartenance grapar char(5)
TDSADAP Date début datdeb char(8)
TDSADAP Date Fin Datfin char(8)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 23 / 48
```

## 4. SPECIFICATIONS DE RESTITUTION DU SARCOPHAGE

La stratégie de mise en œuvre du sarcophage repose sur les points clés suivants :

- Le sarcophage sera la restitution de données sources sur les domaines fonctionnels identifiés par
  les métiers
- Pour chaque domaine le métier a précisé les cas d’usages, les écrans et les données à restituer.
- Des simplifications pourront être mises en œuvre afin de limiter le nombre d’écrans.
- La base de données est une base Mysql qui sera unique pour tous les domaines, la distinction par
  domaine se fera sur le nom des tables. Une normalisation va être appliquée :
  o 3 premiers caractères correspondent au trigramme SDO
  o 3 caractères suivants seront déclinés au niveau domaine fonctionnel
  ▪ SOT Sotrel
  ▪ SAD SADE
  ▪ IFA Prestpv Ipriac Fongecfa Agecfa
  ▪ MII Prestpv Mensu Incap Inval
  ▪ SDC : Suivi des Comptes
  ▪ GU1 : Guichet Unique
  ▪ SIP : SIPRE
  o 2 caractères numériques qui correspondront aux numéros d’écran
  o Libellé de la table
- Les écrans seront développés avec de l’IA générative (Copilot Entreprise).
- La complexité est portée sur les extractions à partir de la base source afin de pouvoir constituer
  une table cible pour chaque nouvel écran du sarcophage
- La cinématique des écrans est décrite dans ce document.
- Pour chaque domaine le profil des utilisateurs est précisé.

Cette spécification présente une vision globale du besoin métier à la restitution des données dans le
sarcophage.

- Finalité du cas d’usage :

Le métier doit pouvoir consulter les renseignements de l’entreprise ainsi que ces produits de prévoyance
souscrits en cas de litige, étude vieux dossiers dans le cadre de la loi Eckert.

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 24 / 48
```

- Historique des données :

Voici les types et situations d’entreprise à migrer dans la base cible :

- Fréquence d’usage

Le métier s’est prononcé pour une consultation à la marge
Volumétrie : environ 20 personnes.

- Population cible

Les utilisateurs cibles seront les membres des pôles métier Entreprise et Prestations.

- Profils utilisateurs

Un profil utilisateur, consultation uniquement, sera attribué aux gestionnaires pouvant accéder à ce domaine du
sarcophage.

```
Type Libellé Situation Libellé Nombre
BANQ Banque DEF Définitive 239
```

###### CARC

```
Entreprise
Carcept DEF Définitive 1
ECOL Ecole DEF Définitive 5
ENTR Entreprise PER Per 6
ENTR Entreprise DEF Définitive 215472
ETAB Etablissement DEF Définitive 4570
GRP Groupe DEF Définitive 47
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 25 / 48
```

#### 4.1. Reprise et les extractions cibles

L’objectif de ce paragraphe est de décrire les règles d’extraction des fichiers à générer.

Les extractions seront réalisées à partir des tables suivantes de SADE :

- TDSADOP : table principale
- TDSADEN : renseignements entreprise
- TDSADRENS : renseignements complémentaires entreprise
- TDSADPS : Prédécesseurs/Successeurs
- TDSADLIB : libre-service
- TDSADTC : Produits
- TDSADPR : Produits prévoyance
- TDSADDC : Dates Produits
- TDSADAP : Groupe d’appartenance
- TDADRESSE : Adresse Entreprise
- TDAPPADR : Adresse

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 26 / 48
```

Critère
d’extraction

```
Nom Technique Table Caractéristiques
du critère
```

Commentaires
d’extraction
Données
Entreprise

Référence Knumadh TDSADOP Obligatoire Table Principale
SIRET siret TDSADOP Obligatoire Table Principale
Renseignements
Généraux
Entreprise

Référence Knumadh TDSADEN Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Référence Knumadh TDSADRENS Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Adresse
Entreprise

Référence Knumadh TDAPPADR Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Référence Knumadh TDADRESSE Obligatoire Jointure avec la
table
TDAPPADR sur
la référence
knumadh
Prédecesseurs /
Successeurs

Référence Knumadh TDSADPS Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Groupe
D’appartenance

Référence Knumadh TDSADAP Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Libre Service Référence Knumadh TDSADLIB Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Contrats
Renseignements
Généraux

Référence Knumadh TDSADTC Obligatoire Jointure avec la
table TDSADOP
sur la référence
knumadh
Contrat
Renseignements
Prévoyance

Référence Knumadh/Connum TDSADPR Obligatoire Jointure avec la
table TDSADOP
et TDSADTC sur
la référence
knumadh et
connum
Contrats Date Référence Knumadh/Connum TDSADDC Obligatoire Jointure avec la
table TDSADOP
et TDSADTC sur
la référence
knumadh et
connum

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 27 / 48
```

###### 4.1.1. PROFONDEUR DES DONNEES ET VOLUMETRIE

Voici les données qui seront reprises au niveau des entreprises :

Volumétrie arrêtée au 27 /03/2026

```
Type Libellé Situation Libellé Date de création la
plus ancienne
```

```
Date de création
la plus récente
```

```
Nombre
```

```
BANQ Banque DEF Définitive 01/01/1901 16/12/2016 293
CARC Entreprise
Carcept
```

```
DEF Définitive 01/01/1900 02/01/1900 1
```

```
ECOL Ecole DEF Définitive 01/01/1974 01/01/2004 5
ENTR Entreprise PER PER 01/11/2001 01/11/2001 6
DEF Définitive 01/01/1900 17/07/2025 215466
ETAB Etablissement DEF Définitive 01/01/1900 09/02/2024 4577
GRP Groupe DEF Définitive 18/09/1901 23/05/2005 47
PER PER 1
```

Voici les données qui seront reprises au niveau des contrats :

```
Contrat
```

```
Date de création
la plus ancienne
```

```
Date de
création
la plus
récente Volumétrie
```

```
Repris dans le
sarcophage
Retraite 01/01/1947 01/07/2022 496907 Non repris
Ocirp 01/02/1985 01/01/2018 429 Repris
Ipriac 01/12/1977 01/01/2020 97875 Repris
Prévoyance Facultative 01/01/1955 01/01/2026 364753 Repris
Fongecfa 01/07/1997 01/10/2020 49155 Repris
Agecfa 01/07/1998 01/10/2018 9884 Repris
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 28 / 48
```

#### 4.2. Ecrans cibles et tables cibles du sarcophage du domaine SADE

##### 4.2.1. Ecran « Recherche Entreprise »

- Cet écran va permettre de Rechercher une entreprise avec comme critère de sélection :
  o Par numéro d’entreprise SADE : sur 12 caractères
  o Par Dénomination Sociale => à voir s’il ne faut pas saisir un minima de caractère,
  o Par numéro SIREN : sur 9 caractères
- La restitution de la recherche va ramener 1 à n entreprise :
  o Le numéro d’entreprise SADE,
  o La dénomination Sociale,
  o Le type d’entité : BANQ, ETAB, ENTR, ECOL, GRP, CARC
  o Le Siren
  o Le code postal
   En cliquant sur la ligne de l’entreprise trouvée, cela va permettre d’accéder à l’écran « Renseignements
  Généraux de l’entreprise »
- Table Cible **SDO_SAD_01_RECHERCHE**

Type de
données

```
Libellé Colonnes Data_type
```

```
Recherche
Entreprise
```

```
Numéro de firme IDF_KNUMADH varchar2(12) Clé Primaire
Index
Type d’entité TYPE_ENTITE Varchar(04)
Dénomination
sociale
```

```
DENSOC varchar2(76) Index
```

```
SIREN SIREN varchar2(9) Index
Département CPOSTAL number(05)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 29 / 48
```

##### 4.2.2. Ecran « Renseignements Généraux Entreprise »

## ENTREPRISE »

- Cet écran va permettre d’afficher les informations de l’entreprise
  o Signalétique : adresse, ...
  o Dates et informations juridiques : date de création, cessation, forme juridique, ....
  o Divers : différentes caisses de retraite, ....

Libellé Colonnes DATA_TYPE

Identification
Entreprise

```
Numéro de firme IDF_KNUMADH char(12)
Dénomination
sociale
```

```
DENSOC char(38)
```

```
DENSOC1 char(38)
Adresse1 ADRESSE1 varchar2(38)
Adresse2 ADRESSE2 varchar2(38)
Adresse3 ADRESSE3 varchar2(38)
Adresse4 ADRESSE4 varchar2(38)
Code Postal CDPOST varchar2(05)
Bureau
Distributeur
```

```
VILLE varchar2(33)
```

```
Code Pays CODE_PAYS varchar2(03)
Raison Sociale
Abregée
```

```
DENSOC_COURTE char(38)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 30 / 48
```

```
Sigle SIGLE char(32)
Enseigne ENSEIGNE char(40)
Boîte Postale BOÎTE_POSTALE varchar2(06)
Code Postal
Cedex
```

```
CDPOST_CEDEX varchar2(05)
```

```
Bureau
Distributeur
Cedex
```

```
VILLE_CEDEX varchar2(33)
```

```
Adresse Mail EMAIL char(80)
Téléphone TELEPHONE char(10)
Fax FAX char(10)
Portable PORTABLE char(10)
```

Dates et
informations
juridques

```
Date d'Ouverture DATE_OUV char(08) DATE Format
SSAAMMJJ
Date 1ère
Création
```

```
DATE_1_CRE char(08) DATE Format
SSAAMMJJ
Date de création DATE_CRE char(08) DATE Format
SSAAMMJJ
Adhésion Origine ADH_ORG char(08)
Date de
Cessation
d'activité
```

```
DATE_CESS char(08) DATE Format
SSAAMMJJ
```

```
Date MAJ DATE_MAJ_CESS char(08) DATE Format
SSAAMMJJ
Motif MOTIF_CESS char(02)
Type de Société TYPE_SOC char(4)
Forme Juridique FORME_JUR char(2)
Code Juridique CODE_JUR char(4)
SIRET SIRET char(14)
Indicateur NPAI NPAI char(1)
Type d'entité TYPE_ENTITE char(4)
Situation SITUATION char(2)
Code Etat CODE_ETAT char(2)
Département DEPT char(2)
Secteur
D'activité
```

```
SECT_ACT char(01)
```

```
VFIL VFIL char(01)
Transport Urbain TRANS_URBAIN char(01)
Chambre des
métiers
```

```
CHAMBRE_METIER char(4)
```

```
Transports
multiples
```

```
TRANS_MULTIPLES char(01)
```

```
Code NACE CODE_NACE char(05)
VIP VIP_VIP char(01)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 31 / 48
```

```
Référence Client
Siège
```

###### REFER_SIEGE

```
Date
d'attribution
```

```
DATE_ATTRIBUTION char(08) DATE Format
SSAAMMJJ
N° Gestion NUM_GESTION char(10)
Ville RC Actuelle VILLE_ACTUELLE char(05)
Effectif Géré EFFECIF char(06)
Date MAJ DATE_EFF_MAJ char(08) DATE Format
SSAAMMJJ
Date
d'enregistrement
```

```
DATE_ENREGISTREMENT char(08)
```

```
Ville RC Origine VILLE_ORIGINE char(05)
Numéro URSSAF NUMÉRO_URSSAF char(16)
Attestation
Capacité
```

```
ATTES_CAPACITÉ char(10)
```

```
Noemie NOEMIE char(01)
```

Divers Convention
collective

```
CONCOL char(30)
```

```
Syndicat SYNDICAT char(30)
```

```
Caisse CP CAISSE_CP char(12)
Caisse CADRE
TA
```

```
CAISSE_TA char(10)
```

```
Identifiant
CADRE TA
```

```
IDENTIFIANT_TA char(05)
```

```
Caisse CADRE
TB/TC
```

```
CAISSE_TB char(10)
```

```
Identifiant
CADRE TB/TC
```

```
IDENTIFIANT_TB char(05)
```

```
Caisse Non
Cadre
```

```
CAISSE_NC char(10)
```

```
Identifiant Non
Cadre
```

```
IDENTIFIANT_NC char(05)
```

```
Caisse
Prévoyance
Réglementaire
```

```
CAISSE_PR char(10)
```

```
Identifiant
Prévoyance
Réglementaire
```

```
IDENTIFIANT_PR char(05)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

##### DOSI Spécifications Édité le : 13/04/ SUIVI ADMINISTRATIF DES ENTREPRISES

```
Page 32 / 48
```

##### 4.2.3. Ecran « Libre-Service »

- Cet écran va permettre d’afficher toutes les informations
  o Bandeau Signalétique :
  ▪ Numéro d’entreprise, dénomination sociale, type d’entreprise, situation de l’entreprise
  o Les différents Libre-Service
  ▪ Référence
  ▪ Libellé
  ▪ Date d’envoi
- Table Cible **SDO*SAD* 03 \_LIBSER**

TYPE LIBELLE COLONNES DATA_TYPE

BANDEAU
ENTREPRISE

Numéro de firme IDF_NUMFIRME char(12) clé primaire
Dénomination Sociale DENSOC char(64)
Type TYPENT char(4)
Situation SITENT char(3)
LIBRE-SERVICE Numéro d'ordre NUMORD char(6)

```
Date de MAJ DATEMAJ char(8) Date
Format
SSAAMMJJ
Libre-Service LIBSER char(80)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 33 / 48
```

##### 4.2.4. Ecran « Prédécesseur - Successeur »

- Cet écran va permettre d’afficher toutes les informations
  o Bandeau Signalétique :
  ▪ Numéro d’entreprise, dénomination sociale, type d’entreprise, situation de l’entreprise
  o Les différents Prédécesseurs si le type de lien = « P » - Numéro d’entreprise du prédécesseur, - Dénomination sociale du prédécesseur, - Type de prédécesseur : Légal ou de Fait ou de Branche ou de Gérance, - La date
  o Les différents Successeurs si le type de lien = « S » - Numéro d’entreprise du successeur, - Dénomination sociale du successeur, - Type de successeur : Légal ou de Fait ou de Branche ou de Gérance, - La date
- Table Cible **SDO*SAD* 04 \_PRED_SUCC**

TYPE LIBELLE COLONNES DATA_TYPE CLE

BANDEAU
ENTREPRISE

```
Numéro de firme IDF_NUMFIRME char(12) Clé Primaire
Dénomination Sociale DENSOC char(64)
Type TYPENT char(4)
Situation SITENT char(3)
```

PREDECESSEUR /
SUCCESSEUR

```
Numéro de firme P/S IDF_NUMFIRME_PS char(12)
Type de Lien TYPE_P/S char(01)
Dénomination Sociale
P/S
```

```
DENSOC_PS char(64)
```

```
Légal Fait Branche
Gérance
```

```
L.F.B.G char(01)
```

```
Date DATE char(08) DATE
Format
SSAAMMJJ
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 34 / 48
```

#### 4.2.5. Ecran « Groupe d’appartenance »

```
o Bandeau Signalétique :
▪ Numéro d’entreprise, dénomination sociale, type d’entreprise, situation de l’entreprise
o Les différents Groupe d’appartenance
```

- Numéro d’entreprise du groupe,
- Dénomination sociale du prédécesseur,
- Type de groupe
- Pourcentage d’appartenance
- La date de début
- La date de fin
- Table Cible **SDO*SAD* 05 \_GROUPE**

TYPE LIBELLE COLONNES DATA_TYPE CLE

BANDEAU
ENTREPRISE

```
Numéro de firme IDF_NUMFIRME char(12)
Dénomination Sociale DENSOC char(64)
Type TYPENT char(4)
Situation SITENT char(3)
```

GROUPE
D’APPARTENANCE

```
Numéro de firme
Groupe
```

```
IDF_NUMFIRME_GP char(12)
```

```
Dénomination Sociale
Groupe
```

```
DENSOC_GP char(64)
```

```
Type TYPE char(1)
Pourcentage POURCENTAGE char(5)
Date Début DATE_DEBUT char(08) DATE
Format
SSAAMMJJ
Date Fin DATE_FIN char(08) DATE
Format
SSAAMMJJ
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 35 / 48
```

#### 4.2.6. Ecran « Liste Contrats »

- Cet écran va permettre d’afficher toutes les informations
  o Bandeau Signalétique :
  ▪ Numéro d’entreprise, dénomination sociale, type d’entreprise, situation de l’entreprise
  o Les différents Produits Contrats rattachés à la firme - Numéro de produit - Libellé - Catégorie Professionnelle - Date d’effet - Date de début de Présence de personnel - Date de fin de Présence de personnel - Motif
- Table Cible **SDO*SAD* 06 \_LISTE_CONTRATS**

TYPE LIBELLE COLONNES DATA_TYPE CLE

BANDEAU
ENTREPRISE

```
Numéro de
firme
```

```
IDF_NUMFIRME char(12) Primaire
```

```
Dénomination
Sociale
```

```
DENSOC char(64)
```

```
Type TYPENT char(4)
Situation SITENT char(3)
```

RENSEIGNEMENTS
CONTRATS

```
Produit NUM_PRODUIT char( 04 )
Libellé LIBELLE char(10)
Catégories
Professionnelles
```

```
CAT_PROF char(06)
```

```
Date d'effet DATE_EFFET char(08) DATE
Format
SSAAMMJJ
Date de Début
de présence de
personnel
```

```
DATE_DEBUT char(08) DATE
Format
SSAAMMJJ
Date de fin de
présence de
personnel
```

```
DATE_FIN char(08) DATE
Format
SSAAMMJJ
Motif MOTIF char(02)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 36 / 48
```

#### 4.2.7. Ecran « Renseignements Contrat »

- Cet écran va permettre d’afficher toutes les informations
  o Bandeau Signalétique :
  ▪ Numéro d’entreprise, dénomination sociale, type d’entreprise, situation de l’entreprise
  o Les différents renseignements liés au produit/contrat sélectionné - Numéro de contrat/produit - L’institution du contrat/produit, - Les catégories professionnelles, - Les catégories de convention, - La date d’effet - La date d’ouverture - L’effectif et la date de maj - La date de suspension - La date de fin de paiement - La date de résiliation - L’origine - L’organisme de gestion - La rétrocession - La période cotisée
  o Les différentes dates d’ouverture et de fermeture du contrat
- Date de début et la date de maj
- Date de fin et la date de maj
- Le motif de fin

Particularité pour cet écran : 2 tables

```
o Les renseignements du contrat sélectionné
o Les dates
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 37 / 48
```

- Table Cible **SDO*SAD* 07 \_CONTRAT**

TYPE LIBELLE COLONNES DATA_TYPE CLE

RENSEIGNEMENTS
ENTREPRISE

```
Numéro de firme IDF_NUMFIRME char(12) primaire
Dénomination Sociale DENSOC char(64)
Type TYPENT char(4)
Situation SITENT char(3)
```

RENSEIGNEMENTS
CONTRAT

```
Produit NUM_PRODUIT char( 04 )
Institution INSTITUTION char(20)
Catégories
Professionnelles
```

```
CAT_PROF char(06)
```

```
Convention Collective CAT_CCN char(06)
Date d'effet DATE_EFFET char(08) DATE Format
SSAAMMJJ
Date d'ouverture DATE_OUVERT char(08) DATE Format
SSAAMMJJ
Date de Suspension DATE_SUSP char(08) DATE Format
SSAAMMJJ
Date Fin de Paiement DATE_PAIE char(08) DATE Format
SSAAMMJJ
Date de résiliation DATE_RES char(08) DATE Format
SSAAMMJJ
Effectif EFFECTIF char(06)
Date MAJ DATE_EFF_MAJ char(08) DATE Format
SSAAMMJJ
Origine ORIGINE char(02)
Organisme de gestion ORG_GESTION char(02)
Retrocession RETROC char(03)
Période Cotisée PER_COT
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 38 / 48
```

- Table Cible **SDO*SAD* 08 \_DATES**

TYPE LIBELLE COLONNES DATA_TYPE CLE

RENSEIGNEMENT Numéro de firme IDF_NUMFIRME char(12) primaire

```
Produit NUM_PRODUIT char( 04 ) primaire
```

###### RENSEIGNEMENTS

###### DATE

```
Date de Début de
présence de
personnel
```

```
DATE_DEBUT char(08) Date format
SSAAMMJ
```

```
Date MAJ DATE_DEBUT_MAJ char(08) Date format
SSAAMMJ
Date de fin de
présence de
personnel
```

```
DATE_FIN char(08) Date format
SSAAMMJ
```

```
Date MAJ DATE_DEBUT_FIN char(08) Date format
SSAAMMJ
Motif MOTIF char(02)
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 39 / 48
```

# 4.3. MODELE CONCEPTUEL DE DONNEES ET CINEMATIQUE DES ECRANS

```
Comme la solution définie est de faire une table spécifique par écran, le modèle conceptuel de données et la
cinématique des écrans est identique :
```

```
11
```

```
1 n
1 n
```

```
1 n
```

```
Ecran Saisie Recherche Entreprise
SDO_SAD_01_RECHERCHE
IDF_NUMFIRME
DENSOC
SIREN
```

```
Ecran Renseignements Généraux de
Entreprise
SDO_SAD_02_RENSEIGNEMENTS
Clé primaire IDF_ NUMFIRME
```

**Ecran Libre-Service
STO_SAD_03_LIBSER**
Clé primaire IDF\_ NUMFIRME

```
1 ,n
```

```
Ecran
Prédécesseurs/Successeurs
STO_SAD_ 04 _PRD_SUCC
Clé primaire IDF_ NUMFIRME
```

```
Ecran Groupe
d’appartenance
STO_SAD_ 05 _GROUPE
Clé primaire IDF_ NUMFIRME
```

```
Ecran Liste Contrats
STO_SAD_ 06 _LISTE_CONTRAT
Clé primaire IDF_ NUMFIRME
```

```
Ecran Renseignements
Contrat
STO_SAD_ 07 _CONTRAT
Clé primaire IDF_ NUMFIRME
NUM_PRODUIT
```

```
STO_SAD_08_DATES
Clé primaire IDF_ NUMFIRME
NUM_PRODUIT
```

```
1 n
```

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 40 / 48
```

## 5. ANNEXES

###### 5.1. EXTRACTIONS POUR CONSTITUER LES TABLES CIBLES : SCHEMA USADE

#### 5.1.1. SDO_SAD_01_RECHERCHE

select
op.knumadh as "IDF_KNUMADH",
ns.densoc as "DENSOC",
op.siren as "SIREN",
se.adr_codpost as "CDPOST"
from tdsadop op
join tdsaden en on op.knumadh=en.knumadh
join tdsadrens ns on op.knumadh=ns.knumadh
and ns.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
join tdappadr pr
on pr.kident = op.knumadh
and pr.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
and pr.datanl = ' '
join tdadresse se
on se.knumadr = pr.knumadr
where op.sitent in ('DEF','PER')
order by op.knumadh;

Résultat 220 113 lignes

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 41 / 48
```

#### 5.1.2. SDO_SAD_02_RENSEIGNEMENTS

select
op.knumadh as "IDF_KNUMADH",
ns.densoc as "DENSOC",
ns.densoc1 as "DENSOC1",
se.adr_lig3 as "ADRESSE1",
trim(se.adr_numero || ' ' || se.adr_bister || ' ' ||se.adr_typevoie || ' ' ||se.adr_nomvoie) as
"ADRESSE2",
se.adr_lig4 as "ADRESSE3",
se.adr_lig5 as "ADRESSE4",
se.adr_codpost as "CDPOST",
se.adr_burdist as "VILLE",
se.adr_code_pays as "CODE_PAYS",
ns.dencou as "DENSOC_COURTE",
ns.sigle as "SIGLE",
ns.Enseig as "ENSEIGNE",
se.adr_boipost as "BOITE_POSTALE",
se.adr_codpost_cd as "CDPOST_CEDEX",
se.adr_burdist_cd as "VILLE_CEDEX",
ns.email as "EMAIL",
ns.numtel as "TELEPHONE",
ns.numfax as "FAX",
ns.numgsm as "PORTABLE",
en.datdos as "DATE_OUV",
en.datmaj_cr as "DATE_1_CRE",
en.datcre as "DATE_CRE",
en.orgadh as "ADH_ORG",
en.datces as "DATE_CESS",
en.datmaj_cs as "DATE_MAJ_CESS",
en.motces as "MOTIF_CESS",
en.typjur as "TYPE_SOC",
en.forjur as "FORME_JUR",
en.codjur as "CODE_JUR",
op.numsir as "SIRET",
op.typent as "TYPE_ENTITE",
op.sitent as "SITUATION",
en.codeta as "CODE_ETAT",
op.codgeo as "DEPT",
en.codsec as "SECT_ACT",
en.covfil as "VFIL",
en.codurb as "TRANS_URBAIN",
en.numcdm as "CHAMBRE_METIER",
en.codmul as "TRANS_MULTIPLES",
en.codnace as "CODE_NACE",
en.vipind as "VIP",
en.idensi as "REFER_SIEGE",
op.datsit as "DATE_ATTRIBUTION",

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 42 / 48
```

en.code_npai as "NPAI",
en.numreg as "NUM_GESTION",
en.comins_ac as "VILLE_ACTUELLE",
en.effent as "EFFECTIF",
en.datmaj_en as "DATE_EFF_MAJ",
en.datreg as "DATE_ENREGISTREMENT",
en.comins_or as "VILLE_ORIGINE",
en.numurs as "NUMERO_URSSAF",
en.attcap as "ATTES_CAPACITE",
en.codnoe as "NOEMIE",
trim (en.concol_01 ||''|| en.concol_02) as "CONCOL" ,
trim (en.nompat_01 ||''|| en.nompat_02) as "SYNDICAT" ,
en.numecp as "CAISSE_CP" ,
op.cairet_ta as "CAISSE_TA" ,
op.cainum_ta as "IDENTIFIANT_TA" ,
op.cairet_tb as "CAISSE_TB" ,
op.cainum_tb as "IDENTIFIANT_TB" ,
op.cairet_nc as "CAISSE_NC" ,
op.cainum_nc as "IDENTIFIANT_NC" ,
op.cairet_pr as "CAISSE_PR" ,
op.cainum_pr as "IDENTIFIANT_PR"
from tdsadop op
join tdsaden en on op.knumadh=en.knumadh
join tdsadrens ns
on ns.knumadh = op.knumadh
and ns.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
join tdappadr pr
on pr.kident = op.knumadh
and pr.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
and pr.datanl = ' '
join tdadresse se
on se.knumadr = pr.knumadr
where op.sitent in ('DEF','PER')
order by op.knumadh;

Résultat : 220 406 lignes

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 43 / 48
```

#### 5.1.3. SDO_SAD_03_LIBSER

###### SELECT \*

###### FROM (

###### SELECT

en.knumadh AS "IDF_NUMFIRME",
ns.densoc || ' ' || ns.densoc1 AS "DENOMINATION_SOCIALE",
op.typent AS "TYPE_ENTITE",
op.sitent AS "SITUATION",
ib.numord AS "NUMERO_ORDRE",
ib.datmaj AS "DATE_MAJ",
substr(ib.valibser,1,80) AS "LIBELLE",
ROW_NUMBER() OVER (
PARTITION BY en.knumadh
ORDER BY ib.knumadh DESC, ib.numord DESC
) AS rn
FROM tdsaden en
JOIN tdsadop op
ON op.knumadh = en.knumadh
LEFT JOIN tdsadrens ns
ON ns.knumadh = op.knumadh
LEFT JOIN tdsadlib ib
ON ib.knumadh = op.knumadh
where ns.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
and sitent in ('DEF','PER') and ib.valibser is not null
)

Résultat = 188 798 lignes

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 44 / 48
```

###### 5.1.4. SDO*SAD* 04 \_PRED_SUC

select
ps.knumadh as "NUMERO FIRME",
trim(ns_k.densoc || ' ' || nvl(ns_k.densoc1, '')) as "DENOMINATION SOCIALE",
op.typent as "TYPENT",
op.sitent as "SITENT",
ps.numadh as "NUMERO PRED/SUCC",
trim(ns_n.densoc || ' ' || nvl(ns_n.densoc1, '')) as "DENOMINATION SOCIALE P/S",
ps.typlie as "TYPE P/S",
ps.typleg as "L.F.B.G",
ps.datsuc as "DATE"
from tdsadop op
join tdsadps ps
on op.knumadh = ps.knumadh
left join tdsadrens ns_k
on ns_k.knumadh = ps.knumadh
and ns_k.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
left join tdsadrens ns_n
on ns_n.knumadh = ps.numadh
and ns_n.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
where op.sitent in ('DEF','PER')
order by ps.knumadh, ps.numadh;

Résultat : 63 091 lignes

#### 5.1.5. SDO_SAD_05_GROUPE

select
ap.knumadh as "NUMERO FIRME",
trim(ns_k.densoc || ' ' || nvl(ns_k.densoc1, '')) as "DENOMINATION SOCIALE",
op.typent as "TYPENT", op.sitent as "SITENT",
ap.numadh as "NUMERO GROUPE",
trim(ns_n.densoc || ' ' || nvl(ns_n.densoc1, '')) as "DENOMINATION SOCIALE GROUPE",
ap.typgro as "TYPE", ap.grapar as "POURCENTAGE", ap.datdeb as "DATE_DEB"
from tdsadop op
join tdsadap ap
on op.knumadh = ap.knumadh
left join tdsadrens ns_k
on ns_k.knumadh = ap.knumadh
and ns_k.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
left join tdsadrens ns_n
on ns_n.knumadh = ap.numadh
and ns_n.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
where op.sitent in ('DEF','PER') and ap.datfin = ' '
order by ap.knumadh, ap.numadh;

Résultat : 2420 lignes

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 45 / 48
```

###### 5.1.6. SDO*SAD* 05 \_LISTE_CONTRATS

select
tc.knumadh as "IDF_NUMFIRME",
trim(rens.densoc || ' ' || nvl(rens.densoc1, '')) as "DENSOC",
op.typent as "TYPENT", op.sitent as "SITENT",
tc.connum as "NUM_PRODUIT",
tc.condem as "LIBELLE",
trim(
tc.concat_01 || ' ' ||
tc.concat_02 || ' ' ||
tc.concat_03
) as "CAT_PROF",
tc.coneff as "DATE_EFFET",
tc.condeb as "DATE_DEBUT",
tc.confin as "DATE_FIN",
tc.conmot as "MOTIF"
from tdsadtc tc
join tdsadrens rens
on rens.knumadh = tc.knumadh and rens.typadr in ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
left join tdsadop op on tc.knumadh=op.knumadh
where tc.conreg not in ( '01','05','11') and op.sitent in ('DEF','PER' )
and tc.conmot not in ('ER','RC')
order by tc.knumadh, tc.connum;

Résultat : 482 07 6 lignes

#### 5.1.7. SDO_SAD_06_CONTRAT......................................................................................................

###### SELECT

op.knumadh AS "IDF_NUMFIRME",
TRIM(rens.densoc || ' ' || NVL(rens.densoc1, '')) AS "DENSOC",
op.typent AS "TYPENT",
op.sitent AS "SITENT",
tc.connum AS "NUM_PRODUIT",
tc.condem AS "LIBELLE",
tc.conreg AS "CODE",
pr.condsu AS "DATE_SUSP",
CASE pr.codins
WHEN '01' THEN 'CARCEPT PREVOYANCE'
WHEN '02' THEN 'OCIRP'
WHEN '03' THEN 'IPRIAC'
WHEN '04' THEN 'IPERCES'
WHEN '05' THEN 'FONGECFA'
WHEN '06' THEN 'AGECFA'
WHEN '08' THEN 'KLESIA PREVOYANCE'
WHEN '09' THEN 'MUTUELLE DO'
WHEN '13' THEN 'DOMISSIMO ASSURANCE'

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 46 / 48
```

###### END AS "INSTITUTION",

TRIM(tc.concat_01 || ' ' || tc.concat_02 || ' ' || tc.concat_03) AS "CAT_PROF",
TRIM(pr.catcnv_01 || ' ' || pr.catcnv_02 || ' ' || pr.catcnv_03) AS "CAT_CCN",
tc.coneff AS "EFFECTIF",
tc.condou AS "DATE_OUVERT",
pr.condsu AS "DATE_SUSP",
pr.conapa AS "DATE_PAIE",
pr.condre AS "DATE_RES",
tc.conper AS "PER_COT",
tc.datmaj AS "DATE_EFF_MAJ",
pr.conorg AS "ORIGINE",
pr.conges AS "ORG_GESTION",
pr.conret AS "RETROC"
FROM tdsadop op
JOIN tdsadrens rens
ON rens.knumadh = op.knumadh
AND rens.typadr IN ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
LEFT JOIN tdsadtc tc
ON tc.knumadh = op.knumadh
LEFT JOIN tdsadpr pr
ON pr.knumadh = tc.knumadh
AND pr.connum = tc.connum
WHERE op.typent IN ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
AND op.sitent IN ('DEF','PER')
AND tc.conreg not in ( '01','05','11')
AND tc.conmot NOT IN ('ER','RC')
ORDER BY op.knumadh, tc.connum;

Résultat : 482 076 lignes

```
5.1.8. SDO_SAD_ 07 _DATES
```

select
tc.knumadh as "IDF_NUMFIRME",
trim(rens.densoc || ' ' || nvl(rens.densoc1, '')) as "DENSOC",
op.typent as "TYPENT",
op.sitent as "SITENT",
tc.connum as "NUM_PRODUIT",
dc.condeb as "DATE_DEBUT",
dc.datmaj_de as "DATE_DEBUT_MAJ",
dc.confin as "DATE_FIN",
dc.datmaj_fi as "DATE_FIN_MAJ",
dc.conmot as "MOTIF"
FROM tdsadop op
JOIN tdsadrens rens
ON rens.knumadh = op.knumadh
AND rens.typadr IN ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
LEFT JOIN tdsadtc tc

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 47 / 48
```

ON tc.knumadh = op.knumadh
LEFT JOIN tdsaddc dc
ON dc.knumadh = tc.knumadh
AND dc.connum = tc.connum
WHERE op.typent IN ('ENTR','GRP','ETAB','CARC','ECOL','BANQ')
AND op.sitent IN ('DEF','PER')
AND tc.conreg not in ( '01','05','11')
AND tc.conmot NOT IN ('ER','RC')
ORDER BY op.knumadh, tc.connum;

Résultat : 527 115 lignes

# SARCOPHAGE SIDO

# Domaine SADE

# SUIVI ADMINISTRATIF DES ENTREPRISES

## DOSI Spécifications Édité le^ : 13/04/2026^

```
Page 48 / 48
```
