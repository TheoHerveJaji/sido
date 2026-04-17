/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/predsuc
   Prédécesseurs / Successeurs (SDO_SAD_04_PRED_SUC)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from "mysql2";
import { getSadePool } from "~/server/utils/db-sade";

export default defineEventHandler(async (event) => {
  const numfirme = getRouterParam(event, "numfirme");
  if (!numfirme)
    throw createError({ statusCode: 400, message: "N° Firme requis" });

  const db = getSadePool();
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM SDO_SAD_04_PRED_SUCC WHERE IDF_NUMFIRME = ?",
      [numfirme],
    );
    return { data: rows };
  } catch (err) {
    console.error("[API SADE predsuc]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
