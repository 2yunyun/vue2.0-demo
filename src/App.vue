<template>
  <div id="app">
    <router-view></router-view>
    <md-dialog-alert
    :md-content="alert.content"
    :md-ok-text="alert.ok"
    @open="onOpen"
    @close="onClose"
    ref="info">
  </md-dialog-alert>
</div>
</template>

<script>
  import Vue from 'vue'
  import home from './views/home/home.vue'
  import Util from './util/util'
  import Store from './assets/js/storage.js'
  
  export default {
    name: 'app',
    data(){
      return{
        alert:{
          content:'网络不稳定，请稍后',
          ok:'ok',
        },
      }
    },
    computed: {
      activeRoute(){
        return this.$route.name
      }
    },
    watch:{
      activeRoute(){
        this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute});
        //this.checkLogin();
      }
    },
    mounted: function(){

    // 测试localStorage是否可用
    this.checkLocalStorageEnabled();

    // 刷新进行路由检测跳转 
    this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})

    //验证是否登录
    window.onload = function(){
      this.$router.push({name:'entry'});
    }.bind(this)
    
  },
  methods:{
    checkLocalStorageEnabled(){
      if (!Store.enabled) {
        alert('您的浏览器不支持localStorage，可能会影响体验')
      }
    },
    redirect(){
      setTimeout(function(){
        this.$router.push({name:'login'})
      }.bind(this),5000)
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');      
    },
    onClose(type) {
      console.log('Closed');
    },
    formatTime(val){
      var m = Math.floor(val/60).toString();
      var s = Math.round(val%60).toString();
      m = (m.length == 1) ? 0+m : m;
      s = (s.length == 1) ? 0+s : s;
      return m+":"+s;
    },
    getPercent(curTime){
      return ((curTime / (this.audioDuration/1000)).toFixed(2)) * 100 +'%'
    }
  },
  components: {
    // home
  }
}
</script>

<style lang="scss">
  #app {

    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
