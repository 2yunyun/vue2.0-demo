<template>
  <div id="allOrderList" class="ol-container">
    <div class="ol-content">
        <md-list class="custom-list md-triple-line allOrderList-menu">
            <md-list-item v-for="menu in menuList" @click.native='filter_order($event)'>
                <div class="md-list-text-container">
                    <span class="order_type_text">{{menu.name}}</span>
                    <span class="order_type_id">{{menu.id}}</span>
                </div>
                <md-divider class="md-inset"></md-divider>
            </md-list-item>
        </md-list>

        <div class="tips">登录后才能查看订单哦~</div>
        <md-list class="custom-list md-triple-line allOrderLists">

            <md-list-item v-for="oderByTime in allOrderList">
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

     <!-- <hsy-dialog class="test" v-modal="visible" @click="handleYes">
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
            allOrderList: [],
            isScroll:true,
            dataLength:0,
            condition:0,
            visible:false,
            menuList: [
            {
                id:'0',
                name: "全部订单"
            },
            {
                id:'2',
                name: "追号订单"
            },
            {
                id:'3',
                name: "合买订单"
            },
            {
                id:'6',
                name: "晒单订单"
            },
            {
                id:'7',
                name: "跟单订单"
            }
            ]
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
    $('.allOrderList-menu,.tips').hide();
    // $('.ol-container').height(window.innerHeight - 558 + 'px');

    this.checkLogin();

    this.scrContainer = this.$el;
    this.scrContent = this.$el.querySelector(".ol-content")
    this.eleH = this.scrContent.offsetHeight;


},

created(){
    var that = this;
    $('.result_prizeAmt').find(':empty').remove();
    
    window.addEventListener('scroll',function(e){

        var s = document.body.scrollTop || document.documentElement.scrollTop
        if(s>400) {
            document.querySelector(".mine-tabs nav").style = "position:fixed;top:0;width: 100%;background: #fff;";
        } else {
            document.querySelector(".mine-tabs nav").style = "";
        }

        var index = $(document.querySelector('.md-tab-header.md-active span')).index();
        if(index == 0){
            if(that.isTouchScreenBtm(e)){
                that.isScroll=true;
                console.log('全部订单，当前数据是第： '+that.dataLength+' 条');
                that.loadMore(that.condition);
            }
        } else{
            return;
        }


    });

},
watch: {
 allOrderList: function(){
  setTimeout(function(){
   this.eleH = this.scrContent.offsetHeight;   
}.bind(this),1000);
}
},
methods: {
    handleYes() {
        this.visible = false
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
 filter_order:function(e){

    var type_text = e.currentTarget.innerText;
    this.condition =e.currentTarget.children[0].children[0].children[0].children[1].innerText;
    this.isScroll =false;
    document.querySelector('.md-tab-header:first-child.md-active span').innerHTML = type_text;
    e.currentTarget.parentElement.style.display='none';

    //this.checkLogin();
    this.loadMore(this.condition);

},
loadMore: function(type) {

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
            status:0,
            type:type,
            firstResult:start,
            maxResult:10
        },
        success: function(response) {
         if (response.errorcode == '0' && response.msg == '成功') {
            if(that.isScroll == true){
                that.dataLength += response.data.length;
                dataRecombinant(response.data,that);
            }else{
                that.allOrderList = dataRecombinant(response.data,that);
            }
            
            
        }else{
            that.visible=true;            
           // $('.hsy-dialog .body').html(response.msg);
           console.log(response.msg+'--全部订单页');
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

    console.log(textStatus+'--全部订单页');
}

});

},
checkLogin(){
    var that = this;
    if(!Store.get('username')){
        $('.tips').show();
        $('.allOrderLists').hide();
        that.busy = false;
        that.spinnerFlag = false;

        that.visible=false;
    }else{
        this.loadMore(this.condition);
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
    var obj = {}, arr = [];


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

    if(vm.isScroll == true){
        for(var key in obj){
            vm.allOrderList.push(obj[key]);           
        }

        console.log('滚动了，数据源长度：'+vm.allOrderList.length);
        return vm.allOrderList;
    }else{
        for(var key in obj){
            arr.push(obj[key]);
        }
        
        console.log('筛选，数据源长度：'+vm.allOrderList.length);
        return arr;
    }
    

    //console.log('数据源：'+JSON.stringify(vm.allOrderList));
   // console.timeEnd('test');
   //return vm.allOrderList;
}

</script>
<style scoped lang="scss">
    .ol-container{
     text-align: center;
     height: calc( 100% - 5.58rem );
     overflow-y: scroll;
 }

 #allOrderList .ol-content{
    position:relative;
    z-index: 2;
    min-height: 4.4rem;
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

    .md-list.md-triple-line.allOrderList-menu{
        width:33.3333%;
        border:1px solid #d4d4d4;
        position:absolute;
        left: 0;
        top:0;
        z-index: 3;

        .order_type_id{
            display:none;
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



