import router, { getKeepAliveRouterGenerator } from './../../router/index'
// 路由集
import asyncRoutes from '@/router/asyncRoutes'
import pageRoutes from '@/router/pageRoutes'
import tabberRoutes from '@/router/tabberRoutes'
import allRoutes from '@/router/allRoutes'

// 页面状态
export class KeepAliveStatus {
  static layout = 1
  static page = 2
  static common = 3
  static asyncPage = 4
}
// 是否开启权限控制
const openAuthControll = true
/**
 * 判断角色显示
 * @param roles // [admin]
 * @param route // 路由级
 * @return  true 显示 fasle 隐藏
 */
function hasRolePermission (roles, route) {
  if (route.meta && route.meta.auth && openAuthControll) {
    // 权限控制
    return roles.some(role => route.meta.auth.includes(role))
  } else {
    return true
  }
}

/**
 * 判断路由name
 * @param paths // ['login']
 * @param route // 路由级
 * @return  true 显示 fasle 隐藏
*/

function hasPathPermission (paths, route) {
  if (route.meta && route.meta.hidden) {
    // 权限控制
    return !paths.includes(route.meta.hidden)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合员工角色权限的路由表
 * @param routes
 * @param condition 判断条件  roles:[] | paths:[]
 * @param type 1 是角色 ,2 是路径名
 * @return filterRoutes
 */

export function filterAsyncRouter (routes, condition, type = 1) {
  const res = []
  let hasPermission
  if (type === 1) {
    hasPermission = hasRolePermission
  } else if (type === 2) {
    hasPermission = hasPathPermission
  }

  routes.forEach(route => {
    const tmp = { ...route }
    // 判断是够有权限
    if (hasPermission(condition, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, condition, type)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  namespaced: true,
  state: {
    allRoutes: allRoutes,
    routes: [...pageRoutes, ...tabberRoutes], // 所有页面管理 除tabbar页面
    asyncRouters: [], // 异步路由路由级
    // 各组件的keepalive数组
    keepAliveLayoutList: [], // layout页keepAlive
    keepAlivePageList: [], // page页keepAlive
    keepAliveCommonList: [], // 公共页keepAlive
    keepAliveAsyncRouteList: [] // 动态路由
  },
  mutations: {
    // 设置添加动态路由
    setRoutes (state, routers) {
      state.asyncRouters = routers
      state.routes = state.routes.concat(routers)
    },
    // 设置keepAlive路由name
    setKeepAliveList (state, routeConfig) {
      switch (routeConfig.type) {
        case 1:
          state.keepAliveLayoutList = routeConfig.routes
          break
        case 2:
          state.keepAlivePageList = routeConfig.routes
          break
        case 3:
          state.keepAliveCommonList = routeConfig.routes
          break
        case 4:
          state.keepAliveAsyncRouteList = routeConfig.routes
          break
      }
    },
    setAllRoutes (state, allRoutes) {
      state.allRoutes = allRoutes
    },
    // 退出登入重置路由
    resetRoutes (state) {
      state.allRoutes = allRoutes
      state.routers = [...pageRoutes, ...tabberRoutes]
      state.asyncRouters = []
    }
  },
  actions: {
    // 1.根据用户角色设置动态路由
    setFromRolesRoutes ({
      commit
    }, roles:[string]) {
      return new Promise(resolve => {
        const filterAsyncRoutes = filterAsyncRouter(asyncRoutes, roles, 1)
        commit('setRoutes', filterAsyncRoutes)
        resolve(filterAsyncRoutes)
      })
    },
    // 2.根据隐藏路径来过滤
    setFromPathRoutes ({
      commit,
      dispatch
    }, paths:[string]) {
      return new Promise(resolve => {
        const filterAsyncRoutes = filterAsyncRouter(asyncRoutes, paths, 2)
        commit('setRoutes', filterAsyncRoutes)
        dispatch('setKeepAliveList', { routes: getKeepAliveRouterGenerator(filterAsyncRoutes), type: KeepAliveStatus.asyncPage })
        filterAsyncRoutes.forEach(item => {
          router.addRoute(item)
        })
        resolve(filterAsyncRoutes)
      })
    },
    // 无异步路由过滤(适用于没有动态路由)
    setFromAllRoutes ({
      commit
    }, paths:[string]):Promise<void> {
      return new Promise(resolve => {
        const filterAsyncRoutes = filterAsyncRouter(allRoutes, paths, 2)
        // 清空所有路由表
        router.getRoutes().forEach(item => {
          router.removeRoute(item.name)
        })
        // 添加过滤后的路由表
        filterAsyncRoutes.forEach(item => {
          router.addRoute(item)
        })
        commit('setAllRoutes', filterAsyncRoutes)
        resolve()
      })
    },
    // 设置状态
    setKeepAliveList ({
      commit
    }, routeConfig:{
      routes:[string],
      type:number
    }) {
      commit('setKeepAliveList', routeConfig)
    }
  },
  getters: {
    // 所有页面keepAlive 列表
    keepAliveList (state) {
      return [...state.keepAliveLayoutList, ...state.keepAlivePageList, ...state.keepAliveAsyncRouteList]
    }
  }
}

export default permission
