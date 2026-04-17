/* ══════════════════════════════════════════════════════════════
   GET /api/sade/recherche
   Recherche paginée dans SDO_SAD_01_RECHERCHE
   Filtres : denomination, numfirme, siret
   Au moins un critère requis côté client.
   ══════════════════════════════════════════════════════════════ */

import type { RowDataPacket } from "mysql2";
import { executeSadePagedQuery } from "~/server/utils/db-sade";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const denomination = (query.denomination as string)?.trim() || "";
  const numfirme = (query.numfirme as string)?.trim() || "";
  const siren = (query.siren as string)?.trim() || "";
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 25;
  const sortBy = (query.sortBy as string) || "DENSOC";
  const sortType = (query.sortType as string) || "asc";

  // Construction dynamique de la clause WHERE
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (denomination) {
    conditions.push("DENSOC LIKE ?");
    params.push(`%${denomination}%`);
  }
  if (numfirme) {
    conditions.push("IDF_KNUMADH LIKE ?");
    params.push(`%${numfirme}%`);
  }
  if (siren) {
    conditions.push("SIREN LIKE ?");
    params.push(`%${siren}%`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const baseQuery = `SELECT * FROM SDO_SAD_01_RECHERCHE ${whereClause}`;

  try {
    const result = await executeSadePagedQuery<RowDataPacket>(
      baseQuery,
      params,
      page,
      limit,
      sortBy,
      sortType,
    );

    return result;
  } catch (err) {
    console.error("[API sade/recherche]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
