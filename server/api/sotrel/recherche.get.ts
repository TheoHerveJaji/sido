/* ══════════════════════════════════════════════════════════════
   GET /api/sotrel/recherche
   Recherche paginée dans SDO_SOT_01_RECHERCHE
   Filtres : noss (N° SS), nom, nodoss (N° Dossier)
   Au moins un critère requis côté client.
   ══════════════════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { executePagedQuery } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const noss = (query.noss as string)?.trim() || ''
  const nom = (query.nom as string)?.trim() || ''
  const nodoss = (query.nodoss as string)?.trim() || ''
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 25
  const sortBy = (query.sortBy as string) || 'NOM'
  const sortType = (query.sortType as string) || 'asc'

  // Construction dynamique de la clause WHERE
  const conditions: string[] = []
  const params: unknown[] = []

  if (noss) {
    conditions.push('IDF_NOSS LIKE ?')
    params.push(`%${noss}%`)
  }
  if (nom) {
    conditions.push('NOM LIKE ?')
    params.push(`%${nom}%`)
  }
  if (nodoss) {
    conditions.push('IDF_NODOSSIER LIKE ?')
    params.push(`%${nodoss}%`)
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : ''

  const baseQuery = `SELECT * FROM SDO_SOT_01_RECHERCHE ${whereClause}`

  try {
    const result = await executePagedQuery<RowDataPacket>(
      baseQuery,
      params,
      page,
      limit,
      sortBy,
      sortType,
    )

    return result
  }
  catch (err) {
    console.error('[API sotrel/recherche]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
