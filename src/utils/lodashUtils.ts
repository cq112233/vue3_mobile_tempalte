/**
@params lodash 字符串处理 工具
*/
import _ from 'lodash'
// 小驼峰
export function camelCase () {
  // eslint-disable-next-line prefer-rest-params
  return _.camelCase(...arguments)
}
// 小写转大写
export function toUpper (data:string) {
  // eslint-disable-next-line prefer-rest-params
  return _.toUpper(data)
}
// 防抖
export function debounce () {
  // eslint-disable-next-line prefer-rest-params
  return _.debounce(...arguments)
}
// 节流
export function throttle () {
  // eslint-disable-next-line prefer-rest-params
  return _.throttle(...arguments)
}

export default {
  camelCase,
  toUpper,
  debounce,
  throttle
}
