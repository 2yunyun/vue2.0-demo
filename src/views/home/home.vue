<template>
	<div id="home">
		<md-theme :md-name="theme">
			<navBar></navBar>
			
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</md-theme>
	</div>
</template>
<script>

	import navBar from "../../components/common/navbar.vue"
	import entry from "../entry/entry.vue"
	export default {
		data(){
			return{

			}
		},
		mounted(){
		},
		computed: {
			theme(){
				return this.$store.getters.THEME_COLOR
			},
		},
		methods: {
			toggleLeftSidenav() {
				this.$refs.leftSidenav.toggle();
			},
			open(ref) {
				console.log('Opened: ' + ref);
			},
			close(ref) {
				console.log('Closed: ' + ref);
			},

		},
		components: {
			navBar,
			entry
		// lottery
	}
}
</script>
<style lang="scss" scoped>

</style>