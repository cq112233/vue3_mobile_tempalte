<template>
  <div class="layout">
    <!-- 布局页 -->
    <nav-bars v-if="isShowNavBars"></nav-bars>

    <div :class="{ wrapper: isShowTabBars }">
      <app-mains ref="appMains"></app-mains>
    </div>

    <tab-bars v-if="isShowTabBars"></tab-bars>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppMains, TabBars, NavBars } from './components'
const route = useRoute()
const isShowNavBars = computed(() => {
  return (
    route.fullPath.includes('page') && !route.fullPath.includes('page/login')
  )
})
const isShowTabBars = computed(() => {
  return !route.fullPath.includes('page')
})
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  padding-bottom: 55px;
}
</style>
