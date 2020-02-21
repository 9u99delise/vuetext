import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
Vue.config.productionTip = false
//6.路由对象挂载到vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
