/* ══════════════════════════════════════════════════
   GET /api/sotrel/[nodossier]/rg
   Renseignements généraux de l'assuré (SDO_SOT_02)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const nodossier = getRouterParam(event, 'nodossier')
  if (!nodossier) throw createError({ statusCode: 400, message: 'N° dossier requis' })

  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_SOT_02_RG_ASSURE WHERE IDF_NODOSSIER = ?',
      [nodossier],
    )
    return { data: rows[0] ?? null }
  }
  catch (err) {
    console.error('[API SOTREL rg]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
