<template>
  <LcModal
    id="benef-detail-modal"
    v-model="showModal"
    width="700px"
    height="auto"
    :close-on-backdrop="true"
  >
    <!-- Chargement -->
    <div v-if="loading" class="empty-state">
      <LcLoader variant="primary" size="md" />
    </div>

    <div v-else-if="benef" class="flex flex--column flex--gap-md">
      <LcTitleSection :type="titleEnum.H3">
        {{ benef.TITRE_BENF }} {{ benef.NOM_BENEF }}
      </LcTitleSection>

      <!-- ── Signalétique ── -->
      <div class="section-block">
        <span class="section-block__title">Signalétique</span>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item__label">N° Bénéficiaire</span>
            <span class="detail-item__value detail-item__value--mono">{{ benef.NUM_BENEF }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Adresse</span>
            <span class="detail-item__value">
              {{ [benef.ADRESSE1_BENEF, benef.ADRESSE2_BENEF, benef.ADRESSE3_BENEF].filter(Boolean).join(', ') }}
              <br v-if="benef.CODE_POSTAL_BENEF || benef.VILLE_BENEF" />
              {{ [benef.CODE_POSTAL_BENEF, benef.VILLE_BENEF].filter(Boolean).join(' ') }}
            </span>
          </div>
        </div>
      </div>

      <!-- ── Capital payé ── -->
      <div class="section-block">
        <span class="section-block__title">Capital payé</span>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item__label">Montant capital</span>
            <span class="detail-item__value">{{ formatCurrency(benef.CAPITAL_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Destinataire</span>
            <span class="detail-item__value">{{ formatCurrency(benef.DESTINATAIRE_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Enfant(s)</span>
            <span class="detail-item__value">{{ formatCurrency(benef.ENFANT_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Date capital</span>
            <span class="detail-item__value">{{ formatDate(benef.DATE_CAPITAL_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Mode de paiement</span>
            <span class="detail-item__value">{{ benef.MODE_PAIE_BENEF || '–' }}</span>
          </div>
        </div>
      </div>

      <!-- ── Coordonnées bancaires ── -->
      <div class="section-block">
        <span class="section-block__title">Coordonnées bancaires</span>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item__label">Domiciliation</span>
            <span class="detail-item__value">{{ benef.DOMICILIATION_BENEF || '–' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Code banque</span>
            <span class="detail-item__value detail-item__value--mono">{{ benef.CODE_BQ_BENEF || '–' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Guichet</span>
            <span class="detail-item__value detail-item__value--mono">{{ benef.GUICHET_BENEF || '–' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Compte</span>
            <span class="detail-item__value detail-item__value--mono">{{ benef.COMPTE_BENEF || '–' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Clé</span>
            <span class="detail-item__value detail-item__value--mono">{{ benef.CLE_BENEF || '–' }}</span>
          </div>
        </div>
      </div>

      <!-- ── Complément (conditionnel) ── -->
      <div v-if="benef.COMPLEMENT_BENEF" class="section-block">
        <span class="section-block__title">Complément</span>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item__label">Montant complément</span>
            <span class="detail-item__value">{{ formatCurrency(benef.COMPLEMENT_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Destinataire</span>
            <span class="detail-item__value">{{ formatCurrency(benef.DESTINATAIRE_COMPL_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Enfant(s)</span>
            <span class="detail-item__value">{{ formatCurrency(benef.ENFANT_COMPL_BENEF) }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Date complément</span>
            <span class="detail-item__value">{{ formatDate(benef.DATE_COMPL_BENEF) }}</span>
          </div>
        </div>
      </div>

      <!-- ── Personnes à charge ── -->
      <div v-if="charges.length > 0" class="section-block">
        <span class="section-block__title">Personnes à charge</span>
        <ul class="charges-list">
          <li v-for="(charge, index) in charges" :key="index">{{ charge }}</li>
        </ul>
      </div>
    </div>

    <!-- Footer modal -->
    <div class="modal-footer">
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
.charges-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gutters--small);
}

.charges-list li {
  font: var(--fonts--body);
  color: var(--colors--neutral-800);
  padding: var(--gutters--small);
  background: var(--colors--neutral-200);
  border-radius: var(--radius--small);
}
</style>
