<template>
  <div class="page-section">
    <div class="page-section__header">
      <LcTitleSection :type="titleEnum.H1">Utilisateurs</LcTitleSection>
    </div>

    <!-- ── Barre de recherche ── -->
    <div class="search-filters">
      <div class="search-filters__field">
        <label>Rechercher</label>
        <LcInput
          v-model="search"
          placeholder="Nom ou email..."
          @keydown.enter="handleSearch"
        />
      </div>
      <LcButton variant="primary" icon-left="search" @click="handleSearch">
        Rechercher
      </LcButton>
    </div>

    <!-- ── Loader ── -->
    <div v-if="pending" class="empty-state">
      <LcLoader variant="primary" size="lg" />
    </div>

    <!-- ── Table ── -->
    <LcTable
      v-else
      id="admin-users-table"
      :items="data?.data ?? []"
      :headers="ADMIN_USERS_HEADERS"
      :current-page="currentPage"
      :rows-per-page="rowsPerPage"
      :sort-by="sortBy"
      :sort-type="sortType"
      :is-pagination="true"
      :handle-pagination="true"
      :total-items-length="data?.total ?? 0"
      :is-line-clickable="true"
      :has-border="true"
      :has-header-radius="true"
      no-result-message="Aucun utilisateur trouvé"
      @update:current-page="currentPage = $event"
      @line-clicked="handleRowClick"
    >
      <!-- Rôle -->
      <template #role="{ data: cellData }">
        <LcPill
          :variant="
            cellData === 'ADMIN' ? COLOR_ENUM.DANGER : COLOR_ENUM.NEUTRAL
          "
          size="small"
        >
          {{ cellData }}
        </LcPill>
      </template>

      <!-- Domaines -->
      <template #domains="{ data: cellData }">
        <div class="flex flex--gap-sm flex--wrap">
          <LcPill
            v-for="domain in cellData ?? []"
            :key="domain"
            :variant="COLOR_ENUM.INFO"
            size="small"
          >
            {{ domain }}
          </LcPill>
        </div>
      </template>

      <!-- Statut -->
      <template #is_active="{ data: cellData, item }">
        <LcPill
          :variant="cellData ? COLOR_ENUM.SUCCESS : COLOR_ENUM.DANGER"
          size="small"
        >
          {{ cellData ? "Actif" : "Inactif" }}
        </LcPill>
      </template>

      <!-- Dernière connexion -->
      <template #last_login="{ data: cellData }">
        <span v-if="typeof cellData === 'string' && cellData">{{
          formatDate(cellData)
        }}</span>
        <LcIcon v-else name="minus" color="neutral-400" />
      </template>

      <!-- Actions -->
      <template #actions="{ item }">
        <div class="flex flex--gap-sm flex--align-center">
          <LcButton
            variant="tertiary"
            icon-left="edit"
            @click.stop="navigateTo(`/admin/users/${String(item.id)}`)"
          >
            Éditer
          </LcButton>
        </div>
      </template>
    </LcTable>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Admin — Liste des utilisateurs
   LcTable avec pagination serveur, recherche par email/nom
   ══════════════════════════════════════════════════════════════ */

import {
  LcTable,
  LcPill,
  LcButton,
  LcIcon,
  LcInput,
  LcLoader,
  LcTitleSection,
  LcToggle,
  COLOR_ENUM,
  titleEnum,
} from "@projetlucie/lc-front-components";
import { ADMIN_USERS_HEADERS } from "~/types/table-headers";
import { formatDate } from "~/utils/formatters";

// ── Recherche et pagination ──
const search = ref("");
const currentPage = ref(1);
const rowsPerPage = ref(25);
const sortBy = ref<string[]>(["display_name"]);
const sortType = ref<string[]>(["asc"]);

// Define a type for your user items
type AdminUser = {
  id: string | number;
  display_name: string;
  email: string;
  role: string;
  domains?: string[];
  is_active: boolean;
  last_login?: string | null;
  // add other fields as needed
};

const { data, pending, refresh } = await useFetch<{
  data: AdminUser[];
  total: number;
}>("/api/admin/users", {
  query: computed(() => ({
    page: currentPage.value,
    limit: rowsPerPage.value,
    sortBy: sortBy.value?.[0] ?? "display_name",
    sortType: sortType.value?.[0] ?? "asc",
    search: search.value || undefined,
  })),
  watch: [currentPage, sortBy, sortType],
});

const handleSearch = () => {
  currentPage.value = 1;
  refresh();
};

const handleRowClick = (row: AdminUser) => {
  navigateTo(`/admin/users/${String(row.id)}`);
};

// ── Toggle actif/inactif depuis la liste ──
const toggleActive = async (user: any) => {
  try {
    await $fetch(`/api/admin/users/${user.id}`, {
      method: "PUT",
      body: { is_active: !user.is_active },
    });
    refresh();
  } catch (err) {
    console.error("[Admin users] Toggle error:", err);
  }
};
</script>
