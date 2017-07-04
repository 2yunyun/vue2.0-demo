<template>
  <div id="winningOrder" class="ol-container">
    <div class="ol-content">
        <div class="tips">登录后才能查看订单哦~</div>
        <md-list class="custom-list md-triple-line allOrderLists winningOrderLists">

            <md-list-item v-for="oderByTime in winningOrderList">
                <md-avatar>
                    <p class="month">{{oderByTime.orderTime  | filter_month(value)}}月</p>
                    <p class="date">{{oderByTime.orderTime  | filter_date(value)}}</p>
                </md-avatar>

                <div class="md-list-text-container">
                    <div class="order-container" v-for="order in oderByTime.orderList" @click="getOrderDetail(order.id)">
                        <div class="lotteryTypeName">
                            <span> {{order.lotteryTypeName}}</span>
                            <div class="lotteryTypeName-b">
                                <span class="amount"> {{order.amount}}.00 元</span>
                                <span class="typeName"> {{order.typeName}}</span>
                            </div>
                        </div>
                        <div class="result_prizeAmt">
                            <div class="result_prizeAmt_l">
                                <div class="result_prizeAmt_l_t">
                                    <span class="prizeAmt" v-if="order.prizeAmt"> {{order.prizeAmt | filterFun(value)}}</span>
                                    <span  class="status" v-if="order.status">{{order.status | filterFun2(value) }}</span>
                                </div>
                                <div class="result_prizeAmt_l_b" v-if="order.userCoupons">
                                    <span class="actualValue" v-for="item in order.userCoupons" v-if="item.actualValue">
                                        {{item.actualValue| filter_actualValue(value)}}
                                    </span>
                                    <span  class="addPrizeAmt" v-if="order.addPrizeAmt">{{order.addPrizeAmt | filter_addPrizeAmt(value) }}</span>
                                    <span  class="gold" v-if="order.gold">{{order.gold | filter_gold(value) }}</span>
                                </div>
                            </div>
                            <div class="result_prizeAmt_r">
                             <img class="view_result_prizeAmt" src="statics/img/mine/gray-you-JT@2x.png" alt=">">
                         </div>
                     </div>
                 </div>
             </div>


             <md-divider class="md-inset"></md-divider>
         </md-list-item>

     </md-list>
     <md-spinner :class="spinnerClass" :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
       <!-- <hsy-dialog class="test" v-show="visible" @click="handleYes">
        <div slot="title">提示</div>
        <div slot="body">
            ~~
        </div>
    </hsy-dialog> -->
</div>
</div>

