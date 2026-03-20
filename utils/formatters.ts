/* ══════════════════════════════════════════════════
   Fonctions de formatage réutilisables
   ══════════════════════════════════════════════════ */

/**
 * Formate une date au format DD/MM/YYYY
 * Accepte les formats : YYYY-MM-DD, DD/MM/YYYY, YYYYMMDD
 */
export function formatDate(value: string | null | undefined): string {
  if (!value || value.trim() === '') return ''

  // Déjà au format DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return value

  // Format YYYYMMDD (8 caractères sans séparateur)
  if (/^\d{8}$/.test(value)) {
    return `${value.slice(6, 8)}/${value.slice(4, 6)}/${value.slice(0, 4)}`
  }

  // Format YYYY-MM-DD ou avec heure
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const [y, m, d] = value.slice(0, 10).split('-')
    return `${d}/${m}/${y}`
  }

  return value
}

/**
 * Formate un montant en euros (ex: 1 234,50 €)
 */
export function formatCurrency(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return ''

  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return ''

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
}

/**
 * Formate un NIR (N° Sécurité Sociale) : X XX XX XX XXX XXX XX
 */
export function formatNIR(value: string | null | undefined): string {
  if (!value) return ''

  const clean = value.replace(/\s/g, '')
  if (clean.length < 13) return clean

  return [
    clean.slice(0, 1),
    clean.slice(1, 3),
    clean.slice(3, 5),
    clean.slice(5, 7),
    clean.slice(7, 10),
    clean.slice(10, 13),
    clean.slice(13),
  ].filter(Boolean).join(' ')
}
