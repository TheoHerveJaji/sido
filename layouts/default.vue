<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Layout principal — LcViewWrapper
   Structure : Header + Sidebar + Breadcrumb + Contenu
   ══════════════════════════════════════════════════ */

import { LcViewWrapper } from '@projetlucie/lc-front-components'
</script>

<template>
  <LcViewWrapper>
    <template #header>
      <AppHeader />
    </template>

    <template #sidebar>
      <AppSidebar />
    </template>

    <template #content>
      <div class="layout-content">
        <AppBreadcrumb />
        <slot />
      </div>
    </template>
  </LcViewWrapper>
</template>

<style scoped>
.layout-content {
  padding: var(--gutters--regular);
  display: flex;
  flex-direction: column;
  gap: var(--gutters--small);
}
</style>
