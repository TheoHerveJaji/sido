/* ══════════════════════════════════════════════════════════════
   Pool MySQL singleton — identique au pattern du POC CXS
   Tous les endpoints server/api/ utilisent getPool() pour
   obtenir la connexion et exécuter des requêtes.
   ══════════════════════════════════════════════════════════════ */

import mysql from 'mysql2/promise'
import type { Pool, RowDataPacket } from 'mysql2/promise'
import { getMockPool } from './db.mock'

let pool: Pool | null = null

/**
 * Retourne le pool MySQL singleton.
 * Créé à la première invocation avec les paramètres de runtimeConfig.
 * Si USE_MOCK=true, retourne un pool mocké sans connexion MySQL.
 */
export function getPool(): Pool {
  if (process.env.USE_MOCK === 'true') {
    return getMockPool() as unknown as Pool
  }

  if (!pool) {
    const config = useRuntimeConfig()
    pool = mysql.createPool({
      host: config.dbHost,
      port: Number(config.dbPort) || 3306,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }
  return pool
}

/**
 * Exécute une requête paginée et retourne les données + le total.
 * Utilisé pour toutes les LcTable avec pagination serveur.
 *
 * @param baseQuery  - Requête SELECT sans LIMIT/OFFSET (ex: "SELECT * FROM TABLE WHERE ...")
 * @param params     - Paramètres de la requête (pour les ?)
 * @param page       - Page courante (1-indexed)
 * @param limit      - Nombre de lignes par page
 * @param sortBy     - Colonne de tri (optionnel)
 * @param sortType   - Direction du tri : 'asc' | 'desc' (optionnel)
 */
export async function executePagedQuery<T extends RowDataPacket>(
  baseQuery: string,
  params: unknown[],
  page: number = 1,
  limit: number = 25,
  sortBy?: string,
  sortType?: string,
): Promise<{ data: T[]; total: number }> {
  const db = getPool()

  // Sécurisation du tri — whitelist les directions autorisées
  const direction = sortType?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'

  // Requête COUNT pour le total
  const countQuery = `SELECT COUNT(*) as total FROM (${baseQuery}) as countQuery`
  const [countRows] = await db.query<RowDataPacket[]>(countQuery, params)
  const total = countRows[0]?.total ?? 0

  // Ajout du ORDER BY si spécifié (la colonne est validée côté appelant)
  let pagedQuery = baseQuery
  if (sortBy) {
    // Protection contre l'injection SQL : on n'autorise que les caractères alphanumériques et _
    const safeSortBy = sortBy.replace(/[^a-zA-Z0-9_]/g, '')
    pagedQuery += ` ORDER BY ${safeSortBy} ${direction}`
  }

  // Ajout LIMIT / OFFSET
  const offset = (page - 1) * limit
  pagedQuery += ' LIMIT ? OFFSET ?'
  const pagedParams = [...params, limit, offset]

  const [rows] = await db.query<T[]>(pagedQuery, pagedParams)

  return { data: rows, total }
}
