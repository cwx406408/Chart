import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from "echarts";

require('./assets/css/base.css')
require('./mock/mock')

Vue.use(element)
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
