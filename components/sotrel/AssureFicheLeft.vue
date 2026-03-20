<template>
  <!-- ── Bloc identité (mis en avant) ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column flex--gap-md">
      <LcTitleSection :type="titleEnum.H3">
        {{ rg.NOM }} {{ rg.PRENOM }}
      </LcTitleSection>

      <div class="detail-item">
        <span class="detail-item__label">
          <LcIcon name="folder" size="caption" color="neutral-600" /> N° Dossier
        </span>
        <span class="detail-item__value detail-item__value--mono">{{ rg.IDF_NODOSSIER }}</span>
      </div>

      <div class="detail-item">
        <span class="detail-item__label">
          <LcIcon name="shield" size="caption" color="neutral-600" /> NIR
        </span>
        <span class="detail-item__value detail-item__value--mono">{{ formatNIR(rg.IDF_NOSS) }}</span>
      </div>

      <div v-if="rg.CODE_ETAT" class="detail-item">
        <span class="detail-item__label">Code état</span>
        <div class="flex flex--align-center flex--gap-sm">
          <LcPill :variant="COLOR_ENUM.INFO" size="small">{{ rg.CODE_ETAT }}</LcPill>
          <span v-if="rg.DATE_ETAT" class="detail-item__value">{{ formatDate(rg.DATE_ETAT) }}</span>
        </div>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc sinistre ── -->
  <LcCardContainer :border="true" padding="regular">
    <div class="flex flex--column flex--gap-md">
      <span class="section-block__title">Sinistre</span>

      <div class="detail-item">
        <span class="detail-item__label">Type sinistre</span>
        <LcPill v-if="rg.TYPE_SINISTRE" :variant="COLOR_ENUM.INFO" size="small">
          {{ rg.TYPE_SINISTRE }}
        </LcPill>
      </div>

      <div v-if="rg.DATE_SINISTRE" class="detail-item">
        <span class="detail-item__label">Date sinistre</span>
        <span class="detail-item__value">{{ formatDate(rg.DATE_SINISTRE) }}</span>
      </div>

      <div v-if="rg.DATE_ARRET" class="detail-item">
        <span class="detail-item__label">Date arrêt travail</span>
        <span class="detail-item__value">{{ formatDate(rg.DATE_ARRET) }}</span>
      </div>

      <div v-if="rg.ORGANISME" class="detail-item">
        <span class="detail-item__label">Organisme</span>
        <span class="detail-item__value">{{ rg.ORGANISME }}</span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc correspondant (conditionnel) ── -->
  <LcCardContainer v-if="rg.NOM_CORRESPONDANT" :border="true" padding="regular">
    <div class="flex flex--column flex--gap-md">
      <span class="section-block__title">Correspondant</span>

      <div class="detail-item">
        <span class="detail-item__label">Nom</span>
        <span class="detail-item__value">{{ rg.TITRE_CORRESPONDANT }} {{ rg.NOM_CORRESPONDANT }}</span>
      </div>

      <div class="detail-item">
        <span class="detail-item__label">Adresse</span>
        <span class="detail-item__value">
          {{ [rg.ADRESSE1_CORRESPONDANT, rg.ADRESSE2_CORRESPONDANT, rg.ADRESSE3_CORRESPONDANT].filter(Boolean).join(', ') }}
          <br v-if="rg.CP_CORRESPONDANT || rg.VILLE_CORRESP" />
          {{ [rg.CP_CORRESPONDANT, rg.VILLE_CORRESP].filter(Boolean).join(' ') }}
        </span>
      </div>
    </div>
  </LcCardContainer>

  <!-- ── Bloc employeur (conditionnel) ── -->
  <LcCardContainer v-if="rg.RAISON_SOCIALE" :border="true" padding="regular">
    <div class="flex flex--column flex--gap-md">
      <span class="section-block__title">Employeur</span>

      <div class="detail-item">
        <span class="detail-item__label">N° Firme</span>
        <span class="detail-item__value detail-item__value--mono">{{ rg.NUMERO_FIRME }}</span>
      </div>

      <div class="detail-item">
        <span class="detail-item__label">Raison sociale</span>
        <span class="detail-item__value">{{ rg.RAISON_SOCIALE }}</span>
      </div>

      <div class="detail-item">
        <span class="detail-item__label">Adresse</span>
        <span class="detail-item__value">
          {{ [rg.ADRESSE1_EMPLOYEUR, rg.ADRESSE2_EMPLOYEUR, rg.ADRESSE3_EMPLOYEUR].filter(Boolean).join(', ') }}
          <br v-if="rg.CP_EMPLOYEUR || rg.VILLE_EMPLOYEUR" />
          {{ [rg.CP_EMPLOYEUR, rg.VILLE_EMPLOYEUR].filter(Boolean).join(' ') }}
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
  LcTitleSection,
  COLOR_ENUM,
  titleEnum,
} from '@projetlucie/lc-front-components'
import type { SotrelRgAssure } from '~/types/database'
import { formatDate, formatNIR } from '~/utils/formatters'

const props = defineProps<{
  rg: SotrelRgAssure
}>()
</script>
