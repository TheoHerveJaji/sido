<template>
  <!-- Loader pendant le chargement initial -->
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcLoader variant="primary" size="lg" />
  </div>

  <!-- Fiche 2 colonnes -->
  <div v-else class="flex gap--regular flex--align-start">
    <!-- Colonne gauche : résumé de l'entreprise (sticky) -->
    <div class="fiche-layout__left flex flex--column gap--regular">
      <SadeEntrepriseFicheLeft v-if="rg" :rg="rg" />
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
        <SadeTabRenseignements v-if="activeTab.id === 1" :rg="rg" />
        <SadeTabLibreService
          v-if="activeTab.id === 2"
          :numfirme="numfirme"
        />
        <SadeTabPredSuc v-if="activeTab.id === 3" :numfirme="numfirme" />
        <SadeTabGroupes v-if="activeTab.id === 4" :numfirme="numfirme" />
        <SadeTabContrats v-if="activeTab.id === 5" :numfirme="numfirme" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Fiche entreprise SADE — Layout 2 colonnes + 5 onglets
   Colonne gauche sticky : identité, localisation
   Zone droite : LcTab avec 5 onglets métier
   ══════════════════════════════════════════════════════════════ */

import {
  LcTab,
  LcLoader,
  LcCardContainer,
} from "@projetlucie/lc-front-components";
import type { TabItem } from "@projetlucie/lc-front-components";
import type { SadeRenseignements } from "~/types/database";

definePageMeta({ layout: "domain" });

const route = useRoute();
const numfirme = route.params.numfirme as string;

// ── Chargement des données RG (renseignements généraux) ──
const { data: rgData, pending } = await useFetch<{
  data: SadeRenseignements | null;
}>(`/api/sade/${numfirme}/rg`);

const rg = computed(() => rgData.value?.data ?? null);

// ── Définition des 5 onglets ──
const tabs: TabItem[] = [
  {
    id: 1,
    label: "Renseignements généraux",
    isDisabled: false,
    iconName: "building",
  },
  {
    id: 2,
    label: "Libre-Service",
    isDisabled: false,
    iconName: "edit-3",
  },
  {
    id: 3,
    label: "Prédécesseurs / Successeurs",
    isDisabled: false,
    iconName: "git-branch",
  },
  {
    id: 4,
    label: "Groupes d'appartenance",
    isDisabled: false,
    iconName: "layers",
  },
  {
    id: 5,
    label: "Contrats",
    isDisabled: false,
    iconName: "file-text",
  },
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
