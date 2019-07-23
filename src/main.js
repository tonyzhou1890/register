import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import store from './store'
import router from './router'
import meta from 'vue-meta'

import './style/index.less'

import './icons' // icon
import './permission' // permission control

// Vue.use(Vuetify, {
//   theme: {
//     primary: '#9C27B0'
//   },
//   lang: {
//     locales: { zhHans },
//     current: 'zhHans'
//   }
// })

const vuetifyOptions = {
  theme: {
    primary: '#9C27B0'
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  }
}
Vue.use(Vuetify)

Vue.use(meta)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify(vuetifyOptions),
  render: h => h(App)
}).$mount('#app')