</template>
<script>
    import Util from '../../util/util'
    import $ from "n-zepto"
    import Store from "../../assets/js/storage.js"

    export default {
        data(){
         return {
            scrContainer: null,
            scrContent: null,
            eleH: 0,
            spinnerFlag: true,
            busy: false,
            winningOrderList: [],
            dataLength:0,
            visible: false
        }
    },
    computed: {
       spinnerClass(){
          return this.$store.getters.SPINNER_CLASS
      }
  },
  filters: {

     filter_month: function (value) {

        return formatMonth(value);
    },
    filter_date: function (value) {

        return formatDate(value);
    },

    filterFun: function (value) {

        if(value!= '0'){
                      return "中"+value.toFixed(2)+'元';
                }else{
            return '';
        }
    },
    filterFun2: function (value) {  
        if(value!= '已中奖'){
                      return value;
                }else{
            return '';
        }     

    },
    filter_actualValue: function (value) {  
        if(value!= '' && value!= null && value!= '0'){
                      return '优惠'+value+'元';
                }else{
            return '';
        }     

    },
    filter_addPrizeAmt: function (value) {  
        if(value!= '' && value!= null && value!= '0'){
                      return '加奖'+value+'元';
                }else{
            return '';
        }     

    },
    filter_gold: function (value) {
        if(value!= '' && value!= null  && value!= '0'){
            return '金币'+value+'个';

        }else{
            return '';
        }     

    },
},
mounted:function(){
    $('.tips').hide();
    // $('.ol-container').height(window.innerHeight - 558 + 'px');

    this.checkLogin();
    this.scrContainer = this.$el;
    this.scrContent = this.$el.querySelector(".ol-content");
    this.eleH = this.scrContent.offsetHeight; 
},

created(){
    var that = this;
    $('.result_prizeAmt').find(':empty').remove();

    window.addEventListener('scroll',function(e){

        var s = document.body.scrollTop || document.documentElement.scrollTop;
        if(s>=400) {
            document.querySelector(".mine-tabs nav").style = "position:fixed;top:0;width: 100%;background: #fff;";
        } else {
            document.querySelector(".mine-tabs nav").style = "";
        }

        var index = $(document.querySelector('.md-tab-header.md-active span')).index();
        if(index == 1){
            if(that.isTouchScreenBtm(e)){
               console.log('中奖订单，当前数据是第： '+that.dataLength+' 条');
               that.loadMore();
           }
       }else{
        return;
    }
});

    // $("#outstandingOrderList").on('scroll',function(){
    //     console.log('ol-content 滚动了');
    //     console.log('当前数据是第： '+that.dataLength+' 条');

    //     if(that.isTouchScreenBtm(e)){

    //        that.loadMore(that.condition);
    //    }
    // });
    

},
watch: {
   winningOrderList: function(){
      setTimeout(function(){
         this.eleH = this.scrContent.offsetHeight;   
     }.bind(this),1000);
  }
},
methods: {
 handleYes() {
    this.visible = false;
},
getOrderDetail(id){
        //this.$router.push({ name: 'zixun-detail', params: { id: id }})
    },     
    isTouchScreenBtm: function(e){       
        var winH = window.innerHeight || document.documentElement.clientHeight;

        var innerWinH = winH;
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
   var start = this.dataLength;

   this.busy = true;
   this.spinnerFlag = true;
   var that = this;

   $.ajax({
    url:AJAXURL,
    type: "post",
    jsonp: "callbackfun",
    jsonpCallback:'callback',
    dataType: "jsonp",
    data: {
        command:'findUserOrders',                           
        authToken:Store.get('accessToken'),
        jscallback:'callback',
        agentId:'agent_wap',
        status:2,
        type:0,
        firstResult:start,
        maxResult:10
    },
    success: function(response) {
     if (response.errorcode == '0' && response.msg == '成功') {
       that.dataLength += response.data.length;

       dataRecombinant(response.data,that);

       that.busy = false;
       that.spinnerFlag = false;
   }else{
    that.visible=true;
        //$('.hsy-dialog .body').html(response.msg);
        console.log(response.msg+'--中奖订单tab页');
    }
    that.busy = false;
    that.spinnerFlag = false;
},
error: function(XMLHttpRequest, textStatus, errorThrown) {
    console.log(XMLHttpRequest.status);
    console.log(XMLHttpRequest.readyState);
    
    that.busy = false;
    that.spinnerFlag = false;
    that.visible=true;
    console.log('中奖订单tab页，数据加载失败');
    
}

});

},
checkLogin(){
    var that = this;
    if(!Store.get('username')){
        $('.tips').show();
        $('.winningOrderLists').hide();
        that.busy = false;
        that.spinnerFlag = false;
        that.visible=false;
    }else{
        this.loadMore();
    }
}
}
}

function formatMonth(date){
    //将字符串string转为日期类型Date
    var cdate=date;
    var myDate=new Date(cdate);

    var month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)

    return month;//获取月份
}

function formatDate(ns){
    //将字符串string转为日期类型Date
    var cdate=ns;
    var myDate=new Date(cdate);
    var date = myDate.getDate();

    return date;//获取日期
}

var formatDatefun = function (date) {
    var myDate=new Date(date);
    var y = myDate.getFullYear();
    var m = myDate.getMonth()+1;
    var d = myDate.getDate();

    return y + '-' + m + '-' + d;  
}; 


