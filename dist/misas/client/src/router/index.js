import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import HomeView from '../views/HomeView.vue'
import Menu from '../views/Menu/Menu.vue' // Corregir la ruta de importación
import Menu_Admin from '../views/Menu_Admin/Menu_Admin.vue' // Corregir la ruta de importación

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Inicio de sesión',
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
    meta: {
      title: 'Menú principal',
    }
  },
  {
    path: '/menu_admin',
    name: 'Menu_Admin',
    component: Menu_Admin,
    meta: {
      title: 'Vista de administrador',
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
