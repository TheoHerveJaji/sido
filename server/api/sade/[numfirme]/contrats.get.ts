/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/contrats
   Liste des contrats (SDO_SAD_05_LISTE_CONTRATS)
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
      "SELECT * FROM SDO_SAD_06_LISTE_CONTRATS WHERE IDF_NUMFIRME = ?",
      [numfirme],
    );
    return { data: rows };
  } catch (err) {
    console.error("[API SADE contrats]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
