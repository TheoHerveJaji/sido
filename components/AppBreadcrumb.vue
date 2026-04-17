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
  sade: "Recherche",
  admin: "Administration",
  users: "Utilisateurs",
  domains: "Domaines",
  logs: "Logs",
};

/**
 * Segments "section" qui doivent être fusionnés avec le segment dynamique suivant.
 * Ex: /sotrel/designation/12345 → "Dossier désignation 12345" (une seule étape)
 */
const SECTION_LABELS: Record<string, string> = {
  designation: "Dossier désignation",
  contrat: "Contrat",
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
  let skipNext = false;
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // Ce segment a été absorbé par le précédent (section + dynamique)
    if (skipNext) {
      skipNext = false;
      return;
    }

    // Segment "section" suivi d'un segment dynamique : fusionner les deux
    if (SECTION_LABELS[segment] && !isLast) {
      const nextSegment = segments[index + 1];
      const nextPath = `${currentPath}/${nextSegment}`;
      const isNextLast = index + 1 === segments.length - 1;
      items.push({
        label: `${SECTION_LABELS[segment]} ${nextSegment}`,
        path: nextPath,
        isLast: isNextLast,
      });
      skipNext = true;
      return;
    }

    let label = LABELS[segment];
    if (!label) {
      // Segment dynamique (ex: numéro de dossier, id utilisateur)
      if (segments[index - 1] === "sotrel") {
        label = `Dossier ${segment}`;
      } else if (segments[index - 1] === "sade") {
        label = `Entreprise ${segment}`;
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
