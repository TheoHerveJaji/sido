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
    <!-- Colonne gauche : signalétique du participant (sticky) -->
    <div class="fiche-layout__left flex flex--column gap--regular">
      <SotrelDesignationFicheLeft
        v-if="firstRecord"
        :designation="firstRecord"
      />
    </div>

    <!-- Zone principale : renseignements du bénéficiaire -->
    <div class="fiche-layout__right flex--1">
      <LcCardContainer
        v-if="firstRecord"
        :border="true"
        padding="regular"
        class="background-transparent"
      >
        <span class="text--subheader-semibold text--neutral-800">
          Bénéficiaire désigné
        </span>

        <LcCardContainer :border="true" padding="regular" class="mt--small">
          <div class="grid grid--2-col grid--fluid gap--regular">
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Code bénéficiaire</span
              >
              <span class="text--body text--neutral-900">
                {{ firstRecord.CODE_BENEF || "–" }}
              </span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600">
                Nom & prénom
              </span>
              <span class="text--body text--neutral-900">
                {{ firstRecord.NOM_BENEF || "–" }}
              </span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600">
                Adresse
              </span>
              <span class="text--body text--neutral-900">
                {{
                  [
                    firstRecord.ADRESSE1_BENEF,
                    firstRecord.ADRESSE2_BENEF,
                    firstRecord.ADRESSE3_BENEF,
                  ]
                    .filter(Boolean)
                    .join(", ") || "–"
                }}
                <br
                  v-if="
                    firstRecord.CODE_POSTAL_BENEF || firstRecord.VILLE_BENEF
                  "
                />
                {{
                  [firstRecord.CODE_POSTAL_BENEF, firstRecord.VILLE_BENEF]
                    .filter(Boolean)
                    .join(" ")
                }}
              </span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600">
                Montant
              </span>
              <span class="text--body text--neutral-900">
                {{
                  firstRecord.MONTANT != null
                    ? formatCurrency(firstRecord.MONTANT)
                    : "–"
                }}
              </span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600">
                Date de début
              </span>
              <span class="text--body text--neutral-900">
                {{
                  firstRecord.DATEDEB ? formatDate(firstRecord.DATEDEB) : "–"
                }}
              </span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600">
                Date de fin
              </span>
              <span class="text--body text--neutral-900">
                {{
                  firstRecord.DATEFIN ? formatDate(firstRecord.DATEFIN) : "–"
                }}
              </span>
            </div>
          </div>
        </LcCardContainer>
      </LcCardContainer>

      <LcCardContainer v-else :border="true" padding="regular">
        <div
          class="flex flex--column flex--align-center gap--medium py--jumbo text--neutral-600 text--center"
        >
          <LcIcon name="user-x" size="display" color="neutral-400" />
          <p>Aucune désignation pour ce dossier</p>
        </div>
      </LcCardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Page désignation de bénéficiaire (TYPE_DOSSIER = DB)
   Layout 2 colonnes : sidebar participant + fiche bénéficiaire
   ══════════════════════════════════════════════════════════════ */

import {
  LcLoader,
  LcCardContainer,
  LcIcon,
} from "@projetlucie/lc-front-components";
import type { SotrelDesignation } from "~/types/database";
import { formatDate, formatCurrency } from "~/utils/formatters";

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
.background-transparent {
  background-color: var(--colors--neutral-200);
}
</style>
