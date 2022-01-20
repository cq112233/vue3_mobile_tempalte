<template>
  <div class="change-theme">
    <van-button @click="changeTheme('defualt')" type="primary">默认</van-button>
    <van-button @click="changeTheme('red')" type="danger">红色</van-button>
    <van-button @click="changeTheme('green')">绿色</van-button>
    <van-button @click="changeTheme('blue')">蓝色</van-button>
    <van-button @click="changeTheme('orange')">橙色</van-button>
  </div>
</template>

<script lang="ts" setup>
const changeTheme = () => {
  console.log('切换主题')
}
</script>

<style lang="less" scoped>
</style>
