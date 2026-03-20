/**
 * SDO_LOGS — Logs d'activité
 */
export const MOCK_LOGS = [
  { id: 1,  user_id: 1, entra_id: 'mock-admin-entra-id-001', email: 'admin@klesia.fr',         action: 'LOGIN',           ip_address: '192.168.1.10', user_agent: 'Mozilla/5.0 Chrome',  details: null,                     created_at: '2026-03-19T08:30:00' },
  { id: 2,  user_id: 2, entra_id: 'mock-user-entra-id-002',  email: 'gestionnaire1@klesia.fr', action: 'LOGIN',           ip_address: '192.168.1.11', user_agent: 'Mozilla/5.0 Firefox', details: null,                     created_at: '2026-03-18T14:15:00' },
  { id: 3,  user_id: 2, entra_id: 'mock-user-entra-id-002',  email: 'gestionnaire1@klesia.fr', action: 'LOGOUT',          ip_address: '192.168.1.11', user_agent: 'Mozilla/5.0 Firefox', details: null,                     created_at: '2026-03-18T18:00:00' },
  { id: 4,  user_id: 3, entra_id: 'mock-user-entra-id-003',  email: 'gestionnaire2@klesia.fr', action: 'LOGIN',           ip_address: '192.168.1.12', user_agent: 'Mozilla/5.0 Chrome',  details: null,                     created_at: '2026-03-17T10:00:00' },
  { id: 5,  user_id: 3, entra_id: 'mock-user-entra-id-003',  email: 'gestionnaire2@klesia.fr', action: 'SESSION_EXPIRED', ip_address: '192.168.1.12', user_agent: 'Mozilla/5.0 Chrome',  details: 'Inactivité 30 min',      created_at: '2026-03-17T10:31:00' },
  { id: 6,  user_id: 4, entra_id: 'mock-user-entra-id-004',  email: 'gestionnaire3@klesia.fr', action: 'ACCESS_DENIED',   ip_address: '192.168.1.13', user_agent: 'Mozilla/5.0 Edge',    details: 'Compte désactivé',       created_at: '2026-03-16T09:00:00' },
  { id: 7,  user_id: 1, entra_id: 'mock-admin-entra-id-001', email: 'admin@klesia.fr',         action: 'LOGIN',           ip_address: '192.168.1.10', user_agent: 'Mozilla/5.0 Chrome',  details: null,                     created_at: '2026-03-15T09:00:00' },
  { id: 8,  user_id: 1, entra_id: 'mock-admin-entra-id-001', email: 'admin@klesia.fr',         action: 'LOGOUT',          ip_address: '192.168.1.10', user_agent: 'Mozilla/5.0 Chrome',  details: null,                     created_at: '2026-03-15T18:00:00' },
  { id: 9,  user_id: 2, entra_id: 'mock-user-entra-id-002',  email: 'gestionnaire1@klesia.fr', action: 'LOGIN',           ip_address: '192.168.1.11', user_agent: 'Mozilla/5.0 Firefox', details: null,                     created_at: '2026-03-14T08:45:00' },
  { id: 10, user_id: 2, entra_id: 'mock-user-entra-id-002',  email: 'gestionnaire1@klesia.fr', action: 'SESSION_EXPIRED', ip_address: '192.168.1.11', user_agent: 'Mozilla/5.0 Firefox', details: 'Inactivité 30 min',      created_at: '2026-03-14T09:16:00' },
  { id: 11, user_id: 3, entra_id: 'mock-user-entra-id-003',  email: 'gestionnaire2@klesia.fr', action: 'LOGIN',           ip_address: '192.168.1.12', user_agent: 'Mozilla/5.0 Chrome',  details: null,                     created_at: '2026-03-13T10:30:00' },
  { id: 12, user_id: 3, entra_id: 'mock-user-entra-id-003',  email: 'gestionnaire2@klesia.fr', action: 'LOGOUT',          ip_address: '192.168.1.12', user_agent: 'Mozilla/5.0 Chrome',  details: null,                     created_at: '2026-03-13T17:45:00' },
  { id: 13, user_id: 1, entra_id: 'mock-admin-entra-id-001', email: 'admin@klesia.fr',         action: 'LOGIN',           ip_address: '10.0.0.50',    user_agent: 'Mozilla/5.0 Safari',  details: 'Accès VPN',              created_at: '2026-03-12T07:00:00' },
  { id: 14, user_id: 1, entra_id: 'mock-admin-entra-id-001', email: 'admin@klesia.fr',         action: 'LOGOUT',          ip_address: '10.0.0.50',    user_agent: 'Mozilla/5.0 Safari',  details: null,                     created_at: '2026-03-12T19:30:00' },
  { id: 15, user_id: 4, entra_id: 'mock-user-entra-id-004',  email: 'gestionnaire3@klesia.fr', action: 'LOGIN',           ip_address: '192.168.1.13', user_agent: 'Mozilla/5.0 Edge',    details: null,                     created_at: '2026-02-10T09:00:00' },
  { id: 16, user_id: 4, entra_id: 'mock-user-entra-id-004',  email: 'gestionnaire3@klesia.fr', action: 'LOGOUT',          ip_address: '192.168.1.13', user_agent: 'Mozilla/5.0 Edge',    details: 'Déconnexion manuelle',   created_at: '2026-02-10T09:05:00' },
]
