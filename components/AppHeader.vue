<template>
  <LcHeaderBanner :env="environment" version="1.0.0" project="sido-sarcophage">
    <template #desktop>
      <div class="header-content">
        <!-- Titre -->
        <span class="header-title">
          SIDO
          <template v-if="currentDomain"> – {{ currentDomain }}</template>
        </span>

        <!-- Navigation contextuelle -->
        <nav v-if="navItems.length" class="header-nav text--neutral-800">
          <NuxtLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="header-nav__link text--neutral-800"
            :class="{ 'header-nav__link--active': isNavActive(item.path) }"
          >
            <LcIcon
              :name="item.icon"
              size="caption"
              class="text--neutral-800"
            />
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <NuxtLink to="/" class="header-actions__domain-switch">
            <LcIcon name="grid" size="caption" />
            Domaines
          </NuxtLink>
          <button class="header-actions__logout" @click="logout()">
            <LcIcon name="log-out" size="caption" />
            Déconnexion
          </button>
        </div>
      </div>
    </template>
  </LcHeaderBanner>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════
   En-tête applicatif — Header contextuel par domaine
   Affiche : SIDO - [Domaine] + navigation + actions
   ══════════════════════════════════════════════════ */

import {
  LcHeaderBanner,
  LcButton,
  LcIcon,
} from "@projetlucie/lc-front-components";

const route = useRoute();
const { isAdmin, logout } = useAuth();

// Détection de l'environnement
const environment = computed(() => {
  if (!import.meta.client) return "DEV";
  const host = window.location.hostname;
  if (host === "localhost" || host.includes("dev")) return "DEV";
  if (host.includes("rec")) return "REC";
  return "PROD";
});

// Déterminer le domaine courant depuis l'URL
const currentDomain = computed(() => {
  if (route.path.startsWith("/admin")) return "Administration";
  if (route.path.startsWith("/sotrel")) return "SOTREL";
  return "";
});

// Navigation contextuelle selon le domaine
interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems = computed<NavItem[]>(() => {
  if (route.path.startsWith("/sotrel")) {
    return [{ label: "Recherche", path: "/sotrel", icon: "search" }];
  }
  if (route.path.startsWith("/admin")) {
    return [
      { label: "Utilisateurs", path: "/admin/users", icon: "users" },
      { label: "Domaines", path: "/admin/domains", icon: "grid" },
      { label: "Logs", path: "/admin/logs", icon: "activity" },
    ];
  }
  return [];
});

// Vérifie si un lien de nav est actif
const isNavActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  gap: var(--gutters--large);
  width: 100%;
}

.header-title {
  font: var(--fonts--subheader-semibold);
  color: #222222;
  white-space: nowrap;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: var(--gutters--small);
  margin-left: var(--gutters--medium);
}

.header-nav__link {
  display: flex;
  align-items: center;
  gap: var(--gutters--xsmall);
  padding: var(--gutters--xsmall) var(--gutters--small);
  border-radius: var(--radius--small);
  font: var(--fonts--caption-semibold);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.header-nav__link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.header-nav__link--active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--gutters--small);
  margin-left: auto;
}

.header-actions__domain-switch,
.header-actions__logout {
  display: flex;
  align-items: center;
  gap: var(--gutters--xsmall);
  padding: var(--gutters--xsmall) var(--gutters--small);
  border-radius: var(--radius--small);
  font: var(--fonts--caption-semibold);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.header-actions__domain-switch:hover,
.header-actions__logout:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}
</style>
