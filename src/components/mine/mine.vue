<template>
	<div id="mine">		
		<md-theme :md-name="theme">
			<md-layout class="usercenter" md-gutter>
				<!-- <img class="album-img" src="statics/img/mine/background@2x.png">
			-->


			<md-card class="mine-card">
				<md-card-media-cover md-solid>
					<md-card-media>
						<img src="statics/img/mine/background@2x.png" alt="个人中心">
					</md-card-media>
					

					<md-card-area class="mine-card-area">
						<md-card-header>
							<div class="card-header-l">
								<md-avatar class="people-header">
									<img src="//placeimg.com/40/40/people/1" alt="People">
								</md-avatar>
								<div class="md-title uname">用户名</div>
							</div>
							<div class="md-subhead"><img class="setBtn" @click="logout()" src="statics/img/mine/setting@2x.png" alt="设置"></div>
						</md-card-header>

						<md-card-actions>
							<md-button>
								<div class="balance_info">
									余额
									<div class="balance"><span class="v_balance">8.5</span><span>元</span></div>
								</div>
								<img class="view_balance" src="statics/img/mine/white--you-JT@2x.png" alt=">">
							</md-button>
							<img src="statics/img/mine/fengexian-shang@2x.png" alt="|">
							<md-button>
								<div class="gold_info">
									金币
									<div class="gold"><span class="v_gold">43</span><span>个</span></div>
								</div>
								<img  class="view_gold" src="statics/img/mine/white--you-JT@2x.png" alt=">">
								
							</md-button>
						</md-card-actions>
						<md-card-actions class="other_actions">
							<md-button><img  src="statics/img/mine/chongzhi@2x.png" alt="充值">充值</md-button>
							<img src="statics/img/mine/fengexian-xia@2x.png" alt="|">
							<md-button><img  src="statics/img/mine/tixian@2x.png" alt="提现">提现</md-button>
							<img src="statics/img/mine/fengexian-xia@2x.png" alt="|">
							<md-button><img  align="" src="statics/img/mine/youhuiquan@2x.png" alt="优惠券">优惠券</md-button>
						</md-card-actions>
					</md-card-area>
				</md-card-media-cover>
			</md-card>

			<md-tabs md-fixed :class="{'wrap-fixed': isScrollDown}"  class="md-accent mine-tabs">
				<md-tab md-label="全部订单" ><allOrderList></allOrderList></md-tab>
				<md-tab md-label="中奖订单"><winningOrderList></winningOrderList></md-tab>
				<md-tab md-label="未开奖订单"><outstandingOrder></outstandingOrder></md-tab>
			</md-tabs>
		</md-layout>
	</md-theme>

</div>

</template>


