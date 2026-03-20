/* ══════════════════════════════════════════════════════════════
   Plugin MSAL (client-only) — Initialisation de @azure/msal-browser
   Ce plugin crée l'instance PublicClientApplication et la fournit
   à toute l'application via useNuxtApp().$msal
   ══════════════════════════════════════════════════════════════ */

import { PublicClientApplication, type Configuration } from '@azure/msal-browser'

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

  return {
    provide: {
      msal: msalInstance,
    },
  }
})
