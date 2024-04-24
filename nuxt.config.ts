// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/client/',

  ssr: true,

  devtools: { enabled: true },

  devServer: {
    port: 12221,
    url: "http://localhost:8888",
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8888/server/api' : 'http://***/server/api',
    }
  },

  serverHandlers: [
    // Will register file from project middleware directory to handle /server-api/* requests
    { route: "/server/api/**", handler: "./src/server/index.ts" },
  ],

  app: {
    pageTransition: { name: 'pages', mode: 'out-in' },
    layoutTransition: { name: 'layouts', mode: 'out-in' },
    head: {
      meta: [
        // { hid: 'description', name: 'description', content: this.$t('seo.description') },
        // { hid: 'keywords', name: 'keywords', content: this.$t('seo.keywords') }
      ],
      // title: `Rwilds - ${this.$t('nav.name')} - ${this.$t('index.title')} - ${this.$t('footer.corporate_name')}`,
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ['@/assets/css/index.scss'],
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    '@unocss/nuxt',
    '@nuxt/ui',
  ],

  unocss: {
    uno: false,
    preflight: false,
    icons: true,
    presets: [],
    safelist: ['i-twemoji-flag-us-outlying-islands', 'i-twemoji-flag-turkey'],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt', './src/types/type.d.ts'],
      },
    },
  },

  build: {
    transpile: ['primevue'],
  },

  pinia: {
    disableVuex: true,
  },

  postcss: {
    plugins: {

    },
  },

  nitro: {
    // 客户端渲染时
    devProxy: {
      "/api": {
        target: process.env.NODE_ENV === 'development' ? 'http://localhost:8888/server/api' : 'http://***/server/api',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },

  components: true,
})
