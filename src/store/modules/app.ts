
import { getLocalStore, setLocalStore } from '@/utils/localStoreUtils'
import appConfig from '../../../app.config.js'
const app = {
  namespaced: true,
  state: {
    version: '1.0.01', // 版本
    lang: getLocalStore('LANG') || 'en', // 语言
    theme: getLocalStore('THEME') || appConfig.theme,
    themeColor: 'red'
  },
  mutations: {
    setLang (state, payload) {
      state.lang = payload.lang
    },
    changeThemeColor (state, payload) {
      state.themeColor = payload
    },
    changeTheme (state, payload) {
      state.theme = payload
      setLocalStore('THEME', payload)
      location.reload()
    }
  },
  actions: {
  }
}
export default app
