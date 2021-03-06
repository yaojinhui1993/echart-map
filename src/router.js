import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bar',
      name: 'bar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Bar.vue'),
    },
    {
      path: '/polar',
      name: 'polar',
      component: () => import( /* webpackChunkName: "about" */ './views/Polar.vue')
    },
    {
      path: '/pie',
      name: 'pie',
      component: () => import('./views/Pie.vue')
    },
    {
      path: '/scatter',
      name: 'scatter',
      component: () => import('./views/Scatter.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/Map.vue')
    },
    {
      path: '/map-detail',
      name: 'map-detail',
      component: () => import('./views/MapDetail.vue')
    }
  ]
})
