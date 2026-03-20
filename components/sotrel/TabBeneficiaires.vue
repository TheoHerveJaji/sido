<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Onglet 5 — Bénéficiaires
   Sources : SDO_SOT_06_LISTE_BENEF (liste) + SDO_SOT_07_BENEF (détail)
   Clic sur une ligne → charge le détail et ouvre la modale
   ══════════════════════════════════════════════════════════════ */

import { LcTable, LcLoader } from '@projetlucie/lc-front-components'
import { BENEF_LISTE_HEADERS } from '~/types/table-headers'
import type { SotrelListeBenef, SotrelBenefDetail } from '~/types/database'

const props = defineProps<{ nodossier: string }>()

// ── Liste des bénéficiaires ──
const { data, pending } = await useFetch<{ data: SotrelListeBenef[] }>(
  `/api/sotrel/${props.nodossier}/beneficiaires`,
)

// ── Détail bénéficiaire (modal) ──
const showModal = ref(false)
const selectedBenef = ref<SotrelBenefDetail | null>(null)
const loadingBenef = ref(false)

const handleBenefClick = async (row: SotrelListeBenef) => {
  if (!row.IDF_NOBENEF) return

  loadingBenef.value = true
  showModal.value = true

  try {
    const response = await $fetch<{ data: SotrelBenefDetail | null }>(
      `/api/sotrel/${props.nodossier}/beneficiaires/${row.IDF_NOBENEF}`,
    )
    selectedBenef.value = response.data
  }
  catch (err) {
    console.error('[TabBeneficiaires] Erreur chargement détail :', err)
    selectedBenef.value = null
  }
  finally {
    loadingBenef.value = false
  }
}
</script>

<template>
  <div v-if="pending" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
    <LcLoader variant="primary" size="md" />
  </div>

  <div v-else>
    <LcTable
      id="sotrel-benef-table"
      :items="data?.data ?? []"
      :headers="BENEF_LISTE_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="true"
      no-result-message="Aucun bénéficiaire pour ce dossier"
      @line-clicked="handleBenefClick"
    />

    <!-- Modale détail bénéficiaire -->
    <BeneficiaireDetailModal
      v-model="showModal"
      :benef="selectedBenef"
      :loading="loadingBenef"
    />
  </div>
</template>
