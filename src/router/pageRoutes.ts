import Layout from '@/layout/index.vue'
export default [
  // 无tabber 页面
  {
    path: '/page',
    name: 'page',
    meta: {
      title: 'page'
      // keepAlive: true
    },
    beforeEnter: (to, from, next) => {
      // 主要判断from.path
      next()
    },
    component: Layout,
    children: [
      // 魔法注释勿删 ⬇️
      /** plop view page router **/
      {
        path: 'register',
        name: 'register',
        meta: {
          title: '账号注册',
          keepAlive: true,
          customNav: false
        },
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        component: () => import(/* webpackChunkName: "register" */ '../views/register/register.vue')
      },
      {
        path: 'changeTheme',
        name: 'changeTheme',
        props: true,
        meta: {
          title: '主题',
          keepAlive: false
        },
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        component: () => import(/* webpackChunkName: "changeTheme" */ '../views/changeTheme/changeTheme.vue')
      },
      {
        path: 'lang',
        name: 'lang',
        meta: {
          title: '语言',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "lang" */ '../views/lang/lang.vue')
      },
      {
        path: 'login',
        name: 'login',
        meta: {
          title: '登录',
          keepAlive: true,
          customNav: true
        },
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/login/login.vue')
      }

    ]
  }
]
