<template>
<div id="lottery-detail">
	<md-theme :md-name="theme">
		<headerBack :title="title"></headerBack>
	</md-theme> 
	<div class="container-wrap">
		<div class="container">
			asdfagf
			
		</div>
	</div>
</div>
	
</template>
<script>
import BackToTop from "../common/backToTop.vue"
import axios from "axios"
import Store from "../../assets/js/storage.js"
import HeaderBack from "../common/header_back.vue"
export default {
  components: {
  	backToTop: BackToTop,
  	headerBack: HeaderBack
  },
  data() {
	return {
		title:'开奖详情',
		 dis: 0,
		 hArr: []
	};
  },
  computed:{
  	
    theme(){
    	return this.$store.getters.THEME_COLOR
    },
    
  },
  watch:{
  	
  },
  mounted:function(){
  	alert('开奖详情');
  },
  filters:{
	
  },
  methods: {
 


  }
}
</script>
<style scoped lang="scss">
    h2{
    	font-size: 1.6rem;
    }
	div,p{
		font-size: 1rem;
		color: #fff;
	}
	
	
	@media screen and (max-width: 640px){
		.panel .btn{
			font-size: 34px;
		}
		.panel .play{
			font-size: 60px;
		}
	}
	@media screen and (max-width: 320px){
		.container .lyric-wrap .lyric-box .lyric{
			font-size: 1.2rem;
		}
		
	}
</style>



