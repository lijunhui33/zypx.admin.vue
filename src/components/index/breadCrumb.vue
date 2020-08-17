<template>
	<div class="box">
		<a-breadcrumb>
			<a-breadcrumb-item v-for="item in breadList" :key="item.meta.title">
				<router-link :to="item.path === ''  ? '/':item.meta.hasSubMenu ? '':item.path">
				    {{ item.meta.title }}
				</router-link>
			</a-breadcrumb-item>
		</a-breadcrumb>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				breadList:[]
			}
		},
		methods:{
			
		},
		created() {
			this.breadList = this.$route.matched
		},
		watch:{
			$route() {
				this.breadList = this.$route.matched
			},
		}
	}
</script>

<style scoped>
.box {
	width: 100%;
	height: 60px;
	display: flex;
	align-items: center;
	padding-left: 15px;
}
</style>
