import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// lib-flexible ⽤于动态设置 rem 基准值。
import 'amfe-flexible'

// 全局引入 Vant
// import Vant from 'vant'
// import 'vant/lib/index.css'
// 将Vant注册为Vue插件
// Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
