<template>
	<div style="margin: 20px;">
		<a-card title="模块列表" style="min-height: calc(100vh - 160px);">
			<!-- <a-button type="primary" class="addInp" @click="add">新增用户</a-button> -->
			<a-table :columns="columns" :data-source="data" :row-selection="{ onChange: tableOnChange }" :pagination="false">
				<span slot="action" slot-scope="text, record">
					<a-tag color="blue" @click="edit(text)">编辑</a-tag>
					<a-tag color="red" @click="deleteMessage(text)">删除</a-tag>
				</span>
			</a-table>
			<a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items />
		</a-card>
		<a-modal title="删除模块" :visible="visible" okText="确认" cancel-text="取消" centered @ok="deletes" @cancel="visible = false">确认删除?</a-modal>
	</div>
</template>

<script>
// this.current = e
// this.$router.push(`/message_edit/${e}`)
const columns = [
	{
		title: '名称',
		key: 'name',
		dataIndex: 'name'
	},
	{
		title: '描述',
		key: 'description',
		dataIndex: 'description'
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' }
	}
];
import helper from '../../../utils/helper.js';
import adminJs from '../../../server/admin.js';
export default {
	data() {
		return {
			current: 1,
			columns,
			total:0,
			data: [],
			visible: false,
			deleteId: ''
		};
	},
	async created() {
		if (this.$route.params.searchVal) {
			console.log('有搜索值');
			if (this.$route.params.pageNumber) {
				console.log('有页数');
			}
		} else {
			if (this.$route.params.pageNumber) {
			}
			this.userTypeList();
		}

	},
	methods: {
		async userTypeList() {
			const data = await adminJs.userTypeList({page_size:10,page_number:this.current}, helper.adminHeaders());
			console.log(data)
			if (data.code === 0) {
				this.total = data.data.amount
				this.data = data.data.rows.map(item => {
					item.key = item.id;
					return item;
				});
				if(data.data.rows.length === 0){
					this.$router.push('(`/system/usertype/list/1')
				}
			}
		},
		deleteMessage(text) {
			this.deleteId = text.id;
			this.visible = true;
		},
		tableOnChange(e) {
			//多选变化
		},
		async deletes() {
			const data = await adminJs.deleteModule({id:this.deleteId},helper.adminHeaders())
			if(data.code === 0){
				this.visible = false
				this.$message.success('删除成功')
				this.moduleList();
			}
		},
		add() {
			this.$router.push('/system/usertype/add');
		},
		paginationChange(index){
			this.$router.push(`/system/usertype/list/${index}`)
		},
		edit(text) {
			console.log(text)
			this.$router.push({
				path: '/system/usertype/edit',
				query: { q: helper.aesEncryptUrlData({ id: text.id ,description:text.description,name:text.name}) }
			});
		}
	},
	watch:{
		$route(val){
			if(val.params.pageNumber){
				this.current = Number(val.params.pageNumber)
			}
			this.moduleList()
		}
	}
};
</script>

<style></style>
