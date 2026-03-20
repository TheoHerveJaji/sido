<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 3 — Courriers
   Source : SDO_SOT_04_COURRIER
   LcTable sans pagination, tri par date DESC
   ══════════════════════════════════════════════════ */

import { LcTable, LcIcon, LcLoader } from '@projetlucie/lc-front-components'
import { COURRIERS_HEADERS } from '~/types/table-headers'
import type { SotrelCourrier } from '~/types/database'
import { formatDate } from '~/utils/formatters'

const props = defineProps<{ nodossier: string }>()

const { data, pending } = await useFetch<{ data: SotrelCourrier[] }>(
  `/api/sotrel/${props.nodossier}/courriers`,
)
</script>

<template>
  <div v-if="pending" class="empty-state">
    <LcLoader variant="primary" size="md" />
  </div>

  <LcTable
    v-else
    id="sotrel-courriers-table"
    :items="data?.data ?? []"
    :headers="COURRIERS_HEADERS"
    :is-pagination="false"
    :has-border="true"
    :has-header-radius="true"
    :is-line-clickable="false"
    no-result-message="Aucun courrier pour ce dossier"
  >
    <template #DATE_COURRIER="{ data: cellData }">
      <span v-if="cellData">{{ formatDate(cellData) }}</span>
      <LcIcon v-else name="minus" color="neutral-400" />
    </template>
  </LcTable>
</template>
