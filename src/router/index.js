import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index/index.vue'),
	meta:{
		title:'首页'
	},
	redirect:'/certificate/index',
	children:[
		{
			path:'/certificate',
			name:'certificate',
			component: () => import('../views/certificate/index.vue'),
			meta:{title:'资格证书查询',hasSubMenu:true,icon:'search'},
			redirect:'/certificate/gjzyzgzs/query',
			children:[
				{
					path:'/certificate/gjzyzgzs/query',
					name:'certificate/gjzyzgzs/query',
					component: () => import('../views/certificate/gjzyzgzs.vue'),
					meta:{title:'国家职业资格证书查询',hasSubMenu:false,icon:'minus',left:2,isHide:true}
				},
				{
					path:'/certificate/index',
					name:'certificate/index',
					component: () => import('../views/certificate/certificate.vue'),
					meta:{title:'查询',hasSubMenu:false,icon:'minus',left:2}
				},{
					path:'/certificate/zxnlzyzgzs/query',
					name:'certificate/zxnlzyzgzs/query',
					component: () => import('../views/certificate/zxnlzyzgzs.vue'),
					meta:{title:'专项能力职业资格证书查询',hasSubMenu:false,icon:'minus',left:2,isHide:true}
				}
			]
		},
		// {
		// 	path:'/company',
		// 	name:'company',
		// 	component: () => import('../views/company/index.vue'),
		// 	meta:{title:'企业管理',hasSubMenu:true,icon:'bank'},
		// 	redirect:'/company/examine/list',
		// 	children:[
		// 		// {
		// 		// 	path:'/company/account/:pageNumber?',
		// 		// 	name:'company/account',
		// 		// 	component: () => import('../views/company/account/account.vue'),
		// 		// 	meta:{title:'账号管理',hasSubMenu:false,icon:'minus',left:2}
		// 		// },
		// 		{
		// 			path:'/company/examine/list/:pageNumber?',
		// 			name:'company/examine/list',
		// 			component: () => import('../views/company/examine/examine.vue'),
		// 			meta:{title:'认证审核',hasSubMenu:false,icon:'minus',left:2}
		// 		},
		// 		{
		// 			path:'/company/examine/detail',
		// 			name:'company/examine/detail',
		// 			component: () => import('../views/company/examineDetail/examineDetail.vue'),
		// 			meta:{title:'审核详情',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/company/interview/:pageNumber?',
		// 			name:'company/interview',
		// 			component: () => import('../views/company/interview/interview.vue'),
		// 			meta:{title:'面试管理',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/company/position/:pageNumber?',
		// 			name:'company/position',
		// 			component: () => import('../views/company/position/position.vue'),
		// 			meta:{title:'职位管理',hasSubMenu:false,icon:'minus',left:2}
		// 		}
		// 	],
		// },
		// {
		// 	path:'/seeker',
		// 	name:'seeker',
		// 	component: () => import('../views/seeker/index.vue'),
		// 	meta:{title:'求职者管理',hasSubMenu:true,icon:'bars'},
		// 	redirect:'/seeker/resume',
		// 	children:[
		// 		{
		// 			path:'/seeker/resume/:pageNumber?',
		// 			name:'seeker/resume',
		// 			component: () => import('../views/seeker/resume/resume.vue'),
		// 			meta:{title:'个人简历',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/seeker/job-intention/:pageNumber?/:searchVal?',
		// 			name:'seeker/job-intention',
		// 			component: () => import('../views/seeker/jobIntention/jobIntention.vue'),
		// 			meta:{title:'求职意向',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/seeker/favorite-job/:pageNumber?',
		// 			name:'seeker/favorite-job',
		// 			component: () => import('../views/seeker/favoriteJob/favoriteJob.vue'),
		// 			meta:{title:'收藏职位',hasSubMenu:false,icon:'minus',left:2}
		// 		},
		// 		{
		// 			path:'/seeker/interview/:pageNumber?',
		// 			name:'seeker/interview',
		// 			component: () => import('../views/seeker/interview/interview.vue'),
		// 			meta:{title:'面试管理',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/seeker/favorite-company/:pageNumber?',
		// 			name:'seeker/favorite-company',
		// 			component: () => import('../views/seeker/favoriteCompany/favoriteCompany.vue'),
		// 			meta:{title:'收藏企业',hasSubMenu:false,icon:'minus',left:2}
		// 		}
		// 	],
		// },
		// {
		// 	path:'/system',
		// 	name:'system',
		// 	component: () => import('../views/system/index.vue'),
		// 	meta:{title:'系统管理',hasSubMenu:true,icon:'setting'},
		// 	children:[
		// 		// {
		// 		// 	path:'/system/account/list/:pageNumber?/:searchVal?',
		// 		// 	name:'system/account/list',
		// 		// 	component: () => import('../views/system/accountList/accountList.vue'),
		// 		// 	meta:{title:'账号管理',hasSubMenu:false,icon:'minus',left:2},
		// 		// },{
		// 		// 	path:'/system/account/add',
		// 		// 	name:'system/account/add',
		// 		// 	component: () => import('../views/system/accountAdd/accountAdd.vue'),
		// 		// 	meta:{title:'新增账号',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		// },
		// 		{
		// 			path:'/system/department/list/:pageNumber?',
		// 			name:'system/department/list',
		// 			component: () => import('../views/system/departmentList/departmentList.vue'),
		// 			meta:{title:'部门管理',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/department/edit',
		// 			name:'system/department/edit',
		// 			component: () => import('../views/system/departmentEdit/departmentEdit.vue'),
		// 			meta:{title:'编辑部门',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/system/department/add',
		// 			name:'system/department/add',
		// 			component: () => import('../views/system/departmentAdd/departmentAdd.vue'),
		// 			meta:{title:'新增部门',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},{
		// 			path:'/system/role/add',
		// 			name:'system/role/add',
		// 			component: () => import('../views/system/roleAdd/roleAdd.vue'),
		// 			meta:{title:'新增角色',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},{
		// 			path:'/system/role/edit',
		// 			name:'system/role/edit',
		// 			component: () => import('../views/system/roleEdit/roleEdit.vue'),
		// 			meta:{title:'编辑角色',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},{
		// 			path:'/system/log/list/:pageNumber?/:searchVal?',
		// 			name:'system/log/list',
		// 			component: () => import('../views/system/loginLog/loginLog.vue'),
		// 			meta:{title:'登录日志',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/power/list/:pageNumber?/:searchVal?',
		// 			name:'system/power/list',
		// 			component: () => import('../views/system/powerList/powerList.vue'),
		// 			meta:{title:'权限设置',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/role/list/:pageNumber?/:searchVal?',
		// 			name:'system/role/list',
		// 			component: () => import('../views/system/roleList/roleList.vue'),
		// 			meta:{title:'角色管理',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/usertype/list/:pageNumber?',
		// 			name:'system/usertype/list',
		// 			component: () => import('../views/system/userTypeList/userTypeList.vue'),
		// 			meta:{title:'用户类型管理',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/usertype/edit',
		// 			name:'system/usertype/edit',
		// 			component: () => import('../views/system/userTypeEdit/userTypeEdit.vue'),
		// 			meta:{title:'用户类型编辑',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},{
		// 			path:'/system/usertype/add',
		// 			name:'system/usertype/add',
		// 			component: () => import('../views/system/userTypeAdd/userTypeAdd.vue'),
		// 			meta:{title:'添加用户类型',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/system/module/list/:pageNumber?/:searchVal?',
		// 			name:'system/module/list',
		// 			component: () => import('../views/system/modulesList/modulesList.vue'),
		// 			meta:{title:'模块列表',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/userapis/list/:pageNumber?/:searchVal?',
		// 			name:'system/userapis/list',
		// 			component: () => import('../views/system/apiList/apiList.vue'),
		// 			meta:{title:'api管理',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/module/add/:pageNumber?',
		// 			name:'system/module/add',
		// 			component: () => import('../views/system/modulesAdd/modulesAdd.vue'),
		// 			meta:{title:'新增模块',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},{
		// 			path:'/system/module/edit',
		// 			name:'system/module/edit',
		// 			component: () => import('../views/system/modulesEdit/modulesEdit.vue'),
		// 			meta:{title:'编辑模块',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/system/userapis/edit',
		// 			name:'system/userapis/edit',
		// 			component: () => import('../views/system/apiEdit/apiEdit.vue'),
		// 			meta:{title:'编辑api',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/system/userapis/add',
		// 			name:'system/userapis/add',
		// 			component: () => import('../views/system/apiAdd/apiAdd.vue'),
		// 			meta:{title:'新增api',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
				
		// 		{
		// 			path:'/system/role/prower/list/:pageNumber?',
		// 			name:'system/role/prower/list',
		// 			component: () => import('../views/system/roleApiPower/roleApiPower.vue'),
		// 			meta:{title:'角色授权',hasSubMenu:false,icon:'minus',left:2}
		// 		},
		// 		{
		// 			path:'/system/role/prower/add',
		// 			name:'system/role/prower/add',
		// 			component: () => import('../views/system/roleApiPowerAdd/roleApiPowerAdd.vue'),
		// 			meta:{title:'角色授权',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/system/role/prower/edit',
		// 			name:'system/role/prower/edit',
		// 			component: () => import('../views/system/roleApiPowerEdit/roleApiPowerEdit.vue'),
		// 			meta:{title:'角色授权编辑',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		},
		// 		{
		// 			path:'/system/router/list/:pageNumber?/:searchVal?',
		// 			name:'system/router/list',
		// 			component: () => import('../views/system/routerList/routerList.vue'),
		// 			meta:{title:'路由列表',hasSubMenu:false,icon:'minus',left:2}
		// 		},{
		// 			path:'/system/router/add',
		// 			name:'system/router/add',
		// 			component: () => import('../views/system/routerAdd/routerAdd.vue'),
		// 			meta:{title:'新增路由',hasSubMenu:false,icon:'minus',left:2,isHide:true}
		// 		}
		// 	]
		// }
	]
  },
  {
	  path:'/login',
	  name:'login',
	  component: () => import('../views/auth/login.vue'),
	  meta:{title:'登录'}
  },
  {
	  path:'*',
	  name:'404',
	  component: () => import('../views/404/404.vue'),
	  meta:{title:'404'}
  }
]

//解决相同路由情况下跳转报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
