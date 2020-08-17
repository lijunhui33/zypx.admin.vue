<template>
	<div style="margin: 20px;">
		<a-card title="认证审核" style="min-height: calc(100vh - 160px);">
			<a-button class="addInp" type="primary">新增企业</a-button>
			<a-table :columns="columns" :data-source="data" :row-selection="{onChange:tableOnChange}" :pagination="false">
				<span slot="action" slot-scope="text, record" class="editBox">
					<a @click="toExamine(text)">审核</a>
				</span>
			</a-table>
			<a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items />
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
			title:'公司名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title:'申请人',
			dataIndex: 'apply_name',
			key: 'apply_name'
		},
		{
			title: '操作',
			key: 'action',
			scopedSlots: { customRender: 'action' }
		}
	];
	import helper from '../../../utils/helper.js'
	export default{
		data(){
			return{
				current:1,//页数
				total:0,//总数据
				columns,
				data:[{key:1,id:1,name:'广东牛牛',apply_name:'张三'}],
			}
		},
		created(){
			if(this.$route.params.pageNumber){
				console.log('有页数')
			}
			
		},
		methods:{
			tableOnChange(e){//多选变化
				
			},
			paginationChange(e){//分页
				// this.current = e
				// this.$router.push(`/message_edit/${e}`)
			},
			toExamine(e){
				console.log(e)
				this.$router.push({
					path: '/company/examine/detail',
					query: { q: helper.aesEncryptUrlData({ id: e.id }) }
				});
			},
			edit(e){
				console.log(e)
				this.$router.push('/company/examine/detail')
			}
		}
	}
</script>

<style scoped lang="scss">
	.editBox{
		a{padding-right: 20px;}
	}
	.bottomInp{
		margin: 10px 20px 0 0;
	}
</style>
