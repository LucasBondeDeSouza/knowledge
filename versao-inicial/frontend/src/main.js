import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORÁRIO!
require('axios').defaults.headers.common['Authorization'] = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIEJvbmRlIiwiZW1haWwiOiJib25kZWx1Y2FzNzdAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY5NTc0ODYwNSwiZXhwIjoxNjk2MDA3ODA1fQ.SGak6TivBtzmgBaIIYTfMGqabfeWN4Lnoepy4Spji5M"

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')