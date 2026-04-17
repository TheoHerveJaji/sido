<template>
  <div class="login-card-wrapper">
    <LcCardContainer :border="true" :shadow="true" padding="big">
      <div class="flex flex--column gap--large">
        <!-- Logo & titre -->
        <div
          class="flex flex--column flex--align-center gap--medium text--center"
        >
          <LcIcon name="shield" size="display" color="primary" />
          <h1 class="text--h1 text--primary m--none">SIDO – Sarcophage</h1>
          <p class="text--body text--neutral-600 m--none">
            Archivage des données legacy
          </p>
        </div>

        <!-- Message d'erreur -->
        <p
          v-if="error"
          class="text--body text--danger text--center m--none py--small px--medium bg--danger-100 radius--small"
        >
          {{ error }}
        </p>

        <!-- Bouton de connexion -->
        <LcButton
          v-if="!isFakeLogin"
          variant="primary"
          size="big"
          :disabled="loading"
          block
          @click="handleLogin"
        >
          {{
            loading ? "Connexion en cours..." : "Se connecter avec Microsoft"
          }}
        </LcButton>
        <LcButton
          v-else
          variant="primary"
          size="big"
          block
          @click="handleFakeLogin"
        >
          Entrer dans l'app
        </LcButton>
        <p class="text--caption text--neutral-600 text--center m--none">
          {{
            isFakeLogin
              ? "Mode test sans authentification Microsoft"
              : "Authentification via Microsoft Entra ID"
          }}
        </p>
      </div>
    </LcCardContainer>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const isFakeLogin = config.public.fakeLogin;

const handleFakeLogin = () => {
  // Simule un utilisateur connecté (mock admin)
  user.value = {
    id: "1",
    entra_id: "mock-admin-entra-id-001",
    email: "admin@mock.fr",
    display_name: "Admin Mock",
    roles: ["SIDO_ADMIN"],
  };
  userDomains.value = ["ALL"];
  navigateTo("/domaines");
};
/* ══════════════════════════════════════════════════
   Page de connexion — Entra ID via MSAL
   Layout login : page épurée, centrée, sans header
   ══════════════════════════════════════════════════ */

import {
  LcButton,
  LcCardContainer,
  LcIcon,
} from "@projetlucie/lc-front-components";

definePageMeta({ layout: "login" });

const { login, user } = useAuth();
const loading = ref(false);
const error = ref<string | null>(null);

// Redirect si déjà authentifié
watch(
  user,
  (u) => {
    if (u) navigateTo("/domaines");
  },
  { immediate: true },
);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    await login();
  } catch (err) {
    error.value = "Erreur lors de la connexion. Veuillez réessayer.";
    console.error("[Login]", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-card-wrapper {
  width: 100%;
  max-width: 420px;
}
</style>
