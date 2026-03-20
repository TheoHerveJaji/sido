<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Layout de sélection de domaine
   Header simple avec logo SIDO + contenu centré
   ══════════════════════════════════════════════════ */

import { LcHeaderBanner } from '@projetlucie/lc-front-components'

const environment = computed(() => {
  if (!import.meta.client) return 'DEV'
  const host = window.location.hostname
  if (host === 'localhost' || host.includes('dev')) return 'DEV'
  if (host.includes('rec')) return 'REC'
  return 'PROD'
})
</script>

<template>
  <div class="domain-select-layout">
    <LcHeaderBanner :env="environment" version="1.0.0" project="sido-sarcophage">
      <template #desktop>
        <span class="app-title">SIDO</span>
      </template>
    </LcHeaderBanner>

    <main class="domain-select-layout__content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.domain-select-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--colors--neutral-200);
}

.domain-select-layout__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--gutters--regular);
}

.app-title {
  font: var(--fonts--subheader-semibold);
  color: #ffffff;
}
</style>
