<template>
	<div id="mobileLogin">
		<form novalidate autocomplete="off">
			<md-input-container>
				<label>手机号：</label>
				<md-input type="text" v-model="mobile" :required='inputFlag'></md-input>
				<md-button class="sendCode" @click="sendCode">发送验证码</md-button>
			</md-input-container>

			<md-input-container>
				<label>验证码：</label>
				<md-input type="text" v-model="code" :required='inputFlag'></md-input>
			</md-input-container>
			<md-button class="md-raised" @click="login">登录</md-button>
			<!-- <md-button class="md-raised" @click="goRegist">注册</md-button> -->
		</form>
	</div>
</template>
<script>
	import axios from "axios"
	import $ from "n-zepto"
	import qs from 'qs'
	import Util from '../../util/util'
	import Store from "../../assets/js/storage.js"
	
	
	export default {
		data(){
			return{
				title:'登录',
				inputFlag: true,
				mobile: '',
				code: ''
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

			sendCode(){
				var mobile = this.mobile;
				if(!this.check({
					mobile: mobile
				})) return;

					$.ajax({
						url:'http://192.168.2.237/lotserver/h5/api/v1/sendLoginCode',
						type: "POST",
						jsonp: "callback",
						dataType: "jsonp",
						data: {
							mobile:mobile
						},
						success: function(response) {
							alert('验证码发送成功！');							
						},
						error: function(response) {
							console.log(JSON.stringify(response));
						}
					});

					settime($('.sendCode')[0]);
				},
				login(){

					var mobile = this.mobile;
					var code = this.code;

					if(!this.check({
						mobile: mobile,
						code: code
					})) return;
						var that = this;
						$.ajax({
							url:'http://192.168.2.237/lotserver/h5/api/v1/loginByCode',
							type: "POST",
							jsonp: "callback",
							dataType: "jsonp",
							data: {
								mobile:mobile,
								checkCode:code
							},
							success: function(response) {
								console.log(response.data);
								//存储用户信息
								if(response.errorcode=='0'&&response.msg=='成功'){
									setTimeout(function(){
										that.$router.push({name:Store.get('to')})
									}.bind(this),600);
									
									Store.set('username',response.data.username);
									Store.remove('to');

								}else{
									alert('登录失败，请检查输入');
								}

							},
							error: function(response) {
								console.log(JSON.stringify(response));
								alert('请检查输入');
								
							}
						});

						
					},
					isEmpty(val){
						return val === ''
					},
					check(obj){
						var  mobile_test = /^1\d{10}$/

						if(this.isEmpty(obj.mobile)){
							alert('手机号不能为空');
							return false;
						}else if (!mobile_test.test(obj.mobile)) {
							alert('手机格式不对');
							return false;
						} 


						if(this.isEmpty(obj.code)){
							alert('验证码不能为空');
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

			var countdown=60;
			function settime(obj) {

				if (countdown == 0) { 
					obj.removeAttribute("disabled");    
					obj.innerHTML="发送验证码";
					countdown = 60; 
					return;
				} else { 
					obj.setAttribute("disabled", true); 
					obj.innerHTML="重新发送(" + countdown + ")"; 
					countdown--; 
				} 
				setTimeout(function() { 
					settime(obj) }
					,1000) 
			}
		</script>
		<style lang="scss" scoped>
			#mobileLogin{
				form{
					width: 90%;
					margin: 20px auto;
					padding: 0;
					.sendCode{
						margin: 0;
						position: absolute;
						right: 0;
						bottom: -2px;
						color: rgba(0,0,0,.38);
					}
				}
			}
		</style>