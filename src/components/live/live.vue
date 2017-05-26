<template>
	<div id="live">
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
				title:'直播'

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
	#live{
		
	}

	
</style>





