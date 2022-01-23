import router from './router'
import store from './store'
import { setTitle } from '@/utils/appUtils'
import config from '../app.config.js'
import { Toast } from 'vant' // 路由白名单路径集
const { isPermission, routerWhiteLists } = config// 进度条样式

router.beforeEach(async (to, from, next) => {
  // 是否存在token 登入
  if ((store.state as any).user.tokens) {
    if (to.path === '/page/login') {
      next('/layout/home')
    } else {
      // 获取用户信息
      if (!(store.state as any).user.userInfo) {
        try {
          // 拉取用户信息
          await store.dispatch('user/getUserInfo')
          // 开启权限控制
          if (isPermission) {
          // 用户权限菜单
            await store.dispatch('user/getPermission')
            return next({ ...to })
          }
          return next({ ...to })
        } catch (error) {
          // 错误退出登入，重新登入
          store.dispatch('user/logout')
          Toast.fail(error.message || '获取用户信息失败,请重新登入')
          next(`/page/login?redirect=${to.path}`)
          location.reload() // 刷新页面
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/page/login') {
      next()
    } else {
      if (routerWhiteLists.indexOf(to.path) >= 0) {
        next()
      } else {
        next(`/page/login?redirect=${to.path}`)
      }
    }
  }
})
router.afterEach((to) => {
  // 设置title
  setTitle(to)
})
