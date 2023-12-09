import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Menu from '../views/Menu.vue' // Corregir la ruta de importación
import Menu_Admin from '../views/Menu_Admin.vue' // Corregir la ruta de importación

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/menu_admin',
    name: 'Menu_Admin',
    component: Menu_Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
