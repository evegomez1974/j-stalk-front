export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'j-stalk',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/j-stalk-logo2.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Nuxt 2 only:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    "vue2-editor/nuxt",
    '@pinia/nuxt'
  ],

  bootstrapVue: {
    icons: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
      //PAS BESOIN DE CETTE PARTIE POUR LE CODE QUE J'AI RAJOUTE POUR LE PDF TU POURRAS L'ENLEVER
    //ENFIN SI TU LAISSES MAIS VIDE COMME CA :
    /*
      extend(config, ctx) {

      }
    */
      extend(config, ctx) {
        config.output.globalObject = 'this'
        config.module.rules.push(
          {
            test: /\.pdf$/,
            loader: 'url-loader'
          }
        )
      },

      babel: {
        compact: true,
      }
  },


  router: {
    extendRoutes(routes, resolve) {
      const index = routes.findIndex(route => route.name === 'jobOffersList')
      routes.splice(index, 1);

      routes.push({
        name: 'jobOffersList',
        path: '/',
        component: resolve(__dirname, 'pages/jobOffersList.vue')
      })
    }
  },


}
