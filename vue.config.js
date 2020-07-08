module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    https: false,//https:{type:Boolean}
    open: true,//配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://192.168.101.29',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}