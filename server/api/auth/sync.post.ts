/* ══════════════════════════════════════════════════════════════
   POST /api/auth/sync
   Synchronise l'utilisateur Entra ID en base de données.
   Appelé après chaque loginPopup réussi.
   - Crée l'utilisateur s'il n'existe pas (INSERT)
   - Met à jour last_login et display_name (ON DUPLICATE KEY UPDATE)
   - Retourne l'utilisateur + ses domaines autorisés
   ══════════════════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

interface SyncBody {
  entra_id: string
  email: string
  display_name: string
  roles: string[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SyncBody>(event)

  if (!body.entra_id || !body.email) {
    throw createError({ statusCode: 400, message: 'entra_id et email requis' })
  }

  const db = getPool()

  try {
    // Déterminer le rôle depuis les claims Entra ID
    const role = body.roles?.includes('SIDO_ADMIN') ? 'ADMIN' : 'USER'

    // Upsert de l'utilisateur
    await db.query(
      `INSERT INTO SDO_USERS (entra_id, email, display_name, role, last_login)
       VALUES (?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
         display_name = VALUES(display_name),
         role = VALUES(role),
         last_login = NOW(),
         updated_at = NOW()`,
      [body.entra_id, body.email, body.display_name, role],
    )

    // Récupérer l'utilisateur mis à jour
    const [users] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_USERS WHERE entra_id = ?',
      [body.entra_id],
    )
    const user = users[0]

    if (!user) {
      throw createError({ statusCode: 500, message: 'Erreur lors de la synchronisation utilisateur' })
    }

    // Récupérer les domaines autorisés
    const [domainRows] = await db.query<RowDataPacket[]>(
      `SELECT d.code
       FROM SDO_USER_DOMAINS ud
       JOIN SDO_DOMAINS d ON d.id = ud.domain_id
       WHERE ud.user_id = ? AND d.is_active = TRUE`,
      [user.id],
    )
    const domains = domainRows.map((r: RowDataPacket) => r.code)

    // Log de connexion
    await db.query(
      `INSERT INTO SDO_LOGS (user_id, entra_id, email, action, ip_address, user_agent)
       VALUES (?, ?, ?, 'LOGIN', ?, ?)`,
      [
        user.id,
        body.entra_id,
        body.email,
        getRequestIP(event) ?? null,
        getHeader(event, 'user-agent') ?? null,
      ],
    )

    return { user, domains }
  }
  catch (err: any) {
    if (err.statusCode) throw err
    console.error('[API auth/sync]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur lors de la synchronisation' })
  }
})
