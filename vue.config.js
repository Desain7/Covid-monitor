const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  devServer: {
       proxy: {
       '/covid-data': {
         target: 'https://c.m.163.com/ug/api/wuhan/app/data/',
         changeOrigin: true,
         pathRewrite: {'^/covid-data': ''}
       },
       '/privince-data': {
         target: 'https://api.inews.qq.com/newsqa/v1/query/pubished/daily/',
         changeOrigin: true,
         pathRewrite: {'^/privince-data': ''}
       },
       '/vaccine-data': {
         target: 'https://api.inews.qq.com/newsqa/',
         changeOrigin: true,
         pathRewrite: {'^/vaccine-data': ''}
       },
       '/global-data': {
         target: 'https://www.maomin.club/fy/',
         changeOrigin: true,
         pathRewrite: {'^/global-data': ''}
       },
     }
   }
 }
 module.exports = {
  // 基本路径
  publicPath:"./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径
  outputDir:"dist",  //打包时生成的生产环境构建文件的目录
  assetsDir: 'public',  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录

}