import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MywibmFtZSI6IkNhcmxvcyIsImVtYWlsIjoiY2FybG9zQHlhaG9vLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2OTYwMTQ5MDcsImV4cCI6MTY5NjI3NDEwN30.opaf9D0RlpmTNiVMKXManbfS7WuHTqIzdhNmwt11vQM"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')