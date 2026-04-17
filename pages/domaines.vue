<template>
  <div class="flex flex--column gap--regular w--100 domaines-page">
    <LcTitleSection :type="titleEnum.H1">
      Choisissez un domaine
    </LcTitleSection>

    <!-- Aucun domaine accessible -->
    <LcAdvisor
      v-if="accessibleDomains.length === 0 && !pending"
      :variant="COLOR_ENUM.WARNING"
      :inverse="true"
      icon-name="alert-triangle"
      header-text="Aucun domaine accessible"
      body-text="Vous n'avez accès à aucun domaine pour le moment. Contactez un administrateur pour obtenir les droits nécessaires."
    />

    <!-- Loader -->
    <div
      v-if="pending"
      class="flex flex--column flex--align-center gap--medium py--jumbo px--regular text--neutral-600 text--center"
    >
      <LcLoader variant="primary" size="lg" />
    </div>

    <!-- Grille de tuiles -->
    <div v-else class="domain-tiles">
      <LcCardContainer
        v-for="domain in accessibleDomains"
        :key="domain.code"
        :border="true"
        :shadow="false"
        padding="large"
        class="cursor--pointer shadow--hover domain-tile"
        @click="handleDomainClick(domain)"
      >
        <div class="flex flex--column gap--medium">
          <div class="flex flex--align-center flex--justify-between">
            <LcIcon
              :name="domain.icon || 'folder'"
              size="title"
              color="primary"
            />
            <LcPill :variant="COLOR_ENUM.SUCCESS" size="small">Actif</LcPill>
          </div>
          <h3 class="text--h3 text--primary m--none">{{ domain.label }}</h3>
          <p class="text--body text--neutral-600 m--none">
            {{ domain.description }}
          </p>
        </div>
      </LcCardContainer>

      <!-- Tuile Administration (ADMIN uniquement) -->
      <LcCardContainer
        v-if="isAdmin"
        :border="true"
        :shadow="false"
        padding="large"
        class="cursor--pointer shadow--hover domain-tile"
        @click="handleAdminClick"
      >
        <div class="flex flex--column gap--medium">
          <div class="flex flex--align-center flex--justify-between">
            <LcIcon name="settings" size="title" color="primary" />
          </div>
          <h3 class="text--h3 text--primary m--none">Administration</h3>
          <p class="text--body text--neutral-600 m--none">
            Gestion des utilisateurs, domaines et logs
          </p>
        </div>
      </LcCardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Page choix de domaine — Post-authentification
   - Affiche les domaines actifs accessibles à l'utilisateur
   - Redirect automatique si 1 seul domaine accessible
   - Tuile "Administration" pour les ADMIN
   - Persiste le domaine sélectionné via useDomain()
   ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcIcon,
  LcPill,
  LcAdvisor,
  LcLoader,
  LcTitleSection,
  COLOR_ENUM,
  titleEnum,
} from "@projetlucie/lc-front-components";
import type { DomainRecord } from "~/types/auth";

definePageMeta({ layout: "domaines" });

const { isAdmin, userDomains } = useAuth();
const { setDomain } = useDomain();

// Liste statique des domaines
const staticDomains = [
  {
    code: "SOTREL",
    label: "SOTREL",
    description: "Accès au domaine SOTREL",
    is_active: true,
    route: "/sotrel",
    icon: "folder",
  },
  {
    code: "SADE",
    label: "SADE",
    description: "Suivi Administratif des Entreprises",
    is_active: true,
    route: "/sade",
    icon: "building",
  },
];

const accessibleDomains = computed(() => staticDomains);

const pending = false;

// Suppression de la redirection automatique : l'utilisateur choisit toujours le domaine

/** Clic sur une tuile de domaine → persist + navigate */
const handleDomainClick = (domain: DomainRecord) => {
  if (domain.route) {
    setDomain(domain.code);
    navigateTo(domain.route);
  }
};

/** Clic sur la tuile Administration */
const handleAdminClick = () => {
  navigateTo("/admin");
};
</script>

<style scoped>
.domaines-page {
  max-width: 1000px;
}

.domain-tile {
  transition: box-shadow 0.2s ease;
}
</style>
