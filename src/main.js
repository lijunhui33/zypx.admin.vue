import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//ant-design  vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

Vue.config.productionTip = false
let type = true

import JsonExcel from 'vue-json-excel'//导出execl用
Vue.component('downloadExcel', JsonExcel)

router.beforeEach((to,from,next)=>{
	// if(to.path == '/demo2'){
	// 	setTimeout(()=>{		next({path:'/demo'})},1000)
	// }
	// next()
	if(type){
		next()
	}else{
		if(to.path == '/demo2'){
			type = true
			next()
		}else{
			next({path:'/demo2'})
		}
	}
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
