/* ══════════════════════════════════════════════════
   GET /api/admin/logs
   Logs paginés avec filtres date et action
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { executePagedQuery } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 25
  const sortBy = (query.sortBy as string) || 'created_at'
  const sortType = (query.sortType as string) || 'desc'
  const action = (query.action as string)?.trim() || ''
  const dateFrom = (query.dateFrom as string) || ''
  const dateTo = (query.dateTo as string) || ''

  const conditions: string[] = []
  const params: unknown[] = []

  if (action) {
    conditions.push('l.action = ?')
    params.push(action)
  }
  if (dateFrom) {
    conditions.push('l.created_at >= ?')
    params.push(dateFrom)
  }
  if (dateTo) {
    conditions.push('l.created_at <= ?')
    params.push(`${dateTo} 23:59:59`)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const baseQuery = `
    SELECT l.*, u.display_name
    FROM SDO_LOGS l
    LEFT JOIN SDO_USERS u ON u.id = l.user_id
    ${whereClause}
  `

  try {
    return await executePagedQuery<RowDataPacket>(baseQuery, params, page, limit, sortBy, sortType)
  }
  catch (err) {
    console.error('[API admin/logs]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
