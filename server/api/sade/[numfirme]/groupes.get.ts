/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/groupes
   Groupes d'appartenance (SDO_SAD_05_GROUPE)
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
      "SELECT * FROM SDO_SAD_05_GROUPE WHERE IDF_NUMFIRME = ?",
      [numfirme],
    );
    return { data: rows };
  } catch (err) {
    console.error("[API SADE groupes]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
