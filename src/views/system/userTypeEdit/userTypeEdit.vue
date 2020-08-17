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
			<a-form :form="form"  @submit="handleSubmit" style="width: 1200px;">
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="模块名称"><a-input v-decorator="['name', { rules: [{ required: true, message: '请输入模块名称' }] }]" class="inp"  placeholder='请输入模块名称' /></a-form-item>
				
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="模块说明">
					<a-textarea :rows="4" v-decorator="['description', { rules: [{ required: false, message: '请输入模块说明' }] }]"   placeholder='请输入模块说明' class="inp" />
				</a-form-item>
				<!--  -->
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }"><a-button type="primary" html-type="submit">更新</a-button></a-form-item>
			</a-form>
			
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
			selectId:'',
			id:''
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
	created(){
		if(this.$route.query.q){
			const obj = JSON.parse(helper.aesDecryptUrlData(this.$route.query.q))
			this.userTypeDetail(obj.id)
		}
	},
	methods: {
		async userTypeDetail(id){
			const data = await adminJs.userTypeDetail({id:id,find_type:'id'},helper.adminHeaders())
			if(data.code === 0){
				this.form.setFieldsValue({
					name:data.data.name,
					description:data.data.description,
				})
				this.id = data.data.id
			}
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					this.add(values)
				}
			});
		},
		
		paginationChange(e){
			
		},
		async add(values){
			let obj = {
				name:values.name,
				description: values.description,
				id:this.id
			}
			const data = await adminJs.putUserType(obj,helper.adminHeaders())
			if(data.code === 0){
				this.$message.success('更新成功')
				
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
