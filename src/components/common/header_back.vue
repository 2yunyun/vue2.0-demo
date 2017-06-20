<template>
  <div id="header-back">
     <md-toolbar class="top-nav">
       <md-button class="md-icon-button">
         <md-icon><i class="iconfont icon-back" @click="go"></i></md-icon>
     </md-button>
     <h2 class="md-title" style="flex: 1" v-text="title"></h2>
     <md-button class="md-icon-button" :style="{opacity:0}">
      <md-icon></md-icon>
  </md-button>
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
      padding: 0 .08rem;
  }
  .md-toolbar .md-title {
      font-size: .36rem;
      line-height: .88rem;
      letter-spacing: .005em;
  }
}

.md-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>



