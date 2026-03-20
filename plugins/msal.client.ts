/* ══════════════════════════════════════════════════════════════
   Plugin client-only — Initialise MSAL (Microsoft Entra ID)
   Fournit l'instance PublicClientApplication via $msal
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
