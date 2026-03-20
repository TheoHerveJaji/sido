<template>
  <div class="page-section">
    <LcTitleSection :type="titleEnum.H1">Domaines</LcTitleSection>

    <div v-if="pending" class="empty-state">
      <LcLoader variant="primary" size="lg" />
    </div>

    <LcTable
      v-else
      id="admin-domains-table"
      :items="data?.data ?? []"
      :headers="ADMIN_DOMAINS_HEADERS"
      :is-pagination="false"
      :has-border="true"
      :has-header-radius="true"
      :is-line-clickable="false"
      no-result-message="Aucun domaine configuré"
    >
      <!-- Statut -->
      <template #is_active="{ data: cellData, item }">
        <LcToggle
          :model-value="Boolean(cellData)"
          @update:model-value="toggleDomain(item)"
        >
          {{ cellData ? "Actif" : "Inactif" }}
        </LcToggle>
      </template>

      <!-- Actions -->
      <template #actions="{ item }">
        <LcButton
          variant="tertiary"
          icon-left="edit"
          @click="openEditModal(item)"
        >
          Éditer
        </LcButton>
      </template>
    </LcTable>

    <!-- ── Modal édition domaine ── -->
    <LcModal
      id="domain-edit-modal"
      v-model="showEditModal"
      width="500px"
      height="auto"
      :close-on-backdrop="true"
    >
      <div class="flex flex--column flex--gap-md">
        <LcTitleSection :type="titleEnum.H3">
          Éditer — {{ editingDomain?.code }}
        </LcTitleSection>

        <div class="search-filters__field">
          <label>Libellé</label>
          <LcInput v-model="editForm.label" placeholder="Libellé du domaine" />
        </div>

        <div class="search-filters__field">
          <label>Description</label>
          <LcInput v-model="editForm.description" placeholder="Description" />
        </div>

        <div class="search-filters__field">
          <label>Icône</label>
          <LcInput
            v-model="editForm.icon"
            placeholder="Nom de l'icône (ex: shield)"
          />
        </div>

        <div class="modal-footer">
          <div class="flex flex--gap-md">
            <LcButton variant="secondary" @click="showEditModal = false">
              Annuler
            </LcButton>
            <LcButton variant="primary" @click="saveEdit">
              Enregistrer
            </LcButton>
          </div>
        </div>
      </div>
    </LcModal>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Admin — Gestion des domaines
   LcTable listant tous les domaines avec toggle actif/inactif
   ══════════════════════════════════════════════════════════════ */

import {
  LcTable,
  LcPill,
  LcButton,
  LcToggle,
  LcModal,
  LcInput,
  LcLoader,
  LcTitleSection,
  COLOR_ENUM,
  titleEnum,
} from "@projetlucie/lc-front-components";
import { ADMIN_DOMAINS_HEADERS } from "~/types/table-headers";
import type { DomainRecord } from "~/types/auth";

const { data, pending, refresh } = await useFetch<{ data: DomainRecord[] }>(
  "/api/admin/domains",
);

// ── Toggle actif/inactif ──
const toggleDomain = async (domain: DomainRecord) => {
  try {
    await $fetch(`/api/admin/domains/${domain.id}`, {
      method: "PUT",
      body: { is_active: !domain.is_active },
    });
    refresh();
  } catch (err) {
    console.error("[Admin domains] Toggle error:", err);
  }
};

// ── Modal d'édition ──
const showEditModal = ref(false);
const editingDomain = ref<DomainRecord | null>(null);
const editForm = ref({ label: "", description: "", icon: "" });

const openEditModal = (domain: DomainRecord) => {
  editingDomain.value = domain;
  editForm.value = {
    label: domain.label,
    description: domain.description ?? "",
    icon: domain.icon ?? "",
  };
  showEditModal.value = true;
};

const saveEdit = async () => {
  if (!editingDomain.value) return;
  try {
    await $fetch(`/api/admin/domains/${editingDomain.value.id}`, {
      method: "PUT",
      body: editForm.value,
    });
    showEditModal.value = false;
    refresh();
  } catch (err) {
    console.error("[Admin domains] Save error:", err);
  }
};
</script>
