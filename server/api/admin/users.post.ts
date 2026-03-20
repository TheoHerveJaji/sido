/* ══════════════════════════════════════════════════
   POST /api/admin/users
   Création manuelle d'un utilisateur par un admin
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

interface CreateUserBody {
  email: string
  display_name: string
  role: 'ADMIN' | 'USER'
  domains: string[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserBody>(event)
  if (!body.email) throw createError({ statusCode: 400, message: 'Email requis' })

  const db = getPool()
  try {
    // Créer l'utilisateur
    const [result] = await db.query<any>(
      `INSERT INTO SDO_USERS (entra_id, email, display_name, role)
       VALUES (?, ?, ?, ?)`,
      [body.email, body.email, body.display_name || body.email, body.role || 'USER'],
    )
    const userId = result.insertId

    // Attribuer les domaines
    if (body.domains?.length) {
      for (const code of body.domains) {
        const [domainRows] = await db.query<RowDataPacket[]>(
          'SELECT id FROM SDO_DOMAINS WHERE code = ?',
          [code],
        )
        if (domainRows[0]) {
          await db.query(
            'INSERT IGNORE INTO SDO_USER_DOMAINS (user_id, domain_id) VALUES (?, ?)',
            [userId, domainRows[0].id],
          )
        }
      }
    }

    return { success: true, id: userId }
  }
  catch (err) {
    console.error('[API admin/users POST]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
