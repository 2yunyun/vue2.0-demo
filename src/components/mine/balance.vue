<template>
    <div id="balance">
        <md-theme :md-name="theme">
            <HeaderBack :title="title"></HeaderBack>
            <md-layout class="balance" md-gutter>
                <md-list class="custom-list md-triple-line time_screening-menu">
                    <md-list-item v-for="menu in menuList" @click.native='filter_balance($event)'>
                        <div class="md-list-text-container">
                            <span class="time_screening_text">{{menu.name}}</span>
                            <span class="time_screening_id">{{menu.id}}</span>
                        </div>
                    </md-list-item>
                </md-list>
                <md-tabs md-fixed :class="{'wrap-fixed': isScrollDown}"  class="md-accent mine-tabs nobg balance-tabs">
                    <md-tab md-label="全部">

                        <md-list class="custom-list md-triple-line allOrderLists allBalanceLists">
                            <md-list-item v-for="item in balanceList">
                                <div class="md-list-text-container account_details">
                                    <span class="memo">{{item.memo}}</span>
                                    <span class="createTime">{{item.createTime}}</span>
                                    <span class="amount">{{item.amount|filter_currency(value) }}</span>
                                    <span class="account_balance">{{item.balance | filter_currency2(value)}}</span>
                                </div>
                            </md-list-item>
                        </md-list>


                    </md-tab>
                    <md-tab md-label="中奖"></md-tab>
                    <md-tab md-label="充值"></md-tab>
                    <md-tab md-label="提现" ></md-tab>
                    <md-tab md-label="合计"></md-tab>
                </md-tabs>

                <md-spinner :class="spinnerClass" :md-size="60" md-indeterminate v-show='spinnerFlag'></md-spinner>
                <!-- <hsy-dialog class="test" v-show="visible" @click="handleYes">
                    <div slot="title">提示</div>
                    <div slot="body">
                        ~~
                    </div>
                </hsy-dialog> -->
            </md-layout>
        </md-theme>

    </div>

</template>


<script>
    import HeaderBack from "../common/header_back.vue"
    import Util from "../../util/util"
    import $ from "n-zepto"
    import Store from "../../assets/js/storage.js"
    

    export default {
        data () {
            return {
                title:'账户明细',
                isScrollDown: false,
                scrContainer: null,
                scrContent: null,
                eleH: 0,
                spinnerFlag: true,
                busy: false,
                balanceList: [],
                pageIndex:1,
                timeRange:2,
                payType:-1,
                visible:false,
                menuList: [
                {
                    id:'1',
                    name: "全部"
                },
                {
                    id:'2',
                    name: "近一周"
                },
                {
                    id:'3',
                    name: "近一个月"
                },
                {
                    id:'4',
                    name: "近三个月"
                }
                ]
            }
        },
        filters: {

            filter_currency: function (value) {
                return '￥'+(value/100).toFixed(2);
            },
            filter_currency2: function (value) {
                return '余额：￥'+(value/100).toFixed(2);
            }

        },
        mounted() {
            $('.time_screening').show();
            var time = document.querySelector('.time_screening span').innerHTML;
            $('.time_screening-menu .time_screening_text').each(function(index,item){

                if($(item).text() ==time){
                    $(item).css({'color':'#fff','background-color':'#eb1c42'});
                }
            });
            $('.time_screening-menu').hide();


            $('#balance').on("click",function(e){
                var target = $(e.target); 
                //console.log(target);
                if(target.closest(".time_screening").length == 0){ 
                    $(".time_screening-menu").hide();
                }else{
                    if($('.time_screening-menu').css('display') == 'none'){
                        $('.time_screening-menu').show();
                    }else{
                        $('.time_screening-menu').hide();
                    }
                }
            });

            this.loadMore();
            this.scrContainer = this.$el;
            this.scrContent = this.$el.querySelector(".balance");
            this.eleH = this.scrContent.offsetHeight;



        },
        create() {
            var that = this;

            window.addEventListener('scroll',function(e){               
                if(that.isTouchScreenBtm(e)){
                    console.log('账户明细，当前数据是第： '+that.dataLength+' 条');
                    that.loadMore();
                }
            });

        },
        computed:{
            theme(){
                return this.$store.getters.THEME_COLOR
            },
        },  
        components: {
            HeaderBack
        },
        watch: {
            balanceList: function(){
                setTimeout(function(){
                    this.eleH = this.scrContent.offsetHeight;   
                }.bind(this),1000);
            }
        },
        methods:{
            handleYes() {
                this.visible = false
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
            filter_balance(e){
                var tr_text = e.currentTarget.children[0].children[0].children[0].children[0].innerText;
                var tr_id = e.currentTarget.children[0].children[0].children[0].children[1].innerText;

                $('.time_screening-menu .time_screening_text').removeAttr('style');
                e.currentTarget.children[0].children[0].children[0].children[0].style="color:#fff; background-color:#eb1c42;";

                this.payType =tr_text;
                this.timeRange =tr_id;

                document.querySelector('.time_screening span').innerHTML = tr_text;
                e.currentTarget.parentElement.style.display='none';

                this.loadMore();
            },
            loadMore: function() {
                if(!Store.get('username')){
                    return;
                }

                if(this.busy){
                    return;
                }
                var pagenum = this.pageIndex;
                var tr = this.timeRange;
                var pt = this.payType;

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
                        command:'findUserAccountDetails',
                        authToken:Store.get('accessToken'),
                        jscallback:'callback',
                        agentId:'agent_wap',
                        payType:pt,
                        timeRange:tr,
                        pageIndex:pagenum,
                        maxResult:15
                    },
                    success: function(response) {
                        if (response.errorcode == '0' && response.msg == '成功') {
                            that.pageIndex ++;

                            that.balanceList = response.data.details;

                            that.busy = false;
                            that.spinnerFlag = false;
                        }else{
                            that.visible=true;
                            //$('.hsy-dialog .body').html(response.msg);
                        }
                        that.busy = false;
                        that.spinnerFlag = false;
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        that.busy = false;
                        that.spinnerFlag = false;
                        that.visible=true;
                        //$('.hsy-dialog .body').html(response.msg+'冷静，看看账户明细哪里出错了');

                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);

                    }

                });

            }

        }
    }



</script>
<style lang="scss" scoped>
    #balance{
        padding-top: .88rem;
        height: 100%;
        overflow-y: scroll;

        .md-layout{
            padding:0;
        }

        .md-layout.balance{
            position:relative;
            height: auto;
            .time_screening-menu{
                position:absolute;
                right:0;
                top:0;
                z-index:2;
                flex-direction:row;
                flex-wrap:wrap;
                min-height:1rem;
                align-content:center;
                justify-content:space-between;
                width: 60%;
                border-left: 1px solid #eb1c42;
                border-bottom: 1px solid #eb1c42;
                .md-list-item{
                    width: 45%;

                    .md-list-item-container .time_screening_text{
                        text-align: center;
                        line-height: .6rem;
                        background: #eee;
                    }

                    .md-list-item-container .time_screening_id{
                        display:none;
                    }
                    

                }
            }


            .account_details
            {
                display:flex;
                flex-direction:row;
                flex-wrap:wrap;
                align-content:center;
                justify-content:space-between;

                span{
                    width: 50%;
                }
                span:nth-child(2),
                span:nth-child(4)
                {
                    text-align: right;
                }

            }
            .account_details>span:nth-child(3){
                color:#000;
            }
            .account_details>span:nth-child(2){
                color: rgba(0,0,0,.54);
            }



        }


    }



</style>





