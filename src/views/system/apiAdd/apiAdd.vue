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
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="api名称">
					<a-input v-decorator="['name', { rules: [{ required: true, message: '请输入api名称' }] }]" class="inp" placeholder="请输入api名称" />
				</a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="路劲">
					<a-input v-decorator="['path', { rules: [{ required: true, message: '请输入api路径' }] }]" class="inp" placeholder="请输入api路径" />
				</a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="方法">
					<a-select
						v-decorator="['methods', { rules: [{ required: true, message: '请选择api方法' }] }]"
						class="inp"
						placeholder="请选择api方法"
						@change="handleSelectChange"
					>
						<a-select-option value="GET">GET</a-select-option>
						<a-select-option value="POST">POST</a-select-option>
						<a-select-option value="PUT">PUT</a-select-option>
						<a-select-option value="DELETE">DELETE</a-select-option>
					</a-select>
				</a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属模块">
					<a-input
						v-decorator="['system_module_name', { rules: [{ required: true, message: '请选择api方法' }] }]"
						class="inp"
						style="width: 410px;pointer-events: none;"
						placeholder="请选择所属模块"
					/>
					<a class="ant-form-text" style="margin-left: 10px;" @click="selectModuleType = true">选择</a>
				</a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="api说明">
					<a-textarea :rows="4" v-decorator="['description', { rules: [{ required: false, message: '请输入api说明' }] }]" class="inp" placeholder="请输入api说明" />
				</a-form-item>

				<!--  -->
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item>
			</a-form>
		</a-card>
		<a-modal title="选择所属模块" :visible="selectModuleType" @cancel="selectModuleType = false" :footer="null" :width="800">
			<a-table :columns="columns" :data-source="data" :pagination="false">
				<span slot="action" slot-scope="text, record"><a @click="selectMoule(text)">选择</a></span>
			</a-table>
			<!-- <a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items /> -->
		</a-modal>
	</div>
</template>

<script>
import helper from '../../../utils/helper.js';
import adminJs from '../../../server/admin.js';
const columns = [
	{
		title: '名称',
		key: 'name',
		dataIndex: 'name'
	},
	{
		title: '路劲',
		key: 'url',
		dataIndex: 'url'
	},
	{
		title: '描述',
		key: 'description',
		dataIndex: 'description'
	},
	{
		title: '所属角色',
		key: 'user_type_name',
		dataIndex: 'user_type_name'
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' }
	}
];
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
			columns,
			data: [],
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
