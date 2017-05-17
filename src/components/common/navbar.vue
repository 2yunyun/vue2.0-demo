<template>
	<div id="navbar">
		<md-theme :md-name="whiteForm">
			<transition name="slideT">
				<md-toolbar class="top-nav" v-if="activeNav">
					<!-- <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
						<md-icon><i class="iconfont icon-menu"></i></md-icon>
					</md-button> -->
					<h2 class="md-title" style="flex: 1" v-text="activeRoute"></h2>
					<!-- <md-button class="md-icon-button">
						<md-icon @click.native="logout"><i class="iconfont icon-logout"></i></md-icon>
					</md-button> -->
				</md-toolbar>
			</transition>
			<transition name="slideD">		
				<md-bottom-bar md-shift class="btm-nav">
					<md-bottom-bar-item @click.native="doAction(0)" :class="{'md-active': isActive[0]}"><i class="iconfont icon-tubiao- btm-nav-icon"></i>首页</md-bottom-bar-item>
					<md-bottom-bar-item @click.native="doAction(1)" :class="{'md-active': isActive[1]}"><i class="iconfont icon-music btm-nav-icon"></i>开奖</md-bottom-bar-item>
					<md-bottom-bar-item @click.native="doAction(2)" :class="{'md-active': isActive[2]}"><i class="iconfont icon-book btm-nav-icon"></i>天天送</md-bottom-bar-item>
					<md-bottom-bar-item @click.native="doAction(3)" :class="{'md-active': isActive[3]}"><i class="iconfont icon-photo btm-nav-icon"></i>合买</md-bottom-bar-item>
					<md-bottom-bar-item @click.native="doAction(4)" :class="{'md-active': isActive[4]}"><i class="iconfont icon-photo btm-nav-icon"></i>我的</md-bottom-bar-item>
				</md-bottom-bar>
			</transition>

		</md-theme>
	</div>
</template>


<script>
	import Util from "../../util/util"
	import AV from "../../assets/js/av"
	export default {
		mounted: function(){
			var scrT = document.body.scrollTop || window.scrollY;
			window.addEventListener("scroll",Util.debounce(function(){
				var newScrT = document.body.scrollTop || window.scrollY;
				if(newScrT > 80 && newScrT > scrT)
					this.isScrollDown = true;
				if(newScrT < scrT)
					this.isScrollDown = false;
				scrT = newScrT;
			},300).bind(this));

			this.setActiveNav();
		},
		data() {
			return {
				isActive: [true,false,false,false],
				isScrollDown: false,
				activeNav:true
			}
		},
		computed: {
			theme(){
				return this.$store.getters.THEME_COLOR
			},
			activeRoute(){
				return this.$store.state.activeRoute;
			}
		},
		watch:{
			activeRoute(){
				this.setActiveNav();
			}
		},
		methods: {
			logout(){
				AV.User.logOut();
				this.$router.push({name:'login'});
			},
			doAction(index) {
				this.$store.commit('ROUTE_CHANGE',{activeRoute: this.$route.name})
				this.go(index);
				this.setActiveNav()
			},
			go(index){
				switch(index) {
					case 0:
					this.$router.push({name:'entry'});
					break;
					case 1:
					this.$router.push({name:'开奖'});
					break;
					case 2:
					this.$router.push({name:'天天送'});
					break;
					case 3:
					this.$router.push({name:'合买'});
					break;
					case 4:
					this.$router.push({name:'我的'});
					break;
				}
			},
			setActiveNav: function(){
				/*根据路由显示当前导航按钮*/
				var mapRoute = {
					"entry": 0,
					"开奖": 1,
					"天天送":  2,
					'合买': 3,
					'我的': 4
				}
				this.isActive = [false,false,false,false];
				this.isActive[mapRoute[this.activeRoute]] = true;
			},
			toggleLeftSidenav() {
				this.$emit("toggleLeftSidenav");
			},
		}
	}
</script>
<style lang="scss">
	.top-nav{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		z-index: 3;
		color:#fff;

	}
	.md-theme-default.md-toolbar{
		background:red;
		color:#fff;
	}
	.md-bottom-bar{
		position: fixed;
		bottom:0;
		left:0;
		z-index: 3
	}
	.slideT-enter-active, .slideT-leave-active {
		transition: all .5s
	}
	.slideT-enter, .slideT-leave-active {
		transform: translateY(-100%);
	}
	.slideD-enter-active, .slideD-leave-active {
		transition: all .5s
	}
	.slideD-enter, .slideD-leave-active {
		transform: translateY(100%);
	}

	.btm-nav-icon{
		display: block;
		margin-top: -26px;	
	}
	.md-bottom-bar.md-shift .md-bottom-bar-item .md-text{
		opacity:1
	}
	.icon-logout{
		font-size: 24px;
	}

	.md-theme-default.md-bottom-bar.md-shift .md-bottom-bar-item{
		color:red;
	}
	.md-theme-default.md-bottom-bar.md-shift .md-bottom-bar-item.md-active{
		color:red;
	}
</style>



