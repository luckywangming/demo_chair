import Vue from 'vue'
import VueRouter from 'vue-router';

import Index from '../page/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path:'/',
      name:'index',
      component:Index
    } 
  ]
})

export default router