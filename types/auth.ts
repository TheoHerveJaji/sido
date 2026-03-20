/* ══════════════════════════════════════════════════
   Types liés à l'authentification Entra ID / MSAL
   ══════════════════════════════════════════════════ */

import type { AccountInfo } from '@azure/msal-browser'

/** Rôle applicatif — lu depuis le claim "roles" du token Entra ID */
export type AuthRole = 'ADMIN' | 'USER'

/** Utilisateur MSAL enrichi avec les claims utiles */
export interface MsalUser extends AccountInfo {
  roles?: string[]
}

/** Enregistrement utilisateur en base (SDO_USERS) */
export interface UserRecord {
  id: number
  entra_id: string
  email: string
  display_name: string | null
  role: AuthRole
  is_active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

/** Domaine applicatif (SDO_DOMAINS) */
export interface DomainRecord {
  id: number
  code: string
  label: string
  description: string | null
  is_active: boolean
  route: string | null
  icon: string | null
  created_at: string
  updated_at: string
}

/** Attribution domaine ↔ utilisateur (SDO_USER_DOMAINS) */
export interface UserDomainRecord {
  id: number
  user_id: number
  domain_id: number
  granted_at: string
  granted_by: number | null
}

/** Log de connexion / accès (SDO_LOGS) */
export interface LogRecord {
  id: number
  user_id: number | null
  entra_id: string | null
  email: string | null
  action: 'LOGIN' | 'LOGOUT' | 'SESSION_EXPIRED' | 'ACCESS_DENIED'
  ip_address: string | null
  user_agent: string | null
  details: string | null
  created_at: string
}

/** Réponse de l'API /api/auth/sync */
export interface AuthSyncResponse {
  user: UserRecord
  domains: string[]
}
