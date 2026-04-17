<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet Dates — Historique des dates du contrat
   Source : SDO_SAD_07_DATES
   LcTable sans pagination
   ══════════════════════════════════════════════════ */

import {
  LcTable,
  LcIcon,
  LcPill,
  LcLoader,
  LcCardContainer,
  COLOR_ENUM,
} from "@projetlucie/lc-front-components";
import { SADE_DATES_HEADERS } from "~/types/table-headers";
import type { SadeDatesContrat } from "~/types/database";
import { formatDate } from "~/utils/formatters";

const props = defineProps<{ numfirme: string; connum: string }>();

const { data, pending } = await useFetch<{ data: SadeDatesContrat[] }>(
  `/api/sade/${props.numfirme}/contrats/${props.connum}/dates`,
);
</script>

<template>
  <LcCardContainer :border="true" padding="regular">
    <div
      v-if="pending"
      class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
    >
      <LcLoader variant="primary" size="md" />
    </div>

    <LcTable
      v-else
      id="sade-dates-table"
      :items="data?.data ?? []"
      :headers="SADE_DATES_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="false"
      no-result-message="Aucun historique de dates"
    >
      <template #DATE_DEBUT="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #DATE_DEBUT_MAJ="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #DATE_FIN="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #DATE_FIN_MAJ="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #MOTIF="{ data: cellData }">
        <LcPill v-if="cellData" :variant="COLOR_ENUM.NEUTRAL" size="small">
          {{ cellData }}
        </LcPill>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>
    </LcTable>
  </LcCardContainer>
</template>
