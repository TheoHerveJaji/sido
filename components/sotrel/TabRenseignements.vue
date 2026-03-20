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
  <div v-if="rg" class="flex flex--column gap--regular">
    <!-- ── Informations générales ── -->
    <LcCardContainer :border="true" padding="regular">
      <template #header>
        <span class="text--subheader-semibold text--neutral-800">Informations générales</span>
      </template>
      <div class="grid grid--2-col grid--fluid gap--regular">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Adresse</span>
          <span class="text--body text--neutral-900">
            {{ [rg.ADRESSE1, rg.ADRESSE2, rg.ADRESSE3].filter(Boolean).join(', ') }}
            <br v-if="rg.CDPOST || rg.VILLE" />
            {{ [rg.CDPOST, rg.VILLE].filter(Boolean).join(' ') }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Date de naissance</span>
          <span class="text--body text--neutral-900">{{ formatDate(rg.DATNAI) }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Âge</span>
          <span class="text--body text--neutral-900">{{ rg.AGE ?? '–' }} ans</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Profession</span>
          <span class="text--body text--neutral-900">{{ rg.PROFESSION || '–' }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Situation familiale</span>
          <span class="text--body text--neutral-900">{{ rg.SITUATION_FAMILIALE || '–' }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Situation Carcept</span>
          <span class="text--body text--neutral-900">{{ rg.SITUATION_CARCEPT || '–' }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">N° FIT</span>
          <span class="text--body text--neutral-900 text-mono">{{ rg.IDF_FIT || '–' }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Référence assureur</span>
          <span class="text--body text--neutral-900">{{ rg.REFRENCE_ASSUREUR || '–' }}</span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Libre service</span>
          <span class="text--body text--neutral-900">{{ rg.LIBRE_SERVICE || '–' }}</span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Historique des états ── -->
    <LcCardContainer v-if="etatsHistorique.length > 0" :border="true" padding="regular">
      <template #header>
        <span class="text--subheader-semibold text--neutral-800">Historique des états</span>
      </template>
      <div class="flex flex--column gap--small">
        <div v-for="(etat, index) in etatsHistorique" :key="index" class="flex flex--align-center gap--medium">
          <LcPill :variant="COLOR_ENUM.NEUTRAL" size="small">{{ etat.code }}</LcPill>
          <span class="text--body text--neutral-900">{{ formatDate(etat.date) }}</span>
        </div>
      </div>
    </LcCardContainer>
  </div>
</template>
