<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Onglet 5 — Bénéficiaires
   Sources : SDO_SOT_06_LISTE_BENEF (liste) + SDO_SOT_07_BENEF (détail)
   Clic sur une ligne → charge le détail et ouvre la modale
   ══════════════════════════════════════════════════════════════ */

import {
  LcTable,
  LcLoader,
  LcModal,
  LcButton,
  LcTitleSection,
  titleEnum,
} from "@projetlucie/lc-front-components";
import { BENEF_LISTE_HEADERS } from "~/types/table-headers";
import type { SotrelListeBenef, SotrelBenefDetail } from "~/types/database";
import { formatDate, formatCurrency } from "~/utils/formatters";

const props = defineProps<{ nodossier: string }>();

// ── Liste des bénéficiaires ──
const { data, pending } = await useFetch<{ data: SotrelListeBenef[] }>(
  `/api/sotrel/${props.nodossier}/beneficiaires`,
);

// ── Détail bénéficiaire (modal) ──
const showModal = ref(false);
const selectedBenef = ref<SotrelBenefDetail | null>(null);
const loadingBenef = ref(false);

const charges = computed(() => {
  if (!selectedBenef.value) return [];
  return [
    selectedBenef.value.CHARGE_001_BENEF,
    selectedBenef.value.CHARGE_002_BENEF,
    selectedBenef.value.CHARGE_003_BENEF,
  ].filter(Boolean) as string[];
});

const handleBenefClick = async (row: SotrelListeBenef) => {
  selectedBenef.value = null;
  loadingBenef.value = true;
  showModal.value = true;

  if (!row.IDF_NOBENEF) {
    loadingBenef.value = false;
    return;
  }

  try {
    const response = await $fetch<{ data: SotrelBenefDetail | null }>(
      `/api/sotrel/${props.nodossier}/beneficiaires/${row.IDF_NOBENEF}`,
    );
    selectedBenef.value = response.data;
  } catch (err) {
    console.error("[TabBeneficiaires] Erreur chargement détail :", err);
  } finally {
    loadingBenef.value = false;
  }
};
</script>

