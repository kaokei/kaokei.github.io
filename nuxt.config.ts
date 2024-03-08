// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-lodash",
    "@vueuse/nuxt",
    "@zadigetvoltaire/nuxt-gtm",
  ],
  vite: {
    esbuild: {
      tsconfigRaw: {},
    },
  },
  gtm: {
    id: "GTM-123456",
  },
});
