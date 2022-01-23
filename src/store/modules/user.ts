
// 异步设置app版本号
import {
  getUserInfo,
  getPermission,
  login
} from '@/apis/login'
import {
  setLocalStore,
  removeLocalStore,
  getLocalStore
} from '@/utils/localStoreUtils'

// 获取加密token
function getTokens () {
  try {
    return (getLocalStore('TOKENS') && JSON.parse(window.atob(getLocalStore('TOKENS')))) || null
    // return (getLocalStore('TOKENS') && JSON.parse(getLocalStore('TOKENS'))) || null
  } catch (error) {
    return null
  }
}
const user:unknown = {
  namespaced: true,
  state: {
    tokens: getTokens(), // 令牌
    userInfo: null, // 用户信息
    permission: null // 权限对象
  },
  mutations: {
    // 设置token
    setTokens (state, payload): void {
      state.tokens = payload
      setLocalStore('TOKENS', window.btoa(JSON.stringify(payload)))
      // setLocalStore('TOKENS', JSON.stringify(payload))
    },
    // 用户信息
    setUserInfo (state, payload): void {
      state.userInfo = payload
    },
    // 权限信息
    setPermission (state, payload): void {
      state.permission = payload
    },
    // 清除用户所有状态
    clearUserLocalStore (state): void {
      state.tokens = null
      state.userInfo = null
      removeLocalStore('TOKENS')
    }
  },
  actions: {
    // 用户信息
    getUserInfo ({
      commit
    }) {
      return new Promise((resolve) => {
        getUserInfo({}).then(
          (res) => {
            console.log(res)
            commit('setUserInfo', (res as any).data)
            resolve(res)
          }
        )
      })
    },
    // 用户权限列表
    getPermission (ctx): Promise<void> {
      const { state, commit, dispatch } = ctx
      return new Promise((resolve) => {
        getPermission().then(
          async (res) => {
            // 第一步 存储动态路由
            commit('setPermission', res)
            // 第二步 设置动态路由 根据公司内部管理  1,后端传递路由过来,异步路由配置,2.用户角色,3,传指定模块是否显示 或者两个兼有
            // await dispatch('permission/setFromRolesRoutes', state.userInfo.roles, { root: true })
            // 动态路由
            // await dispatch('permission/setFromPathRoutes', state.permission.hiddenPaths, { root: true })

            await dispatch('permission/setFromAllRoutes', state.permission.hiddenPaths, { root: true })
            resolve()
          }
        )
      })
    },
    // 登录获取token
    login ({ commit }, options): Promise<void> {
      return new Promise((resolve) => {
        login(options).then(res => {
          commit('setTokens', res.data)
          resolve()
        })
      })
    },
    // 退出清除token,用户信息
    logout ({
      commit
    }): Promise<void> {
      return new Promise((resolve) => {
        // 清除本地缓存
        commit('clearUserLocalStore')
        resolve()
      })
    }
  },
  getters: {
    isLogin (state):boolean {
      return !!state.tokens
    }
  }

}
export default user
