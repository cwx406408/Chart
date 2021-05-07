import Vue from 'vue';
import router from 'vue-router';

import home from 'views/home/home';

Vue.use(router)
const routes = [
  {
    path: '',
    redirect: '/home'
  }
]
export default new router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    }

  ]
})