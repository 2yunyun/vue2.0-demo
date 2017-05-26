<template>
  <div id="header-back-sel">
     <md-toolbar class="top-nav">
         <md-button class="mr0"  @click="myCustomization">我的定制</md-button>
         <md-button class="selectTitle" style="flex: 1"  @click="selectSort">
             <h2 class="md-title"  v-text="title"></h2>
             <md-icon class="iconfont icon-xiangxiajiantou"></md-icon>
         </md-button>
         <md-layout class="optionSort" md-gutter v-show="selFlag">
             <md-button class="pink-button" :style="{opacity:1}">
                 <i class="iconfont icon-yuezhan"></i>金额排序
             </md-button>
             <md-button  class="pink-button" :style="{opacity:1}">
              <i class="iconfont icon-xiangxiajiantou"></i>跟投排序
          </md-button>
          <md-button  class="pink-button" :style="{opacity:1}">
              <i class="iconfont icon-shijian"></i>时间排序
          </md-button>
      </md-layout>

      <md-button class="md-icon-button" :style="{opacity:1}">
         <md-icon class="iconfont icon-shaixuan"></md-icon>
     </md-button>

     <md-button class="md-icon-button" :style="{opacity:1}">
      <md-icon  class="iconfont icon-tishi"></md-icon>
  </md-button>

</md-toolbar>
</div>
</template>


<script>
  import axios from "axios"
  import $ from "n-zepto"
  import qs from 'qs'
  import Util from '../../util/util'
  import Store from "../../assets/js/storage.js"

  export default {
    data() {
        return {
            selFlag:false
        }
    },
    mounted(){
    },
    props:['title'],
    methods: {
        myCustomization(){
            if(Store.get('username')){
            //检查是否登录，存储并跳转至目标路径
            this.$router.push({name:'我的定制'});
        }else{
            Store.set('to','我的定制');
            this.$router.push({name:'login'});
        }
    },
    selectSort(){
        if(this.selFlag == true){
            this.selFlag = false;
        }else{
            this.selFlag = true;
        }
        
    }

}
}
</script>
<style lang="scss" scoped>
	.md-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .md-button.mr0{
        margin-right: 0;
    }

    .selectTitle{
        margin-left: 8px;
    }

    .selectTitle h2.md-title {
        display: inline-flex;
    }

    .optionSort{
        position: absolute;
        top:64px;
        width:100%;
        display:flex;
        flex-direction:row;
        align-content:center;
        justify-content:center;
    }

    .pink-button{
        color: pink;
        border-color: pink;
    }



</style>




