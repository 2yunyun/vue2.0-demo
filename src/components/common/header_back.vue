<template>
  <div id="header-back">
   <md-toolbar class="top-nav">

     <img src="statics/img/mine/arrow_l.png" @click='go()' alt="返回">

     <h2 class="md-title" style="flex: 1" v-text="title"></h2>
     <md-button class="md-raised time_screening"><span>近一周</span></md-button>
  </md-toolbar>
</div>
</template>


<script>

  export default {
    mounted: function(){

    },
    data() {
     return {

     }
   },
   props:['title'],
   computed: {

   },
   methods: {
     go(){
      history.go(-1);
    }

  }
}
</script>
<style lang="scss" scoped>

  #header-back{
    display: block;
    overflow:hidden;
    .md-theme-default.md-toolbar{
      background-color:#eb1c42;
      min-height: .88rem;
      padding: 0 .2rem;
    }
    .md-toolbar .md-title {
      font-size: .36rem;
      line-height: .88rem;
      letter-spacing: .005em;
    }

    .md-toolbar .time_screening{
      display: none;
      background: transparent;
      border:1px solid #fff;
      color: #fff;
    }
  }

  .md-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>



