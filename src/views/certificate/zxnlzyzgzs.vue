<template>
	<div style="margin: 20px;">
		
		<a-card title="专项能力职业资格证书查询" style="min-height: calc(100vh - 160px);overflow: hidden;">
			<a-row style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;" @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" />
						<span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			<div class="headers">
				<div class="list">
					<div class="title">
						<a style="color: red;">*</a>
						姓名:
					</div>
					<a-input class="inp" placeholder="请输入姓名" v-model="name" />
				</div>
				<div class="list">
					<div class="title">证书号:</div>
					<a-input class="inp" placeholder="输入证书编号" v-model="no" />
				</div>
				<div class="list">
					<div class="title">身份证号:</div>
					<a-input class="inp" placeholder="身份证号" v-model="sno" />
				</div>
				<a-button type="primary" class="btn" icon="search" :loading="searchLoading" @click="search">查询</a-button>
				<a-button type="primary" class="btn" icon="plus" @click="visible2 = true">批量导入</a-button>
				<download-excel class="export-excel-wrapper" :data="json_data" :fields="json_fields" name="专项技能职业资格证书.xls">
					<!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
					<a-button type="primary" class="btn" icon="folder-open">批量导出</a-button>
				</download-excel>
			</div>
			<a-table :columns="columns" :data-source="data" :pagination="false">
				<span slot="action" slot-scope="text, record"><a @click="details(text)">查看</a></span>
			</a-table>
		</a-card>
		<a-modal class="dr" title="批量导入" :visible="visible2" :footer="null" centered :width="500" @cancel="visible2 = false">
			<div class="list">
				<div class="title">选择文件</div>
				<div class="Inpbox">
					<input type="file" ref="upload" @change="inpChange" accept=".xls,.xlsx" class="files" />
					<a-button class="btn" type="dashed">{{ fileName === '' ? '请选择要上传的文件':fileName }}</a-button>
				</div>
				<div><a style="margin-left: 10px;">下载模板</a></div>
			</div>
			<a-button type="primary" style="margin-top: 20px;margin-left: 65px;">确认提交</a-button>
		</a-modal>
		<a-modal title="证书详情" :visible="visible" :footer="null" centered :width="800" @cancel="visible = false">
			<a-descriptions bordered>
				<a-descriptions-item label="发证单位" :span="3">{{ modalDetail.fzdw }}</a-descriptions-item>
				<a-descriptions-item label="鉴定机构" :span="3">{{ modalDetail.jddw }}</a-descriptions-item>
				<a-descriptions-item label="证书编号" :span="3">{{ modalDetail.no }}</a-descriptions-item>
				<a-descriptions-item label="证件号码" :span="3">{{ modalDetail.sno }}</a-descriptions-item>
				<a-descriptions-item label="姓名">{{ modalDetail.name }}</a-descriptions-item>
				<a-descriptions-item label="职业工种">{{ modalDetail.zygz }}</a-descriptions-item>
				<a-descriptions-item label="性别">{{ modalDetail.sex }}</a-descriptions-item>
				<a-descriptions-item label="级别">{{ modalDetail.jb }}</a-descriptions-item>
				<a-descriptions-item label="发证日期 ">{{ modalDetail.fzsj }}</a-descriptions-item>
				<a-descriptions-item label="理论成绩">{{ modalDetail.llcj }}</a-descriptions-item>

				<a-descriptions-item label="实操成绩">{{ modalDetail.sccj }}</a-descriptions-item>
				<a-descriptions-item label="综合评审">{{ modalDetail.zhps1 }}</a-descriptions-item>
				<a-descriptions-item label="外语成绩">{{ modalDetail.wycjl }}</a-descriptions-item>
			</a-descriptions>
		</a-modal>
	</div>
</template>

<script>
const columns = [
	{
		title: '名字',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '性别',
		dataIndex: 'sex',
		key: 'sex'
	},
	{
		title: '发证单位',
		dataIndex: 'fzdw',
		key: 'fzdw'
	},
	{
		title: '职业工种',
		dataIndex: 'zygz',
		key: 'zygz'
	},
	{
		title: '操作',
		key: 'action',
		scopedSlots: { customRender: 'action' }
	}
];
import zscxHttp from '../../server/zscx.js';
export default {
	data() {
		return {
			columns,
			data: [],
			name: '',
			no: '',
			sno: '',
			visible: false,
			visible2: false,
			searchLoading: false,
			fileName: '',
			file:'',
			modalDetail: {
				aac058: '',
				bce396: '',
				bcep11: '',
				bdz898: '',
				bhb098: '',
				fzdw: '',
				fzsj: '',
				jb: '',
				jddw: '',
				key: '',
				llcj: '',
				name: '',
				no: '',
				sccj: '',
				sex: '',
				sno: '',
				sr: '',
				whcd: '',
				wycjl: '',
				wyzl: '',
				zhps1: '',
				zygz: ''
			},
			json_fields: {
				'序号': 'id', //常规字段
				'姓名': 'name', //支持嵌套属性
				'电话':'mobile',
				'身份证号码':{
					field:'idCard.idCard'
				},
				'年龄':'old',
				'银行卡':'bankCard',
				'身份证复印件':'copyIdCard',
				'学历承诺书':'commitment',
				'是否符合政策':'ssfhzc',
				'申请书':'sqs',
				'备注':'remarks'
			},
			json_data: [
				{
					id:'1',
					name: '张三',
					mobile: '13250746938',
					idCard: {
						idCard:'440882199704088815',
					},
					old:'',
					bankCard:'4564987',
					copyIdCard:'✔️',
					commitment:'✔️',
					ssfhzc:'哈哈',
					sqs:'sqs',
					remarks:'备注'
				},
				
			],
			json_meta: [
				[
					{
						' key ': ' charset ',
						' value ': ' utf- 8 '
					}
				]
			]
		};
	},
	mounted() {
		
	},
	methods: {
		async search() {
			this.searchLoading = true;
			let parme = new FormData();
			parme.append('name', this.name);
			parme.append('no', this.no);
			parme.append('sno', this.sno);
			const data = await zscxHttp.zxnlzyzgzs(parme);
			this.searchLoading = false;
			if (data.resultCode == '00') {
				if (data.resultBody.rows == null) return;
				this.data = data.resultBody.rows.map(item => {
					item.key = item.no;
					return item;
				});
			}
		},
		details(text) {
			this.visible = true;
			this.modalDetail = text;
		},
		inpChange(e){
			this.file = e.target.files[0];
			this.fileName = this.file.name;
		}
	}
};
</script>

<style scoped lang="scss">
.headers {
	width: 100%;
	min-height: 50px;
	background-color: aliceblue;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	.list {
		display: flex;
		align-items: center;
		height: 50px;
		.title {
			width: 80px;
			text-align: right;
			margin-right: 20px;
		}
		.inp {
			width: 200px;
		}
	}
}
.btn {
	margin-left: 30px;
}
.dr {
	.list {
		display: flex;
		align-items: center;
		.Inpbox {
			display: flex;
			align-items: center;
			width: 200px;
			height: 34px;
			margin-left: 20px;
			position: relative;
			.files {
				opacity: 0;
				z-index: 999;
				cursor: pointer;
				position: absolute;
				top: 0;
				width: 200px;
			}
			.btn {
				width: 200px;
				margin-left: -10px;
			}
		}
	}
}
</style>
