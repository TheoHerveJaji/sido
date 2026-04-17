/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/contrats/[connum]/dates
   Dates du contrat (SDO_SAD_07_DATES)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from "mysql2";
import { getSadePool } from "~/server/utils/db-sade";

export default defineEventHandler(async (event) => {
  const numfirme = getRouterParam(event, "numfirme");
  const connum = getRouterParam(event, "connum");
  if (!numfirme || !connum)
    throw createError({
      statusCode: 400,
      message: "N° Firme et N° Contrat requis",
    });

  const db = getSadePool();
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM SDO_SAD_08_DATES WHERE IDF_NUMFIRME = ? AND NUM_PRODUIT = ? ORDER BY DATE_DEBUT ASC",
      [numfirme, connum],
    );
    return { data: rows };
  } catch (err) {
    console.error("[API SADE dates contrat]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
