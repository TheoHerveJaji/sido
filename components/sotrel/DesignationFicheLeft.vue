<template>
  <!-- ── Bloc identité ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <p>{{ designation.NOM }} {{ designation.PRENOM }}</p>
      <div class="flex flex--row gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="folder" size="caption" color="neutral-600" /> N°
            Dossier
          </span>
          <span class="text--body text--neutral-900">{{
            designation.IDF_NODOSSIER
          }}</span>
        </div>

        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="shield" size="caption" color="neutral-600" /> NIR
          </span>
          <span class="text--body text--neutral-900">
            {{ formatNIR(designation.IDF_NOSS) }}
          </span>
        </div>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc déclaration ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">Déclaration</span>

      <div v-if="designation.DATE_DECLARATION" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Date de déclaration</span>
        <span class="text--body text--neutral-900">{{ formatDate(designation.DATE_DECLARATION) }}</span>
      </div>

      <div class="flex flex--row gap--regular">
        <div v-if="designation.NUM_PART" class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">N° Participant</span>
          <span class="text--body text--neutral-900">{{ designation.NUM_PART }}</span>
        </div>
        <div v-if="designation.NUM_FIRME" class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">N° Firme</span>
          <span class="text--body text--neutral-900">{{ designation.NUM_FIRME }}</span>
        </div>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc adresse (conditionnel) ── -->
  <LcCardContainer
    v-if="designation.ADRESSE1 || designation.CODE_POSTAL || designation.VILLE"
    :border="true"
    padding="regular"
  >
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">Adresse</span>

      <div class="flex flex--column gap--micro">
        <span class="text--body text--neutral-900">
          {{
            [designation.ADRESSE1, designation.ADRESSE2, designation.ADRESSE3]
              .filter(Boolean)
              .join(", ")
          }}
        </span>
        <span class="text--body text--neutral-900">
          {{ [designation.CODE_POSTAL, designation.VILLE].filter(Boolean).join(" ") }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bouton retour ── -->
  <LcButton
    variant="secondary"
    icon-left="arrow-left"
    @click="navigateTo('/sotrel')"
  >
    Retour à la recherche
  </LcButton>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Colonne gauche de la page désignation de bénéficiaire (DB)
   Blocs : Identité, Déclaration, Adresse
   ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcIcon,
  LcButton,
} from "@projetlucie/lc-front-components";
import type { SotrelDesignation } from "~/types/database";
import { formatDate, formatNIR } from "~/utils/formatters";

defineProps<{
  designation: SotrelDesignation;
}>();
</script>
