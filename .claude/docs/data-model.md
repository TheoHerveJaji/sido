# SIDO Sarcophage — Modèle de données

## Tables de gestion (READ/WRITE)

### SDO_DOMAINS
Domaines métier de l'application (SOTREL, SADE, IFA, etc.).
- `id`, `code` (UNIQUE), `label`, `description`, `is_active`, `route`, `icon`

### SDO_USERS
Utilisateurs synchronisés depuis Entra ID.
- `id`, `entra_id` (UNIQUE), `email` (UNIQUE), `display_name`, `role` (ADMIN/USER), `is_active`, `last_login`

### SDO_USER_DOMAINS
Association N-N utilisateurs ↔ domaines.
- `user_id` → SDO_USERS, `domain_id` → SDO_DOMAINS, `granted_by`, `granted_at`

### SDO_LOGS
Logs de connexion et d'accès.
- `user_id`, `action` (LOGIN/LOGOUT/SESSION_EXPIRED/ACCESS_DENIED), `ip_address`, `user_agent`, `details`

## Tables métier SOTREL (READ-ONLY)

| Table | Description | Clé primaire |
|-------|-------------|-------------|
| SDO_SOT_01_RECHERCHE | Résultats de recherche | IDF_NODOSS |
| SDO_SOT_02_RG_ASSURE | Renseignements généraux | IDF_NODOSSIER |
| SDO_SOT_03_CAPITAL | Calcul du capital décès | IDF_NODOSSIER |
| SDO_SOT_04_COURRIER | Courriers du dossier | IDF_NODOSSIER (multi-lignes) |
| SDO_SOT_05_FONDS | Demandes de fonds | IDF_NODOSSIER (multi-lignes) |
| SDO_SOT_06_LISTE_BENEF | Liste bénéficiaires (résumé) | IDF_NODOSSIER + IDF_NOBENEF |
| SDO_SOT_07_BENEF | Détail bénéficiaire | IDF_NODOSSIER + NUM_BENEF |
| SDO_SOT_08_DESIGNATION | Désignation bénéficiaires | IDF_NODOSSIER (multi-lignes) |

## Règle stricte
Les tables `SDO_SOT_*` sont en **lecture seule**. Aucun INSERT/UPDATE/DELETE n'est autorisé.
