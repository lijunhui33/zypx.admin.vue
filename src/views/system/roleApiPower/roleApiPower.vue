<template>
	<div style="margin: 20px;">
		<a-card title="角色授权" style="min-height: calc(100vh - 160px);">
			
			<a-button type="primary" class="addInp" @click="add">新增授权</a-button>
			<a-table :columns="columns" :data-source="data" :row-selection="{onChange:tableOnChange}" :pagination="false">
				<span slot="action" slot-scope="text, record">
					
					<a-tag color="blue" @click="edit(text)">编辑</a-tag>
					<a-tag color="red" @click="deleteMessage(text)">删除</a-tag>
				</span>
			</a-table>
			<a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items />
		</a-card>
		<a-modal title="删除api" :visible="visible" okText="确认" cancel-text="取消" centered @ok="deletes"  @cancel="visible = false">
			确认删除?
		</a-modal>
	</div>
</template>

<script>
	// this.current = e
	// this.$router.push(`/message_edit/${e}`)
	const columns = [
		{
			title:'名称',
			key:'role_name',
			dataIndex:'role_name'
		},
		{
			title:'绑定api id',
			key:'api_id_list',
			dataIndex:'api_id_list'
		},
		{
			title: '操作',
			key: 'action',
			scopedSlots: { customRender: 'action' }
		}
	];
	import helper from '../../../utils/helper.js'
	import adminJs from '../../../server/admin.js'
	export default{
		data(){
			return{
				current:1,
				columns,
				total:0,
				data:[],
				visible:false,
				deleteId:"",
			}
		},
		created(){
			if(this.$route.params.searchVal){
				console.log('有搜索值')
				if(this.$route.params.pageNumber){
					console.log('有页数')
				}
			}else{
				if(this.$route.params.pageNumber){
					this.current = Number(this.$route.params.pageNumber)
				}
				this.rolePowerList()
			}
			// if(this.$router.params.searchVal){
				
			// }else{
			// 	if(this.$route.params.pageNumber){
			// 		console.log('有页数')
			// 	}
			// }
		},
		methods:{
			async rolePowerList(){
				const data = await adminJs.rolePowerList({page_size:10,page_number:this.current},helper.adminHeaders())
				if(data.code === 0){
					this.total = data.data.amount
					this.data = data.data.rows.map(item=>{
						item.key = item.id
						return item
					})
					if(data.data.rows.length === 0){
						this.$router.push('/system/role/prower/list/1')
					}
				}
			},
			deleteMessage(text){
				this.deleteId = text.id
				this.visible = true
			},
			tableOnChange(e){//多选变化
				
			},
			edit(text){
				this.$router.push({
					path: '/system/role/prower/edit',
					query: { q: helper.aesEncryptUrlData({ id: text.id }) }
				});
			},
			add(){
				this.$router.push('/system/role/prower/add')
			},
			paginationChange(index){
				this.$router.push(`/system/role/prower/list/${index}`)
			},
			async deletes(){
				const data = await adminJs.deleteRolePower({id:this.deleteId},helper.adminHeaders())
				if(data.code === 0){
					this.$message.success('删除成功')
					this.visible = false
					this.rolePowerList()
				}else{
					this.$message.error(data.message+','+data.detail)
				}
			}
		},
		watch:{
			$route(val){
				if(val.params.pageNumber){
					this.current = Number(val.params.pageNumber)
				}
				this.rolePowerList()
			}
		}
	}
</script>

<style>
</style>
