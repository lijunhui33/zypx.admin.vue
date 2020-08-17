<template>
	<div style="margin: 20px;">
		
		<a-card title="新增账号" style="min-height: calc(100vh - 160px);">
			<a-row  style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;"  @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" /><span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="用户名称"><a-input v-decorator="['name', { rules: [{ required: true, message: '请输入用户名' }] }]"  placeholder='请输入用户名称' /></a-form-item>
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="用户密码"><a-input v-decorator="['password', { rules: [{ required: true, message: '请输入用户密码' }] }]" placeholder='请输入用户密码' type="password" /></a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属部门">
					<a-select
						v-decorator="['gender', { rules: [{ required: true, message: '请选择用户所在部门' }] }]"
						placeholder="请选择用户所在部门"
						@change="handleSelectChange"
					>
						<a-select-option value="male">male</a-select-option>
						<a-select-option value="female">female</a-select-option>
					</a-select>
				</a-form-item>
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="姓名"><a-input v-decorator="['nickname', { rules: [{ required: true, message: '请输入用户姓名' }] }]"  placeholder='请输入用户姓名' /></a-form-item>
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="手机号"><a-input v-decorator="['mobile', { rules: [{ required: true, message: '请输入用户的手机号' }] }]"  placeholder='请输入用户手机号' /></a-form-item>
				<!--  -->
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="角色">
					<a-select
						v-decorator="['role', { rules: [{ required: true, message: '请选择用户角色' }] }]"
						placeholder="请选择用户角色"
						@change="handleSelectChange"
					>
						<a-select-option value="male">male</a-select-option>
						<a-select-option value="female">female</a-select-option>
					</a-select>
				</a-form-item>
				<!--  -->
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item>
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
export default {
	data() {
		return {
			checkNick: false,
			formItemLayout,
			formTailLayout,
			form: this.$form.createForm(this, { name: 'dynamic_rule' }),
			
		};
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values);
				}
			});
		},
		handleSelectChange(value) {
			console.log(value);
		}
	}
};
</script>
