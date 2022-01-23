<template>
  <div class="buy">111</div>
</template>
<script lang="ts" setup>
import mixin from '@/utils/mixin'
import { getTest } from '@/apis/login'
const { onMounted } = mixin()
onMounted(() => {
  getTest().then((res) => {
    console.log(res)
  })
  getTest()
  getTest()
})
</script>
<script lang="ts">
export default {
  name: 'buy'
}
</script>

<style lang="less" scoped>
.buy {
}
</style>
