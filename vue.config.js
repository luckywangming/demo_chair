module.exports = {
  publicPath:'/chair/',
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/endpoint/': {
        target: 'https://api-t.laozicloud.com/',
        changeOrigin: true,
        pathRewrite: { }
      }
    }
  }
}