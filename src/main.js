import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import VueRouter from 'vue-router'
import scroll from 'vue-seamless-scroll'


Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(scroll)
//配置请求基准路径
axios.defaults.baseURL='http://localhost:5000/api/'
Vue.prototype.$http=axios
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  store,
  router
})
