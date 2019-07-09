import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

Vue.use(Vuetify, {
  theme: {
    primary: '#9C27B0'
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
