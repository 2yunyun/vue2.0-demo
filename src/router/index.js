import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from "../assets/js/storage.js"

Vue.use(VueRouter);

const router = new VueRouter({
  base: '/vue2.0-demo/',
  routes:[
  {
    name: '首页',
    path:'/home',
    component: require('../views/home/home.vue'),
    children: [
    {
        path: 'entry',
        name: 'entry',
        component: require('../views/entry/entry.vue'),
    },
    {
        path: 'lottery',
        name: '开奖',
        component: require('../components/lottery/lottery.vue'),
    },
    {
        path: 'documentary',
        name: '跟单',
        component: require('../components/documentary/documentary.vue')
    },
    {
        path: 'buytogether',
        name: '合买',
        component: require('../components/buytogether/buytogether.vue')
    },
    {
        path: 'mine',
        name: '我的',
        component: require('../components/mine/mine.vue')
    }
    ]},
    {
        name: 'login', path:'/login',component: require('../views/login/login.vue')
    },
    {
        name: 'mobileLogin', path:'/mobileLogin',component: require('../views/login/mobileLogin.vue')
    },
    {
        name: 'unameLogin', path:'/unameLogin',component: require('../views/login/unameLogin.vue')
    },
    {
        name: 'regist', path:'/regist',component: require('../views/regist/regist.vue')
    },
    {
        path: '/home/mine/myCustomization',
        name: '我的定制',
        component: require('../components/mine/myCustomization.vue')
    },
    {
        path: '/home/mine/allOrderList',
        name: '全部订单',
        component: require('../components/mine/allOrderList.vue')
    },
    {
        path: '/home/mine/winningOrderList',
        name: '开奖订单',
        component: require('../components/mine/winningOrderList.vue')
    },
    {
        path: '/home/mine/outstandingOrder',
        name: '未开奖订单',
        component: require('../components/mine/outstandingOrder.vue')
    },
    {
        path: '/home/mine/balance',
        name: '余额',
        component: require('../components/mine/balance.vue')
    },
    {
        path: '/home/mine/gold',
        name: '金币',
        component: require('../components/mine/gold.vue')
    },
    {
        path: '/home/zixun/zixun',
        name: '资讯',
        component: require('../components/zixun/zixun.vue'),
    },
    {
        path: '/home/zixun/detail/:id',
        name: 'zixun-detail',
        component: require('../components/zixun/zixun_detail.vue'),
    },
    {
        path: '/home/live/live',
        name: '直播',
        component: require('../components/live/live.vue'),
    },
    {
        path: '/home/oneDayASingle/oneDayASingle',
        name: '每日一单',
        component: require('../components/oneDayASingle/oneDayASingle.vue'),
    },
    {
        path: '/home/oneDayASingle/oneDayASingle',
        name: '资料库',
        component: require('../components/oneDayASingle/oneDayASingle.vue'),
    },
    {
        path: '/home/lottery/list/:titleKey',
        name: 'lottery-list',
        component: require('../components/lottery/lottery_list.vue'),
    },
    {
        path: '/home/lottery/list/:titleKey/detail/:listId',
        name: 'lottery-detail',
        component: require('../components/lottery/lottery-detail.vue'),
    },
    {
        path: '/home/buytogether/detail/:id',
        name: 'photo-detail',
        component: require('../components/buytogether/photo_detail.vue'),
    },
    {
        path:'*', redirect: './login'
    }]

});

// router.beforeEach(({meta, path}, from, next) => {
//   var { auth = true } = meta
//     var isLogin = Boolean(Store.get('username')) //true用户已登录， false用户未登录

//     if (auth && !isLogin && path !== '/login') {
//       return next({ path: '/login' })
//   }
//   next()
// })

export default router;