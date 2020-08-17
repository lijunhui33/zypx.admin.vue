<template>
	<div style="margin: 20px;">
		
		<a-card title="更新角色" style="min-height: calc(100vh - 160px);">
			<a-row  style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;">
						<a-icon type="arrow-left" style="font-size: 20px;" /><span style="padding-left: 10px;" @click="$router.go(-1)">返回上一页</span>
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
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }">
					<a-button type="primary" html-type="submit">更新角色</a-button>
					<a-button type="danger" style="margin-left: 30px;" @click="visible = true" >删除</a-button>
				</a-form-item>
			</a-form>
			<a-modal title="删除角色" :visible="visible" okText="确认" cancel-text="取消" centered @ok="deletes"  @cancel="visible = false">
				确认删除
			</a-modal>
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
import helper from '../../../utils/helper.js'
import adminJs from '../../../server/admin.js'
export default {
	data() {
		return {
			checkNick: false,
			formItemLayout,
			formTailLayout,
			form: this.$form.createForm(this, { name: 'dynamic_rule' }),
			id:'',
			visible:false
		};
	},
	async mounted() {
		if(this.$route.query.q){
			const values = JSON.parse(helper.aesDecryptUrlData(this.$route.query.q))
			const data = await adminJs.roleDetail(values,helper.adminHeaders())
			if(data.code === 0){
				this.form.setFieldsValue({
					name:data.data.name,
					description:data.data.description
				})
				this.id = data.data.id
			}
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
		handleSelectChange(value) {
			console.log(value);
		},
		async add(values){
			let obj = {...values,id:this.id}
			const data = await adminJs.putRole(obj,helper.adminHeaders())
			if(data.code == 0){
				this.$message.success('更新成功')
			}else{
				this.$message.error(data.message+','+data.detail)
			}
		},
		async deletes(){
			console.log(this.id)
			const data =await adminJs.deleteRole({id:this.id},helper.adminHeaders())
			console.log(data)
			if(data.code === 0){
				this.$message.success('删除成功')
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
