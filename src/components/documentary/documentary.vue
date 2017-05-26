<template>
	<div id="documentary">
		<headerBackSel :title="title"></headerBackSel>
		<md-theme :md-name="theme">
			<error></error>
		</md-theme>

	</div>

</template>


<script>
	import headerBackSel from '../common/header_back_sel.vue'
	import error from "../common/error.vue"
	
	export default {
		data () {
			return {
				title:'跟单'
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
			headerBackSel,
			error
		}
	}
</script>
<style lang="scss" scoped>
	#documentary{
		
	}

	
</style>





