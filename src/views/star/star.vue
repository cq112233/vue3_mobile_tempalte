<template>
  <div class="star">xxx</div>
</template>

<script lang="ts">
export default {
  name: 'star'
}
</script>

<script lang='ts' setup>
import customMixin from '@/utils/mixin'
const { onBeforeRouteLeave, router, route, that } = customMixin()
function go () {
  router.push('/xx')
}
onBeforeRouteLeave((to, from) => {
  console.log(to)
})
console.log(that)
</script>

<style lang="less" scoped>
.star {
  height: 1800px;
  background: #ccc;
}
</style>
