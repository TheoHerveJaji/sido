<template>
  <div class="login-page">
    <LcCardContainer
      :border="true"
      :shadow="true"
      padding="big"
      class="login-card"
    >
      <div class="login-card__content">
        <!-- Logo & titre -->
        <div class="login-card__header">
          <LcIcon name="shield" size="display" color="primary" />
          <h1 class="login-card__title">SIDO – Sarcophage</h1>
          <p class="login-card__subtitle">Archivage des données legacy</p>
        </div>

        <!-- Message d'erreur -->
        <p v-if="error" class="login-card__error">
          {{ error }}
        </p>

        <!-- Bouton de connexion -->
        <LcButton
          variant="primary"
          size="big"
          :disabled="loading"
          block
          icon-left="log-in"
          @click="handleLogin"
        >
          {{
            loading ? "Connexion en cours..." : "Se connecter avec Microsoft"
          }}
        </LcButton>

        <p class="login-card__info">Authentification via Microsoft Entra ID</p>
      </div>
    </LcCardContainer>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Page de connexion — Entra ID via MSAL
   Layout sans sidebar/header (plein écran centré)
   ══════════════════════════════════════════════════ */

import {
  LcButton,
  LcCardContainer,
  LcIcon,
} from "@projetlucie/lc-front-components";

definePageMeta({ layout: false });

const { login, isAuthenticated } = useAuth();
const loading = ref(false);
const error = ref<string | null>(null);

// Redirect si déjà authentifié
watch(
  isAuthenticated,
  (authenticated) => {
    if (authenticated) navigateTo("/");
  },
  { immediate: true },
);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    await login();
    navigateTo("/");
  } catch (err) {
    error.value = "Erreur lors de la connexion. Veuillez réessayer.";
    console.error("[Login]", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--colors--neutral-200);
  padding: var(--gutters--regular);
}

.login-card {
  width: 100%;
  max-width: 420px;
}

.login-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--gutters--large);
}

.login-card__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gutters--medium);
  text-align: center;
}

.login-card__title {
  font: var(--fonts--h1);
  color: var(--colors--primary);
  margin: 0;
}

.login-card__subtitle {
  font: var(--fonts--body);
  color: var(--colors--neutral-600);
  margin: 0;
}

.login-card__error {
  font: var(--fonts--body);
  color: var(--colors--danger);
  text-align: center;
  margin: 0;
  padding: var(--gutters--small) var(--gutters--medium);
  background: var(--colors--danger-100);
  border-radius: var(--radius--small);
}

.login-card__info {
  font: var(--fonts--caption);
  color: var(--colors--neutral-600);
  text-align: center;
  margin: 0;
}
</style>
