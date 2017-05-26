<template>
	<div id="myCustomization">
		<headerBackSel :title="title"></headerBackSel>
		<md-theme :md-name="theme">
			我的定制
		</md-theme>
	</div>
</template>

<script>
	export default {
		data () {
			return {				
				title:'我的定制'
			}
		},
		computed:{
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},
		mounted() {
			

		},		
		components: {
			
		}
	}
</script>
<style lang="scss" scoped>
	#myCustomization{
		
	}

	
</style>




