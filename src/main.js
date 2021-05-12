import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import Vuex from 'vuex';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from "echarts";
import {BarChart, PieChart, LineChart} from '../node_modules/echarts/charts'
require('./assets/css/base.css')
require('./mock/mock')

echarts.use([BarChart,PieChart,LineChart]);
Vue.use(element);
Vue.use(Vuex);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    //是图表主题是否为黑暗模式
    dark: 0
  },
  mutations: {
    switchMode(state) {
      state.dark = 1 - state.dark;
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
