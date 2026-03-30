<template>
  <!-- ── Bloc identité (mis en avant) ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <p>{{ rg.NOM }} {{ rg.PRENOM }}</p>
      <div class="flex flex--row gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="folder" size="caption" color="neutral-600" /> N°
            Dossier
          </span>
          <span class="text--body text--neutral-900">{{
            rg.IDF_NODOSSIER
          }}</span>
        </div>

        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="shield" size="caption" color="neutral-600" /> NIR
          </span>
          <span class="text--body text--neutral-900">
            {{ formatNIR(rg.IDF_NOSS) }}
          </span>
        </div>
      </div>

      <div v-if="rg.CODE_ETAT" class="flex flex--column gap--micro">
        <div class="flex flex--row gap--regular">
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">
              Code état
            </span>
            <LcPill :variant="COLOR_ENUM.NEUTRAL" size="small">
              {{ rg.CODE_ETAT }}
            </LcPill>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">
              Date état
            </span>
            <span v-if="rg.DATE_ETAT" class="text--body text--neutral-900">
              {{ formatDate(rg.DATE_ETAT) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc sinistre ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <div class="flex flex--column gap--small">
        <span class="text--subheader-semibold text--neutral-800">Sinistre</span>

        <div class="flex flex--row gap--regular">
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">
              Type sinistre
            </span>
            <LcPill
              v-if="rg.TYPE_SINISTRE"
              :variant="COLOR_ENUM.NEUTRAL"
              size="small"
            >
              {{ rg.TYPE_SINISTRE }}
            </LcPill>
          </div>
          <div v-if="rg.ORGANISME" class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">
              Organisme
            </span>
            <span
              class="text--body text--neutral-900 flex flex--align-center justify-center gap--small"
            >
              {{ rg.ORGANISME }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex--row gap--regular">
        <div v-if="rg.DATE_SINISTRE" class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Date sinistre
          </span>
          <span class="text--body text--neutral-900">
            {{ formatDate(rg.DATE_SINISTRE) }}
          </span>
        </div>

        <div v-if="rg.DATE_ARRET" class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Date arrêt travail
          </span>
          <span class="text--body text--neutral-900">
            {{ formatDate(rg.DATE_ARRET) }}
          </span>
        </div>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc correspondant (conditionnel) ── -->
  <LcCardContainer v-if="rg.NOM_CORRESPONDANT" :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">
        Correspondant
      </span>

      <div class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Nom</span>
        <span class="text--body text--neutral-900">
          {{ rg.TITRE_CORRESPONDANT }} {{ rg.NOM_CORRESPONDANT }}
        </span>
      </div>

      <div class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Adresse</span>
        <span class="text--body text--neutral-900">
          {{
            [
              rg.ADRESSE1_CORRESPONDANT,
              rg.ADRESSE2_CORRESPONDANT,
              rg.ADRESSE3_CORRESPONDANT,
            ]
              .filter(Boolean)
              .join(", ")
          }}
        </span>
        <span class="text--body text--neutral-900">
          {{
            [rg.CP_CORRESPONDANT, rg.VILLE_CORRESP].filter(Boolean).join(" ")
          }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc employeur (conditionnel) ── -->
  <LcCardContainer v-if="rg.RAISON_SOCIALE" :border="true" padding="regular">
    <div class="flex flex--column gap--small">
      <span class="text--subheader-semibold text--neutral-800">Employeur</span>

      <div class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">N° Firme</span>
        <span class="text--body text--neutral-900 text-mono">
          {{ rg.NUMERO_FIRME }}
        </span>
      </div>

      <div class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">
          Raison sociale
        </span>
        <span class="text--body text--neutral-900">
          {{ rg.RAISON_SOCIALE }}
        </span>
      </div>

      <div class="flex flex--column gap--micro">
        <span class="text--caption-semibold text--neutral-600">Adresse</span>
        <span class="text--body text--neutral-900">
          {{
            [
              rg.ADRESSE1_EMPLOYEUR,
              rg.ADRESSE2_EMPLOYEUR,
              rg.ADRESSE3_EMPLOYEUR,
            ]
              .filter(Boolean)
              .join(", ")
          }}
          <br v-if="rg.CP_EMPLOYEUR || rg.VILLE_EMPLOYEUR" />
          {{ [rg.CP_EMPLOYEUR, rg.VILLE_EMPLOYEUR].filter(Boolean).join(" ") }}
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
   Colonne gauche de la fiche assuré
   Blocs : Identité, Sinistre, Correspondant, Employeur
   ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcIcon,
  LcPill,
  LcButton,
  COLOR_ENUM,
} from "@projetlucie/lc-front-components";
import type { SotrelRgAssure } from "~/types/database";
import { formatDate, formatNIR } from "~/utils/formatters";

const props = defineProps<{
  rg: SotrelRgAssure;
}>();
</script>
