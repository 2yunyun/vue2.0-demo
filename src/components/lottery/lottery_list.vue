<template>
  <div id="lottery-list">
   <md-theme :md-name="theme">
    <headerBack :title="albumName"></headerBack>
    <backToTop @clickBack="backToTop"></backToTop>
    <md-list class="custom-list md-double-line lotteryList"  v-for="n in 5">
      <md-list-item>
        <div class="md-list-text-container">
          <span>竞彩足球</span>
          <span>&nbsp;</span>
          <span>日期：2017-05-16</span>
        </div>
        <md-button class="md-icon-button md-list-action">
          <md-icon class="resetColor">&gt;</md-icon>
        </md-button>

      </md-list-item>

      <md-list-item class="md-inset">
        <div class="md-list-text-container">

          xxxxxxxxxxxxxxxxxxxxxxxxxxx

        </div>
        <md-divider class="md-inset"></md-divider>
      </md-list-item>

    </md-list>
  </md-theme> 
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
      titleKey: this.$route.params.titleKey,
      flag: true,
      searchList:[],
      spinnerFlag: false
    };
  },
  computed:{
    theme(){
    	return this.$store.getters.THEME_COLOR
    },
    albumName(){
      var _title = '开奖公告';
      var mapAlbum = {
       'ssq': "双色球"+_title,
       'jczq': "竞彩足球"+_title,
       'bd': "北京单场"+_title,
       'jclq': "竞彩篮球"+_title,
       'sfc': "胜负彩/任选九"+_title,
       'dlt': "大乐透"+_title,
       'pls': "排列三"+_title,
       'fc': "福彩3D"+_title,
       'pl5': "排列五"+_title,
       'qlc': "七乐彩"+_title,
       'qxc': "七星彩"+_title,
       'sd11xuan5': "山东11选5"+_title,
       'gd11xuan5': "广东11选5"+_title,
       'jxks': "江西快三"+_title,
       'jlks': "吉林快三"+_title,

       'gxks': "广西快三"+_title,
       'lcb': "六场半"+_title,
       'jqc': "进球彩"+_title,
     }
     return mapAlbum[this.titleKey]
   }  
 },
 mounted:function(){
  this.getList();
},
methods: {    
 getList(){

    // axios.get(API_PROXY+'http:xxxx?id='+this.id)
    // .then(function (res) {

    // }.bind(this))
    // .catch(function (error) {
    //   console.log(error);
    // });
  },
  showList: function(){
   this.flag = true
 },
 backToTop(){
   document.body.scrollTop = 0;
 }
}
}
</script>
<style scoped lang="scss">
	#lottery-list{
		min-height: 100vh;
		box-sizing: border-box;
		padding: 64px 0 0 0;
		text-align: center;
	} 
	.progress{
		position: absolute;
		height: 2px;
		left:0;
		bottom:0px;
		background-color: rgba(0,128,128,.5)
	}
	.active{
		background-color: rgba(218, 218, 218, 0.57);
	}
</style>



