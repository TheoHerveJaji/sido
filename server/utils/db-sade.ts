/* ══════════════════════════════════════════════════════════════
   Pool MySQL singleton pour le domaine SADE
   Même pattern que db.ts — pool dédié à la base SDO_SARCOPHAGE_SADE
   ══════════════════════════════════════════════════════════════ */

import mysql from "mysql2/promise";
import type { Pool, RowDataPacket } from "mysql2/promise";
import { getMockPool } from "./db.mock";

let poolSade: Pool | null = null;

/**
 * Retourne le pool MySQL singleton SADE.
 * Créé à la première invocation avec les paramètres de runtimeConfig.
 * Si USE_MOCK=true, retourne un pool mocké sans connexion MySQL.
 */
export function getSadePool(): Pool {
  if (process.env.USE_MOCK === "true") {
    return getMockPool() as unknown as Pool;
  }

  if (!poolSade) {
    const config = useRuntimeConfig();
    const sslOptions =
      config.dbSadeEnableSsl === "true"
        ? {
            ssl: {
              rejectUnauthorized:
                config.dbSadeRejectUnauthorized === "false" ? false : true,
            },
          }
        : {};
    poolSade = mysql.createPool({
      host: config.dbSadeHost,
      port: Number(config.dbSadePort) || 3306,
      user: config.dbSadeUser,
      password: config.dbSadePassword,
      database: config.dbSadeName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...sslOptions,
    });
  }
  return poolSade;
}

/**
 * Exécute une requête paginée SADE et retourne les données + le total.
 * Utilisé pour la recherche entreprise avec pagination serveur.
 */
export async function executeSadePagedQuery<T extends RowDataPacket>(
  baseQuery: string,
  params: unknown[],
  page: number = 1,
  limit: number = 25,
  sortBy?: string,
  sortType?: string,
): Promise<{ data: T[]; total: number }> {
  const db = getSadePool();

  const direction = sortType?.toLowerCase() === "desc" ? "DESC" : "ASC";

  const countQuery = `SELECT COUNT(*) as total FROM (${baseQuery}) as countQuery`;
  const [countRows] = await db.query<RowDataPacket[]>(countQuery, params);
  const total = countRows[0]?.total ?? 0;

  let pagedQuery = baseQuery;
  if (sortBy) {
    const safeSortBy = sortBy.replace(/[^a-zA-Z0-9_]/g, "");
    pagedQuery += ` ORDER BY ${safeSortBy} ${direction}`;
  }

  const offset = (page - 1) * limit;
  pagedQuery += " LIMIT ? OFFSET ?";
  const pagedParams = [...params, limit, offset];

  const [rows] = await db.query<T[]>(pagedQuery, pagedParams);

  return { data: rows, total };
}
