<template>
  <LcModal
    id="benef-detail-modal"
    v-model="showModal"
    width="900px"
    height="auto"
    :close-on-backdrop="true"
  >
    <!-- Chargement -->
    <div v-if="loading" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
      <LcLoader variant="primary" size="md" />
    </div>

    <div v-else-if="benef" class="modal-content flex flex--column gap--medium">
      <LcTitleSection :type="titleEnum.H3">
        {{ benef.TITRE_BENF }} {{ benef.NOM_BENEF }}
      </LcTitleSection>

      <!-- ── Signalétique ── -->
      <div class="flex flex--column gap--medium p--regular bg--neutral-100 radius">
        <span class="text--subheader-semibold text--neutral-800">Signalétique</span>
        <div class="grid grid--2-col grid--fluid gap--regular">
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">N° Bénéficiaire</span>
            <span class="text--body text--neutral-900 text-mono">{{ benef.NUM_BENEF }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Adresse</span>
            <span class="text--body text--neutral-900">
              {{ [benef.ADRESSE1_BENEF, benef.ADRESSE2_BENEF, benef.ADRESSE3_BENEF].filter(Boolean).join(', ') }}
              <br v-if="benef.CODE_POSTAL_BENEF || benef.VILLE_BENEF" />
              {{ [benef.CODE_POSTAL_BENEF, benef.VILLE_BENEF].filter(Boolean).join(' ') }}
            </span>
          </div>
        </div>
      </div>

      <!-- ── Capital payé ── -->
      <div class="flex flex--column gap--medium p--regular bg--neutral-100 radius">
        <span class="text--subheader-semibold text--neutral-800">Capital payé</span>
        <div class="grid grid--3-col grid--fluid gap--regular">
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Montant capital</span>
            <span class="text--body text--neutral-900">{{ formatCurrency(benef.CAPITAL_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Destinataire</span>
            <span class="text--body text--neutral-900">{{ formatCurrency(benef.DESTINATAIRE_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Enfant(s)</span>
            <span class="text--body text--neutral-900">{{ formatCurrency(benef.ENFANT_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Date capital</span>
            <span class="text--body text--neutral-900">{{ formatDate(benef.DATE_CAPITAL_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Mode de paiement</span>
            <span class="text--body text--neutral-900">{{ benef.MODE_PAIE_BENEF || '–' }}</span>
          </div>
        </div>
      </div>

      <!-- ── Coordonnées bancaires ── -->
      <div class="flex flex--column gap--medium p--regular bg--neutral-100 radius">
        <span class="text--subheader-semibold text--neutral-800">Coordonnées bancaires</span>
        <div class="grid grid--3-col grid--fluid gap--regular">
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Domiciliation</span>
            <span class="text--body text--neutral-900">{{ benef.DOMICILIATION_BENEF || '–' }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Code banque</span>
            <span class="text--body text--neutral-900 text-mono">{{ benef.CODE_BQ_BENEF || '–' }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Guichet</span>
            <span class="text--body text--neutral-900 text-mono">{{ benef.GUICHET_BENEF || '–' }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Compte</span>
            <span class="text--body text--neutral-900 text-mono">{{ benef.COMPTE_BENEF || '–' }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Clé</span>
            <span class="text--body text--neutral-900 text-mono">{{ benef.CLE_BENEF || '–' }}</span>
          </div>
        </div>
      </div>

      <!-- ── Complément (conditionnel) ── -->
      <div v-if="benef.COMPLEMENT_BENEF" class="flex flex--column gap--medium p--regular bg--neutral-100 radius">
        <span class="text--subheader-semibold text--neutral-800">Complément</span>
        <div class="grid grid--3-col grid--fluid gap--regular">
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Montant complément</span>
            <span class="text--body text--neutral-900">{{ formatCurrency(benef.COMPLEMENT_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Destinataire</span>
            <span class="text--body text--neutral-900">{{ formatCurrency(benef.DESTINATAIRE_COMPL_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Enfant(s)</span>
            <span class="text--body text--neutral-900">{{ formatCurrency(benef.ENFANT_COMPL_BENEF) }}</span>
          </div>
          <div class="flex flex--column gap--micro">
            <span class="text--caption-semibold text--neutral-600">Date complément</span>
            <span class="text--body text--neutral-900">{{ formatDate(benef.DATE_COMPL_BENEF) }}</span>
          </div>
        </div>
      </div>

      <!-- ── Personnes à charge ── -->
      <div v-if="charges.length > 0" class="flex flex--column gap--medium p--regular bg--neutral-100 radius">
        <span class="text--subheader-semibold text--neutral-800">Personnes à charge</span>
        <ul class="charges-list flex flex--column gap--small">
          <li v-for="(charge, index) in charges" :key="index" class="text--body text--neutral-800 p--small bg--neutral-200 radius--small">
            {{ charge }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Footer modal -->
    <div class="flex flex--justify-end gap--small mt--regular">
      <LcButton variant="primary" icon-left="x" @click="showModal = false">
        Fermer
      </LcButton>
    </div>
  </LcModal>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Modale détail d'un bénéficiaire
   Sections : Signalétique, Capital payé, Coordonnées bancaires,
              Complément (conditionnel), Personnes à charge
   ══════════════════════════════════════════════════════════════ */

import {
  LcModal,
  LcButton,
  LcLoader,
  LcTitleSection,
  titleEnum,
} from '@projetlucie/lc-front-components'
import type { SotrelBenefDetail } from '~/types/database'
import { formatCurrency, formatDate } from '~/utils/formatters'

const showModal = defineModel<boolean>({ required: true })

const props = defineProps<{
  benef: SotrelBenefDetail | null
  loading: boolean
}>()

// Personnes à charge (CHARGE_001..003_BENEF si non vides)
const charges = computed(() => {
  if (!props.benef) return []
  return [
    props.benef.CHARGE_001_BENEF,
    props.benef.CHARGE_002_BENEF,
    props.benef.CHARGE_003_BENEF,
  ].filter(Boolean) as string[]
})
</script>

<style scoped>
.modal-content {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 4px;
}

.charges-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
