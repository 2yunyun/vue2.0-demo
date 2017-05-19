import Vue from 'vue'
import VueRouter from 'vue-router'
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
      path: 'sendeveryday',
      name: '天天送',
      component: require('../components/sendeveryday/sendeveryday.vue')
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
    ]
  },
  {
    name: 'login', path:'/login',component: require('../views/login/login.vue')
  },  
  {
    name: 'regist', path:'/regist',component: require('../views/regist/regist.vue')
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
    path: '/home/lottery/list/:listId/song/:songId',
    name: 'music-play',
    component: require('../components/lottery/music_play.vue'),
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


export default router;