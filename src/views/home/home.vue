<template>
  <van-button :to="{path:'/page/lang'}" type="primary">切换语言</van-button>
  <van-button :to="{ path: '/page/changeTheme' }">切换主题</van-button>
  <van-button :to="{ path: '/page/asyncRouteExample' }">asyncRouteExample</van-button>
  <van-button :to="{ path: '/page/asyncRouteExample1' }">asyncRouteExample1</van-button>
  <div v-for="(user,index) in users" :key="index" v-memo="[user.name,user.age]">
    {{user.name}}
    {{user.age}}
  </div>
  <p @click="go">点击条状</p>
  <input type="color" @change="changColor">
  <!-- 传送门 -->
  <Teleport to="body">
  <line-chart></line-chart>
  </Teleport>
  <!-- 异步组件 -->
  <Suspense>
    <template v-slot:default>
      <calendar/>
    </template>
    <template v-slot:fallback>
      <div>11</div>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import customMixin from '@/utils/mixin'
import LineChart from '@/components/common/lineChart/index.vue'
import { defineAsyncComponent, provide } from 'vue'
const calendar = defineAsyncComponent(() => import('@/components/common/calendar/index.vue'))
const { onBeforeRouteLeave, router, themeColor, reactive, store, onMounted, onActivated } = customMixin()

onMounted(() => {
  console.log('mountd')
})
onActivated(() => {
  console.log('activated')
})

function go () {
  router.push('/xx')
}
const changColor = (e) => {
  store.commit('app/changeThemeColor', e.target.value)
}

const users = reactive([
  {
    name: '张三',
    age: 18
  },
  {
    name: '李四',
    age: 20
  }
])
provide('users', users)
setTimeout(() => {
  users[0].name = '王五'
}, 3000)

onBeforeRouteLeave((to, from, next) => {
  next()
})
</script>

<script lang="ts">
export default {
  name: 'home'
}
</script>

<style lang="less" scoped>
.van-button {
  color: v-bind(themeColor);
}
// p {
//   color:mating-pink;
// }
</style>
