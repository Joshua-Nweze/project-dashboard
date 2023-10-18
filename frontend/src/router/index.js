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
        path: '/projects',
        name: 'projects',
        component: function () {
          return import(/* webpackChunkName: "projects" */ '../views/ProjectsView.vue')
        }
      },
      {
        path: '/project/:id',
        name: 'project',
        component: function () {
          return import(/* webpackChunkName: "project" */ '../views/ProjectView.vue')
        }
      },
      // {
      //   path: '/search/:query',
      //   name: 'search',
      //   component: function () {
      //     return import(/* webpackChunkName: "search" */ '../components/files/SearchedFiles.vue')
      //   }
      // },
      {
        path: '/add-project',
        name: 'add-project',
        component: function () {
          return import(/* webpackChunkName: "add-project" */ '../views/AddProjectView.vue')
        }
      },
      {
        path: '/staff',
        name: 'staff',
        component: function () {
          return import(/* webpackChunkName: "staff" */ '../views/StaffView.vue')
        }
      },
      {
        path: '/account',
        name: 'account',
        component: function () {
          return import(/* webpackChunkName: "AccountView" */ '../views/AccountView.vue')
        }
      },
      {
        path: '/edit-account',
        name: 'edit-account',
        component: function () {
          return import(/* webpackChunkName: "EditAccountView" */ '../views/EditAccountView.vue')
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
