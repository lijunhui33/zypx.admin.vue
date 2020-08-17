<template>
	<div style="margin: 20px;">
		<a-card style="min-height: calc(100vh - 160px);overflow: hidden;">
			<div class="tables">
				<div class="list" @click="go(1)">
					<a-icon type="search" style="color: #1d77df;" />	
					<div class="title">国家职业资格证书查询</div>
				</div>
				<div  class="list" @click="go(2)">
					<a-icon type="search"  style="color: #1d77df;"/>	
					<div class="title">专项能力职业资格证书查询</div>
				</div>
			</div>
		</a-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			go(index){
				if(index === 1){
					this.$router.push('/certificate/gjzyzgzs/query')
				}else if(index === 2){
					this.$router.push('/certificate/zxnlzyzgzs/query')
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tables{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.list{
		font-size: 28px;
		width: 450px;display: flex;align-items: center;
		margin-top: 50px;
		cursor: pointer;
		transition: 0.5s;
		.title{margin-left: 30px;}
	}
	.list:hover{color: #1d77df;}
</style>
