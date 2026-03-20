<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Page recherche SOTREL
   3 critères : N° SS, Nom, N° Dossier (au moins 1 requis)
   Résultats paginés avec LcTable (pagination serveur)
   ══════════════════════════════════════════════════════════════ */

import {
  LcButton,
  LcInput,
  LcTable,
  LcPill,
  LcIcon,
  LcLoader,
  LcTitleSection,
  CtaVariant,
  COLOR_ENUM,
  titleEnum,
} from '@projetlucie/lc-front-components'
import { RECHERCHE_HEADERS } from '~/types/table-headers'
import type { SotrelRecherche } from '~/types/database'
import { formatDate } from '~/utils/formatters'

// ── État des champs de recherche ──
const noss = ref('')
const nom = ref('')
const nodoss = ref('')

// ── Critères appliqués (après clic sur Rechercher) ──
const appliedNoss = ref('')
const appliedNom = ref('')
const appliedNodoss = ref('')

// ── Pagination et tri ──
const currentPage = ref(1)
const rowsPerPage = ref(25)
const sortBy = ref<string[]>(['NOM'])
const sortType = ref<string[]>(['asc'])
const selectedArray = ref<SotrelRecherche[]>([])

// ── Indicateur de recherche lancée ──
const hasSearched = ref(false)

// Au moins un critère doit être renseigné
const canSearch = computed(() =>
  noss.value.trim() !== '' || nom.value.trim() !== '' || nodoss.value.trim() !== '',
)

// ── Appel API avec useFetch réactif ──
const { data, pending, refresh } = await useFetch<{ data: SotrelRecherche[]; total: number }>('/api/sotrel/recherche', {
  query: computed(() => ({
    page: currentPage.value,
    limit: rowsPerPage.value,
    sortBy: sortBy.value?.[0] ?? 'NOM',
    sortType: sortType.value?.[0] ?? 'asc',
    noss: appliedNoss.value || undefined,
    nom: appliedNom.value || undefined,
    nodoss: appliedNodoss.value || undefined,
  })),
  watch: [currentPage, sortBy, sortType, appliedNoss, appliedNom, appliedNodoss],
  immediate: false,
})

// ── Actions ──
const handleSearch = () => {
  appliedNoss.value = noss.value.trim()
  appliedNom.value = nom.value.trim()
  appliedNodoss.value = nodoss.value.trim()
  currentPage.value = 1
  hasSearched.value = true
  refresh()
}

const handleReset = () => {
  noss.value = ''
  nom.value = ''
  nodoss.value = ''
  appliedNoss.value = ''
  appliedNom.value = ''
  appliedNodoss.value = ''
  hasSearched.value = false
  currentPage.value = 1
}

const handleRowClick = (row: SotrelRecherche) => {
  navigateTo(`/sotrel/${row.IDF_NODOSS}`)
}

// Critères actifs pour les pills
const activeFilters = computed(() => {
  const filters: { label: string; value: string }[] = []
  if (appliedNoss.value) filters.push({ label: 'N° SS', value: appliedNoss.value })
  if (appliedNom.value) filters.push({ label: 'Nom', value: appliedNom.value })
  if (appliedNodoss.value) filters.push({ label: 'N° Dossier', value: appliedNodoss.value })
  return filters
})
</script>

<template>
  <div class="page-section">
    <LcTitleSection :type="titleEnum.H1">Recherche SOTREL</LcTitleSection>

    <!-- ── Filtres de recherche ── -->
    <div class="search-filters">
      <div class="search-filters__field">
        <label>N° Sécurité Sociale</label>
        <LcInput v-model="noss" placeholder="Ex : 1 85 01 75 XXX" @keydown.enter="canSearch && handleSearch()" />
      </div>
      <div class="search-filters__field">
        <label>Nom</label>
        <LcInput v-model="nom" placeholder="Nom de l'assuré" @keydown.enter="canSearch && handleSearch()" />
      </div>
      <div class="search-filters__field">
        <label>N° Dossier</label>
        <LcInput v-model="nodoss" placeholder="Ex : 12345678" @keydown.enter="canSearch && handleSearch()" />
      </div>
      <LcButton
        :variant="CtaVariant.PRIMARY"
        icon-left="search"
        :disabled="!canSearch"
        @click="handleSearch"
      >
        Rechercher
      </LcButton>
      <LcButton
        v-if="hasSearched"
        :variant="CtaVariant.SECONDARY"
        icon-left="x"
        @click="handleReset"
      >
        Réinitialiser
      </LcButton>
    </div>

    <!-- ── Pills des critères appliqués ── -->
    <div v-if="activeFilters.length > 0" class="applied-filters">
      <LcPill
        v-for="filter in activeFilters"
        :key="filter.label"
        :variant="COLOR_ENUM.INFO"
        size="small"
      >
        {{ filter.label }} : {{ filter.value }}
      </LcPill>
    </div>

    <!-- ── Loader ── -->
    <div v-if="pending" class="empty-state">
      <LcLoader variant="primary" size="lg" />
    </div>

    <!-- ── État initial (pas encore de recherche) ── -->
    <div v-else-if="!hasSearched" class="empty-state">
      <LcIcon name="search" size="display" color="neutral-400" />
      <p>Saisissez au moins un critère pour lancer la recherche.</p>
    </div>

    <!-- ── Résultats ── -->
    <LcTable
      v-else
      id="sotrel-recherche-table"
      :model-value="selectedArray"
      :current-page="currentPage"
      :items="data?.data ?? []"
      :headers="RECHERCHE_HEADERS"
      :rows-per-page="rowsPerPage"
      :sort-by="sortBy"
      :sort-type="sortType"
      :is-pagination="true"
      :handle-pagination="true"
      :total-items-length="data?.total ?? 0"
      :is-line-clickable="true"
      :has-border="true"
      :has-header-radius="true"
      :can-select-page-length="true"
      no-result-message="Aucun assuré trouvé"
      @update:current-page="currentPage = $event"
      @line-clicked="handleRowClick"
    >
      <!-- Slot N° SS : texte monospace -->
      <template #IDF_NOSS="{ data: cellData }">
        <span class="text-mono">{{ cellData }}</span>
      </template>

      <!-- Slot Type sinistre : pill -->
      <template #TYPE_SINISTRE="{ data: cellData }">
        <LcPill v-if="cellData" :variant="COLOR_ENUM.INFO" size="small">{{ cellData }}</LcPill>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <!-- Slot Date sinistre : formatée -->
      <template #DATE_SINISTRE="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>
    </LcTable>
  </div>
</template>
