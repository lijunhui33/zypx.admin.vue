<template>
	<div style="margin: 20px;">
		
		<a-card style="min-height: calc(100vh - 160px);">
			<a-row  style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;"  @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" /><span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
				<!--  -->
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="角色名称"><a-input v-decorator="['name', { rules: [{ required: true, message: '请输入角色名称' }] }]"  placeholder='请输入角色名称' /></a-form-item>
				<a-form-item  :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="说明">
					<a-textarea :rows="4" v-decorator="['description', { rules: [{ required: false, message: '请输入角色名称' }] }]"   placeholder='请输入api说明' />
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
	wrapperCol: { span: 8 }
};
const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 }
};
import adminJs from '../../../server/admin.js'
import helper from '../../../utils/helper.js'
export default {
	data() {
		return {
			checkNick: false,
			formItemLayout,
			formTailLayout,
			form: this.$form.createForm(this, { name: 'dynamic_rule' }),
			
		};
	},
	created() {
		console.log(this.$route)
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					console.log('Received values of form: ', values);
					this.add(values)
				}else{
					
				}
			});
		},
		handleSelectChange(value) {
			console.log(value);
		},
		async add(values){
			console.log(values)
			const data = await adminJs.addRole(values,helper.adminHeaders())
			console.log(data)
			if(data.code === 0){
				this.$message.success('创建成功')
				setTimeout(()=>{
					this.$router.go(-1)
				},1500)
			}else{
				this.$message.error(data.message+','+data.detail)
			}
		}
	}
};
</script>
