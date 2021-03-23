module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  lintOnSave: true,

  pwa: {
    name: 'bAmbient',
    themeColor: '#4c0e5f',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon16: 'favicon.ico',
      favicon32: 'favicon.ico',
      faviconSVG: 'logo.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    }
  },

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Budapest Ambient Display'
        return args
      })
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
