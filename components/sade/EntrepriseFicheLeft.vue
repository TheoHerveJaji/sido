<template>
  <!-- ── Bloc identité (mis en avant) ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <p class="text--subheader-semibold text--neutral-900">
        {{ rg.DENSOC }}
      </p>
      <p v-if="rg.DENSOC1" class="text--body text--neutral-700">
        {{ rg.DENSOC1 }}
      </p>

      <div class="flex flex--row gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="hash" size="caption" color="neutral-600" /> N° Firme
          </span>
          <span class="text--body text--neutral-900">{{
            rg.IDF_KNUMADH
          }}</span>
        </div>

        <div v-if="rg.SIRET" class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="credit-card" size="caption" color="neutral-600" />
            SIRET
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.SIRET }}
          </span>
        </div>
      </div>

      <div class="flex flex--row gap--small">
        <LcPill v-if="rg.TYPE_ENTITE" :variant="COLOR_ENUM.INFO" size="small">
          {{ rg.TYPE_ENTITE }}
        </LcPill>
        <LcPill
          v-if="rg.SITUATION"
          :variant="
            rg.SITUATION === 'DEF' ? COLOR_ENUM.SUCCESS : COLOR_ENUM.NEUTRAL
          "
          size="small"
        >
          {{ rg.SITUATION }}
        </LcPill>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc localisation ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">
        Localisation
      </span>

      <div class="flex flex--column gap--micro">
        <span class="text--body text--neutral-900">
          {{
            [rg.ADRESSE1, rg.ADRESSE2, rg.ADRESSE3, rg.ADRESSE4]
              .filter(Boolean)
              .join(', ')
          }}
        </span>
        <span class="text--body text--neutral-900">
          {{ [rg.CDPOST, rg.VILLE].filter(Boolean).join(' ') }}
        </span>
        <span v-if="rg.CODE_PAYS" class="text--body text--neutral-700">
          {{ rg.CODE_PAYS }}
        </span>
      </div>

      <div v-if="rg.TELEPHONE" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          <LcIcon name="phone" size="caption" color="neutral-600" /> Téléphone
        </span>
        <span class="text--body text--neutral-900">{{ rg.TELEPHONE }}</span>
      </div>

      <div v-if="rg.DATE_CRE" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Date création
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(rg.DATE_CRE) }}
        </span>
      </div>

      <div v-if="rg.DATE_CESS" class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Date cessation
        </span>
        <span class="text--body text--neutral-900">
          {{ formatDate(rg.DATE_CESS) }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bouton retour ── -->
  <LcButton
    variant="secondary"
    icon-left="arrow-left"
    @click="navigateTo('/sade')"
  >
    Retour à la recherche
  </LcButton>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Colonne gauche de la fiche entreprise SADE
   Blocs : Identité, Localisation, Bouton retour
   ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcIcon,
  LcPill,
  LcButton,
  COLOR_ENUM,
} from "@projetlucie/lc-front-components";
import type { SadeRenseignements } from "~/types/database";
import { formatDate } from "~/utils/formatters";

defineProps<{
  rg: SadeRenseignements;
}>();
</script>
