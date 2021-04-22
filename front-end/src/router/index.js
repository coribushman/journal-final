import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateEntry from '../views/CreateEntry.vue'
import CreateTag from '../views/CreateTag.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-entry',
    name: 'CreateEntry',
    component: CreateEntry
  },
  {
    path: '/create-tag',
    name: 'CreateTag',
    component: CreateTag
  },
  {
   path: '/',
   name: 'Dashboard',
   component: Dashboard
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
