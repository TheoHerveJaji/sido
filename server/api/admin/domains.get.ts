/* ══════════════════════════════════════════════════
   GET /api/admin/domains
   Liste tous les domaines disponibles
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_DOMAINS ORDER BY code',
    )
    return { data: rows, total: rows.length }
  }
  catch (err) {
    console.error('[API admin/domains]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
