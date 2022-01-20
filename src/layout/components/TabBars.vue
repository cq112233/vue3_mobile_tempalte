<template>
  <van-tabbar
    v-model="active"
    :safe-area-inset-bottom="true"
  >
    <van-tabbar-item
      icon="home-o"
      replace
      name='home'
      to="/layout/home"
    >
      <span :style="{ color: active === 'home' ? activeColor : deactiveColor }">
        {{
        $t('layout.tabbar.home')
      }}
      </span>
      <template v-slot:icon="props">
        <van-icon
          name="wap-home-o"
          size="24"
          :color="props.active ? activeColor :deactiveColor"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item
      icon="search"
      replace
      name='star'
      to="/layout/star"
    >
      <span :style="{ color: active ==='star' ? activeColor : deactiveColor }">
         {{$t('layout.tabbar.recommend')}}
      </span>
      <template #icon="props">
        <van-icon
          class-prefix="iconfont"
          name="tuijiandianpu"
          size="24"
          :color="props.active ? activeColor :deactiveColor"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item
      icon="friends-o"
      replace
      name="buy"
      to="/layout/buy"
    >
      <span :style="{ color:active === 'buy' ? activeColor :deactiveColor }">
        {{ $t('layout.tabbar.shoppingCart')}}
      </span>
      <template #icon="props">
        <van-icon
          name="shopping-cart-o"
          size="24"
          :color="props.active ? activeColor :deactiveColor"
        />

      </template>
    </van-tabbar-item>
    <van-tabbar-item
      icon="setting-o"
      replace
      name="user"
      to="/layout/user"
    >
      <span :style="{ color:active === 'user' ? activeColor :deactiveColor }">
        {{ $t('layout.tabbar.my')}}
      </span>
      <template #icon="props">
        <van-icon
          name="manager-o"
          size="24"
          :color="props.active ?  activeColor :deactiveColor"
        />

      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { watchEffect, reactive, computed, ref, toRefs, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// tabbar功能模块
function getTabbarData (): {
  tabbar: object;
  active: Ref<string>;
  activeColor: string;
  deactiveColor: string;
  } {
  const tabbar = reactive({
    home: {
      img: require('./images/home.png'),
      ActiveImg: require('./images/acthome.png')
    },
    star: {
      img: require('./images/tuijian.png'),
      ActiveImg: require('./images/acttuijian.png')
    },
    buy: {
      img: require('./images/gou.png'),
      ActiveImg: require('./images/actgou.png')
    },
    user1: {
      img: require('./images/me.png'),
      ActiveImg: require('./images/actme.png')
    }
  })
  const router = useRouter()
  let active
  watchEffect(() => {
    active = ref(router.currentRoute.value.path.split('/')[2])
  })
  return {
    tabbar,
    active,
    activeColor: '#1989fa', // 显示
    deactiveColor: '#666' // 默认颜色
  }
}
const { tabbar, active, activeColor, deactiveColor } = getTabbarData()
</script>

<style scoped>
</style>
