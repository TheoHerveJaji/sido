<template>
  <LcHeaderBanner :env="environment" version="1.0.0" project="sido-sarcophage">
    <template #desktop>
      <div class="flex flex--align-center gap--regular w--100">
        <LcButton
          variant="tertiary"
          size="small"
          icon-left="arrow-left"
          @click="handleChangeDomain"
        >
          Domaines
        </LcButton>

        <span class="text--neutral-800">{{ domainLabel }}</span>

        <div class="flex flex--align-center gap--small header-user">
          <LcBubble :content="userInitials" variant="primary" size="regular" />
          <span class="header-user__name">
            {{ user?.name || user?.username }}
          </span>
          <LcButton
            variant="tertiary"
            size="small"
            icon-left="log-out"
            @click="logout()"
          >
            Déconnexion
          </LcButton>
        </div>
      </div>
    </template>
  </LcHeaderBanner>
</template>

<script setup lang="ts">
import {
  LcHeaderBanner,
  LcButton,
  LcBubble,
} from "@projetlucie/lc-front-components";

const route = useRoute();
const { user, logout } = useAuth();
const { currentDomain, clearDomain } = useDomain();

const environment = computed(() => {
  if (!import.meta.client) return "DEV";
  const host = window.location.hostname;
  if (host === "localhost" || host.includes("dev")) return "DEV";
  if (host.includes("rec")) return "REC";
  return "PROD";
});

const domainLabel = computed(() => {
  if (route.path.startsWith("/admin")) return "Administration";
  return `SIDO - ${currentDomain.value || ""}`;
});

const userInitials = computed(() => {
  const name = user.value?.name || user.value?.username || "";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase() || "??";
});

const handleChangeDomain = () => {
  clearDomain();
  navigateTo("/domaines");
};
</script>

<style scoped>
.header-user {
  margin-left: auto;
}

.header-user__name {
  font: var(--fonts--caption-semibold);
  color: var(--colors--neutral-700);
}
</style>

<style>
.header_container .header_container__content {
  height: 3.5rem;
}
</style>
