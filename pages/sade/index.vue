<template>
  <div class="flex gap--regular">
    <!-- ── Colonne gauche : formulaire de recherche ── -->
    <div class="search-sidebar">
      <LcCardContainer :border="true" padding="regular">
        <div class="flex flex--column gap--medium">
          <div class="flex flex--column gap--micro">
            <label class="text--caption-semibold text--neutral-800">
              Dénomination sociale
            </label>
            <LcInput
              v-model="denomination"
              placeholder="Ex : KLESIA"
              @keydown.enter="canSearch && handleSearch()"
            />
          </div>
          <div class="flex flex--column gap--micro">
            <label class="text--caption-semibold text--neutral-800">
              N° Firme
            </label>
            <LcInput
              v-model="numfirme"
              placeholder="Ex : 000012345678"
              @keydown.enter="canSearch && handleSearch()"
            />
          </div>
          <div class="flex flex--column gap--micro">
            <label class="text--caption-semibold text--neutral-800">
              SIREN
            </label>
            <LcInput
              v-model="siren"
              placeholder="Ex : 123456789"
              @keydown.enter="canSearch && handleSearch()"
            />
          </div>

          <div class="flex flex--column gap--small">
            <LcButton
              variant="primary"
              icon-left="search"
              :disabled="!canSearch"
              @click="handleSearch"
            >
              Rechercher
            </LcButton>
            <LcButton
              v-if="hasSearched"
              variant="secondary"
              icon-left="x"
              @click="handleReset"
            >
              Réinitialiser
            </LcButton>
          </div>

          <!-- Pills des critères appliqués -->
          <div
            v-if="activeFilters.length > 0"
            class="flex flex--wrap gap--small"
          >
            <LcPill
              v-for="filter in activeFilters"
              :key="filter.label"
              :variant="COLOR_ENUM.INFO"
              size="small"
            >
              {{ filter.label }} : {{ filter.value }}
            </LcPill>
          </div>
        </div>
      </LcCardContainer>
    </div>

    <!-- ── Colonne droite : résultats ── -->
    <div class="flex--1">
      <LcCardContainer :border="true" padding="regular">
        <!-- Loader -->
        <div
          v-if="pending && hasSearched"
          class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
        >
          <LcLoader variant="primary" size="lg" />
        </div>

        <!-- État initial (pas encore de recherche) -->
        <div
          v-else-if="!hasSearched"
          class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
        >
          <LcIcon name="search" size="display" color="neutral-400" />
          <p>Saisissez un critère pour rechercher une entreprise</p>
        </div>

        <!-- Résultats -->
        <LcTable
          v-else
          id="sade-recherche-table"
          :model-value="selectedArray"
          :current-page="currentPage"
          :items="data?.data ?? []"
          :headers="SADE_RECHERCHE_HEADERS"
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
          no-result-message="Aucune entreprise trouvée"
          @update:current-page="currentPage = $event"
          @line-clicked="handleRowClick"
        >
          <!-- Slot Type entité : pill -->
          <template #TYPE_ENTITE="{ data: cellData }">
            <LcPill v-if="cellData" :variant="COLOR_ENUM.INFO" size="small">
              {{ cellData }}
            </LcPill>
            <LcIcon v-else name="minus" color="neutral-400" />
          </template>
        </LcTable>
      </LcCardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Page recherche SADE
   3 critères : Dénomination, N° Firme, SIRET (au moins 1 requis)
   Résultats paginés avec LcTable (pagination serveur)
   ══════════════════════════════════════════════════════════════ */

import {
  LcButton,
  LcInput,
  LcTable,
  LcPill,
  LcIcon,
  LcLoader,
  LcCardContainer,
  COLOR_ENUM,
} from "@projetlucie/lc-front-components";
import { SADE_RECHERCHE_HEADERS } from "~/types/table-headers";
import type { SadeRecherche } from "~/types/database";

definePageMeta({ layout: "domain" });

// ── État persistant de la recherche (survit aux navigations SPA) ──
const {
  denomination,
  numfirme,
  siren,
  appliedDenomination,
  appliedNumfirme,
  appliedSiren,
  currentPage,
  rowsPerPage,
  sortBy,
  sortType,
  hasSearched,
  reset,
} = useSadeSearch();

const selectedArray = ref<SadeRecherche[]>([]);

// Au moins un critère doit être renseigné
const canSearch = computed(
  () =>
    denomination.value.trim() !== "" ||
    numfirme.value.trim() !== "" ||
    siren.value.trim() !== "",
);

// ── Appel API avec useFetch réactif ──
const { data, pending, refresh } = await useFetch<{
  data: SadeRecherche[];
  total: number;
}>("/api/sade/recherche", {
  query: computed(() => ({
    page: currentPage.value,
    limit: rowsPerPage.value,
    sortBy: sortBy.value?.[0] ?? "DENSOC",
    sortType: sortType.value?.[0] ?? "asc",
    denomination: appliedDenomination.value || undefined,
    numfirme: appliedNumfirme.value || undefined,
    siren: appliedSiren.value || undefined,
  })),
  watch: [
    currentPage,
    sortBy,
    sortType,
    appliedDenomination,
    appliedNumfirme,
    appliedSiren,
  ],
  immediate: false,
});

// ── Actions ──
const handleSearch = () => {
  appliedDenomination.value = denomination.value.trim();
  appliedNumfirme.value = numfirme.value.trim();
  appliedSiren.value = siren.value.trim();
  currentPage.value = 1;
  hasSearched.value = true;
  refresh();
};

const handleReset = () => reset();

const handleRowClick = (row: SadeRecherche) => {
  navigateTo(`/sade/${row.IDF_KNUMADH}`);
};

// ── Relancer la recherche si on revient depuis une fiche ──
onMounted(() => {
  if (hasSearched.value) refresh();
});

// Critères actifs pour les pills
const activeFilters = computed(() => {
  const filters: { label: string; value: string }[] = [];
  if (appliedDenomination.value)
    filters.push({ label: "Dénomination", value: appliedDenomination.value });
  if (appliedNumfirme.value)
    filters.push({ label: "N° Firme", value: appliedNumfirme.value });
  if (appliedSiren.value)
    filters.push({ label: "SIREN", value: appliedSiren.value });
  return filters;
});
</script>

<style scoped>
.search-sidebar {
  width: 340px;
  flex-shrink: 0;
  position: sticky;
  top: calc(var(--domain-header-height) + var(--gutters--regular));
  height: fit-content;
  max-height: calc(
    100vh - var(--domain-header-height) - var(--gutters--regular) * 2
  );
  overflow-y: auto;
}
</style>
