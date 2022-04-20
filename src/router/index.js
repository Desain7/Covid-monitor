//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件


//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
 routes:[
		{
   path:'/about',
   component:About
		},
		{
   path:'/home',
   component:Home
		}
	]
})

//暴露router
export default router