import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView'
import DashboardContainer from '@/views/DashboardContainer'

import Cookies from 'js-cookie'

const apihost = process.env.VUE_APP_API_HOST || 'https://project-dashboard-n7sx.onrender.com'
console.log(apihost)

const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView,
		mete: {requiresAuth: false},
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
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: function () {
      return import(/* webpackChunkName: "ForgotPasswordView" */ '../views/ForgotPasswordView.vue')
    }
  },
  {
    path: '/forgot-password-otp',
    name: 'forgot-password-otp',
    component: function () {
      return import(/* webpackChunkName: "ForgotPasswordOtpView" */ '../views/ForgotPasswordOtpView.vue')
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: function () {
      return import(/* webpackChunkName: "ResetPasswordView" */ '../views/ResetPasswordView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

router.beforeEach(async (to, from, next) => {
	let token = Cookies.get('token')
  
	let req = await fetch(`${apihost}/api/validate-token`, {
		method: 'POST',
    credentials: 'include',
		headers: { 
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
	})

	let res = await req.json()

  if (to.meta.requiresAuth) {
    if (token == null) {
      next({ path: "/" });

    } else {
			if (res.valid) {
				next()
			} else {
				next({ path: "/" });
			}
    }
	
  } else {

		if (res.valid && !to.meta.requiresAuth) {
			next({ path: '/dashboard' })
		}
    next();
  }
});

export default router
