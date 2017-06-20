import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMaterial  from 'vue-material'
import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Dialog from 'hsy-vue-dialog'


/*mockData在接口尚未完成用于生成假数据，项目上线时不需引入*/
import mockData from './mock'

var zepto = require('n-zepto');



/*全局常量*/
global.API_PROXY = 'https://bird.ioliu.cn/v1/?url='                    // 线上代理地址
global.LOCAL_API_PROXY = 'http://192.168.2.154/proxy.php?apiProxy='    // 本地代理地址
global.AJAXURL = 'http://192.168.2.237/lotserver/h5/api/v1/request'    // H5接口

//global.RESOURCE_PATH =  'http://'+window.location.host+"/statics"

/*注册主题*/
Vue.use(VueMaterial)
Vue.material.registerTheme('default', {
  primary: 'red',
  accent: 'red',
  warn: 'deep-orange',
  background: 'white'
})
Vue.material.registerTheme('blue', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('teal', {
  primary: 'teal',
  default:'teal',
  active:'teal',
  accent: 'red',
  warn: 'orange',
  background: 'teal'
})
Vue.material.registerTheme('brown', {
  primary: 'brown',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('indigo', {
  primary: 'indigo',
  accent: 'red',
  warn: 'red',
  background: 'white'
})
Vue.material.registerTheme('whiteForm', {
  primary: 'white',
  accent: 'deep-orange',
  warn: 'red',
  background: 'white'
})

/*老版本vue-touch不兼容2.0，会报错 Cannot read property 'priority' of undefined，请使用vue-touch@next版本*/
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueAwesomeSwiper)
Vue.use(Dialog)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

