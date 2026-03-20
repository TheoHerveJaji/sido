<template>
  <div class="page-section">
    <div v-if="pending" class="empty-state">
      <LcLoader variant="primary" size="lg" />
    </div>

    <template v-else-if="userData?.data">
      <LcTitleSection :type="titleEnum.H1">
        Édition — {{ userData.data.display_name || userData.data.email }}
      </LcTitleSection>

      <LcAdvisor
        v-if="saved"
        :variant="COLOR_ENUM.SUCCESS"
        :inverse="true"
        icon-name="check"
        header-text="Modifications enregistrées"
      />

      <!-- ── Informations (lecture seule) ── -->
      <LcCardContainer :border="true" padding="regular">
        <template #header>
          <span class="section-block__title">Informations</span>
        </template>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-item__label">Email</span>
            <LcInput :model-value="userData.data.email" readonly />
          </div>
          <div class="detail-item">
            <span class="detail-item__label">Nom affiché</span>
            <LcInput :model-value="userData.data.display_name" readonly />
          </div>
        </div>
      </LcCardContainer>

      <!-- ── Rôle ── -->
      <LcCardContainer :border="true" padding="regular">
        <template #header>
          <span class="section-block__title">Rôle</span>
        </template>
        <LcRadio v-model="form.role" :choices="roleChoices" />
      </LcCardContainer>

      <!-- ── Domaines accessibles ── -->
      <LcCardContainer :border="true" padding="regular">
        <template #header>
          <span class="section-block__title">Domaines accessibles</span>
        </template>
        <div class="flex flex--column flex--gap-md">
          <div v-for="domain in activeDomains" :key="domain.code" class="flex flex--align-center flex--gap-md">
            <LcToggle
              :model-value="form.domains.includes(domain.code)"
              @update:model-value="toggleDomain(domain.code)"
            >
              {{ domain.label }} — {{ domain.description }}
            </LcToggle>
          </div>
        </div>
      </LcCardContainer>

      <!-- ── Statut ── -->
      <LcCardContainer :border="true" padding="regular">
        <template #header>
          <span class="section-block__title">Statut</span>
        </template>
        <LcToggle v-model="form.is_active">
          {{ form.is_active ? 'Utilisateur actif' : 'Utilisateur inactif' }}
        </LcToggle>
      </LcCardContainer>

      <!-- ── Actions ── -->
      <div class="flex flex--gap-md">
        <LcButton
          variant="primary"
          :disabled="saving"
          @click="handleSave"
        >
          {{ saving ? 'Enregistrement...' : 'Enregistrer' }}
        </LcButton>
        <LcButton
          variant="secondary"
          @click="navigateTo('/admin/users')"
        >
          Annuler
        </LcButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Admin — Édition d'un utilisateur
   Formulaire : rôle (LcRadio), domaines (LcToggle), statut actif
   ══════════════════════════════════════════════════════════════ */

import {
  LcButton,
  LcCardContainer,
  LcInput,
  LcRadio,
  LcToggle,
  LcLoader,
  LcTitleSection,
  LcAdvisor,
  COLOR_ENUM,
  titleEnum,
} from '@projetlucie/lc-front-components'
import type { DomainRecord } from '~/types/auth'

const route = useRoute()
const userId = route.params.id as string

// ── Chargement de l'utilisateur ──
const { data: userData, pending } = await useFetch<{ data: any }>(`/api/admin/users/${userId}`)

// ── Chargement des domaines disponibles ──
const { data: domainsData } = await useFetch<{ data: DomainRecord[] }>('/api/admin/domains')

// ── État du formulaire ──
const form = ref({
  role: 'USER' as 'ADMIN' | 'USER',
  is_active: true,
  domains: [] as string[],
})

// Initialiser le formulaire avec les données chargées
watch(userData, (val) => {
  if (val?.data) {
    form.value.role = val.data.role ?? 'USER'
    form.value.is_active = val.data.is_active ?? true
    form.value.domains = val.data.domains ?? []
  }
}, { immediate: true })

const activeDomains = computed(() =>
  (domainsData.value?.data ?? []).filter((d: DomainRecord) => d.is_active),
)

const saving = ref(false)
const saved = ref(false)

// ── Toggle domaine ──
const toggleDomain = (code: string) => {
  const idx = form.value.domains.indexOf(code)
  if (idx >= 0) {
    form.value.domains.splice(idx, 1)
  }
  else {
    form.value.domains.push(code)
  }
}

// ── Sauvegarde ──
const handleSave = async () => {
  saving.value = true
  saved.value = false
  try {
    await $fetch(`/api/admin/users/${userId}`, {
      method: 'PUT',
      body: {
        role: form.value.role,
        is_active: form.value.is_active,
        domains: form.value.domains,
      },
    })
    saved.value = true
  }
  catch (err) {
    console.error('[Admin user edit]', err)
  }
  finally {
    saving.value = false
  }
}

const roleChoices = [
  { key: 'ADMIN', label: 'Administrateur' },
  { key: 'USER', label: 'Utilisateur' },
]
</script>
