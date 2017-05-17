<template>
	<div id="home">
		<!-- <audio :src="audioSrc" id="audio"></audio> -->
		<md-theme :md-name="whiteForm">
			<navBar @toggleLeftSidenav="toggleLeftSidenav"></navBar>
			
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</md-theme>
	</div>
</template>
<script>

	import navBar from "../../components/common/navbar.vue"
	import entry from "../entry/entry.vue"
// import lottery from "../../components/lottery/lottery.vue"
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