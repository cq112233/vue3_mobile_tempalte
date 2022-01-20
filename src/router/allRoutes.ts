import tabberRoutes from './tabberRoutes'
import pageRoutes from './pageRoutes'
import asyncRoutes from './asyncRoutes'

// 重定向
export const commonRoutes = [
  {
    path: '',
    name: 'redirectHome',
    redirect: '/layout/home'
  },
  {
    path: '/page',
    name: 'redirectPage',
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    name: 'redirectLayout',
    redirect: '/layout/home'
  }
]
export const totalRoutes = [
  ...commonRoutes,
  ...tabberRoutes,
  ...pageRoutes
]

// 全部路由(包含动态路由)
export default [...totalRoutes, ...asyncRoutes]
