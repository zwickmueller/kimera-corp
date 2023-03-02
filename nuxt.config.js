export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'KIMERA CORP',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
    //   {
    //   charset: "utf-8",
    //   src: "/js/patch.js",
    // },
      {
      charset: "utf-8",
      src: "https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js",
    },
     {
      charset: "utf-8",
      src: "/js/content-editable.js",
      type: 'module'
    }],
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/helpers', 
  {src: '@/plugins/flicking', mode: 'client' }, 
  { src: '@/plugins/vuex-persist.js', mode: 'client' }],
  styleResources: {
    sass: [
      // '~bulma/sass/utilities/mixins.sass'

    ],
    scss: [
      // './assets/scss/main.scss'
      '~assets/scss/variables.scss',
      '~assets/scss/mixins.scss'
    ]
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components', extensions: ['vue'], pathPrefix: false }],

  //  {
  //   path: '~/components',
  //   pathPrefix: false
  //
  //   // dirs: [
  //   //   '~/components/storyblok',
  //   //   '~/components/generic'
  //   // ]
  // },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/composition-api/module'],
    ["@storyblok/nuxt/module", { accessToken: "YwkxX7UXlj9Wd7lngwwrbAtt" }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap', 'fitty'],
    loaders: {
      vue: {
        compilerOptions: {
          // This option is highly recommended
          preserveWhitespace: false
        }
      }
    }
  }
}