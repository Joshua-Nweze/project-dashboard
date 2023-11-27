import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView'
import DashboardContainer from '@/views/DashboardContainer'

import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/dashboard',
    component: DashboardContainer,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/dashboard/',
        name: 'dashboard',
        component: function () {
          return import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
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
  },
  {
    path: '/setup/identify',
    name: 'setup-identify',
    component: function () {
      return import(/* webpackChunkName: "SetupIdentifyView" */ '../views/SetupIdentifyView.vue')
    }
  },
  {
    path: '/setup/password',
    name: 'setup-password',
    component: function () {
      return import(/* webpackChunkName: "SetupIdentifyPwdView" */ '../views/SetupIdentifyPwdView.vue')
    }
  },
  {
    path: '/setup/details',
    name: 'setup-details',
    component: function () {
      return import(/* webpackChunkName: "SetupDetailsView" */ '../views/SetupDetailsView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Cookies.get("token") == null) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
