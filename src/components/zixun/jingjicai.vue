<template>
  <div id="movielist-top250" class="j-container">
    <div class="j-content">
      <md-list class="custom-list md-triple-line">
        <md-list-item v-for="news in zixunLists" @click="getZixunDetail(news.id)">
          <md-avatar>
            <img :src="news.icon_url" alt="People">
        </md-avatar>

        <div class="md-list-text-container">
            <span>{{news.title}}</span>
            <p>{{formatDate(news.update_time)}}</p>
        </div>

        <md-divider class="md-inset"></md-divider>
    </md-list-item>
</md-list>
<md-spinner :class="spinnerClass" :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
</div>
</div>

</template>
<script>
  import axios from "axios"
  import qs from 'qs'

  export default {
    data(){
       return {
          scrContainer: null,
          scrContent: null,
          eleH: 0,
          spinnerFlag: true,
          zixunLists: [],
          busy: false
      }
  },
  computed:{
    spinnerClass(){
      return this.$store.getters.SPINNER_CLASS
  }
},
mounted:function(){
    this.scrContainer = this.$el;
    this.scrContent = this.$el.querySelector(".j-content")
    this.eleH = this.scrContent.offsetHeight;
    this.loadMore();
    this.scrContainer.addEventListener('scroll', function(e){
      if(this.isTouchScreenBtm(e)){
         this.loadMore();
     }
 }.bind(this))
},
watch: {
 zixunLists: function(){
    setTimeout(function(){
       this.eleH = this.scrContent.offsetHeight;
   }.bind(this),1000)
}
},
methods: {
  getZixunDetail(id){
    this.$router.push({ name: 'zixun-detail', params: { id: id }})
},
isTouchScreenBtm: function(e){
    var winH = window.innerHeight || document.documentElement.clientHeight;
    var navH = document.querySelector(".top-nav").offsetHeight * 2;
    var innerWinH = winH - navH + 168;
    var eleH = this.eleH;
    var scrT = this.scrContainer.scrollTop;
    if(scrT >= eleH - innerWinH){
       return true;
   }else{
       return false
   }
},
loadMore: function() {
 if(this.busy){
   return;
}
var start = this.zixunLists.length;
this.busy = true;
this.spinnerFlag = true;
axios.get(API_PROXY+'http://www.dajiang365.com/Mobilezixun/getArtListByCategorySnp.html?lastindex='+start+'&perpage=10&category=jingjicai')
.then(function(res) {

    var _data=eval("("+res.data+")");

    for (let news of (_data.data)) {
      this.zixunLists.push(news);
  }

  this.busy = false;
  this.spinnerFlag = false;
}.bind(this))
.catch(function (error) {
    console.log(error);
});

}, 
formatDate(ns) {
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  var now= Date.parse(today);
  var newDate = new Date();
  newDate.setTime(ns * 1000);
  var da;

  if (ns*1000-now<0) {
    da=newDate.format('MM-dd');
} else {
    da =newDate.format("yyyy-MM-dd");
}
return da;
}
}
}


Date.prototype.format =function(format)
{
  var o = {
                "M+" : this.getMonth()+1, //month
                "d+" : this.getDate(), //day
                "h+" : this.getHours(), //hour
                "m+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3), //quarter
                "S" : this.getMilliseconds() //millisecond
            }
            if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
            for(var k in o)if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,
                  RegExp.$1.length==1? o[k] :
                  ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        }
    </script>
    <style scoped lang="scss">
        .j-container{
           text-align: center;
           height: 77vh;
           overflow-y: scroll
       }
       .j-content{
        height: auto;
    }

    .md-list.md-triple-line .md-list-item .md-list-item-container{
        .md-avatar{
          width: .88rem;
          height: .88rem;
          border-radius: 0;
      }
  }

</style>



