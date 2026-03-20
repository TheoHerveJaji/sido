/* ══════════════════════════════════════════════════
   GET /api/admin/users
   Liste paginée des utilisateurs avec leurs domaines
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool, executePagedQuery } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 25
  const search = (query.search as string)?.trim() || ''
  const sortBy = (query.sortBy as string) || 'display_name'
  const sortType = (query.sortType as string) || 'asc'

  const conditions: string[] = []
  const params: unknown[] = []

  if (search) {
    conditions.push('(u.email LIKE ? OR u.display_name LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  const baseQuery = `SELECT u.* FROM SDO_USERS u ${whereClause}`

  try {
    const result = await executePagedQuery<RowDataPacket>(baseQuery, params, page, limit, sortBy, sortType)

    // Enrichir chaque utilisateur avec ses domaines
    const db = getPool()
    for (const user of result.data) {
      const [domains] = await db.query<RowDataPacket[]>(
        `SELECT d.code FROM SDO_USER_DOMAINS ud
         JOIN SDO_DOMAINS d ON d.id = ud.domain_id
         WHERE ud.user_id = ?`,
        [user.id],
      )
      user.domains = domains.map((d: RowDataPacket) => d.code)
    }

    return result
  }
  catch (err) {
    console.error('[API admin/users]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
