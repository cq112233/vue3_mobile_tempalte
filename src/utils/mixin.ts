
/**
@description mixin 配置
*/
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { toRaw, markRaw, computed, toRefs, toRef, ref, defineEmits, reactive, defineProps, onMounted, onUnmounted, watch, watchEffect, getCurrentInstance, onActivated, nextTick } from 'vue'
import { useStore } from 'vuex'
import * as totalUtils from './index'
// eslint-disable-next-line import/no-named-default
import { default as enums } from '@/enums'
function customMixin () {
  const that = getCurrentInstance()
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const app = computed(() => {
    return store.state.app
  })
  const themeColors = computed(() => {
    return themeColors
  })
  const themeColor = computed(() => {
    return app.value.themeColor
  })
  return {
    ...toRefs(enums),
    ...totalUtils,
    reactive, // 对象响应式
    onBeforeRouteLeave, // 路由离开钩子
    ref, // 基本数据响应式
    toRefs, // 响应式数据对象 引用
    toRef, /// 响应式数据单个 引用
    toRaw, // 将响应式对象 还原成原始对象 只处理reactive
    markRaw, // 标记为原始的
    watch, // 侦听器
    watchEffect, // 自动侦听器
    defineEmits, // 发布事件
    defineProps, // prop
    onMounted,
    onActivated,
    onUnmounted,
    store,
    router,
    route,
    app,
    themeColors,
    themeColor,
    that, // 当前实例
    nextTick
  }
}

// 按需注册
export default customMixin
