<template>
	<div class="box">
		<div style="text-align: center;">
			<a style="font-size: 200px;">404</a>
			<br>
			<a-button @click="$router.push('/')">返回首页</a-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		}
		
	}
</script>

<style scoped>
	.box{display: flex;align-items: center;justify-content:center;height: 100vh;}
</style>
