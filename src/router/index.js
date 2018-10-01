import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /** When your routing table is too long, you can split it into small modules**/
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    children: [
      {
        path: '/users/index',
        component: () => import('@/views/users/index'),
        name: 'users',
        meta: {
          title: 'users',
          icon: 'issue',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/index',
    children: [
      {
        path: '/feedback/index',
        component: () => import('@/views/feedback/index'),
        name: 'Feedback',
        meta: {
          title: 'feedback',
          icon: 'issue',
          roles: ['admin', 'editor'] // you can set roles in root nav
        }
      },
      {
        path: '/feeback/detail/:id',
        component: () => import('@/views/feedback/detail'),
        name: 'FeedbackDetail',
        meta: {
          title: 'feedback-detail',
          roles: ['admin', 'editor']
        },
        hidden: true
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: {
      title: 'setting',
      icon: 'settings',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: '/setting/index',
        component: () => import('@/views/setting/index'),
        name: 'Setting',
        meta: {
          title: 'setting',
          icon: 'settings',
          roles: ['admin', 'editor']
        }
      },
      {
        path: '/setting/admin',
        component: () => import('@/views/setting/admin/index'),
        name: 'Admin',
        meta: {
          title: 'admin',
          icon: 'user',
          roles: ['admin']
        }
      },
      {
        path: '/setting/admin/edit/:id',
        component: () => import('@/views/setting/admin/edit'),
        name: 'AdminEditor',
        meta: {
          title: 'admin-editor',
          roles: ['admin']
        },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
