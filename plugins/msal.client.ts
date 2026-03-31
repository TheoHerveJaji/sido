/* ══════════════════════════════════════════════════════════════
   Plugin MSAL (client-only) — Initialisation de @azure/msal-browser
   Ce plugin crée l'instance PublicClientApplication et la fournit
   à toute l'application via useNuxtApp().$msal
   ══════════════════════════════════════════════════════════════ */

import { PublicClientApplication, type Configuration } from '@azure/msal-browser'
import type { MsalUser, AuthSyncResponse } from '~/types/auth'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()

  const msalConfig: Configuration = {
    auth: {
      clientId: config.public.entraClientId,
      authority: `https://login.microsoftonline.com/${config.public.entraTenantId}`,
      redirectUri: config.public.entraRedirectUri,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
  }

  const msalInstance = new PublicClientApplication(msalConfig)
  await msalInstance.initialize()

  // ── Restaurer la session au refresh ──
  // Si MSAL a un compte en cache (sessionStorage), on restaure l'état
  // réactif avant que le middleware global ne vérifie l'authentification.
  const accounts = msalInstance.getAllAccounts()
  if (accounts.length > 0) {
    const account = accounts[0] as MsalUser

    // Extraire les rôles depuis les claims du token mis en cache
    if (account.idTokenClaims && 'roles' in account.idTokenClaims) {
      account.roles = account.idTokenClaims.roles as string[]
    }

    msalInstance.setActiveAccount(account)
    useState<MsalUser | null>('auth:user', () => null).value = account

    // Resynchroniser les domaines depuis le serveur
    const { data } = await useFetch<AuthSyncResponse>('/api/auth/sync', {
      method: 'POST',
      body: { account },
    })
    useState<string[]>('auth:domains', () => []).value = data.value?.domains ?? []
  }

  return {
    provide: {
      msal: msalInstance,
    },
  }
})
