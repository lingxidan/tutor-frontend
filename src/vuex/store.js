import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {}
	},
	getters: {
	},
	mutations: {
		user(state,msg){
			state.user = msg;
			sessionStorage.setItem("user",JSON.stringify(msg))
		}
	},
	actions: {

	}
})

export default store