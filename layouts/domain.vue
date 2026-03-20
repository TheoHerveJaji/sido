<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Layout Domain — Layout applicatif principal
   Header fixe (DomainHeader) + Breadcrumb + Contenu
   Utilisé par toutes les pages /sotrel/** et /admin/**
   ══════════════════════════════════════════════════ */
</script>

<template>
  <div class="flex flex--column min-h--100vh">
    <DomainHeader />

    <main class="flex--1 p--regular flex flex--column gap--small">
      <AppBreadcrumb />
      <slot />
    </main>
  </div>
</template>
