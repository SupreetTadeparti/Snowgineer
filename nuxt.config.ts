// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-particles",
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
  ],
  googleFonts: {
    families: {
      Fredoka: true,
    },
  },
  supabase: {
    redirect: false,
  },
});
