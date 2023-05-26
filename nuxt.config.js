const axios = require("axios");
const CMSaccessToken = "YwkxX7UXlj9Wd7lngwwrbAtt";
export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: "server",
  // target: "static",
  debug: {
    // enable console debugging in nuxtServerInit
    enabled: true,
    // limit the amount of data displayed in the console
    sendStateOnError: false,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "KIMERA CORP",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
        type: "module",
      },
      {
        charset: "utf-8",
        src: "/js/fitty.js",
        type: "module",
      },
    ],
  },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/helpers",
    { src: "@/plugins/flicking", mode: "client" },
    { src: "@/plugins/vuex-persist.js", mode: "client" },
    { src: "@/plugins/vue-touch.js", mode: "client" },
  ],
  styleResources: {
    sass: [
      // '~bulma/sass/utilities/mixins.sass'
    ],
    scss: [
      // './assets/scss/main.scss'
      "~assets/scss/variables.scss",
      "~assets/scss/mixins.scss",
    ],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: "~/components", extensions: ["vue"], pathPrefix: false },
    { path: "~/shop/components", extensions: ["vue"], pathPrefix: false },
  ],

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
    "@nuxtjs/eslint-module",
    ["@nuxtjs/composition-api/module"],
    [
      "@storyblok/nuxt-2/module",
      {
        accessToken: CMSaccessToken,
        bridge: true,
        useApiClient: true,
        apiOption: {
          cache: {
            clear: "auto",
            type: "memory",
          },
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:3000",
    // baseURL: "/",
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: "https://zwickmueller.github.io/kimera-corp-json-store/",
      pathRewrite: { "^/api/": "" },
      changeOrigin: true,
    },
  },
  router: {
    // Remove trailing slash from all URLs
    trailingSlash: false,
    // Optionally, redirect to URL without trailing slash
    // middleware: ["redirect"],
  },
  // routerMiddleware: ["redirect"],
  // Middleware to handle redirect
  // serverMiddleware: [
  //   { path: "/redirect", handler: "~/middleware/redirect.js" },
  // ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["gsap", "fitty"],
    loaders: {
      vue: {
        compilerOptions: {
          // This option is highly recommended
          preserveWhitespace: false,
        },
      },
    },
  },
  generate: {
    fallback: true,
    routes: function (callback) {
      const token = CMSaccessToken;
      const per_page = 10;
      const version = "published";
      let cache_version = 0;

      let page = 1;

      // other routes that are not in Storyblok with their slug.
      let routes = ["/"]; // adds home directly but with / instead of /home

      // Load space and receive latest cache version key to improve performance
      axios
        .get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`)
        .then((space_res) => {
          // timestamp of latest publish
          cache_version = space_res.data.space.version;

          // Call first Page of the Stories
          axios
            .get(
              `https://api.storyblok.com/v1/cdn/stories?token=${token}&version=${version}&per_page=${per_page}&page=${page}&cv=${cache_version}`
            )
            .then((res) => {
              res.data.stories.forEach((story) => {
                if (story.full_slug != "home") {
                  routes.push("/" + story.full_slug);
                }
              });

              // Check if there are more pages available otherwise execute callback with current routes.
              const total = res.headers.total;
              const maxPage = Math.ceil(total / per_page);
              if (maxPage <= 1) {
                callback(null, routes);
                return;
              }

              // Since we know the total we now can pregenerate all requests we need to get all stories
              let contentRequests = [];
              for (let page = 2; page <= maxPage; page++) {
                contentRequests.push(
                  axios.get(
                    `https://api.storyblok.com/v1/cdn/stories?token=${token}&version=${version}&per_page=${per_page}&page=${page}`
                  )
                );
              }

              // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
              axios
                .all(contentRequests)
                .then(
                  axios.spread((...responses) => {
                    responses.forEach((response) => {
                      response.data.stories.forEach((story) => {
                        if (story.full_slug != "home") {
                          routes.push("/" + story.full_slug);
                        }
                      });
                    });

                    callback(null, routes);
                  })
                )
                .catch(callback);
            });
        });
    },
  },
};
