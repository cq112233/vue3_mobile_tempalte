<template>
  <div class="user">
    <van-button @click="logout">退出登录</van-button>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
function logout () {
  store.dispatch('user/logout').then(() => {
    router.replace({ path: '/page/login' })
  })
}
</script>
