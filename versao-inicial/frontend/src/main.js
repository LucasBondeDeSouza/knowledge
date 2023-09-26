import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwibmFtZSI6IkpvYW8iLCJlbWFpbCI6ImpvYW9AeWFob28uY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE2OTU3NDYyMTgsImV4cCI6MTY5NjAwNTQxOH0.-1fcgIQIVyhf6tFfNhCYfmtnaN1oFJCtkoqacEgoqCE"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')