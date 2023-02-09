import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView'
import DashboardContainer from '@/views/DashboardContainer'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/dashboard',
    component: DashboardContainer,
    children: [
      {
        path: '/dashboard/',
        name: 'dashboard',
        component: function () {
          return import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
        }
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
        path: '/files/:filesInCat',
        name: 'filesInCategory',
        component: function () {
          return import(/* webpackChunkName: "filecat" */ '../components/files/FilesInCat.vue')
        }
      },
      {
        path: '/search/:query',
        name: 'search',
        component: function () {
          return import(/* webpackChunkName: "search" */ '../components/files/SearchedFiles.vue')
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
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router
