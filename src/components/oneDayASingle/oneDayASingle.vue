<template>
	<div id="oneDayASingle">
		<headerBack :title="title"></headerBack>
		<md-theme :md-name="theme">
		</md-theme>

	</div>

</template>


<script>
	import headerBack from "../common/header_back.vue"

	export default {
		data () {
			return {
				title:'每日一单'

			}
		},
		mounted() {
			

		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},	
		components: {
			headerBack
		}
	}
</script>
<style lang="scss" scoped>
	#oneDayASingle{
		
	}

	
</style>





