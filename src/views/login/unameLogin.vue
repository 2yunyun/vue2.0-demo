<template>
	<div id="unameLogin">
		<form novalidate autocomplete="off">
			<md-input-container md-theme="theme">
				<label>用户名：</label>
				<md-input type="text" v-model="username" :required='inputFlag'></md-input>
			</md-input-container>

			<md-input-container md-theme="theme">
				<label>密码：</label>
				<md-input type="password" v-model="password" :required='inputFlag'></md-input>
			</md-input-container>
			<md-button class="md-raised" @click="login">登录</md-button>
			<!-- <md-button class="md-raised" @click="goRegist">注册</md-button> -->
		</form>
	</div>
</template>
<script>

	import axios from "axios"

	export default {
		data(){
			return{
				title:'登录',
				inputFlag: true,
				username: '',
				password: ''
			}
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},
		mounted(){ 

		},
		methods: {
			login(){
				var username = this.username;
				var pass = this.password;
				/*验证用户名和密码是否为空*/
				if(!this.check({
					username: username,
					pass: pass
				})) return;

					axios.get(API_PROXY+'http://www.dajiang365.com/Mobilezixun/')
					.then(function(res) {
						console.dir(res.data);
					}.bind(this))
					.catch(function (error) {
						alert('请检查用户名和密码');
					});

				},
				isEmpty(val){
					return val === ''
				},
				check(obj){
					if(this.isEmpty(obj.username)){
						alert('用户名不能为空');
						return false;
					}
					if(this.isEmpty(obj.pass)){
						alert('密码不能为空');
						return false;
					}
					return true
				},
				goRegist(){
					this.$router.push({name:'regist'});
				}
			},
			components: {
				axios
			}
		}
	</script>
	<style lang="scss" scoped>
		#unameLogin{
			form{
				width: 90%;
				margin: 20px auto;
				padding: 0;
			}
		}
	</style>