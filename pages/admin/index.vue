<template>
  <div />
</template>

<script setup lang="ts">
/* Redirect /admin → /admin/users */
definePageMeta({ redirect: '/admin/users' })
navigateTo('/admin/users', { replace: true })
</script>