<template>
  <div
    v-if="pending"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
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
    >
      <template #DATE_ETAT="{ item }">
        {{ item.DATE_ETAT ? formatDate(item.DATE_ETAT) : "–" }}
      </template>
    </LcTable>

    <!-- ── Modale détail bénéficiaire ── -->
    <LcModal
      id="benef-detail-modal"
      v-model="showModal"
      width="700px"
      height="auto"
      :close-on-backdrop="true"
    >
      <!-- Chargement -->
      <div
        v-if="loadingBenef"
        class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
      >
        <LcLoader variant="primary" size="md" />
      </div>

      <div v-else-if="selectedBenef" class="flex flex--column gap--medium">
        <LcTitleSection :type="titleEnum.H3">
          {{ selectedBenef.TITRE_BENF }} {{ selectedBenef.NOM_BENEF }}
        </LcTitleSection>

        <!-- ── Signalétique ── -->
        <div
          class="flex flex--column gap--medium px--regular bg--neutral-100 radius"
        >
          <span class="text--subheader-semibold text--neutral-800"
            >Signalétique</span
          >
          <div class="grid grid--2-col grid--fluid gap--regular">
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >N° Bénéficiaire</span
              >
              <span class="text--body text--neutral-900 text-mono">{{
                selectedBenef.NUM_BENEF || "–"
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Adresse</span
              >
              <span class="text--body text--neutral-900">
                {{
                  [
                    selectedBenef.ADRESSE1_BENEF,
                    selectedBenef.ADRESSE2_BENEF,
                    selectedBenef.ADRESSE3_BENEF,
                  ]
                    .filter(Boolean)
                    .join(", ") || "–"
                }}
                <br
                  v-if="
                    selectedBenef.CODE_POSTAL_BENEF || selectedBenef.VILLE_BENEF
                  "
                />
                {{
                  [selectedBenef.CODE_POSTAL_BENEF, selectedBenef.VILLE_BENEF]
                    .filter(Boolean)
                    .join(" ")
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- ── Capital payé ── -->
        <div
          class="flex flex--column gap--medium px--regular bg--neutral-100 radius"
        >
          <span class="text--subheader-semibold text--neutral-800"
            >Capital payé</span
          >
          <div class="grid grid--2-col grid--fluid gap--regular">
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Montant capital</span
              >
              <span class="text--body text--neutral-900">{{
                formatCurrency(selectedBenef.CAPITAL_BENEF)
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Destinataire</span
              >
              <span class="text--body text--neutral-900">{{
                formatCurrency(selectedBenef.DESTINATAIRE_BENEF)
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Enfant(s)</span
              >
              <span class="text--body text--neutral-900">{{
                formatCurrency(selectedBenef.ENFANT_BENEF)
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Date capital</span
              >
              <span class="text--body text--neutral-900">{{
                selectedBenef.DATE_CAPITAL_BENEF
                  ? formatDate(selectedBenef.DATE_CAPITAL_BENEF)
                  : "–"
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Mode de paiement</span
              >
              <span class="text--body text--neutral-900">{{
                selectedBenef.MODE_PAIE_BENEF || "–"
              }}</span>
            </div>
          </div>
        </div>

        <!-- ── Coordonnées bancaires ── -->
        <div
          class="flex flex--column gap--medium px--regular bg--neutral-100 radius"
        >
          <span class="text--subheader-semibold text--neutral-800"
            >Coordonnées bancaires</span
          >
          <div class="grid grid--2-col grid--fluid gap--regular">
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Domiciliation</span
              >
              <span class="text--body text--neutral-900">{{
                selectedBenef.DOMICILIATION_BENEF || "–"
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Code banque</span
              >
              <span class="text--body text--neutral-900 text-mono">{{
                selectedBenef.CODE_BQ_BENEF || "–"
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Guichet</span
              >
              <span class="text--body text--neutral-900 text-mono">{{
                selectedBenef.GUICHET_BENEF || "–"
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Compte</span
              >
              <span class="text--body text--neutral-900 text-mono">{{
                selectedBenef.COMPTE_BENEF || "–"
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600">Clé</span>
              <span class="text--body text--neutral-900 text-mono">{{
                selectedBenef.CLE_BENEF || "–"
              }}</span>
            </div>
          </div>
        </div>

        <!-- ── Complément (conditionnel) ── -->
        <div
          v-if="selectedBenef.COMPLEMENT_BENEF"
          class="flex flex--column gap--medium px--regular bg--neutral-100 radius"
        >
          <span class="text--subheader-semibold text--neutral-800"
            >Complément</span
          >
          <div class="grid grid--2-col grid--fluid gap--regular">
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Montant complément</span
              >
              <span class="text--body text--neutral-900">{{
                formatCurrency(selectedBenef.COMPLEMENT_BENEF)
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Destinataire</span
              >
              <span class="text--body text--neutral-900">{{
                formatCurrency(selectedBenef.DESTINATAIRE_COMPL_BENEF)
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Enfant(s)</span
              >
              <span class="text--body text--neutral-900">{{
                formatCurrency(selectedBenef.ENFANT_COMPL_BENEF)
              }}</span>
            </div>
            <div class="flex flex--column gap--micro">
              <span class="text--caption-semibold text--neutral-600"
                >Date complément</span
              >
              <span class="text--body text--neutral-900">{{
                selectedBenef.DATE_COMPL_BENEF
                  ? formatDate(selectedBenef.DATE_COMPL_BENEF)
                  : "–"
              }}</span>
            </div>
          </div>
        </div>

        <!-- ── Personnes à charge ── -->
        <div
          v-if="charges.length > 0"
          class="flex flex--column gap--medium px--regular bg--neutral-100 radius"
        >
          <span class="text--subheader-semibold text--neutral-800"
            >Personnes à charge</span
          >
          <ul class="charges-list flex flex--column gap--small">
            <li
              v-for="(charge, index) in charges"
              :key="index"
              class="text--body text--neutral-800 p--small bg--neutral-200 radius--small"
            >
              {{ charge }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Aucun détail disponible -->
      <div
        v-else
        class="flex flex--column flex--align-center gap--medium py--large text--neutral-600 text--center"
      >
        <p>Aucun détail disponible pour ce bénéficiaire.</p>
      </div>

      <!-- Footer -->
      <div class="flex flex--justify-end gap--small mt--regular">
        <LcButton variant="primary" icon-left="x" @click="showModal = false"
          >Fermer</LcButton
        >
      </div>
    </LcModal>
  </div>
</template>

<style scoped>
.charges-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
