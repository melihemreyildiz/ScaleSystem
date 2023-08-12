import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Notifications from 'vue-notification'

axios.defaults.baseURL = 'http://localhost'
Vue.config.productionTip = false
Vue.use(Notifications)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
