import store from '@/store'
import { createI18n } from 'vue-i18n'
// vant 适配国际化
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import enLocale from '@/assets/languages/enLocale'
import zhLocale from '@/assets/languages/zhLocale'

const messages = {
  en: {
    ...enUS,
    ...enLocale
  },
  zh: {
    ...zhCN,
    ...zhLocale
  }
}

const i18n = createI18n({
  fallbackLocale: 'ch',
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  locale: (store.state as any).app.lang,
  messages
})
// 更新vant组件库本身的语言变化，支持国际化
function vantLocales (lang) {
  if (lang === 'en') {
    Locale.use(lang, enUS)
  } else if (lang === 'zh') {
    Locale.use(lang, zhCN)
  }
}

export { i18n, vantLocales }
