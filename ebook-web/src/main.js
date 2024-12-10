import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' 

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

import './icons' 
import './permission' 
import './utils/error-log' 

import * as filters from './filters' 



Vue.use(Element, {
  size: Cookies.get('size') || 'medium', 
  locale: enLang 
})


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
