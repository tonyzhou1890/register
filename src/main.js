import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import router from './router'
import meta from 'vue-meta'

import './style/index.less'

import './icons' // icon
import './permission' // permission control

const vuetifyOptions = {
  theme: {
    primary: '#9C27B0'
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  icons: {
    iconfont: 'mdiSvg'
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
