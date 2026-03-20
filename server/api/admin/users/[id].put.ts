/* ══════════════════════════════════════════════════
   PUT /api/admin/users/[id]
   Mise à jour rôle, domaines et statut actif
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from 'mysql2'
import { getPool } from '~/server/utils/db'

interface UpdateUserBody {
  role?: 'ADMIN' | 'USER'
  is_active?: boolean
  domains?: string[]
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, message: 'ID requis' })

  const body = await readBody<UpdateUserBody>(event)
  const db = getPool()

  try {
    // Mettre à jour le rôle et le statut
    const updates: string[] = []
    const params: unknown[] = []

    if (body.role !== undefined) {
      updates.push('role = ?')
      params.push(body.role)
    }
    if (body.is_active !== undefined) {
      updates.push('is_active = ?')
      params.push(body.is_active)
    }

    if (updates.length > 0) {
      params.push(id)
      await db.query(
        `UPDATE SDO_USERS SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`,
        params,
      )
    }

    // Mettre à jour les domaines si fournis
    if (body.domains !== undefined) {
      // Supprimer les anciens
      await db.query('DELETE FROM SDO_USER_DOMAINS WHERE user_id = ?', [id])

      // Insérer les nouveaux
      for (const code of body.domains) {
        const [domainRows] = await db.query<RowDataPacket[]>(
          'SELECT id FROM SDO_DOMAINS WHERE code = ?',
          [code],
        )
        if (domainRows[0]) {
          await db.query(
            'INSERT INTO SDO_USER_DOMAINS (user_id, domain_id, granted_by) VALUES (?, ?, NULL)',
            [id, domainRows[0].id],
          )
        }
      }
    }

    return { success: true }
  }
  catch (err) {
    console.error('[API admin/users/[id] PUT]', err)
    throw createError({ statusCode: 500, message: 'Erreur serveur' })
  }
})
