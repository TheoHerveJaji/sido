/* ══════════════════════════════════════════════════
   GET /api/sotrel/[nodossier]/capital
   Calcul du capital décès (SDO_SOT_03_CAPITAL)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const nodossier = getRouterParam(event, 'nodossier')
  if (!nodossier) throw createError({ statusCode: 400, message: 'N° dossier requis' })

  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_SOT_03_CAPITAL WHERE IDF_NODOSSIER = ?',
      [nodossier],
    )
    return { data: rows[0] ?? null }
  }
  catch (err) {
    console.error('[API SOTREL capital]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
