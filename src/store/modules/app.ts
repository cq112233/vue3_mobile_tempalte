
import { changeTheme } from '@/utils'
import { getLocalStore } from '@/utils/localStoreUtils'
const app = {
  namespaced: true,
  state: {
    version: '1.0.01', // 版本
    lang: getLocalStore('LANG') || 'en', // 语言
    themeColor: 'red'
  },
  mutations: {
    setLang (state, payload) {
      state.lang = payload.lang
    },
    changeThemeColor (state, payload) {
      state.themeColor = payload
    }
  },
  actions: {
  }
}
export default app
