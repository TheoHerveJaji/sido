/**
 * SDO_USER_DOMAINS — Associations utilisateurs-domaines
 */
export const MOCK_USER_DOMAINS = [
  // Gestionnaire 1 (id:2) → SOTREL
  { id: 1, user_id: 2, domain_id: 1, granted_at: '2026-01-15T00:00:00', granted_by: 1 },
  // Gestionnaire 2 (id:3) → SOTREL
  { id: 2, user_id: 3, domain_id: 1, granted_at: '2026-01-20T00:00:00', granted_by: 1 },
  // Gestionnaire 3 (id:4) → inactif, pas de domaine
]
