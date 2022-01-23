<template>
  <div class="change-theme">
    <van-button @click="changeTheme('mating1')" type="primary">方案一</van-button>
    <van-button @click="changeTheme('mating2')" type="danger">方案二</van-button>
      <input type="color" @change="changColor">
  </div>
</template>

<script lang="ts" setup>
import customMixin from '@/utils/mixin'
const { onBeforeRouteLeave, router, themeColor, reactive, store, onMounted, onActivated } = customMixin()
const changColor = (e) => {
  store.commit('app/changeThemeColor', e.target.value)
}
const changeTheme = (val) => {
  store.commit('app/changeTheme', val)
}
</script>
<script lang="ts">
export default {
  name: 'changeTheme'
}
</script>

<style lang="less" scoped>
.van-button {
  width: 100%;
}
</style>
