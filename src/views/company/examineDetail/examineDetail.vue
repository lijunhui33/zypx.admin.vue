<template>
	<div style="margin: 20px;">
		<a-card title="认证审核" style="min-height: calc(100vh - 160px);">
			<a-row  style="margin-bottom: 20px;">
				<a-col :span="10" :offset="0">
					<div style="display: flex;align-items: center;cursor: pointer;width: 110px;"  @click="$router.go(-1)">
						<a-icon type="arrow-left" style="font-size: 20px;" /><span style="padding-left: 10px;">返回上一页</span>
					</div>
				</a-col>
			</a-row>
			<a-descriptions bordered>
			    <a-descriptions-item label="公司名称">
			      Cloud Database
			    </a-descriptions-item>
			    <a-descriptions-item label="提交时间">
			      Prepaid
			    </a-descriptions-item>
			    <a-descriptions-item label="提交人员">
			      YES
			    </a-descriptions-item>
			    <a-descriptions-item label="Order time">
			      2018-04-24 18:00:00
			    </a-descriptions-item>
			    <a-descriptions-item label="Usage Time" :span="2">
			      2019-04-24 18:00:00
			    </a-descriptions-item>
			    <a-descriptions-item label="Status" :span="3">
			      <a-badge status="success" text="通过" v-show="passType == 1" />
				  <a-badge status="warning" text="待审核" v-show="passType == 2" />
				  <a-badge status="error" text="审核不通过" v-show="passType == 3" />
			    </a-descriptions-item>
			    <a-descriptions-item label="Negotiated Amount">
			      $80.00
			    </a-descriptions-item>
			    <a-descriptions-item label="Discount">
			      $20.00
			    </a-descriptions-item>
			    <a-descriptions-item label="Official Receipts">
			      $60.00
			    </a-descriptions-item>
			    <a-descriptions-item label="Config Info">
			      Data disk type: MongoDB
			      <br />
			      Database version: 3.4
			      <br />
			      Package: dds.mongo.mid
			      <br />
			      Storage space: 10 GB
			      <br />
			      Replication factor: 3
			      <br />
			      Region: East China 1<br />
			    </a-descriptions-item>
			  </a-descriptions>
			 <div>
				 <a-button type="primary" class="bottomInp" @click="getPass">审核通过</a-button>
				 <a-button type="danger" class="bottomInp" @click="noPassModal">审核不通过</a-button>
			 </div>
		</a-card>
		<a-modal title="未通过原因" :visible="visible" centered @cancel="visible = false" okText="确定" cancelText="取消" @ok="nopass">
			<div>
				<a-textarea :rows="4"  v-model="noPassText"  placeholder='请输入审核未通过原因' />
			</div>
		</a-modal>
	</div>
</template>

<script>
	import helper from '../../../utils/helper.js'
	export default{
		data(){
			return{
				visible:false,
				passType:2,//1通过，2待审核，3审核不通过
				noPassText:''
			}
		},
		created(){
			if(this.$route.query.q){
				const obj = JSON.parse(helper.aesDecryptUrlData(this.$route.query.q))
			}
		},
		methods:{
			noPassModal(){
				this.visible = !this.visible
			},
			nopass(){
				console.log('不通过')
				console.log(this.noPassText)
				if(this.noPassText === ''){
					this.$message.error('请填写未通过原因')
					return
				}
				this.passType = 3
				this.visible = false
			},
			getPass(){
				this.passType = 1
			}
		}
	}
</script>

<style scoped>
	.bottomInp{
		margin: 10px 20px 0 0;
	}
</style>
