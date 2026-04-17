/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/rg
   Renseignements généraux entreprise (SDO_SAD_02)
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
      "SELECT * FROM SDO_SAD_02_RENSEIGNEMENTS WHERE IDF_KNUMADH = ?",
      [numfirme],
    );
    return { data: rows[0] ?? null };
  } catch (err) {
    console.error("[API SADE rg]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
