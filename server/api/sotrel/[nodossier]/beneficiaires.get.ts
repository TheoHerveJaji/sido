/* ══════════════════════════════════════════════════
   GET /api/sotrel/[nodossier]/beneficiaires
   Liste des bénéficiaires (SDO_SOT_06_LISTE_BENEF)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const nodossier = getRouterParam(event, 'nodossier')
  if (!nodossier) throw createError({ statusCode: 400, message: 'N° dossier requis' })

  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_SOT_06_LISTE_BENEF WHERE IDF_NODOSSIER = ?',
      [nodossier],
    )
    return { data: rows, total: rows.length }
  }
  catch (err) {
    console.error('[API SOTREL beneficiaires]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
