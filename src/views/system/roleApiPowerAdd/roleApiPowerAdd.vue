<template>
	<div style="margin: 20px;">
		<a-card style="min-height: calc(100vh - 160px);">
			<a-row style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;" @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" />
						<span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit" style="width: 1100px;">
				<a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="所属用户">
					<a-input
						v-decorator="['gender', { rules: [{ required: true, message: '请选择所属角色' }] }]"
						:min="1"
						:max="10"
						style="width: 410px !important;pointer-events: none;"
						placeholder="请选择所属角色"
					/>
					<a class="ant-form-text" style="margin-left: 10px;" @click="selectModuleType = true">选择</a>
				</a-form-item>
				<!--  -->
				<div style="display: flex;align-items: center;flex-wrap: wrap;margin-left:90px;">
					<div v-for="(item, index) in dataList" :key="item.id" style="width: 400px;margin-bottom: 20px;border-bottom: 1px solid #e5e5e5;">
						<a-checkbox @change="onChange(index)" :checked="item.type" >
							<span style="">api名称:{{ item.name }}</span>
							<br>
							<span style="padding-left: 20px;">方法名:</span> <a-tag color="blue" style="margin: 20px 20px 20px 0px;">{{ item.http_method }} -- {{ item.complete_url }}</a-tag>
						</a-checkbox>
					</div>
				</div>
				<a-form-item :wrapper-col="{ span: 10, offset: 2 }"><a-button type="primary" html-type="submit">绑定</a-button></a-form-item>
			</a-form>

			<a-modal title="选择所属模块" :visible="selectModuleType" @cancel="selectModuleType = false" :footer="null">
				<a-table :columns="columns" :data-source="data" :pagination="false">
					<span slot="action" slot-scope="text, record"><a @click="selectRole(text)">选择</a></span>
				</a-table>
				<a-pagination style="margin-top: 30px;" @change="paginationChange" v-model="current" :total="total" show-less-items />
			</a-modal>
			<!-- <div style="margin-top: 30px;"><a-button type="primary" @click="btn">绑定</a-button></div> -->
		</a-card>
	</div>
</template>

<script>
const formItemLayout = {
	labelCol: { span: 2 },
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
	},
	{
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
import adminJs from '../../../server/admin.js';
import helper from '../../../utils/helper.js';
export default {
	data() {
		return {
			formItemLayout,
			formTailLayout,
			current: 1,
			columns,
			total: 0,
			form: this.$form.createForm(this, { name: 'dynamic_rule' }),
			dataList: [],
			selectModuleType: false,
			data: [],
			role_id: '',
			role_name: ''
		};
	},
	async created() {
		const userTypeList = await adminJs.userTypeList({}, helper.adminHeaders());
		if (userTypeList.code === 0) {
			this.data = userTypeList.data.rows.map(item => {
				item.key = item.id;
				return item;
			});
		}
		const data = await adminJs.apiAllList({}, helper.adminHeaders());
		this.dataList = data.data.rows.map(item => {
			// console.table(item)
			item.type = false;
			item.key = item.id;
			return item;
		});
	},
	methods: {
		onChange(e) {
			this.dataList = this.dataList.map((item, index) => {
				if (index == e) {
					if (item.type) {
						item.type = false;
					} else {
						item.type = true;
					}
				}
				return item;
			});
		},
		selectRole(e) {
			this.role_id = e.id;
			this.role_name = e.name;
			this.form.setFieldsValue({
				gender: e.name
			});
			this.selectModuleType = false;
		},
		paginationChange(e) {},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields((err, values) => {
				if (!err) {
					this.add(values);
				}
			});
		},
		onCheckAllChange(e) {},
		async add(val) {
			let arr = this.dataList.filter(item => {
				return item.type == true;
			});
			let roleIdArr = arr.map(item => {
				return item.id;
			});
			let obj = {
				role_id: this.role_id,
				role_name: this.role_name,
				api_id_list: roleIdArr.join(',')
			};
			const data = await adminJs.addRolePower(obj,helper.adminHeaders())
			if(data.code == 0){
				this.$message.success('创建成功')
				setTimeout(()=>{
					this.$router.push('/system/role/prower/list')
				},1000)
			}else{
				this.$message.error(data.message+','+data.detail)
			}
		}
	}
};
</script>

<style></style>
