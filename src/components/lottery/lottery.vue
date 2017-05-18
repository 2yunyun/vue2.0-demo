<template>
	<div id="lottery">
		<md-list class="custom-list md-double-line lotteryList">
			<md-list-item>
				<div class="md-list-text-container">
					<span>双色球  </span>
					<span>第<span>2017056</span>期</span>
					<span>日期：2017-05-06</span> 
				</div>
				<md-button class="md-icon-button md-list-action">
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
					<md-button class="md-icon-button md-raised md-primary md-dense">
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
				<md-button class="md-icon-button md-list-action">
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

	</div>

</template>
<script>
	import axios from "axios"
	import Store from "../../assets/js/storage.js"

	export default {
		components: {

		},
		data() {
			return {
				
			};
		},
		computed:{

		},
		mounted:function(){
			//暂未做头部显示的配置，暂时手动移除navbar
			var el = $('#navbar')[0].childNodes;
			//el[0].removeChild(el[0].childNodes[0]);
			el[0].childNodes[0].style.visible='visible';

			$('.md-list.md-double-line .md-list-item .md-list-item-container')[0].style.minHeight  = '48px';
			$('.md-list.md-double-line .md-list-item .md-list-item-container')[1].style.minHeight  = '48px';
			$('.md-list-item.md-inset .md-list-item-container')[0].style.paddingLeft = '16px';

			//var list_item =$('.md-list.md-double-line .md-list-item .md-list-item-container');
			//var inset_list_item = $('.md-list-item.md-inset .md-list-item-container');

			// for (var item of inset_list_item) {
			// 	console.log(item);
			// 	item.style.minHeight  = '48px';
			// }

			// for (var item of inset_list_item) {
			// 	console.log(item);
			// 	item.style.paddingLeft = '16px';
			// }
		},
		methods: {
			//开奖公告列表
			showList(id){
				this.$router.push({ name: 'music-list', params: { 
					listId: id}
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

	.lotteryList .md-list-text-container {
		-ms-flex-flow: row nowrap;
		flex-flow: row;
		align-content: space-between;
		justify-content: space-around;
		overflow: visible;
		line-height:48px;
	}

	.md-list-text-container>:nth-child(2):not(:last-child),.md-list-text-container>:nth-child(2), .md-list-text-container>:nth-child(3){
		color: rgba(0,0,0,.54);

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

	}
</style>



