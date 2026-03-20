<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Layout Login — Page épurée sans header ni sidebar
   Fond neutre, contenu centré verticalement
   Utilisé uniquement par pages/login.vue
   ══════════════════════════════════════════════════ */
</script>

<template>
  <div class="flex flex--column min-h--100vh bg--neutral-200">
    <main class="flex--1 flex flex--column flex--align-center flex--justify-center p--regular">
      <slot />
    </main>
  </div>
</template>
