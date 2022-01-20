import NProgress from 'nprogress'
import router from '@/router'
import 'nprogress/nprogress.css' // nprogress 进度条
import { isNprogress } from '../../../app.config.js' // 配置是否显示
NProgress.configure({
  showSpinner: false
}) // 不显示转圈

router.beforeEach(() => {
  if (isNprogress) NProgress.start()
})

router.afterEach(() => {
  if (isNprogress) NProgress.done()
})
