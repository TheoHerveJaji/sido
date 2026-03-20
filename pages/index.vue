<template>
  <div class="page-section">
    <LcTitleSection :type="titleEnum.H1">
      Bienvenue{{ user?.name ? `, ${user.name}` : "" }}
    </LcTitleSection>

    <!-- Aucun domaine accessible -->
    <LcAdvisor
      v-if="accessibleDomains.length === 0"
      :variant="COLOR_ENUM.WARNING"
      :inverse="true"
      icon-name="alert-triangle"
      header-text="Aucun domaine accessible"
      body-text="Vous n'avez accès à aucun domaine pour le moment. Contactez un administrateur pour obtenir les droits nécessaires."
    />

    <!-- Grille de tuiles -->
    <div v-else class="domain-tiles">
      <LcCardContainer
        v-for="domain in accessibleDomains"
        :key="domain.code"
        :border="true"
        :shadow="false"
        padding="large"
        class="domain-tile"
        @click="handleDomainClick(domain)"
      >
        <div class="domain-tile__content">
          <div class="domain-tile__header">
            <LcIcon
              :name="domain.icon || 'folder'"
              size="title"
              color="primary"
            />
            <LcPill :variant="COLOR_ENUM.SUCCESS" size="small">Actif</LcPill>
          </div>
          <h3 class="domain-tile__title">{{ domain.label }}</h3>
          <p class="domain-tile__description">{{ domain.description }}</p>
        </div>
      </LcCardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
         Page d'accueil — Tuiles des domaines accessibles
         - Si 1 seul domaine → redirect automatique vers sa route
         - Si 0 domaine → message d'avertissement
         - Sinon → grille de tuiles cliquables
         ══════════════════════════════════════════════════════════════ */

import {
  LcCardContainer,
  LcIcon,
  LcPill,
  LcAdvisor,
  LcTitleSection,
  COLOR_ENUM,
  titleEnum,
} from "@projetlucie/lc-front-components";
import type { DomainRecord } from "~/types/auth";

definePageMeta({ layout: "domain-select" });

const { user, isAdmin, userDomains } = useAuth();

// Récupérer les domaines actifs depuis l'API
const { data: domainsData } = await useFetch<{ data: DomainRecord[] }>(
  "/api/admin/domains",
);

// Filtrer les domaines accessibles à l'utilisateur
const accessibleDomains = computed(() => {
  const allDomains = domainsData.value?.data ?? [];
  if (isAdmin.value) return allDomains.filter((d) => d.is_active);
  return allDomains.filter(
    (d) => d.is_active && userDomains.value.includes(d.code),
  );
});

// Redirect automatique si un seul domaine accessible
watch(
  accessibleDomains,
  (domains) => {
    if (domains.length === 1 && domains[0].route) {
      navigateTo(domains[0].route);
    }
  },
  { immediate: true },
);

const handleDomainClick = (domain: DomainRecord) => {
  if (domain.route) navigateTo(domain.route);
};
</script>

<style scoped>
.domain-tile__content {
  display: flex;
  flex-direction: column;
  gap: var(--gutters--medium);
}

.domain-tile__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.domain-tile__title {
  font: var(--fonts--h3);
  color: var(--colors--primary);
  margin: 0;
}

.domain-tile__description {
  font: var(--fonts--body);
  color: var(--colors--neutral-600);
  margin: 0;
}
</style>
