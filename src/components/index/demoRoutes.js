let routes = [
	// 首页(仪表盘、快速入口)
	{
		path: '/index',
		name: 'index',
		redirect: '/index',
		meta: {
			title: 'demo路由，模拟递归', // 菜单标题
			icon: 'home', // 图标
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
							hasSubMenu: true // 是否包含子菜单
						},
						children:[
							{
								path:'demo',
								name:'demo',
								meta:{
									title:'demo'
								}
							}
						]
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
];

export default routes