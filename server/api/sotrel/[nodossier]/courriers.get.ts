/* ══════════════════════════════════════════════════
   GET /api/sotrel/[nodossier]/courriers
   Courriers du dossier (SDO_SOT_04_COURRIER)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const nodossier = getRouterParam(event, 'nodossier')
  if (!nodossier) throw createError({ statusCode: 400, message: 'N° dossier requis' })

  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_SOT_04_COURRIER WHERE IDF_NODOSSIER = ? ORDER BY DATE_COURRIER DESC',
      [nodossier],
    )
    return { data: rows, total: rows.length }
  }
  catch (err) {
    console.error('[API SOTREL courriers]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
