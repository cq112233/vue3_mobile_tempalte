import { createApp } from 'vue'
import { ConfigProvider } from 'vant'
import router from './router'
// import axios from 'axios'
// 路由
import store from './store' // 状态集中管理
import 'lib-flexible' // 移动端适配
import { i18n } from './plugins/i18n'
import App from './App.vue' // 根组件
import 'normalize.css/normalize' // github移动端通用初始化样式
import './styles/init' // 自定义初始化样式
import { pluginsRegFn } from '@/utils'
import vantElemets from '@/plugins/vant' // vant 按需加载
import './plugins/nprogress'
import './plugins/echarts'
import './theme'
import './permission'
console.log(ConfigProvider)
const app = createApp(App)
pluginsRegFn(app, vantElemets)
app.use(router).use(store).use(i18n).use(ConfigProvider).mount('#app')
