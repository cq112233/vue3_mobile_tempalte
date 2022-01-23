import Layout from '@/layout/index.vue'
// import Home from '@/views/home/home.vue'
export default [
  // 有tabber页面
  {
    path: '/layout',
    name: 'layout',
    meta: {
      title: 'index',
      keepAlive: true
    },
    redirect: '/layout/home',
    component: Layout,
    children: [
      // 魔法注释勿删 ⬇️
      /** plop view layout router **/
      {
        path: 'buy',
        name: 'buy',
        meta: {
          title: 'buy',
          keepAlive: true

        },
        component: () => import(/* webpackChunkName: "buy" */ '../views/buy/buy.vue')
      },
      {
        path: 'star',
        name: 'star',
        meta: {
          title: 'star',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "star" */ '../views/star/star.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '个人中心',
          keepAlive: true
          // hidden: 'user'
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/user/user.vue')
      },
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
      }
    ]
  }
]
