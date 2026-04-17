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
    <!-- Colonne gauche : résumé du contrat (sticky) -->
    <div class="fiche-layout__left flex flex--column gap--regular">
      <SadeContratFicheLeft v-if="contrat" :contrat="contrat" />
    </div>

    <!-- Zone principale : onglet Dates -->
    <div class="fiche-layout__right flex--1">
      <SadeTabDatesContrat :numfirme="numfirme" :connum="connum" />
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Fiche contrat SADE — Layout 2 colonnes
   Colonne gauche sticky : identification contrat, dates clés
   Zone droite : historique des dates (onglet unique, sans LcTab)
   ══════════════════════════════════════════════════════════════ */

import { LcLoader } from "@projetlucie/lc-front-components";
import type { SadeContrat } from "~/types/database";

definePageMeta({ layout: "domain" });

const route = useRoute();
const numfirme = route.params.numfirme as string;
const connum = route.params.connum as string;

// ── Chargement des données du contrat ──
const { data: detailData, pending } = await useFetch<{
  data: SadeContrat | null;
}>(`/api/sade/${numfirme}/contrats/${connum}/detail`);

const contrat = computed(() => detailData.value?.data ?? null);
</script>
