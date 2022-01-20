import Layout from '@/layout/index.vue'
const asyncRoutes = [{
  path: '/page',
  component: Layout,
  meta: {
    title: 'page',
    keepAlive: true
  },
  children: [
    {
      path: 'asyncRouteExample',
      name: 'asyncRouteExample',
      meta: {
        title: '页面',
        keepAlive: true,
        auth: ['admin', 'employee']
        // hidden: 'asyncRouteExample'
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      component: () => import('@/views/asyncRouteExample/asyncRouteExample.vue')
    },
    {
      path: 'asyncRouteExample1',
      name: 'asyncRouteExample1',
      meta: {
        title: '页面',
        keepAlive: true,
        auth: ['admin']
        // hidden: 'asyncRouteExample1'
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      component: () => import('@/views/asyncRouteExample1/asyncRouteExample1.vue')
    }

  ]
},
{
  path: '/404',
  name: '404',
  meta: {
    title: '404',
    keepAlive: true
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  component: () =>
    import(/* webpackChunkName: "404" */ '../views/404/404.vue')
},
{
  path: '/:catchAll(.*)',
  name: '*',
  redirect: '/404'
}
]
export default asyncRoutes
