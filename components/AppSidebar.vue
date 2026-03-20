<script setup lang="ts">
/* ══════════════════════════════════════════════════
   Sidebar de navigation — LcSidebarNavigation
   Construction dynamique selon rôle et domaines
   ══════════════════════════════════════════════════ */

import { LcSidebarNavigation } from '@projetlucie/lc-front-components'
import type { SidebarNavElement } from '@projetlucie/lc-front-components'

const { user, isAdmin, userDomains, logout } = useAuth()
const router = useRouter()

// ── Construction dynamique des éléments de navigation ──
const navElements = computed<SidebarNavElement[]>(() => {
  const elements: SidebarNavElement[] = []

  // Accueil — toujours visible
  elements.push({
    libelle: 'Accueil',
    icon: 'home',
    path: '/',
    emplacement: 'menu',
  })

  // Domaines accessibles à l'utilisateur
  if (userDomains.value.includes('SOTREL') || isAdmin.value) {
    elements.push({
      libelle: 'SOTREL',
      icon: 'shield',
      path: '/sotrel',
      emplacement: 'menu',
    })
  }

  // Section Administration — réservée aux ADMIN
  if (isAdmin.value) {
    elements.push({
      libelle: 'Utilisateurs',
      icon: 'users',
      path: '/admin/users',
      emplacement: 'menu',
    })
    elements.push({
      libelle: 'Domaines',
      icon: 'grid',
      path: '/admin/domains',
      emplacement: 'menu',
    })
    elements.push({
      libelle: 'Logs',
      icon: 'activity',
      path: '/admin/logs',
      emplacement: 'menu',
    })
  }

  // Footer — bouton déconnexion
  elements.push({
    libelle: 'Déconnexion',
    icon: 'log-out',
    emplacement: 'footer',
    call: () => logout(),
  })

  return elements
})
</script>

<template>
  <LcSidebarNavigation
    logo=""
    :elements="navElements"
    :shrink="false"
  />
</template>
