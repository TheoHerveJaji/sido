<template>
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcLoader variant="primary" size="md" />
  </div>

  <LcCardContainer v-else padding="none">
    <LcTable
      id="sade-contrats-table"
      :items="data?.data ?? []"
      :headers="SADE_CONTRATS_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="true"
      no-result-message="Aucun contrat pour cette entreprise"
      @line-clicked="handleRowClick"
    >
      <template #DATE_EFFET="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #DATE_DEBUT="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #DATE_FIN="{ data: cellData }">
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

<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 5 — Liste des contrats
   Source : SDO_SAD_05_LISTE_CONTRATS
   LcTable sans pagination, lignes cliquables → fiche contrat
   ══════════════════════════════════════════════════ */

import {
  LcTable,
  LcIcon,
  LcPill,
  LcLoader,
  COLOR_ENUM,
  LcCardContainer,
} from "@projetlucie/lc-front-components";
import { SADE_CONTRATS_HEADERS } from "~/types/table-headers";
import type { SadeListeContrats } from "~/types/database";
import { formatDate } from "~/utils/formatters";

const props = defineProps<{ numfirme: string }>();

const { data, pending } = await useFetch<{ data: SadeListeContrats[] }>(
  `/api/sade/${props.numfirme}/contrats`,
);

const handleRowClick = (row: SadeListeContrats) => {
  if (row.NUM_PRODUIT) {
    navigateTo(`/sade/${props.numfirme}/contrat/${row.NUM_PRODUIT}`);
  }
};
</script>
