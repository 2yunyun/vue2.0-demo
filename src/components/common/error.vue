<template>
	<div id="error">
		<md-theme :md-name="theme">
			<md-layout class="error" md-gutter>
				<i class="iconfont icon-msnui-404 md-display-2"></i>
			</md-layout>	
		</md-theme>

	</div>

</template>


<script>
	export default {
		data () {
			return {
				title:'404'

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
			
		}
	}
</script>
<style lang="scss" scoped>
	#error{
		margin-top:64px;
		height: 77vh;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-pack: center;
		justify-content: center;
		-ms-flex-align: center;
		align-items: center;
		.error{
			text-align: center;
			font-size: 38px;
			font-weight: 700;
			min-height: 20vh;
			background-color: #eee;			
			.iconfont{
				height: auto;
			}
		}
	}

	

	
</style>





