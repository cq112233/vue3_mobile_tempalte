/**
@params app 全局工具
*/
import { getHtmlDom, setAttr } from '@/utils/domUtils'
/**
@return true为pc false为 phone
*/
export function isPc () {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

/**
  * 切换主题函数
  */
export function changeTheme (themeValue) {
  if (!themeValue) {
    setAttr(getHtmlDom(), 'class', 'theme-defualt')
    return 'defualt'
  }
  setAttr(getHtmlDom(), 'class', `theme-${themeValue}`)
  return themeValue
}

/**
@params 设置title 柯里化
*/
export function setTitleGenertor () {
  const host = location.host
  return function (to) {
    // 一般 网站title  'xxx-网站名'
    document.title = `${to.meta.title}-${host}`
  }
}

export const setTitle = setTitleGenertor()
