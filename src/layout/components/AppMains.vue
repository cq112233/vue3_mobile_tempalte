<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="keepAlivePages">
      <component
        :is="Component"
        :key="key"
      />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
const store: any = useStore()
const router: any = useRouter()
const keepAlivePages: ComputedRef<any[]> = computed(() => {
  const keepAliveLayoutList = store.state.permission.keepAliveLayoutList
  const keepAlivePageList = store.state.permission.keepAlivePageList
  const keepAliveAsyncRouteList =
    store.state.permission.keepAliveAsyncRouteList
  return [
    ...keepAlivePageList,
    ...keepAliveAsyncRouteList,
    ...keepAliveLayoutList
  ]
})
const key: string = computed(() => {
  return router.currentRoute.value.fullPath
})
</script>

<style>
</style>
