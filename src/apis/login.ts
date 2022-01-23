import axios from 'axios'
import request from '@/plugins/axios/request'
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
export function login (data: loginData) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 刷新token
export function refreshToken (data):Promise<any> {
  return axios({
    url: '/api/refreshToken',
    method: 'post',
    data
  })
}

// 用户信息
export function getUserInfo (data): Promise<unknown> {
  return request({
    url: '/api/userInfo',
    method: 'post',
    data
  })
}

// 用户信息
export function getTest (): Promise<unknown> {
  return request({
    url: '/api/test',
    method: 'get'
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
