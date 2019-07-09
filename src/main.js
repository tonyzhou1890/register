import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import zhHans from 'vuetify/es5/locale/zh-Hans'

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
  render: h => h(App),
}).$mount('#app')
