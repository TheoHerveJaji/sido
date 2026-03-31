<template>
  <!-- Loader pendant le chargement initial -->
  <div v-if="pending" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
    <LcLoader variant="primary" size="lg" />
  </div>

  <!-- Fiche 2 colonnes -->
  <div v-else class="flex gap--regular flex--align-start">
    <!-- Colonne gauche : signalétique du participant (sticky) -->
    <div class="fiche-layout__left flex flex--column gap--regular">
      <SotrelDesignationFicheLeft v-if="firstRecord" :designation="firstRecord" />
    </div>

    <!-- Zone principale : tableau des désignations -->
    <div class="fiche-layout__right flex--1">
      <LcCardContainer :border="true" padding="regular">
        <template #header>
          <span class="text--subheader-semibold text--neutral-800">Désignation de bénéficiaire</span>
        </template>
        <SotrelTabDesignation :nodossier="nodossier" />
      </LcCardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Page désignation de bénéficiaire (TYPE_DOSSIER = DB)
   Layout 2 colonnes : sidebar participant + tableau désignations
   ══════════════════════════════════════════════════════════════ */

import { LcLoader, LcCardContainer } from "@projetlucie/lc-front-components";
import type { SotrelDesignation } from "~/types/database";

definePageMeta({ layout: "domain" });

const route = useRoute();
const nodossier = route.params.nodossier as string;

const { data, pending } = await useFetch<{ data: SotrelDesignation[] }>(
  `/api/sotrel/${nodossier}/designation`,
);

const firstRecord = computed(() => data.value?.data?.[0] ?? null);
</script>

<style scoped>
.fiche-layout__left {
  width: 340px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--domain-header-height) + var(--gutters--regular));
  height: fit-content;
  max-height: calc(
    100vh - var(--domain-header-height) - var(--gutters--regular) * 2
  );
  overflow-y: auto;
}
</style>
