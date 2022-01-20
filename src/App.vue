<template>
<!-- <van-config-provider :theme-vars="themeVars"> -->
  <router-view />
<!-- </van-config-provider> -->
</template>
<script lang="ts" setup>
import customMixin from '@/utils/mixin'
const xx = customMixin()

// const themeVars = {
//   rateIconFullColor: '#07c160',
//   sliderBarHeight: '4px',
//   sliderButtonWidth: '20px',
//   sliderButtonHeight: '20px',
//   sliderActiveBackgroundColor: '#07c160',
//   buttonPrimaryBorderColor: '#ccc',
//   buttonPrimaryBackgroundColor: '#ccc'
// }

</script>

<style lang="less" scoped>

</style>
