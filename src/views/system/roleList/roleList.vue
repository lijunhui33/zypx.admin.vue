<template>
	<div style="margin: 20px;">
		<a-card title="角色管理" style="min-height: calc(100vh - 160px);">
			<a-button type="primary" class="addInp" @click="add">新增角色</a-button>
			<a-table :columns="columns" :data-source="data" :row-selection="{onChange:tableOnChange}" :pagination="false">
				<span slot="action" slot-scope="text, record">
					<a-tag color="blue" @click="edit(text)">
					        编辑
					</a-tag>
					<a-tag color="red" @click="deleteRole(text)"> 
					        删除
					</a-tag>
				</span>
			</a-table>
			<a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="page_number" :total="total" show-less-items />
			<!-- <a-pagination style="margin-top: 30px;" :current="current" :total="total"  /> -->
		</a-card>
		<a-modal title="删除角色" :visible="visible" okText="确认" cancel-text="取消" centered @ok="deletes"  @cancel="visible = false">
			确认删除?
		</a-modal>
	</div>
</template>

<script>
	// this.current = e
	// this.$router.push(`/message_edit/${e}`)
	import helper from '../../../utils/helper.js'
	import adminJs from '../../../server/admin.js'
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title:'名称',
			dataIndex:'name',
			key:'name'
		},
		{
			title:'描述',
			dataIndex:'description',
			key:'description',
			width:'20%'
		},
		{
			title:'创建时间',
			dataIndex:'created_time',
			key:'created_time',
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
				columns,
				data:[],
				page_size:10,
				page_number:1,
				visible:false,
				id:'',
				total:0
			}
		},
		created(){
			
			
			if(this.$route.params.searchVal){
				// console.log('有搜索值')
				// if(this.$route.params.pageNumber){
				// 	console.log('有页数')
				// }
			}else{
				if(this.$route.params.pageNumber){
					this.current = Number(this.$route.params.pageNumber)
				}
				this.roleList()
			}
			
		},
		methods:{
			async roleList(){
				const data = await adminJs.roleList({page_size:this.page_size,page_number:this.current},helper.adminHeaders())
				if(data.code === 0){
					this.total = data.data.amount
					this.data = data.data.rows.map(item=>{
						item.created_time = helper.time(item.created_time)
						item.key = item.id
						return item
					})
					// console.log(this.data)
					if(data.data.rows.length === 0){
						this.$router.push('/system/role/list/1')
					}
				}
			},
			tableOnChange(e){//多选变化
				
			},
			add(){
				this.$router.push('/system/role/add')
			},
			edit(text){
				console.log(helper.aesEncryptUrlData({q:text.id}))
				this.$router.push({
					path:'/system/role/edit',
					query:{q:helper.aesEncryptUrlData({id:text.id})}
				})
			},
			deleteRole(text){
				this.visible = true
				this.id = text.id
			},
			async deletes(){
				const data =await adminJs.deleteRole({id:this.id},helper.adminHeaders())
				if(data.code === 0){
					this.$message.success('删除成功')
					this.visible = false
					this.roleList()
				}else{
					this.$message.error(data.message+','+data.detail)
				}
			},
			paginationChange(index){
				this.$router.push(`/system/role/list/${index}`)
			}
		},
		watch:{
			$route(val){
				if(val.params.pageNumber){
					this.current = Number(val.params.pageNumber)
				}
				this.roleList()
			}
		}
	}
</script>

<style>
</style>
