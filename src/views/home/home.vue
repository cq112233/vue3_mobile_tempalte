<template>
  <van-button :to="{path:'/page/lang'}" type="primary">切换语言</van-button>
  <van-button :to="{ path: '/page/changeTheme' }">切换主题</van-button>
  <van-button :to="{ path: '/page/asyncRouteExample' }">asyncRouteExample</van-button>
  <van-button :to="{ path: '/page/asyncRouteExample1' }">asyncRouteExample1</van-button>
  <div v-for="(user,index) in users" :key="index" v-memo="[user.name,user.age]">
    {{user.name}}
    {{user.age}}
  </div>
  <p @click="go" v-my-directive >点击条状</p>

  <!-- 传送门 -->
  <!-- <Teleport to="body"> -->
  <line-chart title="我是canvas图" ref="lineChart"></line-chart>
  <!-- </Teleport> -->
  <!-- 异步组件 -->
  <Suspense>
    <template v-slot:default>
      <calendar/>
    </template>
    <template v-slot:fallback>
      <div>正在加载。。。。</div>
    </template>
  </Suspense>
</template>
<script lang="ts" setup>
import customMixin from '@/utils/mixin'
import LineChart from '@/components/common/lineChart/index.vue'
import axios from 'axios'
const { provide, onMounted, defineAsyncComponent, nextTick, router, themeColor, reactive, onActivated, useCssModule, that, ref } = customMixin()
const calendar = defineAsyncComponent(() => import('@/components/common/calendar/index.vue'))

const vMyDirective = {
  beforeMount: (el, binding, vnode) => {
    el.style.background = '#ccc'
  },
  updated (el, binding, vnode) {
    el.style.background = 'blue'
  }
}
onMounted(() => {
  setTimeout(() => {
    axios.get('/api/test').then(res => {
      console.log(res)
    })
  }, 1000)
})
// getUserInfo().then(res => {
//   console.log('成功')
// })
const lineChart = ref()
onMounted(() => {
  console.log(lineChart.value.option, 'root')
})
// const style = useCssModule()

// console.log($style)
onMounted(() => {
  console.log('mountd')
})
onActivated(() => {
  console.log('activated')
})

function go () {
  router.push('/xx')
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

</script>

<style lang="less" module='content' scoped >
p {
  color:@mating-pink;
}
.van-button {
  color: v-bind(themeColor);
}

</style>
