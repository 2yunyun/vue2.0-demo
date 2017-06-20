<template>
	<div id="unameLogin">
		<form novalidate autocomplete="off">
			<md-input-container md-inline>
				<span class="span_title">账号：</span>
				<label>请输入手机号或用户名</label>
				<md-input type="text" v-model="username"></md-input>
			</md-input-container>

			<md-input-container md-inline>
				<span class="span_title">密码：</span>
				<label>请输入密码</label>
				<md-input type="password" v-model="password"> </md-input>
				
				<md-layout class="viewpwd" md-gutter>
					<img src="statics/img/login/eyeclose@2x.png" alt="查看密码" @click="viewpwd">
				</md-layout>

			</md-input-container>

			<md-button class="md-raised btn_login" @click="login">登录</md-button>	

			<div class="forgetPwd">
				<span>忘记密码？</span>
			</div>

			<hsy-dialog class="test" v-model="visible" @click="handleYes">
				<div slot="title">提示</div>
				<div slot="body" style="width:4rem;">
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
				username: '',
				password: '',
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

			viewpwd(){
				if($('.viewpwd').hasClass('active')){
					$('.viewpwd').removeClass('active');
					$('.viewpwd img').attr('src','statics/img/login/eyeclose@2x.png');
					$('.viewpwd').prev().attr('type','password');
				}else{
					$('.viewpwd').addClass('active');
					$('.viewpwd img').attr('src','statics/img/login/eye@2x.png');
					$('.viewpwd').prev().attr('type','text');
				}
				
			},
			login(){
				var username = this.username;
				var pass = this.password;
				/*验证用户名和密码是否为空*/
				if(!this.check({
					username: username,
					pass: pass,

				})) return;
					var that = this;

					$.ajax({
						url:AJAXURL,
						type: "post",
						jsonp: "callbackfun",
						jsonpCallback:'callback',
						dataType: "jsonp",
						data: {
							command:'login',
							username:username,
							password:pass,
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
					if(this.isEmpty(obj.username)){
						this.visible=true;
						$('.hsy-dialog .body').html('账户不能为空');
						return false;
					}
					if(this.isEmpty(obj.pass)){
						this.visible=true;
						$('.hsy-dialog .body').html('密码不能为空');
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
	</script>
	<style lang="scss" scoped>
		#unameLogin{
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


				
				.btn_login{
					max-width: 100%;
					width:100%;
					background-color:#eb1c42;
					color:#fff;
					margin:0;
					height: .9rem;
					font-size:.36rem;
				}

				.forgetPwd {
					min-width:.66rem;
					height: .5rem;
					line-height: .5rem;
					float: right;
					font-size: .24rem;
				}

				.hsy-dialog .main{
					width: 4rem;
					font-size:.28rem;
				}

			}
		}
		.viewpwd{
			min-width:.4rem;
			width: .4rem;
			height: .4rem;
			margin: 0;
			position: absolute;
			right: 0;
			bottom: .45rem;

			img{
				width: .4rem;
				height: .4rem;
			}
		}




	</style>
