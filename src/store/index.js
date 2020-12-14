import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignIn: 0,//0未登录，登录
  },
  mutations: {
    changeIsSignIn(state, n) {
      state.isSignIn = n
    }
  },
  actions: {
  },
  modules: {
  }
})
