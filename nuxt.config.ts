import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  typescript: { strict: true },
  modules: [],

  css: [
    resolve(
      __dirname,
      "node_modules/@projetlucie/lc-front-components/dist/style.css",
    ),
    "~/assets/css/theme.css",
    "~/assets/css/main.css",
  ],

  vite: {
    resolve: {
      alias: {
        "@lc-theme": resolve(
          __dirname,
          "node_modules/@projetlucie/lc-front-theme/dist/kmut/styles",
        ),
        "vue-pdf-embed": resolve(__dirname, "stubs/vue-pdf-embed.js"),
      },
    },
    optimizeDeps: {
      exclude: ["vue-pdf-embed"],
    },
  },

  build: {
    transpile: ["vue-pdf-embed"],
  },

  runtimeConfig: {
    /* Variables serveur uniquement (DB) */
    dbHost: process.env.DB_HOST || "",
    dbPort: process.env.DB_PORT || "3306",
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME || "SDO_SARCOPHAGE",

    public: {
      /* Variables accessibles côté client */
      appName: "SIDO – Sarcophage",
      appVersion: "1.0.0",
      entraClientId: process.env.ENTRA_CLIENT_ID || "",
      entraTenantId: process.env.ENTRA_TENANT_ID || "",
      entraRedirectUri:
        process.env.ENTRA_REDIRECT_URI || "http://localhost:3000/login",
      fakeLogin: process.env.FAKE_LOGIN === "true",
    },
  },

  app: {
    head: {
      title: "SIDO – Sarcophage",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  compatibilityDate: "2025-02-06",
});
