import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/base.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  //6.路由对象挂载到vue实例
  router,
  render: h => h(App),
}).$mount('#app')
