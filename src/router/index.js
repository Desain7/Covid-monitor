//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件
import china from '../pages/china'
import oversea from '../pages/oversea'
import vaccine from '../pages/vaccine'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
 routes:[
		{
			path:'/china',
			component:china
		},
		{
			path:'/oversea',
			component:oversea
		},
		{
			path:'/vaccine',
			component:vaccine
		},
		{path: '*', redirect: '/china'}

	]
})

//暴露router
export default router