/* ══════════════════════════════════════════════════
   GET /api/admin/users/[id]
   Détail d'un utilisateur avec ses domaines
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'ID requis' })

  const db = getPool()
  try {
    const [users] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_USERS WHERE id = ?',
      [id],
    )
    if (!users[0]) throw createError({ statusCode: 404, message: 'Utilisateur non trouvé' })

    // Récupérer les domaines
    const [domains] = await db.query<RowDataPacket[]>(
      `SELECT d.* FROM SDO_USER_DOMAINS ud
       JOIN SDO_DOMAINS d ON d.id = ud.domain_id
       WHERE ud.user_id = ?`,
      [id],
    )

    return { data: { ...users[0], domains: domains.map((d: RowDataPacket) => d.code) } }
  }
  catch (err: any) {
    if (err.statusCode) throw err
    console.error('[API admin/users/[id]]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
