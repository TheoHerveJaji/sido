<template>
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcLoader variant="primary" size="md" />
  </div>

  <LcCardContainer v-else padding="none">
    <LcTable
      id="sade-predsuc-table"
      :items="data?.data ?? []"
      :headers="SADE_PREDSUC_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="false"
      no-result-message="Aucun prédécesseur ou successeur"
    >
      <template #TYPE_PS="{ data: cellData }">
        <LcPill v-if="cellData" :variant="COLOR_ENUM.NEUTRAL" size="small">
          {{ cellData }}
        </LcPill>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <template #DATE="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>
    </LcTable>
  </LcCardContainer>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 3 — Prédécesseurs / Successeurs
   Source : SDO_SAD_04_PRED_SUC
   LcTable sans pagination
   ══════════════════════════════════════════════════ */

import {
  LcTable,
  LcIcon,
  LcPill,
  LcLoader,
  COLOR_ENUM,
  LcCardContainer,
} from "@projetlucie/lc-front-components";
import { SADE_PREDSUC_HEADERS } from "~/types/table-headers";
import type { SadePredSuc } from "~/types/database";
import { formatDate } from "~/utils/formatters";

const props = defineProps<{ numfirme: string }>();

const { data, pending } = await useFetch<{ data: SadePredSuc[] }>(
  `/api/sade/${props.numfirme}/predsuc`,
);
</script>
