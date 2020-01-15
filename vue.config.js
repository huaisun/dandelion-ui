module.exports = {
  "devServer": {
    "port": 3000,
    "proxy": 'http://127.0.0.1:3099'
  },
  "transpileDependencies": [
    "vuetify"
  ],
  //打包后的位置(如果不设置这个静态资源会报404)
  publicPath: './',
  //打包后的目录名称
  outputDir: 'dist',
  //静态资源目录名称
  assetsDir: 'static',
}