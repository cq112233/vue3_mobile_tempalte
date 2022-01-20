<template>
  <div class="nav">
    <van-nav-bar
      left-text="返回"
      left-arrow
      :title="title"
      @click-left="onClickLeft"
    ></van-nav-bar>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const title: Ref<string> = computed(() => {
  return route.meta.title;
});
const onClickLeft = (): void => {
  router.back();
};
</script>

<style>
</style>
