
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import tabberRoutes from './tabberRoutes'
import pageRoutes from './pageRoutes'
import store from '@/store'
import { KeepAliveStatus } from '@/store/modules/permission'
import Layout from '@/layout/index.vue'
import Home from '@/views/home/home.vue'
import config from '../../app.config.js'
import { totalRoutes } from './allRoutes'
console.log(Home, 'home')

let routes:any = totalRoutes
// 这里是适配没有动态路由的情况
const routes404:any = [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/404/404.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '*',
    redirect: '/404'
  }
]
if (!config.isPermission) {
  routes = routes.concat(routes404)
}
// 收集keepAlive 路由
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getKeepAliveRouterGenerator (Routes, keepAliveRoutes = []) {
  Routes.forEach(Route => {
    if (Route.meta && Route.meta.keepAlive) {
      if (Route.name) {
        keepAliveRoutes.push(Route.name)
      }
    }
    if (Route.children && Route.children.length) {
      getKeepAliveRouterGenerator(Route.children, keepAliveRoutes)
    }
  })
  return keepAliveRoutes
}

store.dispatch('permission/setKeepAliveList', { routes: getKeepAliveRouterGenerator(pageRoutes), type: KeepAliveStatus.page })
store.dispatch('permission/setKeepAliveList', { routes: getKeepAliveRouterGenerator(tabberRoutes), type: KeepAliveStatus.layout })
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    (document.body as any).scrollTop = window[`custom${(to as any).name}`] || 0
  }
})

export default router
