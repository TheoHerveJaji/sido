<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 6 — Désignation
   Source : SDO_SOT_08_DESIGNATION
   LcTable sans pagination
   ══════════════════════════════════════════════════ */

import { LcTable, LcIcon, LcLoader } from '@projetlucie/lc-front-components'
import { DESIGNATION_HEADERS } from '~/types/table-headers'
import type { SotrelDesignation } from '~/types/database'
import { formatDate, formatCurrency } from '~/utils/formatters'

const props = defineProps<{ nodossier: string }>()

const { data, pending } = await useFetch<{ data: SotrelDesignation[] }>(
  `/api/sotrel/${props.nodossier}/designation`,
)
</script>

<template>
  <div v-if="pending" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
    <LcLoader variant="primary" size="md" />
  </div>

  <LcTable
    v-else
    id="sotrel-designation-table"
    :items="data?.data ?? []"
    :headers="DESIGNATION_HEADERS"
    :is-pagination="false"
    :has-border="true"
    :has-header-radius="true"
    :is-line-clickable="false"
    no-result-message="Aucune désignation pour ce dossier"
  >
    <template #DATE_DECLARATION="{ data: cellData }">
      <span v-if="cellData">{{ formatDate(cellData) }}</span>
      <LcIcon v-else name="minus" color="neutral-400" />
    </template>

    <template #MONTANT="{ data: cellData }">
      <span class="text--right">{{ formatCurrency(cellData) }}</span>
    </template>

    <template #DATEDEB="{ data: cellData }">
      <span v-if="cellData">{{ formatDate(cellData) }}</span>
      <LcIcon v-else name="minus" color="neutral-400" />
    </template>

    <template #DATEFIN="{ data: cellData }">
      <span v-if="cellData">{{ formatDate(cellData) }}</span>
      <LcIcon v-else name="minus" color="neutral-400" />
    </template>
  </LcTable>
</template>
