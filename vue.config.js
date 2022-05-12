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