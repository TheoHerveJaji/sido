<template>
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcLoader variant="primary" size="md" />
  </div>

  <LcCardContainer v-else padding="none">
    <LcTable
      id="sade-libser-table"
      :items="data?.data ?? []"
      :headers="SADE_LIBSER_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="false"
      no-result-message="Aucun libre-service enregistré pour cette entreprise"
    >
      <template #DATEMAJ="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #LIBSER="{ data: cellData }">
        <span v-if="cellData" :title="cellData">{{ cellData }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>
    </LcTable>
  </LcCardContainer>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 2 — Libre-Service
   Source : SDO_SAD_03_LIBSER
   LcTable sans pagination
   ══════════════════════════════════════════════════ */

import {
  LcTable,
  LcIcon,
  LcLoader,
  LcCardContainer,
} from "@projetlucie/lc-front-components";
import { SADE_LIBSER_HEADERS } from "~/types/table-headers";
import type { SadeLibreService } from "~/types/database";
import { formatDate } from "~/utils/formatters";

const props = defineProps<{ numfirme: string }>();

const { data, pending } = await useFetch<{ data: SadeLibreService[] }>(
  `/api/sade/${props.numfirme}/libser`,
);
</script>