//数据重组
var dataRecombinant = function(data,vm){
    //新对象、新数组
    var obj = {};


   // console.time('test');

    //遍历数据，按日期将数据加入新数组orderList中
    for(var i = 0, len = data.length; i < len ; i++){

        var currentData = data[i], //获取每条数据，加入新数组
        currentKey = formatDatefun(currentData.orderTime),
        hased = currentKey in obj;  

        // console.log('currentData:::  '+JSON.stringify(currentData)); 
        // console.log('currentKey:::  '+currentKey);

        //object的key值一样时会覆盖，key一样时让num自增
        obj[currentKey] = {
            orderTime : formatDatefun( currentData.orderTime ),//日期
            num : hased ? ++obj[currentKey]['num'] : 1,//数据条数，key一样时让num自增
            orderList :  (hased ? obj[currentKey]['orderList'] : []).concat(currentData) //订单数据
        }   
    }
    for(var key in obj){
        vm.winningOrderList.push(obj[key]);
    }
   console.log('winningOrderList数据源c长度：'+vm.winningOrderList.length);

    //console.log('winningOrderList数据源：'+JSON.stringify(vm.winningOrderList));
   // console.timeEnd('test');
   return vm.winningOrderList;
}

</script>
<style scoped lang="scss">
    .ol-container{
       text-align: center;
       height: calc( 100% - 5.58rem );
       overflow-y: scroll;
   }

   #winningOrder .ol-content{
    position:relative;
    z-index: 2;
    height: auto;

    .md-list.md-triple-line.allOrderLists{
        .md-list-item .md-list-item-container{
            min-height:1rem;
            padding-left:0;

            .md-list-item-holder .md-avatar{
                width: .8rem;
                background-color:#f4f4f4;
                font-size: .28rem;
                color:#666;
                border-right:.01rem solid #d4d4d4;
                text-align: center;
                line-height: .5rem;
                .date{
                    color:#333;
                    font-size: .36rem;
                }
            }

            .order-container{
                display: flex;
                flex-direction: row;
                align-content: center;
                justify-content: space-between;
                padding-left:1rem;
                border-bottom: .01rem solid #d4d4d4;

                .lotteryTypeName{
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    justify-content: space-between;
                    font-size: .32rem;
                    color:#000;
                    line-height: .5rem;

                    .lotteryTypeName-b{
                        display: flex;
                        flex-direction: row;
                        align-content: center;
                        justify-content: space-between;
                        font-size: .28rem;
                        color: #999;                                
                        .amount{
                            margin-right: .2rem;
                        }
                    }


                }

                .result_prizeAmt{
                    height: 1rem;
                    display: flex;
                    flex-direction: row;
                    align-content: center;
                    justify-content: space-between;

                    .result_prizeAmt_l{
                        display: flex;
                        flex-direction: column;
                        align-content: center;
                        justify-content: center;
                        margin-right: .3rem;
                        font-size: .32rem;
                        color:#666;
                        line-height: .5rem;

                        .result_prizeAmt_l_t{
                            display: flex;
                            flex-direction: row;
                            align-content: center;
                            justify-content: space-between;

                            .prizeAmt{
                                color:#eb1c42;
                            }
                            .status{
                                color:#666;
                            }
                        }

                        .result_prizeAmt_l_b{
                            display: flex;
                            flex-direction: row;
                            align-content: center;
                            justify-content: flex-end;
                            color:#fff;
                            font-size:.2rem;
                            *{
                                margin-left:.1rem;
                            }
                            .actualValue{
                                background-color:#46babb;
                                padding:0 .1rem;
                                height: .34rem;
                                line-height:.34rem;
                            }
                            .addPrizeAmt{
                                background-color:#ff5b74;
                                padding:0 .1rem;
                                height: .34rem;
                                line-height:.34rem;
                            }

                            .actualValue + .addPrizeAmt,
                            .actualValue + .gold,
                            .addPrizeAmt+ .gold{
                                margin-left: .1rem;
                            }

                            .gold{
                                background-color:#4ea3d4;
                                padding:0 .1rem;
                                height: .34rem;
                                line-height:.34rem;
                            }
                            .view_result_prizeAmt{
                                width: .1rem;
                                height: .2rem;
                                margin-left: .2rem;
                                margin-top: .4rem;
                            }
                        }

                    }

                    .result_prizeAmt_r{
                        line-height: 1rem;
                    }





                }
            }
            .sub-order-list{
                min-height: 1rem;
                height: 1rem;
            }
            .md-list-text-container>:nth-child(3){
                color:inherit;
            }



        }
    } 

    
    .tips{
        width: 100%;
        min-height:4.2rem;

        line-height: 1rem;
        text-align: center;
        padding-top: .5rem;
    }

}




</style>



