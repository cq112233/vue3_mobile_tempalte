import tabberRoutes from './tabberRoutes'
import pageRoutes from './pageRoutes'
import asyncRoutes from './asyncRoutes'
// 重定向
export const commonRoutes:any = [
  {
    path: '',
    name: 'redirectHome',
    redirect: '/layout/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/page',
    name: 'redirectPage',
    redirect: '/layout/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  },
  {
    path: '/layout',
    name: 'redirectLayout',
    redirect: '/layout/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
  }
]

export const totalRoutes:any = commonRoutes.concat(tabberRoutes as any, pageRoutes as any)

// 全部路由(包含动态路由)
export default totalRoutes.concat(asyncRoutes as any)
