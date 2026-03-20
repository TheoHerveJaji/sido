<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Layout applicatif — Header contextuel + Contenu
   Sans sidebar, sans LcViewWrapper
   ══════════════════════════════════════════════════ */
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="app-layout__content">
      <AppBreadcrumb />
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-layout__content {
  flex: 1;
  padding: var(--gutters--regular);
  display: flex;
  flex-direction: column;
  gap: var(--gutters--small);
}
</style>
