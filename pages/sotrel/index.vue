<template>
  <div class="flex gap--regular">
    <!-- ── Colonne gauche : formulaire de recherche ── -->
    <div class="search-sidebar">
      <LcCardContainer :border="true" padding="regular">
        <div class="flex flex--column gap--medium">
          <div class="flex flex--column gap--micro">
            <label class="text--caption-semibold text--neutral-800">N° Sécurité Sociale</label>
            <LcInput
              v-model="noss"
              placeholder="Ex : 1 85 01 75 XXX"
              @keydown.enter="canSearch && handleSearch()"
            />
          </div>
          <div class="flex flex--column gap--micro">
            <label class="text--caption-semibold text--neutral-800">Nom</label>
            <LcInput
              v-model="nom"
              placeholder="Nom de l'assuré"
              @keydown.enter="canSearch && handleSearch()"
            />
          </div>
          <div class="flex flex--column gap--micro">
            <label class="text--caption-semibold text--neutral-800">N° Dossier</label>
            <LcInput
              v-model="nodoss"
              placeholder="Ex : 12345678"
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
        <template #header>
          <span class="text--subheader-semibold text--neutral-800">Résultats de recherche</span>
        </template>

        <!-- Loader -->
        <div v-if="pending && hasSearched" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
          <LcLoader variant="primary" size="lg" />
        </div>

        <!-- État initial (pas encore de recherche) -->
        <div v-else-if="!hasSearched" class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center">
          <LcIcon name="search" size="display" color="neutral-400" />
          <p>Aucun résultat disponible...</p>
        </div>

        <!-- Résultats -->
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
            <span>{{ cellData }}</span>
          </template>

          <!-- Slot Type sinistre : pill -->
          <template #TYPE_SINISTRE="{ data: cellData }">
            <LcPill v-if="cellData" :variant="COLOR_ENUM.INFO" size="small">
              {{ cellData }}
            </LcPill>
            <LcIcon v-else name="minus" color="neutral-400" />
          </template>

          <!-- Slot Date sinistre : formatée -->
          <template #DATE_SINISTRE="{ data: cellData }">
            <span v-if="cellData">{{ formatDate(cellData) }}</span>
            <LcIcon v-else name="minus" color="neutral-400" />
          </template>
        </LcTable>
      </LcCardContainer>
    </div>
  </div>
</template>

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
  LcCardContainer,
  COLOR_ENUM,
} from "@projetlucie/lc-front-components";
import { RECHERCHE_HEADERS } from "~/types/table-headers";
import type { SotrelRecherche } from "~/types/database";
import { formatDate } from "~/utils/formatters";

definePageMeta({ layout: "domain" });

// ── État des champs de recherche ──
const noss = ref("");
const nom = ref("");
const nodoss = ref("");

// ── Critères appliqués (après clic sur Rechercher) ──
const appliedNoss = ref("");
const appliedNom = ref("");
const appliedNodoss = ref("");

// ── Pagination et tri ──
const currentPage = ref(1);
const rowsPerPage = ref(25);
const sortBy = ref<string[]>(["NOM"]);
const sortType = ref<string[]>(["asc"]);
const selectedArray = ref<SotrelRecherche[]>([]);

// ── Indicateur de recherche lancée ──
const hasSearched = ref(false);

// Au moins un critère doit être renseigné
const canSearch = computed(
  () =>
    noss.value.trim() !== "" ||
    nom.value.trim() !== "" ||
    nodoss.value.trim() !== "",
);

// ── Appel API avec useFetch réactif ──
const { data, pending, refresh } = await useFetch<{
  data: SotrelRecherche[];
  total: number;
}>("/api/sotrel/recherche", {
  query: computed(() => ({
    page: currentPage.value,
    limit: rowsPerPage.value,
    sortBy: sortBy.value?.[0] ?? "NOM",
    sortType: sortType.value?.[0] ?? "asc",
    noss: appliedNoss.value || undefined,
    nom: appliedNom.value || undefined,
    nodoss: appliedNodoss.value || undefined,
  })),
  watch: [
    currentPage,
    sortBy,
    sortType,
    appliedNoss,
    appliedNom,
    appliedNodoss,
  ],
  immediate: false,
});

// ── Actions ──
const handleSearch = () => {
  appliedNoss.value = noss.value.trim();
  appliedNom.value = nom.value.trim();
  appliedNodoss.value = nodoss.value.trim();
  currentPage.value = 1;
  hasSearched.value = true;
  refresh();
};

const handleReset = () => {
  noss.value = "";
  nom.value = "";
  nodoss.value = "";
  appliedNoss.value = "";
  appliedNom.value = "";
  appliedNodoss.value = "";
  hasSearched.value = false;
  currentPage.value = 1;
};

const handleRowClick = (row: SotrelRecherche) => {
  if (row.TYPE_DOSSIER === 'DB') {
    navigateTo(`/sotrel/designation/${row.IDF_NODOSSIER}`);
  } else {
    navigateTo(`/sotrel/${row.IDF_NODOSSIER}`);
  }
};

// Critères actifs pour les pills
const activeFilters = computed(() => {
  const filters: { label: string; value: string }[] = [];
  if (appliedNoss.value)
    filters.push({ label: "N° SS", value: appliedNoss.value });
  if (appliedNom.value) filters.push({ label: "Nom", value: appliedNom.value });
  if (appliedNodoss.value)
    filters.push({ label: "N° Dossier", value: appliedNodoss.value });
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
