import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./types.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginFlag: false,
		activeRoute: 'entry'
	},
	getters: {
		[types.THEME](state){
			var mapTheme = {
	  			"zixun": 'default',
	  			'zixun-detail': 'default',
	  			"lottery": 'default',
	  			"music-list": 'default',
	  			"music-play": 'default',
	  			"sendeveryday": 'default',
	  			'buytogether': 'default',
	  			'mine': 'default',
	  			'photo-detail': 'default'
	  		}
			return mapTheme[state.activeRoute]
		},
		[types.SPINNERCLASS](state,getters){
			return "md-theme-"+getters[[types.THEME]]
		}
	},
	mutations:{
		[types.ROUTE_CHANGE](state,payload){
			state.activeRoute = payload.activeRoute
		},
		[types.LOGIN_CHANGE](state,payload){
			state.loginFlag = payload.loginFlag
		},		
		// LYRIC_DATA指针变化
		[types.LYRIC_DATA_INDEX_CHANGE](state,payload){
			state.music.activeSong.lyricData.index = payload.index;
		},
	}
})

export default store