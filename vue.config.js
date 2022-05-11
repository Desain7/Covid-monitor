const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  devServer: {
       proxy: {
       '/covid-data': {// 匹配所有以 '/api1'开头的请求路径
         target: 'https://c.m.163.com/ug/api/wuhan/app/data/',// 代理目标的基础路径
         changeOrigin: true,
         pathRewrite: {'^/covid-data': ''}
       },
       '/privince-data': {// 匹配所有以 '/api1'开头的请求路径
         target: 'https://api.inews.qq.com/newsqa/v1/query/pubished/daily/',// 代理目标的基础路径
         changeOrigin: true,
         pathRewrite: {'^/privince-data': ''}
       },
       '/vaccine-data': {// 匹配所有以 '/api1'开头的请求路径
         target: 'https://api.inews.qq.com/newsqa/',// 代理目标的基础路径
         changeOrigin: true,
         pathRewrite: {'^/vaccine-data': ''}
       },
       '/global-data': {// 匹配所有以 '/api1'开头的请求路径
         target: 'https://www.maomin.club/fy/',// 代理目标的基础路径
         changeOrigin: true,
         pathRewrite: {'^/global-data': ''}
       },
      //  '/local-static': {// 匹配所有以 '/api1'开头的请求路径
      //   target: 'http://localhost:5000/api/static',// 代理目标的基础路径
      //   changeOrigin: true,
      //   pathRewrite: {'^/local-static': ''}
      // }
     }
   }
 }
 /*
    changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
    changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
    changeOrigin默认值为true
 */