<template>
	<div id="login">
		<md-theme :md-name="theme">		
			<headerBack :title="title"></headerBack>
			<md-tabs md-fixed id="logIntabs">
				<md-tab md-label="手机号快捷登录"><mobileLogin></mobileLogin></md-tab>
				<md-tab md-label="账号密码登录"><unameLogin></unameLogin></md-tab>					
			</md-tabs>			
		</md-theme>
	</div>
</template>
<script>
	import HeaderBack from "../../components/common/header_back.vue"
	import mobileLogin from "./mobileLogin.vue"
	import unameLogin from "./unameLogin.vue"


	export default {
		data(){
			return{
				title:'登录'
			}
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
			activeRoute(){
				return this.$store.state.activeRoute;
			}
		},
		mounted(){ 

		},
		methods: {
			
		},
		components: {
			HeaderBack,
			mobileLogin,
			unameLogin
		}
	}
</script>
<style lang="scss" scoped>
	#login{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.5);
		background: url('./img/login_bg.jpg') no-repeat center center; 
		background-size: cover;
	}

	.md-theme-whiteForm.md-input-container.md-input-focused input{
		text-shadow: 0 0 0 rgba(255,255,255,.87);
		color: rgba(0,0,0,.87);
	}

	.md-input-container.md-input-required label:after{
		color:#f44336;
	}

	.md-input{
		color: #fff;
		box-sizing: border-box;
		padding-left: 30px;
	}
	.md-input:focus{
		color: #fff;
	}
	.md-icon{
		position: absolute;
		left:0
	}
	.iconfont{
		color: rgba(255,255,255,.84);
	}
	.md-input-container input{
		color: rgba(255,255,255,.84);
	}
	.md-input-container:after{
		background-color:#fff;
	}
	.md-avatar.md-large{
		width: 150px;
		min-width: 150px;
		height: 150px;
		min-height: 150px;
		border-radius: 150px;
	}
	.overlay{
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(200,200,200,.6)
	}
	.md-spinner{
		position: fixed;
	}
	.login-tip{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 64px;
		line-height: 64px;
		text-align: center;
		background-color: rgba(200,200,200,.8);
		color: #fff;
	}
	.slideT-enter-active, .slideT-leave-active {
		transition: all .5s
	}
	.slideT-enter-active{
		transform: translateY(0);
	}
	.slideT-enter, .slideT-leave-active {
		transform: translateY(-100%);
	}
</style>