<template>
	<div id="mine">
		<headerBack :title="title"></headerBack>
		<md-theme :md-name="theme">
		<error></error>
		</md-theme>

	</div>

</template>


<script>
	import headerBack from "../common/header_back.vue"
	import error from "../common/error.vue"

	export default {
		data () {
			return {
				title:'我的'

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
			headerBack,
			error
		}
	}
</script>
<style lang="scss" scoped>
	#mine{
		
	}


	
</style>





