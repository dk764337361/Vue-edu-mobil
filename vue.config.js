const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    extract: false
  },
  // 图⽚压缩 loader 配置
  chainWebpack: config => {
  // 配置图⽚压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: {
    // 通过 CDN 引⼊
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  }
})
