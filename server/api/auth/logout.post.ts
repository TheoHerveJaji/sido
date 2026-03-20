/* ══════════════════════════════════════════════════
   POST /api/auth/logout
   Enregistre le log de déconnexion dans SDO_LOGS
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

interface LogoutBody {
  reason: 'LOGOUT' | 'SESSION_EXPIRED'
  email?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LogoutBody>(event)
  const db = getPool()

  try {
    // Retrouver l'utilisateur par email si fourni
    let userId: number | null = null
    let entraId: string | null = null

    if (body.email) {
      const [users] = await db.query<RowDataPacket[]>(
        'SELECT id, entra_id FROM SDO_USERS WHERE email = ?',
        [body.email],
      )
      if (users[0]) {
        userId = users[0].id
        entraId = users[0].entra_id
      }
    }

    await db.query(
      `INSERT INTO SDO_LOGS (user_id, entra_id, email, action, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        entraId,
        body.email ?? null,
        body.reason ?? 'LOGOUT',
        getRequestIP(event) ?? null,
        getHeader(event, 'user-agent') ?? null,
      ],
    )

    return { success: true }
  }
  catch (err) {
    console.error('[API auth/logout]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
