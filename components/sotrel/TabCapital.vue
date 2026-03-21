<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Onglet 2 — Calcul du capital
   Source : SDO_SOT_03_CAPITAL
   Sections : Salaires, Calcul, Complément (conditionnel)
   ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcLoader,
  LcPill,
  COLOR_ENUM,
} from "@projetlucie/lc-front-components";
import type { SotrelCapital } from "~/types/database";
import { formatCurrency, formatDate } from "~/utils/formatters";

const props = defineProps<{ nodossier: string }>();

const { data, pending } = await useFetch<{ data: SotrelCapital | null }>(
  `/api/sotrel/${props.nodossier}/capital`,
);

const capital = computed(() => data.value?.data ?? null);
</script>

<template>
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcLoader variant="primary" size="md" />
  </div>

  <div v-else-if="capital" class="flex flex--column gap--regular">
    <!-- ── Références salaires ── -->
    <LcCardContainer :border="true" padding="regular">
      <template #header>
        <p class="text--header bold text--neutral-800 mb--large">
          Références salaires
        </p>
      </template>
      <div class="grid grid--3-col grid--fluid gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Salaire T1
          </span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.SALAIRE_TRIMESTRE_1) }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Salaire T2
          </span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.SALAIRE_TRIMESTRE_2) }}
          </span>
        </div>

        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Salaire annuel
          </span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.SALAIRE_ANNUEL) }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Salaire T3
          </span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.SALAIRE_TRIMESTRE_3) }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Salaire T4
          </span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.SALAIRE_TRIMESTRE_4) }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600"
            >Salaire de référence</span
          >
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.SALAIRE_DE_REFERENCE) }}
          </span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Calcul du capital ── -->
    <LcCardContainer :border="true" padding="regular">
      <template #header>
        <p class="text--header bold text--neutral-800 mb--large">
          Calcul du capital
        </p>
      </template>
      <div class="grid grid--2-col grid--fluid gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Pourcentage 1
          </span>
          <span class="text--body text--neutral-900">
            {{ capital.POURCENTAGE1 ?? "–" }} %
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Pourcentage 2
          </span>
          <span class="text--body text--neutral-900">
            {{ capital.POURCENTAGE2 ?? "–" }} %
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Pourcentage 3
          </span>
          <span class="text--body text--neutral-900">
            {{ capital.POURCENTAGE3 ?? "–" }} %
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Nombre 24ème
          </span>
          <span class="text--body text--neutral-900">
            {{ capital.NOMBRE_24 ?? "–" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Capital</span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.CAPITAL) }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Majoration
          </span>
          <span class="text--body text--neutral-900">
            {{ formatCurrency(capital.MAJORATION) }}
          </span>
        </div>
        <div
          class="flex flex--column gap--micro bg--success-100 p--small radius--small"
        >
          <span class="text--caption-semibold text--neutral-600">
            Total à payer
          </span>
          <LcPill :variant="COLOR_ENUM.SUCCESS" size="regular">
            {{ formatCurrency(capital.TOTAL) }}
          </LcPill>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Date de paiement
          </span>
          <span class="text--body text--neutral-900">
            {{ formatDate(capital.DATE_PAIEMENT) }}
          </span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Complément (conditionnel) ── -->
    <LcCardContainer v-if="capital.COMPLEMENT" :border="true" padding="regular">
      <template #header>
        <p class="text--header bold text--neutral-800 mb--large">Complément</p>
      </template>
      <div class="grid grid--2-col grid--fluid gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600"
            >Complément</span
          >
          <span class="text--body text--neutral-900">{{
            formatCurrency(capital.COMPLEMENT)
          }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600"
            >Revalorisation</span
          >
          <span class="text--body text--neutral-900">{{
            formatCurrency(capital.REVALORISATION)
          }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600"
            >Date complément</span
          >
          <span class="text--body text--neutral-900">{{
            formatDate(capital.DATE_COMPLEMENT)
          }}</span>
        </div>
      </div>
    </LcCardContainer>
  </div>

  <div
    v-else
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <p>Aucune donnée de capital disponible pour ce dossier.</p>
  </div>
</template>
