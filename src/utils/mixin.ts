
/**
@description mixin 配置
*/
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
import { provide, inject, defineAsyncComponent, toRaw, useAttrs, useSlots, defineExpose, useCssModule, markRaw, computed, toRefs, toRef, ref, defineEmits, reactive, defineProps, onMounted, onUnmounted, watch, watchEffect, getCurrentInstance, onActivated, nextTick } from 'vue'
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
  onBeforeRouteLeave((to, from, next) => {
    if (from.name === '404') {
      // to.meta.savedPosition = 0
      document.body.scrollTop = 0
    }
    // 只有keepAlive 的 保持滚动状态
    if (from.meta.keepAlive) {
      (window as any)[`custom${(from as any).name}`] = document.body.scrollTop
    }
    next()
  })
  return {
    ...toRefs(enums),
    ...totalUtils,
    provide,
    inject,
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
    defineExpose, // vue3 中不能通过 ref获取实例上的数据
    onMounted,
    onActivated,
    onUnmounted,
    defineAsyncComponent,
    store,
    router,
    route,
    app,
    useAttrs,
    useSlots,
    useCssModule,
    themeColors,
    themeColor,
    that, // 当前实例
    nextTick
  }
}

// 按需注册
export default customMixin
