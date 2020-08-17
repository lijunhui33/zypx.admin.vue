<template>
	<div style="margin: 20px;">
		<a-card style="min-height: calc(100vh - 160px);overflow: hidden;">
			<a-row style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;" @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" />
						<span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit" style="width: 1100px;">
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="路由名称">
					<a-input v-decorator="['name', { rules: [{ required: true, message: '请输入路由名称' }] }]" class="inp" placeholder="请输入路由名称" />
				</a-form-item>
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="路由路径">
					<a-input v-decorator="['path', { rules: [{ required: true, message: '请输入路由路径' }] }]" class="inp" placeholder="请输入路由路径" />
				</a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="路由说明">
					<a-textarea :rows="4" v-decorator="['description', { rules: [{ required: false, message: '请输入路由说明' }] }]" class="inp" placeholder="请输入路由说明" />
				</a-form-item>

				<!--  -->
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item>
			</a-form>
		</a-card>
		
	</div>
</template>

<script>
import helper from '../../../utils/helper.js';
import adminJs from '../../../server/admin.js';

const formItemLayout = {
	labelCol: { span: 2 },
	wrapperCol: { span: 10 }
};
const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 }
};
export default {
	data() {
		return {
			checkNick: false,
			formItemLayout,
			formTailLayout,
			form: this.$form.createForm(this, { name: 'dynamic_rule' }),
			selectModuleType: false,
			total: 1,
			current: 1,
			system_module_id: '' //选择的模块
		};
	},
	created() {
		this.moduleList();
	},
	mounted() {
		// this.form.setFieldsValue({
		// 	name:'123',
		// })
	},
	methods: {
		async moduleList() {
			const data = await adminJs.moduleList({}, helper.adminHeaders());
			if (data.code === 0) {
				this.data = data.data.rows.map(item => {
					item.key = item.id;
					return item;
				});
			}
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					this.addApi(values);
				}
			});
		},
		async addApi(values) {
			let obj = {
				name: values.name,
				description: values.description,
				http_method: values.methods,
				url: values.path,
				system_module_id: this.system_module_id,
				system_module_name: values.system_module_name
			};
			const data = await adminJs.addApi(obj,helper.adminHeaders())
			if(data.code === 0){
				this.$message.success('添加成功')
				this.form.setFieldsValue({
					name:'',
					description:'',
					methods:'',
					path:'',
					system_module_name:''
				})
			}else{
				this.$message.error(data.message+','+data.detail)
			}
		},
		selectMoule(text) {
			this.system_module_id = text.id;
			this.form.setFieldsValue({
				system_module_name: text.name
			});
			this.selectModuleType = false;
		},
		paginationChange() {},
		handleSelectChange(value) {
			console.log(value);
		}
	}
};
</script>

<style scoped>
.inp {
	width: 410px;
}
</style>
