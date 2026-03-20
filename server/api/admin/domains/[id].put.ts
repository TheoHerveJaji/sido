/* ══════════════════════════════════════════════════
   PUT /api/admin/domains/[id]
   Mise à jour d'un domaine (label, description, icon, is_active)
   ══════════════════════════════════════════════════ */

import { getPool } from '~/server/utils/db'

interface UpdateDomainBody {
  label?: string
  description?: string
  icon?: string
  is_active?: boolean
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'ID requis' })

  const body = await readBody<UpdateDomainBody>(event)
  const db = getPool()

  try {
    const updates: string[] = []
    const params: unknown[] = []

    if (body.label !== undefined) { updates.push('label = ?'); params.push(body.label) }
    if (body.description !== undefined) { updates.push('description = ?'); params.push(body.description) }
    if (body.icon !== undefined) { updates.push('icon = ?'); params.push(body.icon) }
    if (body.is_active !== undefined) { updates.push('is_active = ?'); params.push(body.is_active) }

    if (updates.length === 0) {
      return { success: true, message: 'Aucune modification' }
    }

    params.push(id)
    await db.query(
      `UPDATE SDO_DOMAINS SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
      params,
    )

    return { success: true }
  }
  catch (err) {
    console.error('[API admin/domains/[id] PUT]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
