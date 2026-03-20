<template>
  <div />
</template>

<script setup lang="ts">
/* Redirect /admin → /admin/users */
definePageMeta({ layout: 'domain' })
navigateTo('/admin/users', { replace: true })
</script>
