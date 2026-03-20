<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 4 — Demandes de fonds
   Source : SDO_SOT_05_FONDS
   LcTable sans pagination
   ══════════════════════════════════════════════════ */

import { LcTable, LcLoader } from '@projetlucie/lc-front-components'
import { FONDS_HEADERS } from '~/types/table-headers'
import type { SotrelFonds } from '~/types/database'
import { formatCurrency } from '~/utils/formatters'

const props = defineProps<{ nodossier: string }>()

const { data, pending } = await useFetch<{ data: SotrelFonds[] }>(
  `/api/sotrel/${props.nodossier}/fonds`,
)
</script>

<template>
  <div v-if="pending" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
    <LcLoader variant="primary" size="md" />
  </div>

  <LcTable
    v-else
    id="sotrel-fonds-table"
    :items="data?.data ?? []"
    :headers="FONDS_HEADERS"
    :is-pagination="false"
    :has-border="true"
    :has-header-radius="true"
    :is-line-clickable="false"
    no-result-message="Aucune demande de fonds pour ce dossier"
  >
    <template #MONTANT="{ data: cellData }">
      <span class="text--right">{{ formatCurrency(cellData) }}</span>
    </template>
  </LcTable>
</template>
