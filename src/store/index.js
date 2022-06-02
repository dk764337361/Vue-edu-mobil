import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登陆用户数据
    user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user') || null)
    // user: null
  },
  getters: {
  },
  mutations: {
    // 用于登陆用户数据,修改 user
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 将数据设置到本地存储，注意本地存储⽆法存储对象
      window.localStorage.setItem('lagou-edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
