<template>
	<div style="margin: 20px;">
		<a-card title="账号管理">
			<a-table :columns="columns" :data-source="data" :row-selection="{onChange:tableOnChange}" :pagination="false">
				<span slot="action" slot-scope="text, record">
					<a @click="edit(text)">编辑</a>
					<a @click="deleteMessage(text)" style="margin-left: 30px;">删除</a>
				</span>
			</a-table>
		</a-card>
	</div>
</template>

<script>
	// this.current = e
	// this.$router.push(`/message_edit/${e}`)
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
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
				data:[{key:1,id:1}],
			}
		},
		created(){
			if(this.$route.params.pageNumber){
				console.log('有页数')
			}
			
		},
		methods:{
			tableOnChange(e){//多选变化
				
			}
		}
	}
</script>

<style>
</style>
