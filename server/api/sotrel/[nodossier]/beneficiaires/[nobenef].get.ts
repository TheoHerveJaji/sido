/* ══════════════════════════════════════════════════
   GET /api/sotrel/[nodossier]/beneficiaires/[nobenef]
   Détail d'un bénéficiaire (SDO_SOT_07_BENEF)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const nodossier = getRouterParam(event, 'nodossier')
  const nobenef = getRouterParam(event, 'nobenef')

  if (!nodossier) throw createError({ statusCode: 400, message: 'N° dossier requis' })
  if (!nobenef) throw createError({ statusCode: 400, message: 'N° bénéficiaire requis' })

  const db = getPool()
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM SDO_SOT_07_BENEF WHERE IDF_NODOSSIER = ? AND NUM_BENEF = ?',
      [nodossier, nobenef],
    )
    return { data: rows[0] ?? null }
  }
  catch (err) {
    console.error('[API SOTREL beneficiaire detail]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
