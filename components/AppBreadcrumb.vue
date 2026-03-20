<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Breadcrumb dynamique basé sur la route courante
   Séparateur : LcIcon chevron-right
   ══════════════════════════════════════════════════ */

import { LcIcon } from "@projetlucie/lc-front-components";

const route = useRoute();

/** Mapping des segments de route vers des labels lisibles */
const LABELS: Record<string, string> = {
  sotrel: "Recherche",
  admin: "Administration",
  users: "Utilisateurs",
  domains: "Domaines",
  logs: "Logs",
};

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const segments = route.path.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const items: BreadcrumbItem[] = [];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    let label = LABELS[segment];
    if (!label) {
      // Segment dynamique (ex: numéro de dossier, id utilisateur)
      if (segments[index - 1] === "sotrel") {
        label = `Dossier ${segment}`;
      } else {
        label = segment;
      }
    }

    items.push({ label, path: currentPath, isLast });
  });

  return items;
});
</script>

<template>
  <nav
    v-if="breadcrumbs.length > 0"
    class="flex flex--align-center gap--small py--medium"
    aria-label="Fil d'Ariane"
  >
    <template v-for="(item, index) in breadcrumbs" :key="item.path">
      <!-- Séparateur -->
      <LcIcon
        v-if="index > 0"
        name="chevron-right"
        size="caption"
        color="neutral-600"
        class="breadcrumb__separator"
      />

      <!-- Lien ou texte -->
      <NuxtLink v-if="!item.isLast" :to="item.path" class="breadcrumb__link">
        {{ item.label }}
      </NuxtLink>
      <span v-else class="text--neutral-800">
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>

<style scoped>
.breadcrumb__link {
  color: var(--colors--neutral-600);
  text-decoration: none;
  transition: color 0.15s ease;
}

.breadcrumb__link:hover {
  color: var(--colors--primary);
  text-decoration: underline;
}

.breadcrumb__separator {
  flex-shrink: 0;
}
</style>
