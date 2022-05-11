//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {
	overseaData:null,
	overseaIsOk:false,
	updateTime:'',
	baseInformation:null,
	baseIsOk:false,
	mainInformation:null,
	mainIsOk:false,
}
const getters = {
	
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})