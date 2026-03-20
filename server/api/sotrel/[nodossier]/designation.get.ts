/* ══════════════════════════════════════════════════
   GET /api/sotrel/[nodossier]/designation
   Désignation de bénéficiaires (SDO_SOT_08_DESIGNATION)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const nodossier = getRouterParam(event, 'nodossier')
  if (!nodossier) throw createError({ statusCode: 400, message: 'N° dossier requis' })

  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_SOT_08_DESIGNATION WHERE IDF_NODOSSIER = ?',
      [nodossier],
    )
    return { data: rows, total: rows.length }
  }
  catch (err) {
    console.error('[API SOTREL designation]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
