<template>
	<div id="zixun">
		<headerBack :title="title"></headerBack>
		<!-- <backToTop @clickBack="backToTop"></backToTop> -->
		<md-theme md-name="theme">
			<md-tabs md-fixed :class="{'wrap-fixed': isScrollDown}">
				<md-tab md-label="竞技彩"><jingjicai></jingjicai></md-tab>
				<md-tab md-label="双色球"><shuangseqiu></shuangseqiu></md-tab>
				<md-tab md-label="足彩"><zucai></zucai></md-tab>
				<md-tab md-label="福彩"><fucai></fucai></md-tab>
			</md-tabs>
		</md-theme>
	</div>
	
</template>

<script>
	import Util from "../../util/util.js"
	import jingjicai from "./jingjicai.vue"
	import shuangseqiu from "./shuangseqiu.vue"
	import zucai from "./zucai.vue"
	import fucai from "./fucai.vue"
	import backToTop from "../common/backToTop.vue"
	import headerBack from "../common/header_back.vue"

	export default {
		data() {
			return {
				title:'资讯中心',
				isScrollDown: false
			};
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},
		mounted: function(){

		},
		methods: {
			switchMovie(index){
				console.log(1)
			},
			backToTop(){
				this.$el.querySelector(".j-container").scrollTop = 0;
			}

		},
		components:{
			jingjicai,
			shuangseqiu,
			zucai,
			fucai,
			backToTop,
			headerBack
		}
	}
</script>
<style lang="scss">
	#zixun{
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: .88rem;
	}

	.md-tabs.wrap-fixed>.md-tabs-navigation{
		position: fixed;
		left:0;
		top: 0;
		width: 100%;
	}
	.md-theme-default.md-tabs>.md-tabs-navigation .md-tab-header.md-active {
		color: #eb1c42;
		border-bottom-color:.01rem solid #eb1c42;
	}

	.md-tabs .md-tabs-navigation.md-fixed .md-tab-header.md-active{
		color: #eb1c42;
		border-bottom:.01rem solid #eb1c42;
	}

	

</style>



