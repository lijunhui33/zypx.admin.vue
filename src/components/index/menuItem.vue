<template>
	<div :style="!childIsCollapse ? 'width: 220px;' : ''">
		<a-menu mode="inline" theme="dark" :inline-collapsed="childIsCollapse" @click="menuClick" :selectedKeys="[selectedKeys]" :defaultOpenKeys="defaultOpenKeys" :multiple="false">
			<a-sub-menu v-for="child in route" :key="child.name" v-if="child.meta.hasSubMenu">
				<span slot="title">
					<a-icon :type="child.meta.icon" />
					<span>{{ child.meta.title }}</span>
				</span>
				<MenuItem :route="child.children" :isCollapse="childIsCollapse"></MenuItem>
			</a-sub-menu>
			<a-menu-item key="5" :key="child.name" v-else v-show="!child.meta.isHide">
				<a-icon :type="child.meta.icon" :style="child.meta.left?`margin-left:${child.meta.left}0px`:''" />
				<span>{{ child.meta.title }}</span>
			</a-menu-item>
		</a-menu>
	</div>
</template>

<script>
export default {
	name: 'MenuItem',
	data() {
		return {
			childIsCollapse: false,
			selectedKeys: '',
			screenWidth:document.body.clientWidth,
			defaultOpenKeys:[]
		};
	},
	props: {
		route: null,
		isCollapse: {
			default: false,
			type: Boolean
		},
	},
	created() {
		this.selectedKeys = this.$route.name;
		//要展开的面板
		let selectKeyArr = []
		this.$route.matched.map(item=>{
			selectKeyArr.push(item.name)
		})
		this.defaultOpenKeys = selectKeyArr
	},
	mounted() {
		const that = this
		window.onresize = () =>{
			return(()=>{
				that.screenWidth = document.body.clientWidth
			})
		}
	},
	methods: {
		menuClick(e) {
			this.$router.push('/'+e.key);
		},
		routerChange(){
			this.selectedKeys = this.$route.name
		}
	},
	watch: {
		isCollapse(val) {
			this.childIsCollapse = val;
		},
		screenWidth(val){
		},
		$route(val){
			this.routerChange()
		}
	}
};
</script>

<style>
.s {
	width: 100px !important;
}
</style>
<!-- 路由demo -->
<!-- <a-menu mode="inline" theme="dark" :inline-collapsed="isCollapse">
			<a-menu-item 
				v-for="route in demorotes" 
				:key="route.path" 
				v-if="!route.meta.hasSubMenu">
				<a-icon type="pie-chart" />
				<span>{{ route.meta.title }}</span>
			</a-menu-item>
			<a-sub-menu :key="route.path" v-else>
				<span slot="title">
					<a-icon type="mail" />
					<span>{{ route.meta.title }}</span>
				</span>
				<a-sub-menu 
					key="sub1" 
					v-for="childRoute in route.children" 
					:key="childRoute.path + Math.random()" 
					v-if="childRoute.meta.hasSubMenu">
					<span slot="title">
						<a-icon type="mail" />
						<span>{{ childRoute.meta.title }}</span>
					</span>
					<a-sub-menu key="sub1" 
						v-for="child in childRoute.children" 
						:key="child.path + Math.random()" 
						v-if="child.meta.hasSubMenu">
						<span slot="title">
							<a-icon type="mail" />
							<span>{{ child.meta.title }}</span>
						</span>
					</a-sub-menu>
					<a-menu-item key="5" :key="child.path + Math.random()" v-else>{{ child.meta.title }}</a-menu-item>
				</a-sub-menu>
				<a-menu-item key="5" :key="childRoute.path + Math.random()" v-else>{{ childRoute.meta.title }}</a-menu-item>
			</a-sub-menu>
		</a-menu> -->
<!-- let routes = [
	// 首页(仪表盘、快速入口)
	{
		path: '/index',
		name: 'index',
		redirect: '/index',
		meta: {
			title: '首页', // 菜单标题
			icon: 'el-icon-s-home', // 图标
			hasSubMenu: false // 是否包含子菜单，false 没有子菜单；true 有子菜单
		},
		children: [
			{
				path: '/index'
			}
		]
	},
	// 员工管理
	{
		path: '/employee',
		name: 'employee',
		redirect: '/employee/employeeStatistics',
		meta: {
			title: '员工管理', // 菜单标题
			icon: 'el-icon-user-solid', // 图标
			hasSubMenu: true // 是否包含子菜单
		},
		children: [
			// 员工统计
			{
				path: '/employeeStatistics',
				name: 'employeeStatistics',
				meta: {
					title: '员工统计', // 菜单标题,
					hasSubMenu: false // 是否包含子菜单
				}
			},
			// 员工管理(增删改查)
			{
				path: '/employeeManage',
				name: 'employeeManage',
				meta: {
					title: '员工管理', // 菜单标题
					hasSubMenu: false // 是否包含子菜单
				}
			}
		]
	},
	// 考勤管理
	{
		path: '/attendManage',
		name: 'attendManage',
		redirect: '/attendManage/attendStatistics',
		meta: {
			title: '考勤管理', // 菜单标题
			icon: 'el-icon-s-claim', // 图标
			hasSubMenu: true // 是否包含子节点，false 没有子菜单；true 有子菜单
		},
		children: [
			// 考勤统计
			{
				path: 'attendStatistics',
				name: 'attendStatistics',
				meta: {
					title: '考勤统计', // 菜单标题
					hasSubMenu: false // 是否包含子菜单
				}
			},
			// 考勤列表
			{
				path: 'attendList',
				name: 'attendList',
				meta: {
					title: '考勤列表', // 菜单标题
					hasSubMenu: false // 是否包含子菜单
				}
			},
			// 异常管理
			{
				path: 'exceptManage',
				name: 'exceptManage',
				meta: {
					title: '异常管理', // 菜单标题
					hasSubMenu: false // 是否包含子菜单
				}
			}
		]
	},
	// 工时管理
	{
		path: '/timeManage',
		name: 'timeManage',
		redirect: '/timeManage/timeStatistics',
		meta: {
			title: '工时管理', // 菜单标题
			icon: 'el-icon-message-solid', // 图标
			hasSubMenu: true // 是否包含子菜单，false 没有子菜单；true 有子菜单
		},
		children: [
			// 工时统计
			{
				path: 'timeStatistics',
				name: 'timeStatistics',
				meta: {
					title: '工时统计', // 菜单标题
					hasSubMenu: false // 是否包含子菜单
				}
			},
			// 工时列表
			{
				path: 'timeList',
				name: 'timeList',
				meta: {
					title: '工时列表', // 菜单标题
					hasSubMenu: true // 是否包含子菜单
				},
				children: [
					{
						path: 'options1',
						meta: {
							title: '选项一', // 菜单标题
							hasSubMenu: false // 是否包含子菜单
						}
					},
					{
						path: 'options2',
						meta: {
							title: '选项二', // 菜单标题
							hasSubMenu: false // 是否包含子菜单
						}
					}
				]
			}
		]
	}
]; -->
