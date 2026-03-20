<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Fiche assuré SOTREL — Layout 2 colonnes + 6 onglets
   Colonne gauche : identité, sinistre, correspondant, employeur
   Zone droite : LcTab avec 6 onglets métier
   ══════════════════════════════════════════════════════════════ */

import { LcTab, LcLoader } from '@projetlucie/lc-front-components'
import type { TabItem } from '@projetlucie/lc-front-components'
import type { SotrelRgAssure } from '~/types/database'

const route = useRoute()
const nodossier = route.params.nodossier as string

// ── Chargement des données RG (renseignements généraux) ──
const { data: rgData, pending } = await useFetch<{ data: SotrelRgAssure | null }>(
  `/api/sotrel/${nodossier}/rg`,
)

const rg = computed(() => rgData.value?.data ?? null)

// ── Définition des onglets ──
const tabs: TabItem[] = [
  { id: 1, label: 'Renseignements généraux', isDisabled: false, iconName: 'user' },
  { id: 2, label: 'Calcul du capital',       isDisabled: false, iconName: 'calculator' },
  { id: 3, label: 'Courriers',               isDisabled: false, iconName: 'mail' },
  { id: 4, label: 'Demandes de fonds',       isDisabled: false, iconName: 'credit-card' },
  { id: 5, label: 'Bénéficiaires',           isDisabled: false, iconName: 'users' },
  { id: 6, label: 'Désignation',             isDisabled: false, iconName: 'file-text' },
]
const activeTab = ref<TabItem>(tabs[0])
</script>

<template>
  <!-- Loader pendant le chargement initial -->
  <div v-if="pending" class="empty-state">
    <LcLoader variant="primary" size="lg" />
  </div>

  <!-- Fiche 2 colonnes -->
  <div v-else class="fiche-layout">
    <!-- Colonne gauche : résumé de l'assuré -->
    <div class="fiche-layout__left">
      <AssureFicheLeft v-if="rg" :rg="rg" />
    </div>

    <!-- Zone principale : onglets -->
    <div class="fiche-layout__right">
      <LcTab v-model="activeTab" :tabs="tabs" :is-full-width="false" />

      <div class="mt--regular">
        <TabRenseignements  v-if="activeTab.id === 1" :nodossier="nodossier" :rg="rg" />
        <TabCapital         v-if="activeTab.id === 2" :nodossier="nodossier" />
        <TabCourriers       v-if="activeTab.id === 3" :nodossier="nodossier" />
        <TabFonds           v-if="activeTab.id === 4" :nodossier="nodossier" />
        <TabBeneficiaires   v-if="activeTab.id === 5" :nodossier="nodossier" />
        <TabDesignation     v-if="activeTab.id === 6" :nodossier="nodossier" />
      </div>
    </div>
  </div>
</template>
