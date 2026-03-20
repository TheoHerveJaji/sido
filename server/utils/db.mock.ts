/**
 * Pool MySQL mocké
 * Retourne des données statiques pour le développement sans base de données
 * Activé via USE_MOCK=true dans .env
 */
import { MOCK_SOT_01 } from '../mocks/sot01.mock'
import { MOCK_SOT_02 } from '../mocks/sot02.mock'
import { MOCK_SOT_03 } from '../mocks/sot03.mock'
import { MOCK_SOT_04 } from '../mocks/sot04.mock'
import { MOCK_SOT_05 } from '../mocks/sot05.mock'
import { MOCK_SOT_06 } from '../mocks/sot06.mock'
import { MOCK_SOT_07 } from '../mocks/sot07.mock'
import { MOCK_SOT_08 } from '../mocks/sot08.mock'
import { MOCK_USERS } from '../mocks/users.mock'
import { MOCK_DOMAINS } from '../mocks/domains.mock'
import { MOCK_USER_DOMAINS } from '../mocks/user-domains.mock'
import { MOCK_LOGS } from '../mocks/logs.mock'

// Registre de toutes les tables mockées
const MOCK_TABLES: Record<string, any[]> = {
  SDO_SOT_01_RECHERCHE:   MOCK_SOT_01,
  SDO_SOT_02_RG_ASSURE:   MOCK_SOT_02,
  SDO_SOT_03_CAPITAL:     MOCK_SOT_03,
  SDO_SOT_04_COURRIER:    MOCK_SOT_04,
  SDO_SOT_05_FONDS:       MOCK_SOT_05,
  SDO_SOT_06_LISTE_BENEF: MOCK_SOT_06,
  SDO_SOT_07_BENEF:       MOCK_SOT_07,
  SDO_SOT_08_DESIGNATION: MOCK_SOT_08,
  SDO_USERS:              MOCK_USERS,
  SDO_DOMAINS:            MOCK_DOMAINS,
  SDO_USER_DOMAINS:       MOCK_USER_DOMAINS,
  SDO_LOGS:               MOCK_LOGS,
}

/**
 * Simule l'exécution d'une requête SQL sur les données mockées
 * Supporte les filtres WHERE simples (colonne = ?) et LIKE
 */
function executeMockQuery(sql: string, params: any[] = []): any[] {
  // Détecter la table cible depuis le SQL
  const tableMatch = sql.match(/FROM\s+(SDO_\w+)/i)
  if (!tableMatch) return []

  const tableName = tableMatch[1].toUpperCase()
  let data = [...(MOCK_TABLES[tableName] ?? [])]

  // Collecter tous les placeholders dans l'ordre pour mapper correctement les params
  const placeholders: { type: 'eq' | 'like'; col: string }[] = []
  const whereMatch = sql.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|$)/is)

  if (whereMatch) {
    const whereClause = whereMatch[1]
    // Trouver chaque condition dans l'ordre d'apparition
    const conditionRegex = /(\w+)\s*(?:(LIKE)|=)\s*\?/gi
    let match
    while ((match = conditionRegex.exec(whereClause)) !== null) {
      placeholders.push({
        type: match[2] ? 'like' : 'eq',
        col: match[1].toUpperCase(),
      })
    }
  }

  // Appliquer les filtres WHERE
  placeholders.forEach((ph, i) => {
    if (params[i] === undefined) return
    const val = String(params[i]).toUpperCase()

    if (ph.type === 'like') {
      const searchVal = val.replace(/%/g, '')
      if (searchVal) {
        data = data.filter((row) => {
          const rowVal = row[ph.col]
          if (rowVal === undefined || rowVal === null) return false
          return String(rowVal).toUpperCase().includes(searchVal)
        })
      }
    }
    else {
      data = data.filter((row) => {
        const rowVal = row[ph.col]
        if (rowVal === undefined || rowVal === null) return false
        return String(rowVal).toUpperCase() === val
      })
    }
  })

  // Nombre de params utilisés par les conditions WHERE
  const whereParamCount = placeholders.length

  // Appliquer ORDER BY
  const orderMatch = sql.match(/ORDER BY\s+(\w+)\s*(ASC|DESC)?/i)
  if (orderMatch) {
    const col = orderMatch[1].toUpperCase()
    const dir = (orderMatch[2] ?? 'ASC').toUpperCase()
    data.sort((a, b) => {
      const va = a[col] ?? ''
      const vb = b[col] ?? ''
      return dir === 'ASC'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
  }

  // Appliquer LIMIT / OFFSET
  const limitMatch = sql.match(/LIMIT\s+\?/i)
  if (limitMatch) {
    const remainingParams = params.slice(whereParamCount)
    const limit = parseInt(String(remainingParams[0] ?? 20))
    const offset = parseInt(String(remainingParams[1] ?? 0))
    if (!isNaN(limit)) {
      data = data.slice(isNaN(offset) ? 0 : offset, (isNaN(offset) ? 0 : offset) + limit)
    }
  }

  return data
}

/**
 * Crée un pool MySQL mocké
 */
export function getMockPool() {
  return {
    query: async (sql: string, params: any[] = []) => {
      // Requête COUNT
      if (sql.toUpperCase().includes('COUNT(*)')) {
        // Exécuter la même logique de filtrage pour obtenir le bon total
        const tableMatch = sql.match(/FROM\s+\(?(SELECT\s+.+?\s+FROM\s+)?(SDO_\w+)/i)
        if (!tableMatch) return [[{ total: 0 }], []]

        const tableName = tableMatch[2].toUpperCase()
        let allData = [...(MOCK_TABLES[tableName] ?? [])]

        // Appliquer les mêmes filtres WHERE pour le COUNT
        const whereMatch = sql.match(/WHERE\s+(.+?)(?:\s+\)|\s+ORDER|\s+LIMIT|$)/is)
        if (whereMatch && params.length > 0) {
          const placeholders: { type: 'eq' | 'like'; col: string }[] = []
          const conditionRegex = /(\w+)\s*(?:(LIKE)|=)\s*\?/gi
          let match
          while ((match = conditionRegex.exec(whereMatch[1])) !== null) {
            placeholders.push({
              type: match[2] ? 'like' : 'eq',
              col: match[1].toUpperCase(),
            })
          }
          placeholders.forEach((ph, i) => {
            if (params[i] === undefined) return
            const val = String(params[i]).toUpperCase()
            if (ph.type === 'like') {
              const searchVal = val.replace(/%/g, '')
              if (searchVal) {
                allData = allData.filter((row) => {
                  const rowVal = row[ph.col]
                  return rowVal != null && String(rowVal).toUpperCase().includes(searchVal)
                })
              }
            }
            else {
              allData = allData.filter((row) => {
                const rowVal = row[ph.col]
                return rowVal != null && String(rowVal).toUpperCase() === val
              })
            }
          })
        }

        return [[{ total: allData.length }], []]
      }
      // Requête SELECT normale
      const data = executeMockQuery(sql, params)
      return [data, []]
    },
    // Méthodes stub pour compatibilité
    execute: async (sql: string, params: any[] = []) => {
      return [{ affectedRows: 1, insertId: Date.now() }, []]
    },
    end: async () => {},
  }
}
