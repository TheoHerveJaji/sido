/**
 * SDO_USERS — Utilisateurs de l'application
 */
export const MOCK_USERS = [
  {
    id:           1,
    entra_id:     'mock-admin-entra-id-001',
    email:        'admin@klesia.fr',
    display_name: 'Administrateur SIDO',
    role:         'ADMIN',
    is_active:    true,
    last_login:   '2026-03-19T08:30:00',
    created_at:   '2026-01-01T00:00:00',
    updated_at:   '2026-03-19T08:30:00',
  },
  {
    id:           2,
    entra_id:     'mock-user-entra-id-002',
    email:        'gestionnaire1@klesia.fr',
    display_name: 'Marie Dupont',
    role:         'USER',
    is_active:    true,
    last_login:   '2026-03-18T14:15:00',
    created_at:   '2026-01-15T00:00:00',
    updated_at:   '2026-03-18T14:15:00',
  },
  {
    id:           3,
    entra_id:     'mock-user-entra-id-003',
    email:        'gestionnaire2@klesia.fr',
    display_name: 'Pierre Martin',
    role:         'USER',
    is_active:    true,
    last_login:   '2026-03-17T10:00:00',
    created_at:   '2026-01-20T00:00:00',
    updated_at:   '2026-03-17T10:00:00',
  },
  {
    id:           4,
    entra_id:     'mock-user-entra-id-004',
    email:        'gestionnaire3@klesia.fr',
    display_name: 'Sophie Bernard',
    role:         'USER',
    is_active:    false,
    last_login:   '2026-02-10T09:00:00',
    created_at:   '2026-01-25T00:00:00',
    updated_at:   '2026-02-10T09:00:00',
  },
]
