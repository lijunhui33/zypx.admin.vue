import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  userName:'admin'
  },
  mutations: {
	  setUserName(state,value){
		  state.userName = value
	  }
  },
  actions: {
	  actionSetName(state,value){
		  setTimeout(()=>{
			  state.commit('setUserName',value)
		  },2000)
	  }
  },
  modules: {
  }
})
