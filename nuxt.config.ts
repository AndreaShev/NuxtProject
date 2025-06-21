// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'usebootstrap'
  ],
  nitro: {
    preset: '@netlify/functions'
  },
  app: {
    head: {
      title: 'Nuxt project',
      meta: [
        { name: 'charset', content: 'utf-8'}
      ]
      // link: [
      //   { rel: 'stylesheet', href: 'css'}
      // ]
    }
  }
})