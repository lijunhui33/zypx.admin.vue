<template>
	<div style="margin: 20px;">
		<a-card title="路由列表" style="min-height: calc(100vh - 160px);overflow: hidden;">
			<a-button type="primary" class="addInp" @click="add">新增路由</a-button>
			<!-- <a-table :columns="columns" :data-source="data" :row-selection="{ onChange: tableOnChange }" :pagination="false">
				<span slot="action" slot-scope="text, record">
					<a-tag color="blue" @click="edit(text)">编辑</a-tag>
					<a-tag color="red" @click="deleteMessage(text)">删除</a-tag>
				</span>
			</a-table> -->
			<div class="tables" v-for="(item,index) in demoData" :key="item.id">
				<div class="fater">
					<div class="title">
						<a-icon type="plus-circle" class="icon"  @click="setSonType(index)" /> <span  @click="setSonType(index)" style="cursor: pointer;padding-left: 10px;">系统管理</span> 
						<a-button type="dashed" icon="edit" style="margin-left: 20px;">
						      编辑
						    </a-button>
						<a-button icon="plus" type="primary" style="margin-left: 20px;">
							新增下属分类
						</a-button>
						<a-button icon="delete" type="danger" style="margin-left: 20px;">
							删除
						</a-button>
					</div>
				</div>
				<div class="son" v-show="item.type">
					<div class="title">
						<a-icon type="minus" style="margin-left: 0px;" /> <span style="cursor: pointer;padding-left: 10px;">部门管理</span> 
						<a-button type="dashed" icon="edit" style="margin-left: 20px;">
						      编辑
						</a-button>
						<a-button icon="delete" type="danger" style="margin-left: 20px;">
							删除
						</a-button>
					</div>
				</div>
				<div class="son" v-show="item.type">
					<div class="title">
						<a-icon type="minus" style="margin-left: 0px;" /> <span style="cursor: pointer;padding-left: 10px;">登录日志</span> 
						<a-button type="dashed" icon="edit" style="margin-left: 20px;">
						      编辑
						</a-button>
						<a-button icon="delete" type="danger" style="margin-left: 20px;">
							删除
						</a-button>
						
					</div>
				</div>
			</div>
			<!-- <a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items /> -->
		</a-card>
	</div>
</template>

<script>
	const columns = [
		{
			title: '名称',
			key: 'name',
			dataIndex: 'name'
		},
		
		{
			title: '操作',
			key: 'action',
			scopedSlots: { customRender: 'action' }
		}
	];
	export default{
		data(){
			return{
				current:1,
				total:0,
				columns,
				data:[{key:1,name:1}],
				demoData:[{type:false,id:1},{type:true,id:2}]
			}
		},
		methods:{
			paginationChange(index){
				console.log(index)
			},
			add(){
				this.$router.push('/system/router/add')
			},
			tableOnChange(){
				
			},
			setSonType(index){//修改当前列表是否展开
				this.demoData[index].type = !this.demoData[index].type
			}
		},
		
	}
</script>

<style lang="scss">
	.tables{width: 100%;}
	.fater{font-size: 14px;
		.title{
			border-bottom: 1px solid #e5e5e5;height: 50px;line-height: 50px;display: flex;align-items: center;
			.icon{cursor: pointer;}
			.edit{margin-left: 20px;cursor: pointer;color: #1890ff;}
		}
	}
	.son{
		.title{
			border-bottom: 1px dashed #e5e5e5;height: 50px;line-height: 50px;display: flex;align-items: center;
			.icon{cursor: pointer;}
			.edit{margin-left: 20px;cursor: pointer;color: #1890ff;}
		}
	}
</style>
