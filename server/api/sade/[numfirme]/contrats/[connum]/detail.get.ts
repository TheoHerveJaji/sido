/* ══════════════════════════════════════════════════
   GET /api/sade/[numfirme]/contrats/[connum]/detail
   Renseignements contrat (SDO_SAD_06_CONTRAT)
   ══════════════════════════════════════════════════ */

import type { RowDataPacket } from "mysql2";
import { getPool } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const numfirme = getRouterParam(event, "numfirme");
  const connum = getRouterParam(event, "connum");
  if (!numfirme || !connum)
    throw createError({
      statusCode: 400,
      message: "N° Firme et N° Contrat requis",
    });

  const db = getPool();
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM SDO_SAD_07_CONTRAT WHERE IDF_NUMFIRME = ? AND NUM_PRODUIT = ?",
      [numfirme, connum],
    );
    return { data: rows[0] ?? null };
  } catch (err) {
    console.error("[API SADE contrat detail]", err);
    throw createError({ statusCode: 500, message: "Erreur serveur" });
  }
});
