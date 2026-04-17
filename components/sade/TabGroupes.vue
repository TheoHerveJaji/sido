<template>
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcLoader variant="primary" size="md" />
  </div>

  <LcCardContainer v-else padding="none">
    <LcTable
      id="sade-groupes-table"
      :items="data?.data ?? []"
      :headers="SADE_GROUPES_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="false"
      no-result-message="Aucun groupe d'appartenance"
    >
      <template #POURCENTAGE="{ data: cellData }">
        <span v-if="cellData != null">{{ cellData }} %</span>
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
    </LcTable>
  </LcCardContainer>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 4 — Groupes d'appartenance
   Source : SDO_SAD_05_GROUPE
   LcTable sans pagination
   ══════════════════════════════════════════════════ */

import {
  LcTable,
  LcIcon,
  LcLoader,
  LcCardContainer,
} from "@projetlucie/lc-front-components";
import { SADE_GROUPES_HEADERS } from "~/types/table-headers";
import type { SadeGroupe } from "~/types/database";
import { formatDate } from "~/utils/formatters";

const props = defineProps<{ numfirme: string }>();

const { data, pending } = await useFetch<{ data: SadeGroupe[] }>(
  `/api/sade/${props.numfirme}/groupes`,
);
</script>
