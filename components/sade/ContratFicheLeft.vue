<template>
  <!-- ── Bloc identification contrat ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <div class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="hash" size="caption" color="neutral-600" /> N° Produit
        </span>
        <span class="text--subheader-semibold text--neutral-900">
          {{ contrat.NUM_PRODUIT }}
        </span>
      </div>

      <div v-if="contrat.LIBELLE" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Libellé</span>
        <span class="text--body text--neutral-900">
          {{ contrat.LIBELLE }}
        </span>
      </div>

      <div v-if="contrat.INSTITUTION" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Institution
        </span>
        <span class="text--body text--neutral-900">
          {{ contrat.INSTITUTION }}
        </span>
      </div>

      <div v-if="contrat.CAT_PROF" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Catégorie professionnelle
        </span>
        <span class="text--body text--neutral-900">
          {{ contrat.CAT_PROF }}
        </span>
      </div>

      <div v-if="contrat.CAT_CCN" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Catégorie CCN
        </span>
        <span class="text--body text--neutral-900">
          {{ contrat.CAT_CCN }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc dates clés ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">
        Dates clés
      </span>

      <div v-if="contrat.DATE_EFFET" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="calendar" size="caption" color="neutral-600" />
          Date effet
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(contrat.DATE_EFFET) }}
        </span>
      </div>

      <div v-if="contrat.DATE_OUVERT" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="calendar" size="caption" color="neutral-600" />
          Date ouverture
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(contrat.DATE_OUVERT) }}
        </span>
      </div>

      <div v-if="contrat.DATE_SUSP" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="calendar" size="caption" color="neutral-600" />
          Date suspension
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(contrat.DATE_SUSP) }}
        </span>
      </div>

      <div v-if="contrat.DATE_PAIE" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="calendar" size="caption" color="neutral-600" />
          Fin paiement
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(contrat.DATE_PAIE) }}
        </span>
      </div>

      <div v-if="contrat.DATE_RES" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="calendar" size="caption" color="neutral-600" />
          Date résiliation
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(contrat.DATE_RES) }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc gestion ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">Gestion</span>

      <div v-if="contrat.EFFECTIF" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Effectif</span>
        <span class="text--body text--neutral-900">
          {{ contrat.EFFECTIF }}
        </span>
      </div>

      <div v-if="contrat.ORIGINE" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Origine</span>
        <span class="text--body text--neutral-900">
          {{ contrat.ORIGINE }}
        </span>
      </div>

      <div v-if="contrat.ORG_GESTION" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Organisme gestion
        </span>
        <span class="text--body text--neutral-900">
          {{ contrat.ORG_GESTION }}
        </span>
      </div>

      <div v-if="contrat.RETROC" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Rétrocession
        </span>
        <span class="text--body text--neutral-900">
          {{ contrat.RETROC }}
        </span>
      </div>

      <div v-if="contrat.PER_COT" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Période cotisée
        </span>
        <span class="text--body text--neutral-900">
          {{ contrat.PER_COT }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bouton retour ── -->
  <LcButton
    variant="secondary"
    icon-left="arrow-left"
    @click="navigateTo(`/sade/${contrat.IDF_NUMFIRME}`)"
  >
    Retour à l'entreprise
  </LcButton>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Colonne gauche de la fiche contrat SADE (V2)
   Blocs : Identification, Dates clés, Gestion, Bouton retour
   ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcIcon,
  LcButton,
} from "@projetlucie/lc-front-components";
import type { SadeContrat } from "~/types/database";
import { formatDate } from "~/utils/formatters";

defineProps<{
  contrat: SadeContrat;
}>();
</script>
