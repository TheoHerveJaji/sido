<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Onglet 1 — Renseignements généraux entreprise (V2)
   Source : SDO_SAD_02_RENSEIGNEMENTS (données passées via props)
   ══════════════════════════════════════════════════ */

import { LcCardContainer, LcIcon } from "@projetlucie/lc-front-components";
import type { SadeRenseignements } from "~/types/database";
import { formatDate } from "~/utils/formatters";

defineProps<{ rg: SadeRenseignements | null }>();
</script>

<template>
  <div
    v-if="!rg"
    class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
  >
    <LcIcon name="alert-circle" size="display" color="neutral-400" />
    <p>Aucune donnée disponible</p>
  </div>

  <div v-else class="flex flex--column gap--regular">
    <!-- ── Signalétique ── -->
    <LcCardContainer :border="true" padding="regular">
      <span class="text--subheader-semibold text--neutral-800">
        Signalétique
      </span>
      <div class="grid grid--2-col grid--fluid gap--regular mt--small">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Dénomination courte
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.DENSOC_COURTE || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Sigle</span>
          <span class="text--body text--neutral-900">
            {{ rg.SIGLE || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Enseigne</span>
          <span class="text--body text--neutral-900">
            {{ rg.ENSEIGNE || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Email</span>
          <span class="text--body text--neutral-900">
            {{ rg.EMAIL || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            <LcIcon name="phone" size="caption" color="neutral-600" /> Téléphone
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.TELEPHONE || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Fax</span>
          <span class="text--body text--neutral-900">
            {{ rg.FAX || "—" }}
          </span>
        </div>
      </div>

      <div class="mt--regular">
        <span class="text--subheader-semibold text--neutral-800">Adresse</span>
        <div class="flex flex--column gap--micro mt--small">
          <span class="text--body text--neutral-900">
            {{
              [rg.ADRESSE1, rg.ADRESSE2, rg.ADRESSE3, rg.ADRESSE4]
                .filter(Boolean)
                .join(", ")
            }}
          </span>
          <span class="text--body text--neutral-900">
            {{ [rg.CDPOST, rg.VILLE].filter(Boolean).join(" ") }}
          </span>
          <span v-if="rg.CODE_PAYS" class="text--body text--neutral-700">
            {{ rg.CODE_PAYS }}
          </span>
          <span
            v-if="rg.CDPOST_CEDEX || rg.VILLE_CEDEX"
            class="text--body text--neutral-700"
          >
            CEDEX : {{ [rg.CDPOST_CEDEX, rg.VILLE_CEDEX].filter(Boolean).join(" ") }}
          </span>
          <span v-if="rg.BOITE_POSTALE" class="text--body text--neutral-700">
            BP : {{ rg.BOITE_POSTALE }}
          </span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Dates & informations juridiques ── -->
    <LcCardContainer :border="true" padding="regular">
      <span class="text--subheader-semibold text--neutral-800">
        Dates et informations juridiques
      </span>
      <div class="grid grid--2-col grid--fluid gap--regular mt--small">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Type société
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.TYPE_SOC || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Forme juridique
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.FORME_JUR || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Code juridique
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CODE_JUR || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">SIRET</span>
          <span class="text--body text--neutral-900">
            {{ rg.SIRET || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Code APE</span>
          <span class="text--body text--neutral-900">
            {{ rg.CODE_NACE || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Code état
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CODE_ETAT || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Effectif</span>
          <span class="text--body text--neutral-900">
            {{ rg.EFFECTIF || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Secteur d'activité
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.SECT_ACT || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Date ouverture
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.DATE_OUV ? formatDate(rg.DATE_OUV) : "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Date création
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.DATE_CRE ? formatDate(rg.DATE_CRE) : "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Date cessation
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.DATE_CESS ? formatDate(rg.DATE_CESS) : "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Motif cessation
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.MOTIF_CESS || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            N° URSSAF
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.NUMERO_URSSAF || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            N° gestion
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.NUM_GESTION || "—" }}
          </span>
        </div>
      </div>
    </LcCardContainer>

    <!-- ── Divers (caisses retraite & convention) ── -->
    <LcCardContainer :border="true" padding="regular">
      <span class="text--subheader-semibold text--neutral-800">Divers</span>
      <div class="grid grid--2-col grid--fluid gap--regular mt--small">
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Convention collective
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CONCOL || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">Syndicat</span>
          <span class="text--body text--neutral-900">
            {{ rg.SYNDICAT || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Caisse CP
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CAISSE_CP || "—" }}
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Caisse cadre TA
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CAISSE_TA || "—" }}
            <template v-if="rg.IDENTIFIANT_TA">
              ({{ rg.IDENTIFIANT_TA }})
            </template>
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Caisse cadre TB/TC
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CAISSE_TB || "—" }}
            <template v-if="rg.IDENTIFIANT_TB">
              ({{ rg.IDENTIFIANT_TB }})
            </template>
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Caisse non cadre
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CAISSE_NC || "—" }}
            <template v-if="rg.IDENTIFIANT_NC">
              ({{ rg.IDENTIFIANT_NC }})
            </template>
          </span>
        </div>
        <div class="flex flex--column gap--micro">
          <span class="text--caption-semibold text--neutral-600">
            Caisse prévoyance réglementaire
          </span>
          <span class="text--body text--neutral-900">
            {{ rg.CAISSE_PR || "—" }}
            <template v-if="rg.IDENTIFIANT_PR">
              ({{ rg.IDENTIFIANT_PR }})
            </template>
          </span>
        </div>
      </div>
    </LcCardContainer>
  </div>
</template>
