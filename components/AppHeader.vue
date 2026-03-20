<script setup lang="ts">
/* ══════════════════════════════════════════════════
   En-tête de l'application — LcHeaderBanner
   Affiche le titre, l'environnement et la version
   ══════════════════════════════════════════════════ */

import { LcHeaderBanner } from '@projetlucie/lc-front-components'

// Détection de l'environnement à partir du hostname
const environment = computed(() => {
  if (!import.meta.client) return 'DEV'
  const host = window.location.hostname
  if (host === 'localhost' || host.includes('dev')) return 'DEV'
  if (host.includes('rec')) return 'REC'
  return 'PROD'
})
</script>

<template>
  <LcHeaderBanner :env="environment" version="1.0.0" project="sido-sarcophage">
    <template #desktop>
      <span class="app-title">SIDO – Sarcophage</span>
    </template>
  </LcHeaderBanner>
</template>

<style scoped>
.app-title {
  font: var(--fonts--subheader-semibold);
  color: var(--colors--neutral-100);
}
</style>
