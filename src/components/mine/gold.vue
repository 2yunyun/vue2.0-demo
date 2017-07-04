<template>
	<div id="gold">
		<md-theme :md-name="theme">
			<HeaderBack :title="title"></HeaderBack>
			<md-layout class="gold" md-gutter>
			
				
			</md-layout>
		</md-theme>

	</div>

</template>


<script>
	import HeaderBack from "../common/header_back.vue"
	import Util from "../../util/util"
	import $ from "n-zepto"
	import Store from "../../assets/js/storage.js"
	

	export default {
		data () {
			return {
				title:'账户明细',
				isScrollDown: false
			}
		},
		mounted() {
			
		},
		create() {
			
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},	
		components: {
			HeaderBack
		},
		methods:{
			
		}
	}

</script>
<style lang="scss" scoped>
	#mine{
		padding-bottom: .98rem;
		/*overflow:hidden;*/

		.md-layout{
			padding:0;
		}

		.md-layout.balance{


			

		}

		
	}


	
</style>










