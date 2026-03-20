<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Onglet 1 — Renseignements généraux
   Source : SDO_SOT_02_RG_ASSURE (passé en prop depuis la page)
   Grille 2 colonnes + historique des états
   ══════════════════════════════════════════════════════════════ */

import { LcPill, LcCardContainer, COLOR_ENUM } from '@projetlucie/lc-front-components'
import type { SotrelRgAssure } from '~/types/database'
import { formatDate } from '~/utils/formatters'

const props = defineProps<{
  nodossier: string
  rg: SotrelRgAssure | null
}>()

// ── Extraction de l'historique des états (CODE_ETAT_001..009 / DATE_ETAT_001..009) ──
const etatsHistorique = computed(() => {
  if (!props.rg) return []
  const etats: { code: string; date: string }[] = []
  for (let i = 1; i <= 9; i++) {
    const suffix = String(i).padStart(3, '0')
    const code = (props.rg as any)[`CODE_ETAT_${suffix}`]
    const date = (props.rg as any)[`DATE_ETAT_${suffix}`]
    if (code) {
      etats.push({ code, date: date ?? '' })
    }
  }
  return etats
})
</script>

<template>
  <div v-if="rg" class="page-section">
    <!-- ── Informations générales ── -->
    <LcCardContainer :border="true" padding="regular">
      <template #header>
        <span class="section-block__title">Informations générales</span>
      </template>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-item__label">Adresse</span>
          <span class="detail-item__value">
            {{ [rg.ADRESSE1, rg.ADRESSE2, rg.ADRESSE3].filter(Boolean).join(', ') }}
            <br v-if="rg.CDPOST || rg.VILLE" />
            {{ [rg.CDPOST, rg.VILLE].filter(Boolean).join(' ') }}
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Date de naissance</span>
          <span class="detail-item__value">{{ formatDate(rg.DATNAI) }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Âge</span>
          <span class="detail-item__value">{{ rg.AGE ?? '–' }} ans</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Profession</span>
          <span class="detail-item__value">{{ rg.PROFESSION || '–' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Situation familiale</span>
          <span class="detail-item__value">{{ rg.SITUATION_FAMILIALE || '–' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Situation Carcept</span>
          <span class="detail-item__value">{{ rg.SITUATION_CARCEPT || '–' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">N° FIT</span>
          <span class="detail-item__value detail-item__value--mono">{{ rg.IDF_FIT || '–' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Référence assureur</span>
          <span class="detail-item__value">{{ rg.REFRENCE_ASSUREUR || '–' }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-item__label">Libre service</span>
          <span class="detail-item__value">{{ rg.LIBRE_SERVICE || '–' }}</span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Historique des états ── -->
    <LcCardContainer v-if="etatsHistorique.length > 0" :border="true" padding="regular">
      <template #header>
        <span class="section-block__title">Historique des états</span>
      </template>
      <div class="etats-list">
        <div v-for="(etat, index) in etatsHistorique" :key="index" class="etat-item">
          <LcPill :variant="COLOR_ENUM.NEUTRAL" size="small">{{ etat.code }}</LcPill>
          <span class="detail-item__value">{{ formatDate(etat.date) }}</span>
        </div>
      </div>
    </LcCardContainer>
  </div>
</template>

<style scoped>
.etats-list {
  display: flex;
  flex-direction: column;
  gap: var(--gutters--small);
}

.etat-item {
  display: flex;
  align-items: center;
  gap: var(--gutters--medium);
}
</style>
