<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Onglet 2 — Calcul du capital
   Source : SDO_SOT_03_CAPITAL
   Sections : Salaires, Calcul, Complément (conditionnel)
   ══════════════════════════════════════════════════════════════ */

import { LcCardContainer, LcLoader, LcPill, COLOR_ENUM } from '@projetlucie/lc-front-components'
import type { SotrelCapital } from '~/types/database'
import { formatCurrency, formatDate } from '~/utils/formatters'

const props = defineProps<{ nodossier: string }>()

const { data, pending } = await useFetch<{ data: SotrelCapital | null }>(
  `/api/sotrel/${props.nodossier}/capital`,
)

const capital = computed(() => data.value?.data ?? null)
</script>

<template>
  <div v-if="pending" class="empty-state">
    <LcLoader variant="primary" size="md" />
  </div>

  <div v-else-if="capital" class="page-section">
    <!-- ── Références salaires ── -->
    <LcCardContainer :border="true" padding="regular">
      <template #header>
        <span class="section-block__title">Références salaires</span>
      </template>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-item__label">Salaire T1</span>
          <span class="detail-item__value">{{ formatCurrency(capital.SALAIRE_TRIMESTRE_1) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Salaire T2</span>
          <span class="detail-item__value">{{ formatCurrency(capital.SALAIRE_TRIMESTRE_2) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Salaire T3</span>
          <span class="detail-item__value">{{ formatCurrency(capital.SALAIRE_TRIMESTRE_3) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Salaire T4</span>
          <span class="detail-item__value">{{ formatCurrency(capital.SALAIRE_TRIMESTRE_4) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Salaire annuel</span>
          <span class="detail-item__value">{{ formatCurrency(capital.SALAIRE_ANNUEL) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Salaire de référence</span>
          <span class="detail-item__value">{{ formatCurrency(capital.SALAIRE_DE_REFERENCE) }}</span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Calcul du capital ── -->
    <LcCardContainer :border="true" padding="regular">
      <template #header>
        <span class="section-block__title">Calcul du capital</span>
      </template>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-item__label">Pourcentage 1</span>
          <span class="detail-item__value">{{ capital.POURCENTAGE1 ?? '–' }} %</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Pourcentage 2</span>
          <span class="detail-item__value">{{ capital.POURCENTAGE2 ?? '–' }} %</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Pourcentage 3</span>
          <span class="detail-item__value">{{ capital.POURCENTAGE3 ?? '–' }} %</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Nombre 24ème</span>
          <span class="detail-item__value">{{ capital.NOMBRE_24 ?? '–' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Capital</span>
          <span class="detail-item__value">{{ formatCurrency(capital.CAPITAL) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Majoration</span>
          <span class="detail-item__value">{{ formatCurrency(capital.MAJORATION) }}</span>
        </div>
        <div class="detail-item capital-total">
          <span class="detail-item__label">Total à payer</span>
          <LcPill :variant="COLOR_ENUM.SUCCESS" size="regular">
            {{ formatCurrency(capital.TOTAL) }}
          </LcPill>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Date de paiement</span>
          <span class="detail-item__value">{{ formatDate(capital.DATE_PAIEMENT) }}</span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Complément (conditionnel) ── -->
    <LcCardContainer v-if="capital.COMPLEMENT" :border="true" padding="regular">
      <template #header>
        <span class="section-block__title">Complément</span>
      </template>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-item__label">Complément</span>
          <span class="detail-item__value">{{ formatCurrency(capital.COMPLEMENT) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Revalorisation</span>
          <span class="detail-item__value">{{ formatCurrency(capital.REVALORISATION) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Date complément</span>
          <span class="detail-item__value">{{ formatDate(capital.DATE_COMPLEMENT) }}</span>
        </div>
      </div>
    </LcCardContainer>
  </div>

  <div v-else class="empty-state">
    <p>Aucune donnée de capital disponible pour ce dossier.</p>
  </div>
</template>

<style scoped>
.capital-total {
  background: var(--colors--success-100);
  padding: var(--gutters--small);
  border-radius: var(--radius--small);
}
</style>
