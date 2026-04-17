/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/libser
   Libre-service entreprise (SDO_SAD_03_LIBSER)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from "mysql2";
import { getPool } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const numfirme = getRouterParam(event, "numfirme");
  if (!numfirme)
    throw createError({ statusCode: 400, message: "N° Firme requis" });

  const db = getPool();
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM SDO_SAD_03_LIBSER WHERE IDF_NUMFIRME = ? ORDER BY NUMORD ASC",
      [numfirme],
    );
    return { data: rows };
  } catch (err) {
    console.error("[API SADE libser]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
