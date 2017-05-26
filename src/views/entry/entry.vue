<template>
	<div id="entry">
		
		<md-card class="card-entry-swiper" >
			<md-card-media>
				<!-- swiper -->

				<swiper :options="swiperOption">
					<swiper-slide v-for="banner in banners"><img :src="banner"></swiper-slide>

					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>

			</md-card-media>
		</md-card>

		<md-layout class="subnav layout-wrap" md-gutter>
			<md-layout md-flex-xsmall="20" md-flex-small="20" md-flex-medium="20" v-for="(album, index) of albums">
				<img class="album-img" :src="album.bg"  @click="showSubNav(index)">
				<div class="album-name">
					{{album.name}}
				</div>				
			</md-layout>
		</md-layout>
		<md-layout class="showOrder" md-gutter>
			<img class="album-img" src="../../../statics/img/entry/subnav.jpg" alt="晒单赚佣金">
		</md-layout>
		<md-layout class="shownews" md-gutter>
			<div class="scroll-wrap">
				<ul class="scroll-content" :style="{ top }">
					<li v-for="item in scrollnewsList">{{item.name}}</li >  
					</ul>
				</div>
			</md-layout>

			<md-list class="custom-menu-list md-triple-line menuList">
				<md-list-item v-for="item in menuList">
					<md-avatar>
						<img :src="item.bg">
					</md-avatar>
					<div class="md-list-text-container">
						<span>{{item.title}}</span>
						<p>{{item.info}}</p>
					</div>
				</md-list-item>
			</md-list>


		</div>
	</template>

	<script>
		import $ from "n-zepto"
		import swiper from "../../components/common/swiper.vue"
		import slide from "../../components/common/slide.vue"

		import axios from "axios"
		import Store from "../../assets/js/storage.js"

		export default {
			data () {
				return {
					banners: [ '../../../statics/img/entry/01.jpg', '../../../statics/img/entry/02.jpg', '../../../statics/img/entry/03.jpg', '../../../statics/img/entry/04.jpg'],
					swiperOption: {
						pagination: '.swiper-pagination',
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						paginationClickable: true,
						spaceBetween: 30,
						centeredSlides: true,
						autoplay: 2500,
						autoplayDisableOnInteraction: false
					},
					albums:[
					{
						name: "每日一单",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						name: "直播",
						bg:require("../../../statics/img/entry/subnav.jpg")
					},
					{
						name: "资讯",
						bg:require("../../../statics/img/entry/subnav.jpg")
					},
					{
						name: "资料库",
						bg:require("../../../statics/img/entry/subnav.jpg")
					}
					],
					scrollnewsList: [
					{ name: '[竞彩足球] 有运中123元' },
					{ name: '[足彩] 压哨中13743元' },
					{ name: '[竞彩篮球] 有运中466元' },
					{ name: '[江西快三] 有你才能中9元' },
					{ name: '[北京单场] 我是传奇中224元' }
					],
					activeIndex: 0,
					menuList:[
					{
						title: "天天送红包",
						info:"今天你点了吗",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "竞彩足球",
						info:"独家最高加奖1588",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "竞彩篮球",
						info:"篮球迷的世界",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "幸运快3",
						info:"独家加奖中",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "欢乐快3",
						info:"暂停销售",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "快3",
						info:"十分钟见分晓",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "老11选5",
						info:"独家加奖中",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "新11选5",
						info:"独家加奖中",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "北京单场",
						info:"高手串关乐园",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "双色球",
						info:"奖池7亿",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "大乐透",
						info:"火爆加奖中",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "福彩3D",
						info:"3位数赢千元",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "足彩胜负彩",
						info:"大奖高发地",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "足彩任选九",
						info:"有足彩，更精彩",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "足彩进球彩",
						info:"智慧投注精彩留住",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "足彩半全场",
						info:"我的足彩我的快乐",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "七星彩",
						info:"二、五、日开奖",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "七乐彩",
						info:"一、三、五开奖",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "排列三",
						info:"简单易中奖",
						bg: require("../../../statics/img/entry/subnav.jpg")
					},
					{
						title: "排列五",
						info:"2元赢10万",
						bg: require("../../../statics/img/entry/subnav.jpg")
					}

					]

				}
			},
			mounted() {
				console.log('app init');

			//暂未做头部显示的配置，暂时手动移除navbar
			var el = $('#navbar')[0].childNodes;
			//el[0].removeChild(el[0].childNodes[0]);
			el[0].childNodes[0].style.visible='hidden';

			//滚动新闻
			setInterval(_ => {
				if(this.activeIndex < this.scrollnewsList.length) {
					this.activeIndex += 1;
				} else {
					this.activeIndex = 0;
				}
			}, 1000);

		},
		created:function(){
			
		},		
		computed: {
			top() {
				return - this.activeIndex * 30 + 'px';
			}
		},
		methods: {
			showSubNav(index){
				console.log(this.albums[index].name);
				this.$router.push({ name: this.albums[index].name})
			}
		},
		components: {
			swiper,
			slide
		}
	}
</script>





<style lang="scss">

	#entry{
		padding:0 0 56px;
	}

	.card-entry-swiper{

		.swiper-container {
			width: 100%;

			.swiper-slide {
				text-align: center;
				font-size: 38px;
				font-weight: 700;
				background-color: #eee;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-pack: center;
				justify-content: center;
				-ms-flex-align: center;
				align-items: center;
			}

			.swiper-pagination-bullet-active{
				background:red;
			}
		}
	}
	

	.md-layout{
		margin: 0 auto;
		padding: 10px 0;
		text-align:center;
		&.layout-wrap{			
			height: 100%;	
		}
	}

	.album-img{
		width: 100%;
		max-height: 100%;
		margin-bottom: 10px;
	}

	.album-name{
		width: 100%;
		text-align:center;
	}

	/*news*/

	.showOrder{
		width:100%;
		height: 50px;
		padding:0 10px;
	}

	.shownews{
		width:100%;
		height: 30px;
		padding:0 10px;
		border-top: .4px solid #dedede;
		border-bottom: .4px solid #dedede;
	}

	.scroll-wrap{
		width:100%;
		height: 30px;
		overflow: hidden;
	}

	.scroll-content{
		position: relative;
		transition: top .2s;

		li{
			line-height: 30px;
			text-align: left;
		}
	}




	.md-list.menuList{
		flex-direction: row;
		flex-wrap: wrap;
		align-content: space-between;
		justify-content:space-between;
		.md-list-item{
			width:49%;
		}
	}
	
</style>