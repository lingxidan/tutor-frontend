import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {},
		adcode: '',
		menus: [],
		navOneActive: 0,
      	navTwoActive: 0,
	},
	getters: {
	},
	mutations: {
		user(state,msg){
			state.user = msg;
			sessionStorage.setItem("user",JSON.stringify(msg))
		},
		adcode(state,msg){
			state.adcode = msg;
			sessionStorage.setItem("adcode",msg);
		},
		menus(state,payload){
			state.menus = payload
			sessionStorage.setItem("menus",payload)
		},
		navOneActive(state,msg){
			state.navOneActive = msg;
			sessionStorage.setItem("navOneActive",msg);
		},
		navTwoActive(state,msg){
			state.navTwoActive = msg;
			sessionStorage.setItem("navTwoActive",msg);
		}
	},
	actions: {

	}
})

export default store