<template>
  <LcModal
    id="domain-edit-modal"
    v-model="modelValue"
    width="500px"
    height="auto"
    :close-on-backdrop="true"
  >
    <div class="flex flex--column gap--medium">
      <LcTitleSection :type="titleEnum.H3">
        Éditer — {{ domain?.code }}
      </LcTitleSection>

      <!-- Libellé -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Libellé</label>
        <LcInput v-model="form.label" placeholder="Libellé du domaine" />
      </div>

      <!-- Description -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Description</label>
        <LcInput v-model="form.description" placeholder="Description" />
      </div>

      <!-- Icône -->
      <div class="flex flex--column gap--micro">
        <label class="text--caption-semibold text--neutral-600">Icône</label>
        <LcInput v-model="form.icon" placeholder="Nom de l'icône (ex: shield)" />
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
   Modal d'édition d'un domaine
   Props : modelValue (boolean), domain (DomainRecord)
   Emits : save (form data), cancel
   ══════════════════════════════════════════════════════════════ */

import {
  LcModal,
  LcInput,
  LcToggle,
  LcButton,
  LcTitleSection,
  titleEnum,
} from '@projetlucie/lc-front-components'
import type { DomainRecord } from '~/types/auth'

interface Props {
  modelValue: boolean
  domain: DomainRecord | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: typeof form.value): void
  (e: 'cancel'): void
}>()

const form = ref({
  label: '',
  description: '',
  icon: '',
  is_active: true,
})

// Initialiser avec les données du domaine
watch(() => props.domain, (d) => {
  if (d) {
    form.value.label = d.label
    form.value.description = d.description ?? ''
    form.value.icon = d.icon ?? ''
    form.value.is_active = d.is_active
  }
}, { immediate: true })

const handleSave = () => {
  emit('save', { ...form.value })
}
</script>
