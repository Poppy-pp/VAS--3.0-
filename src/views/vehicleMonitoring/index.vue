<template>
	<div class="gisnewTab">
		<iframe id="vehicleMonitoring" frameborder="0" width="100%" height="100%" marginheight="0" marginwidth="0" scrolling="no" :src="src"></iframe>
		<el-tooltip content="打开新窗口" placement="left">
			<el-button type="primary" icon="el-icon-news" @click="newTab"></el-button>
		</el-tooltip>
	</div>
</template>
<script>
	import storage from '@/utils/storage'
	export default {
		name:'vehicleMonitoring',
		data() {
			return {
				src: ''
			};
		},
		methods: {
			//打开新窗口
			newTab() {
				window.open(this.src);
			}
		},
		created() {
			let user = storage.get('loginUser');
			//139.219.99.149——正式
			this.src = 'http://139.219.99.149:9201/Map/Login_iframe?UserName=' + user.username + '&PassWord=' + user.password;
			// 182.150.22.191——测试
			// this.src = 'http://182.150.22.191:9201/Map/Login_iframe?UserName=' + user.username + '&PassWord=' + user.password;
			
		}
	};
</script>
<style lang="stylus" scoped>
.gisnewTab 
 position relative
 overflow hidden
 height 100%
 .el-button,a
  position absolute
  top 40px
  right 0
  z-index 1
  border-radius 0
</style>