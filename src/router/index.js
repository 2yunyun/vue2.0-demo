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
          path: 'zixun',
          name: '资讯中心',
          component: require('../components/zixun/zixun.vue'),
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
    name: '登录', path:'/login',component: require('../views/login/login.vue')
  },  
  {
    name: '注册', path:'/regist',component: require('../views/regist/regist.vue')
  },  
  {
    path: '/home/zixun/detail/:id',
    name: 'zixun-detail',
    component: require('../components/zixun/zixun_detail.vue'),
  },
  {
    path: '/home/lottery/list/:listId',
    name: 'music-list',
    component: require('../components/lottery/music_list.vue'),
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