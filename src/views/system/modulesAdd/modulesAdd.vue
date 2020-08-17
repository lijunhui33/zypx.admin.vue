<template>
	<div style="margin: 20px;">
		<a-card style="min-height: calc(100vh - 160px);overflow: hidden;">
			<a-row  style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;"  @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" /><span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit" style="width: 1100px;">
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="模块名称"><a-input v-decorator="['name', { rules: [{ required: true, message: '请输入模块名称' }] }]" class="inp"  placeholder='请输入模块名称' /></a-form-item>
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="模块路径"><a-input v-decorator="['path', { rules: [{ required: true, message: '请输入模块路径' }] }]" class="inp"  placeholder='请输入模块路径' /></a-form-item>
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属角色">
				    <a-input v-decorator="['gender', { rules: [{ required: true, message: '请选择所属角色' }] }]" :min="1" :max="10" style="width: 410px !important;pointer-events: none;" placeholder="请选择所属角色"  />
				    <a class="ant-form-text" style="margin-left: 10px;" @click="selectModuleType = true">
				    选择
				    </a>
				</a-form-item>
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="模块说明">
					<a-textarea :rows="4" v-decorator="['description', { rules: [{ required: false, message: '请输入模块说明' }] }]"   placeholder='请输入模块说明' class="inp" />
				</a-form-item>
				<!--  -->
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item>
			</a-form>
			<a-modal
				title="选择所属用户"
				:visible="selectModuleType"
				@cancel="selectModuleType = false"
				:footer="null"
			>
				<a-table :columns="columns" :data-source="data"  :pagination="false">
					<span slot="action" slot-scope="text, record">
						<a @click="selectRole(text)">选择</a>
					</span>
				</a-table>
				<a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items />
			</a-modal>
		</a-card>
	</div>
</template>

<script>
const formItemLayout = {
	labelCol: { span: 2},
	wrapperCol: { span: 10 }
};
const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 }
};
const columns = [
		
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},{
			title: '描述',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: '操作',
			key: 'action',
			scopedSlots: { customRender: 'action' }
		}
	];
	import helper from '../../../utils/helper.js'
	import adminJs from '../../../server/admin.js'
export default {
	data() {
		return {
			checkNick: false,
			formItemLayout,
			formTailLayout,
			form: this.$form.createForm(this, { name: 'dynamic_rule' }),
			selectModuleType:false,
			columns,
			data:[],
			total:1,
			current:1,
			userTypeList:[],
			selectId:''
		};
	},
	async mounted() {
		// this.form.setFieldsValue({
		// 	gender:123
		// })
		const data = await adminJs.userTypeList({},helper.adminHeaders())
		if(data.code === 0){
			this.data = data.data.rows.map(item=>{
				item.key = item.id
				return item
			})
		}
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					this.add(values)
				}
			});
		},
		selectRole(e){
			console.log(e)
			this.selectId = e.id
			this.form.setFieldsValue({
				gender:e.name
			})
			this.selectModuleType = false
		},
		paginationChange(e){
			
		},
		async add(values){
			console.log(values)
			let obj = {
				name:values.name,
				description: values.description,
				url: values.path,
				user_type_name: values.gender,
				user_type_id: this.selectId
			}
			const data = await adminJs.addSysModule(obj,helper.adminHeaders())
			if(data.code === 0){
				this.$message.success('添加成功')
				this.form.setFieldsValue({
					name:'',
					description:'',
					path:'',
					gender:''
				})
			}else{
				this.$message.error(data.message+','+data.detail)
			}
		}
	}
};
</script>

<style scoped>
	.inp{width: 410px;}
</style>
