//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {
	covidData: {},
	date:[],
	confirmed:[],
	chinaProvince:[]
}
const getters = {
	confirm(state){
		state.covidData.data.chinaDayList.forEach(element => {
			state.confirmed.push(element.today.confirm)
		});
		return state.confirmed
	},
	date(state){
		state.covidData.data.chinaDayList.forEach(element => {
			state.date.push(element.date)
		});
		return state.date
	},
	chinaProvince(state){
			state.covidData.data.areaTree[2].children.forEach(element => 
			state.chinaProvince.push({
				name:element.name,
				value:element.today.confirm,
				confirm: element.today.confirm,
				dead: element.today.dead,
				heal: element.today.heal,
				severe: element.today.severe,
				storeConfirm: element.today.storeConfirm,
				suspect: element.today.suspect,
			}))
			return state.chinaProvince
	}
	
   }

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})