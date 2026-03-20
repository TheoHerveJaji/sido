<template>
  <LcModal
    id="user-form-modal"
    v-model="modelValue"
    width="600px"
    height="auto"
    :close-on-backdrop="true"
  >
    <div class="flex flex--column gap--medium">
      <LcTitleSection :type="titleEnum.H3">
        {{ isEdit ? 'Éditer un utilisateur' : 'Nouvel utilisateur' }}
      </LcTitleSection>

      <!-- Email -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Email</label>
        <LcInput
          v-model="form.email"
          placeholder="email@klesia.fr"
          :readonly="isEdit"
        />
      </div>

      <!-- Nom affiché -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Nom affiché</label>
        <LcInput v-model="form.display_name" placeholder="Prénom Nom" />
      </div>

      <!-- Rôle -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Rôle</label>
        <LcRadio v-model="form.role" :choices="roleChoices" />
      </div>

      <!-- Domaines -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Domaines accessibles</label>
        <div class="flex flex--column gap--small">
          <div v-for="domain in domains" :key="domain.code" class="flex flex--align-center gap--medium">
            <LcToggle
              :model-value="form.domains.includes(domain.code)"
              @update:model-value="toggleDomain(domain.code)"
            >
              {{ domain.label }}
            </LcToggle>
          </div>
        </div>
      </div>

      <!-- Statut -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Statut</label>
        <LcToggle v-model="form.is_active">
          {{ form.is_active ? 'Actif' : 'Inactif' }}
        </LcToggle>
      </div>

      <!-- Actions -->
      <div class="flex flex--justify-end gap--small mt--regular">
        <LcButton variant="secondary" @click="$emit('cancel')">
          Annuler
        </LcButton>
        <LcButton variant="primary" @click="handleSave">
          Enregistrer
        </LcButton>
      </div>
    </div>
  </LcModal>
</template>

<script setup lang="ts">
/* ══════════════════════════════════════════════════════════════
   Modal de création / édition d'un utilisateur
   Props : modelValue (boolean), user (optionnel pour édition)
   Emits : save (form data), cancel
   ══════════════════════════════════════════════════════════════ */

import {
  LcModal,
  LcInput,
  LcRadio,
  LcToggle,
  LcButton,
  LcTitleSection,
  titleEnum,
} from '@projetlucie/lc-front-components'
import type { DomainRecord, UserRecord } from '~/types/auth'

interface Props {
  modelValue: boolean
  user?: UserRecord | null
  domains: DomainRecord[]
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: typeof form.value): void
  (e: 'cancel'): void
}>()

const isEdit = computed(() => !!props.user)

const form = ref({
  email: '',
  display_name: '',
  role: 'USER' as 'ADMIN' | 'USER',
  is_active: true,
  domains: [] as string[],
})

// Initialiser le formulaire avec les données utilisateur si édition
watch(() => props.user, (u) => {
  if (u) {
    form.value.email = u.email
    form.value.display_name = u.display_name ?? ''
    form.value.role = u.role
    form.value.is_active = u.is_active
  } else {
    form.value = { email: '', display_name: '', role: 'USER', is_active: true, domains: [] }
  }
}, { immediate: true })

const roleChoices = [
  { key: 'ADMIN', label: 'Administrateur' },
  { key: 'USER', label: 'Utilisateur' },
]

const toggleDomain = (code: string) => {
  const idx = form.value.domains.indexOf(code)
  if (idx >= 0) form.value.domains.splice(idx, 1)
  else form.value.domains.push(code)
}

const handleSave = () => {
  emit('save', { ...form.value })
}
</script>
