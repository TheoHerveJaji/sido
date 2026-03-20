<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Admin — Logs de connexion et d'accès
   LcTable avec pagination serveur + filtres date/action
   ══════════════════════════════════════════════════════════════ */

import {
  LcTable,
  LcPill,
  LcButton,
  LcIcon,
  LcLoader,
  LcTitleSection,
  LcDatepicker,
  LcInputSelect,
  CtaVariant,
  COLOR_ENUM,
  DATEPICKER_MODE,
  titleEnum,
} from '@projetlucie/lc-front-components'
import { ADMIN_LOGS_HEADERS } from '~/types/table-headers'
import { formatDate } from '~/utils/formatters'

// ── Filtres ──
const actionFilter = ref<string | null>(null)
const dateRange = ref<any>(null)

const actionOptions = [
  { name: 'Tous', id: '' },
  { name: 'Connexion', id: 'LOGIN' },
  { name: 'Déconnexion', id: 'LOGOUT' },
  { name: 'Session expirée', id: 'SESSION_EXPIRED' },
  { name: 'Accès refusé', id: 'ACCESS_DENIED' },
]

// ── Pagination ──
const currentPage = ref(1)
const rowsPerPage = ref(25)
const sortBy = ref<string[]>(['created_at'])
const sortType = ref<string[]>(['desc'])

const { data, pending, refresh } = await useFetch<{ data: any[]; total: number }>('/api/admin/logs', {
  query: computed(() => ({
    page: currentPage.value,
    limit: rowsPerPage.value,
    sortBy: sortBy.value?.[0] ?? 'created_at',
    sortType: sortType.value?.[0] ?? 'desc',
    action: actionFilter.value || undefined,
  })),
  watch: [currentPage, sortBy, sortType],
})

const handleFilter = () => {
  currentPage.value = 1
  refresh()
}

/** Couleur du pill selon le type d'action */
const actionColor = (action: string): COLOR_ENUM => {
  switch (action) {
    case 'LOGIN': return COLOR_ENUM.SUCCESS
    case 'LOGOUT': return COLOR_ENUM.NEUTRAL
    case 'SESSION_EXPIRED': return COLOR_ENUM.WARNING
    case 'ACCESS_DENIED': return COLOR_ENUM.DANGER
    default: return COLOR_ENUM.NEUTRAL
  }
}
</script>

<template>
  <div class="page-section">
    <LcTitleSection :type="titleEnum.H1">Logs</LcTitleSection>

    <!-- ── Filtres ── -->
    <div class="search-filters">
      <div class="search-filters__field">
        <label>Action</label>
        <LcInputSelect
          v-model="actionFilter"
          :source="actionOptions"
          mode="single"
          label="name"
          value-prop="id"
          placeholder="Toutes les actions"
        />
      </div>
      <LcButton :variant="CtaVariant.PRIMARY" icon-left="filter" @click="handleFilter">
        Filtrer
      </LcButton>
    </div>

    <!-- ── Loader ── -->
    <div v-if="pending" class="empty-state">
      <LcLoader variant="primary" size="lg" />
    </div>

    <!-- ── Table ── -->
    <LcTable
      v-else
      id="admin-logs-table"
      :items="data?.data ?? []"
      :headers="ADMIN_LOGS_HEADERS"
      :current-page="currentPage"
      :rows-per-page="rowsPerPage"
      :sort-by="sortBy"
      :sort-type="sortType"
      :is-pagination="true"
      :handle-pagination="true"
      :total-items-length="data?.total ?? 0"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="false"
      no-result-message="Aucun log trouvé"
      @update:current-page="currentPage = $event"
    >
      <!-- Date formatée -->
      <template #created_at="{ data: cellData }">
        <span v-if="cellData">{{ formatDate(cellData) }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <!-- Action avec pill coloré -->
      <template #action="{ data: cellData }">
        <LcPill :variant="actionColor(cellData)" size="small">
          {{ cellData }}
        </LcPill>
      </template>
    </LcTable>
  </div>
</template>
