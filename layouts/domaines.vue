<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Layout Domaines — Page de choix de domaine
   Header minimal avec LcHeaderBanner (logo SIDO + user + déconnexion)
   Contenu centré pour la grille de tuiles
   Utilisé uniquement par pages/domaines.vue
   ══════════════════════════════════════════════════ */

import {
  LcHeaderBanner,
  LcButton,
  LcBubble,
} from "@projetlucie/lc-front-components";

const { user, logout } = useAuth();

/** Détection de l'environnement depuis le hostname */
const environment = computed(() => {
  if (!import.meta.client) return "DEV";
  const host = window.location.hostname;
  if (host === "localhost" || host.includes("dev")) return "DEV";
  if (host.includes("rec")) return "REC";
  return "PROD";
});

/** Initiales de l'utilisateur pour le LcBubble */
const userInitials = computed(() => {
  const name = user.value?.name || user.value?.username || "";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase() || "??";
});
</script>

<template>
  <div class="flex flex--column min-h--100vh bg--neutral-200">
    <LcHeaderBanner
      :env="environment"
      version="1.0.0"
      project="sido-sarcophage"
    >
      <template #desktop>
        <div class="flex flex--align-center flex--justify-between w--100">
          <span class="text--neutral-800">SIDO</span>

          <div class="flex flex--align-center gap--small">
            <LcBubble
              :content="userInitials"
              variant="primary"
              size="regular"
            />
            <span class="domaines-header__user">{{
              user?.name || user?.username
            }}</span>
            <LcButton
              variant="secondary"
              size="small"
              icon-left="log-out"
              @click="logout()"
            >
              Déconnexion
            </LcButton>
          </div>
        </div>
      </template>
    </LcHeaderBanner>

    <main class="flex--1 flex flex--column flex--align-center py--jumbo px--regular">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.domaines-header__user {
  font: var(--fonts--caption-semibold);
  color: rgba(255, 255, 255, 0.85);
}
</style>
