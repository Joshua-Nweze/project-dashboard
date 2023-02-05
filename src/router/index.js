import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: function () {
      return import(/* webpackChunkName: "notifications" */ '../views/NotificationsView.vue')
    }
  },
  {
    path: '/files',
    name: 'files',
    component: function () {
      return import(/* webpackChunkName: "files" */ '../views/FilesView.vue')
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: function () {
      return import(/* webpackChunkName: "FileUploadView" */ '../views/FileUploadView.vue')
    }
  },
  {
    path: '/admins',
    name: 'admins',
    component: function () {
      return import(/* webpackChunkName: "AdminsView" */ '../views/AdminsView.vue')
    }
  },
  {
    path: '/account',
    name: 'account',
    component: function () {
      return import(/* webpackChunkName: "AccountView" */ '../views/AccountView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router
