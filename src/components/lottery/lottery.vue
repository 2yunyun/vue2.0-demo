<template>
	<div id="lottery">
		<md-theme :md-name="theme">
			<headerBack :title="title"></headerBack>
			<md-list class="custom-list md-double-line lotteryList">
				<md-list-item>
					<div class="md-list-text-container">
						<span>双色球  </span>
						<span>第<span>2017056</span>期</span>
						<span>日期：2017-05-06</span> 
					</div>
					<md-button class="md-icon-button md-list-action" @click='showList("ssq")'>
						<md-icon class="resetColor">&gt;</md-icon>
					</md-button>

				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-text-container">
						<md-button class="md-icon-button md-raised md-accent md-dense">
							<md-icon>13</md-icon>
						</md-button>
						<md-button class="md-icon-button md-raised md-accent md-dense">
							<md-icon>14</md-icon>
						</md-button>
						<md-button class="md-icon-button md-raised md-accent md-dense">
							<md-icon>18</md-icon>
						</md-button>
						<md-button class="md-icon-button md-raised md-accent md-dense">
							<md-icon>19</md-icon>
						</md-button>
						<md-button class="md-icon-button md-raised md-accent md-dense">
							<md-icon>21</md-icon>
						</md-button>
						<md-button class="md-icon-button md-raised md-accent md-dense">
							<md-icon>28</md-icon>
						</md-button>
						<md-button class="md-icon-button md-raised md-primary md-dense blue">
							<md-icon>06</md-icon>
						</md-button>

					</div>

					<md-divider class="md-inset"></md-divider>
				</md-list-item>

			</md-list>
			<md-list class="custom-list md-double-line lotteryList lotteryList2">
				<md-list-item>
					<div class="md-list-text-container">
						<span>进球彩</span>
						<span>第<span>17073</span>期</span>
						<span>日期：2017-05-16</span> 
					</div>
					<md-button class="md-icon-button md-list-action" @click='showList("jqc")'>
						<md-icon class="resetColor">&gt;</md-icon>
					</md-button>

				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-text-container">
						<md-button class="md-raised md-accent md-dense">3</md-button>
						<md-button class="md-raised md-accent md-dense">3</md-button>
						<md-button class="md-raised md-accent md-dense">1</md-button>
						<md-button class="md-raised md-accent md-dense">3</md-button>
						<md-button class="md-raised md-accent md-dense">3</md-button>
						<md-button class="md-raised md-accent md-dense">1</md-button>
						<md-button class="md-raised md-accent md-dense">0</md-button>
						<md-button class="md-raised md-accent md-dense">1</md-button>
						<md-button class="md-raised md-accent md-dense">0</md-button>
						<md-button class="md-raised md-accent md-dense">0</md-button>
						<md-button class="md-raised md-accent md-dense">0</md-button>
						<md-button class="md-raised md-accent md-dense">3</md-button>
						<md-button class="md-raised md-accent md-dense">0</md-button>
						<md-button class="md-raised md-accent md-dense">0</md-button>				

					</div>

					<md-divider class="md-inset"></md-divider>
				</md-list-item>

			</md-list>

			<md-list class="custom-list md-double-line lotteryList lotteryList3">
				<md-list-item>
					<div class="md-list-text-container">
						<span>竞彩足球</span>
						<span>&nbsp;</span>
						<span>日期：2017-05-16</span>
					</div>
					<md-button class="md-icon-button md-list-action" @click='showList("jczq")'>
						<md-icon class="resetColor">&gt;</md-icon>
					</md-button>

				</md-list-item>

				<md-list-item class="md-inset">
					<div class="md-list-text-container">

						<md-layout class="shownews" md-gutter>
							<div class="scroll-wrap">
								<ul class="scroll-content" :style="{ top }">
									<li v-for="item in prizeList">{{item.name}}</li >  
									</ul>
								</div>
							</md-layout>	

						</div>
						<md-divider class="md-inset"></md-divider>
					</md-list-item>

				</md-list>


				<md-list class="custom-list md-double-line lotteryList lotteryList3">
					<md-list-item>
						<div class="md-list-text-container">
							<span>江西快三</span>
							<span>第<span>170519017</span>期</span>
							<span>日期：2017-05-16</span>
						</div>
						<md-button class="md-icon-button md-list-action" @click='showList("jxks")'>
							<md-icon class="resetColor">&gt;</md-icon>
						</md-button>

					</md-list-item>

					<md-list-item class="md-inset">
						<div class="md-list-text-container">
							<div class="box box0 red">  
								<span class="item"></span>  
							</div>  
							<div class="box box1">  
								<span class="item"></span>  
								<span class="item"></span>  
							</div>  
							<div class="box box2 ">
								<span class="item"></span>  
								<span class="item"></span>  
								<span class="item"></span>  
							</div>						
						</div>

						<md-divider class="md-inset"></md-divider>
					</md-list-item>

				</md-list>


				<md-list class="custom-list md-double-line lotteryList lotteryList3">
					<md-list-item>
						<div class="md-list-text-container">
							<span>广西快三</span>
							<span>第<span>170519017</span>期</span>
							<span>日期：2017-05-16</span>
						</div>
						<md-button class="md-icon-button md-list-action" @click='showList("gxks")'>
							<md-icon class="resetColor">&gt;</md-icon>
						</md-button>

					</md-list-item>

					<md-list-item class="md-inset">
						<div class="md-list-text-container">
							<div class="box box4">  
								<div class="column">  
									<span class="item"></span>  
									<span class="item"></span>  
								</div>  
								<div class="column">  
									<span class="item"></span>  
									<span class="item"></span>  
								</div>  
							</div>  
							<div class="box box3">  
								<div class="column">  
									<span class="item"></span>  
									<span class="item"></span>  
								</div>  
								<div class="column">  
									<span class="item"></span>  
								</div>  
								<div class="column">  
									<span class="item"></span>  
									<span class="item"></span>  
								</div>  
							</div>  
							<div class="box box5 red">  
								<span class="item"></span>  
								<span class="item"></span>  
								<span class="item"></span>  
								<span class="item"></span>  
								<span class="item"></span>  
								<span class="item"></span>  
							</div>
						</div>

						<md-divider class="md-inset"></md-divider>
					</md-list-item>

				</md-list>



			</md-theme>
		</div>

	</template>
	<script>
		import headerBack from "../common/header_back.vue"
		import axios from "axios"
		import Store from "../../assets/js/storage.js"

		export default {
			components: {
				headerBack
			},
			data() {
				return {
					title:'开奖公告',
					prizeList: [
					{ name: '[竞彩足球] 有运中123元' },
					{ name: '[足彩] 压哨中13743元' },
					{ name: '[竞彩篮球] 有运中466元' },
					{ name: '[江西快三] 有你才能中9元' },
					{ name: '[北京单场] 我是传奇中224元' }
					],
					activeIndex: 0,
				};
			},
			computed:{
				top() {
					return - this.activeIndex * 30 + 'px';
				}
			},
			mounted:function(){	

				var list = document.querySelectorAll( '.md-list-item-container' );
				for (var item of list) {
					item.style.minHeight  = '48px';
					item.style.paddingLeft = '16px';
				}

				//滚动新闻
				setInterval(_ => {
					if(this.activeIndex < this.prizeList.length) {
						this.activeIndex += 1;
					} else {
						this.activeIndex = 0;
					}
				}, 1000);

			},
			methods: {
			//开奖公告列表
			showList(key){
				this.$router.push({ name: 'lottery-list', params: { 
					titleKey: key}
				})

    	// 存储当前列表id到本地
    	//Store.set();
    }
}
}
</script>
<style scoped lang="scss">

	#lottery{
		padding: 64px 0 56px;
	}

	.md-list-text-container>:nth-child(1){
		font-size:13px;
	}

	.lotteryList .md-list-text-container {
		-ms-flex-flow: row nowrap;
		flex-flow: row;
		align-content: space-between;
		justify-content: space-around;
		overflow: visible;
		line-height:48px;
	}

	.lotteryList.lotteryList3 .md-inset .md-list-text-container[data-v-55268130]{
		justify-content: flex-start;
	}

	.md-list-text-container>:nth-child(2):not(:last-child),.md-list-text-container>:nth-child(2), .md-list-text-container>:nth-child(3){
		color: rgba(0,0,0,.54);
		text-overflow:ellipsis;
		white-space:nowrap;
		overflow:hidden;
	}

	.md-divider.md-inset{
		margin-left: 0;
	}

	.md-icon{
		line-height:24px;
		font-size:15px;
		font-weight:600;
		color:#fff;
	}

	.md-icon.resetColor{
		color: rgba(0,0,0,.54);
	}

	.md-button.md-icon-button{
		margin:0;
	}

	.lotteryList.lotteryList2 .md-button.md-dense{
		min-width: 16px;
		padding:0;
		margin:0;
		font-size: 15px;
		font-weight:600;
	}
	.lotteryList.lotteryList3 .md-button.md-dense{
		min-width: 32px;
		padding:0;
		margin:0;
		font-size: 15px;
		font-weight:600;
	}

	/*骰子布局*/

	.box{  
		height:32px;  
		width:32px;  
		background: #eee;  
		border:1px solid #dedede;  
		border-radius:5px;  
		display: flex;
		padding:4px;
		float: left;  
		margin-right:10px;
	}  
	.box0{  
		align-items: center;  
		justify-content:center;  
	}  
	.item{  
		background: #333;  
		height: 5px;  
		width: 5px;
		margin:1px;  
		border-radius:50%;
		box-sizing: border-box;  
	}

	.box.red .item{
		background:red;
	}

	.box1{  
		justify-content: space-between;  
		align-items: center;
		
	}  
	.box2{  
		justify-content: space-between;  
	}  
	.box2 .item:nth-child(2){  
		align-self:center;  
	}  
	.box2 .item:nth-child(3){  
		align-self:flex-end;  
	}  
	.box3{  
		flex-wrap: wrap;  
	}  
	.box3 .column{  
		flex-basis: 100%;  
		display: flex;  
		justify-content: space-between;  
	}  
	.box3 .column:nth-child(2){  
		justify-content: center;  
	}  
	.box4{  
		flex-wrap:wrap;  
		align-content: space-between;  
	}  
	.column{  
		flex-basis:100%;  
		display: flex;  
		justify-content: space-between;  
	}  
	.box5{  
		flex-wrap: wrap;  
		align-content: space-between;  
		flex-direction: column;  
	}  
	.box6{  
		flex-wrap: wrap;  
	}  
	.row{  
		flex-basis:100%;  
		display: flex;  
	}  
	.row:nth-child(2){  
		justify-content: center;  
	}  
	.row:nth-child(3){  
		justify-content: space-between;  
	}  
	.box7{  
		flex-wrap: wrap;  
	}  
	.box7 .row{  
		flex-basis:100%;  
		display: flex;  
		justify-content: space-between;  
	}  
	.box8{  
		flex-wrap: wrap;  
	}

	/*scrollList*/

	.shownews{
		width:100%;
		height: 30px;
		padding:0 10px;
		border-top: 0;
		border-bottom:0;
		background-color:#eee;
		/*background-repeat:no-repeat;
		background-image: url('../../../statics/img/entry/subnav.jpg');*/
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


</style>



