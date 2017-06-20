<template>
	<div id="mobileLogin">
		<form novalidate autocomplete="off">


			<md-input-container md-inline>
				<span class="span_title">手机号：</span>
				<label>请输入手机号</label>
				<md-input type="text" v-model="mobile"></md-input>
				<md-button class="sendCode" @click="sendCode">发送验证码</md-button>
			</md-input-container>

			<md-input-container md-inline>
				<span class="span_title">验证码：</span>
				<label>请输入验证码</label>
				<md-input type="text" v-model="verificationCode"></md-input>
			</md-input-container>

			<md-button class="md-raised btn_login" @click="login">登录/注册</md-button>


			<hsy-dialog class="test" v-model="visible" @click="handleYes">
				<div slot="title">提示</div>
				<div slot="body">
					~~
				</div>
			</hsy-dialog>

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
				code: '',
				visible: false
			}
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},
		mounted(){ 
			$('.hsy-dialog .main').css({'width':'4rem','font-size':'.22rem'});
		},
		methods: {

			sendCode(){
				var mobile = this.mobile;
				if(!this.check({
					mobile: mobile
				})) return;
					var that = this;

					$.ajax({
						url:AJAXURL,
						type: "post",
						jsonp: "callbackfun",
						jsonpCallback:'callback',
						dataType: "jsonp",
						data: {
							command:'speedLoginValidateCode',							
							authToken:'',
							jscallback:'callback',
							agentId:'agent_wap',
							mobilePhone:mobile
						},
						success: function(response) {
							that.visible=true;							
							$('.hsy-dialog .body').html('验证码已发送至手机');
						},
						error: function(response) {
							console.log(JSON.stringify(response));
						}

					});

					settime($('.sendCode')[0]);
				},
				
				login(){

					var mobile = this.mobile;
					var verificationCode = this.verificationCode;

					if(!this.check({
						mobile: mobile,
						code: verificationCode
					})) return;
						var that = this;

						$.ajax({
							url:AJAXURL,
							type: "POST",
							jsonp: "callbackfun",
							jsonpCallback:'callback',
							dataType: "jsonp",
							data: {
								command:'speedLogin',
								phone:mobile,
								validateCode:verificationCode,
								authToken:'',
								jscallback:'callback',
								agentId:'agent_wap'
							},
							success: function(response) {
								
								//存储用户信息
								if(response.errorcode== 0 && response.msg=='成功'){							
									Store.set('username',response.data.username);
									that.$router.push({name:Store.get('to')});
									Store.remove('to');
								}else{
									that.visible=true;
									$('.hsy-dialog .body').html(response.msg);
								}

							},
							error: function(response) {								
								that.visible=true;
								$('.hsy-dialog .body').html('请检查输入');
								
							}
						});

						
					},
					isEmpty(val){
						return val === ''
					},
					check(obj){
						var  mobile_test = /^1\d{10}$/

						if(this.isEmpty(obj.mobile)){
							this.visible=true;
							$('.hsy-dialog .body').html('手机号不能为空');
							return false;
						}else if (!mobile_test.test(obj.mobile)) {
							this.visible=true;
							$('.hsy-dialog .body').html('手机号格式不对');
							return false;
						} 


						if(this.isEmpty(obj.code)){
							this.visible=true;
							$('.hsy-dialog .body').html('验证码不能为空');
							return false;
						}

						return true
					},
					goRegist(){
						this.$router.push({name:'regist'});
					},
					handleYes() {
						this.visible = false
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
					margin: .2rem auto;
					padding: 0;

					label{
						padding-left:1.2rem;
						font-size:.28erm;
					}
					.md-input-focused label{
						top:0;
					}

					.md-input{
						width:50%;
						margin-left:1.2rem;
					}

					.md-input.md-input-focused{
						font-size: .28rem;
					}

					.span_title{
						position: absolute;
						left: 0;
						display: block;
						line-height: .88rem;
						font-size: .28rem;	
					}

					.sendCode{
						margin: 0;
						position: absolute;
						right: 0;
						bottom: .12rem;
						color: #333;
						border:.01rem solid #666;
						border-radius:.04rem;
						background-color:#eee;
					}

					.sendCode:active,.sendCode[disabled]{
						border-width:0;
						color:#999;
					}

					.btn_login{
						max-width: 100%;
						width:100%;
						background-color:#eb1c42;
						color:#fff;
						margin:0;
						height: .9rem;
						font-size:.36rem;
					}

					.hsy-dialog .main{
						width: 4rem;
						font-size:.28rem;
					}


				}
			}

			div.confirm button {
				border: 0;
				border-radius: .03rem;
				padding:.08rem .1rem;
				cursor: pointer;
				outline: none;
				font-size: .28rem;
			}
			div.confirm .no {
				color: #fff;
				background-color: #f84f47;
			}
			div.confirm .yes {
				color: #fff;
				background-color: #0097ff;
			}
			div.confirm .btns {
				overflow: hidden;
				margin-top: .2rem;
			}
			div.confirm .btns .yes {
				float: left;
			}
			div.confirm .btns .no {
				float: right;
			}


			

		</style>