<script>
	import Util from "../../util/util"
	import $ from "n-zepto"
	import Store from "../../assets/js/storage.js"
	import allOrderList from "./allOrderList.vue"
	import winningOrderList from "./winningOrderList.vue"
	import outstandingOrder from "./outstandingOrder.vue"

	export default {
		data () {
			return {
				title:'我的',
				isScrollDown: false
			}
		},
		mounted() {
			//$('#mine').height(window.innerHeight - 98 + 'px');

			this.checkLogin();

			var that = this;
			$('.gotoLogin').css('margin-left','.2rem');
			$('.uname.unLogin').on('click',function(){
				Store.set('to','我的');
				that.$router.push({name:'login'});
			});

			

			$('.md-tabs.mine-tabs').delegate('.md-tab-header:first-child.md-active','click',function(){
				if($('.allOrderList-menu').css("display") == "none"){
					$('.allOrderList-menu').show();
					$('.md-tab-header:first-child.md-active').css('background-image','url(statics/img/mine/xuanxiangtiao@2x.png)');
				}else{
					$('.allOrderList-menu').hide();
					$('.md-tab-header:first-child.md-active').css('background-image','url(statics/img/mine/xuanxiangtiao_down@2x.png)');
				}
				
			});
		},
		create() {
			
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},	
		components: {
			allOrderList,
			winningOrderList,
			outstandingOrder
		},
		methods:{
			logout(){
				var that = this;
				$.ajax({
					url:AJAXURL,
					type: "post",
					jsonp: "callbackfun",
					jsonpCallback:'callback',
					dataType: "jsonp",
					data: {
						command:'logout',							
						authToken:Store.get('accessToken'),
						jscallback:'callback',
						agentId:'agent_wap'
					},
					success: function(response) {

						console.log(response.data);
						Store.remove('username');
						Store.remove('accessToken');
						that.$router.push({name:'login'});

					},
					error: function(response) {
						console.log(JSON.stringify(response));
					}

				});


				
			},
			checkLogin(){
				if(!Store.get('username')){

					$('.md-card-actions').eq(0).css('visibility', 'hidden')
					$('.uname').html('登录/注册'+'<img class="gotoLogin" src="statics/img/mine/white--you-JT@2x.png" alt=">">').addClass('unLogin');

				}else{

					$('.people-header img').attr('src',Store.get('photoUrl'));
					if( Store.get('balance')){
						$('.md-card-actions').eq(0).find('.v_balance').html(Store.get('balance'));
						
					}

					$.ajax({
						url:AJAXURL,
						type: "post",
						jsonp: "callbackfun",
						jsonpCallback:'callback',
						dataType: "jsonp",
						data: {
							command:'findUserAccount',
							authToken:Store.get('accessToken'),
							jscallback:'callback',
							agentId:'agent_wap'
						},
						success: function(response) {

							for(var key in response.data){  

								Store.set(key,response.data[key]);

							}

							$('.md-card-actions').eq(0).find('.v_gold').html(response.data.gold);
							

						},
						error: function(response) {
							console.log('获取账户信息出错了');
						}

					});

					
					$('.md-card-actions').eq(0).css('visibility','visible');



					if(!Store.get('alias')){
						$('.uname').removeClass('unLogin').html(Store.get('username'));
					}else{
						$('.uname').removeClass('unLogin').html(Store.get('alias'));
					}

				}
			}


		}
	}

</script>
<style lang="scss" scoped>
	#mine{
		padding-bottom: .98rem;
		overflow:hidden;

		.md-layout{
			padding:0;
		}

		.md-layout.usercenter{


			.md-theme-default.md-card.mine-card{
				position: relative;
				.md-card-media-cover.md-solid .md-card-area.mine-card-area{
					background:inherit !important;

					.md-card-header:first-child>.md-title:first-child{
						margin-top:0;
						margin-left: 2.1rem;
					}

					.md-card-header{
						height: 1rem;
						padding: 0 .2rem;
						display: flex;
						flex-direction: row;
						align-content:center;
						justify-content:space-between;
						margin-bottom: .4rem;

						.card-header-l{
							margin-left: .5rem;
							display: flex;
							flex-direction: row;
							align-content:center;
							justify-content:flex-start;
						}

						.card-header-l .md-avatar.people-header{
							width: 1rem;
							height: 1rem;
							border-radius: .5rem;
							z-index: 3;
							margin: 0;
							margin-right: .3rem;
						}

						.card-header-l .md-title{
							font-size: .32rem;
							line-height: 1rem;
							
						}
						.md-subhead{
							line-height: 1rem;
						}

					}
					.md-card-actions:first-child{
						margin-bottom: .24rem;
						padding:0;
					}
					.md-card-actions{
						justify-content: space-around;
						height: .88rem;
						line-height: .88rem;
						margin-bottom: .24rem;
						padding:0;

						.md-button{
							display: flex;
							flex-direction:row;
							align-content:center;
							justify-content:space-around;
							font-size:.32rem;
							.balance_info{
								margin-right: .3rem;
							}
							.gold_info{
								margin-right: .3rem;
							}
							img{
								margin-top: .3rem;
							}

						}
						
					}

					.md-card-actions.other_actions{
						height: .7rem;
						line-height: .7rem;
						background: rgba(0, 0, 0, .15);
						margin-bottom:0;

						img{
							margin-top: 0;
							margin-right:.1rem;
						}
					}


				}

				
			}

		}

		
	}

	/* iphone5 */
	@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
		#mine .md-layout.usercenter .md-theme-default.md-card.mine-card .md-card-media-cover.md-solid .md-card-area.mine-card-area .md-card-header{
			margin-bottom:.2rem;

		}
	}

	
</style>





