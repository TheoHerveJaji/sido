<template>
  <!-- Loader pendant le chargement initial -->
  <div v-if="pending" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
    <LcLoader variant="primary" size="lg" />
  </div>

  <!-- Fiche 2 colonnes -->
  <div v-else class="flex gap--regular flex--align-start">
    <!-- Colonne gauche : résumé de l'assuré (sticky) -->
    <div class="fiche-layout__left flex flex--column gap--regular">
      <SotrelAssureFicheLeft v-if="rg" :rg="rg" />
    </div>

    <!-- Zone principale : onglets -->
    <div class="fiche-layout__right flex--1">
      <LcCardContainer :border="true" padding="none">
        <LcTab
          v-model="activeTab"
          :tabs="tabs"
          :is-full-width="true"
          class="tabs-single-line"
        />
      </LcCardContainer>

      <div class="mt--regular">
        <SotrelTabRenseignements
          v-if="activeTab.id === 1"
          :nodossier="nodossier"
          :rg="rg"
        />
        <SotrelTabCapital v-if="activeTab.id === 2" :nodossier="nodossier" />
        <SotrelTabCourriers v-if="activeTab.id === 3" :nodossier="nodossier" />
        <SotrelTabFonds v-if="activeTab.id === 4" :nodossier="nodossier" />
        <SotrelTabBeneficiaires
          v-if="activeTab.id === 5"
          :nodossier="nodossier"
        />
        <SotrelTabDesignation
          v-if="activeTab.id === 6"
          :nodossier="nodossier"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Fiche assuré SOTREL — Layout 2 colonnes + 6 onglets
   Colonne gauche sticky : identité, sinistre, correspondant, employeur
   Zone droite : LcTab avec 6 onglets métier
   ══════════════════════════════════════════════════════════════ */

import {
  LcTab,
  LcLoader,
  LcCardContainer,
} from "@projetlucie/lc-front-components";
import type { TabItem } from "@projetlucie/lc-front-components";
import type { SotrelRgAssure } from "~/types/database";

definePageMeta({ layout: "domain" });

const route = useRoute();
const nodossier = route.params.nodossier as string;

// ── Chargement des données RG (renseignements généraux) ──
// Chargé une seule fois pour toute la fiche (colonne gauche + onglet RG)
const { data: rgData, pending } = await useFetch<{
  data: SotrelRgAssure | null;
}>(`/api/sotrel/${nodossier}/rg`);

const rg = computed(() => rgData.value?.data ?? null);

// ── Définition des 6 onglets ──
const tabs: TabItem[] = [
  {
    id: 1,
    label: "Renseignements généraux",
    isDisabled: false,
    iconName: "user",
  },
  {
    id: 2,
    label: "Calcul du capital",
    isDisabled: false,
    iconName: "calculator",
  },
  { id: 3, label: "Courriers", isDisabled: false, iconName: "mail" },
  {
    id: 4,
    label: "Demandes de fonds",
    isDisabled: false,
    iconName: "credit-card",
  },
  { id: 5, label: "Bénéficiaires", isDisabled: false, iconName: "users" },
  { id: 6, label: "Désignation", isDisabled: false, iconName: "file-text" },
];
const activeTab = ref<TabItem>(tabs[0]);
</script>

<style scoped>
.tabs-single-line :deep(.tabs-choice) {
  flex-wrap: nowrap;
}

.tabs-single-line :deep(.tabs-choice--item--link) {
  white-space: nowrap;
}
</style>
