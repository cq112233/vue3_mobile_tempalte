import { getLocalStore } from '@/utils/localStoreUtils'
// token
interface login {
    accessToken: string,
    refreshToken: string,
}
interface loginData {
    roleId: string,
    password?: string
    username?: string
}
export function login (data: loginData): Promise<login> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accessToken: `i am token ${data.roleId}`,
        refreshToken: `i am refreshToken ${data.roleId}`
      })
    }, 1000)
  })
}

// 用户信息
export function getUserInfo (): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userInfo = {
        id: 1,
        username: 'zhangsan',
        age: 18,
        roles: getLocalStore('accessToken').includes('1') ? ['admin'] : ['employee']
      }
      resolve(userInfo)
    }, 200)
  })
}

// 用户权限列表
/**
@params id 用户id获取 权限列表
*/
export function getPermission (): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const permissionList = {
        home: {
          list: true
        },
        hiddenPaths: [
          'asyncRouteExample',
          'asyncRouteExample1',
          'user'
        ]
      }
      resolve(permissionList)
    }, 200)
  })
}
