import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import api from './api/index.js'
import util from './assets/js/util.js'
Vue.prototype.$api = api
Vue.prototype.$util = util

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
