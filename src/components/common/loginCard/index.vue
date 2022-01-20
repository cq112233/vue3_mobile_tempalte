<template>
  <div class="login-card">
    {{cc}}
    {{x}}
  </div>
</template>

<script lang='ts' setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  toRef,
  toRefs,
  toRaw,
  markRaw,
  readonly,
  defineComponent,
  defineEmits,
  defineProps,
  getCurrentInstance
} from 'vue'
const currentInstance = getCurrentInstance()
const props = defineProps({
  title: String
})
const x = computed(() => {
  return props.title
})
console.log(currentInstance)
// import {} from "@/apis";
const cc = 'xxx'
</script>

<style lang="less" scoped>
.login-card {
}
</style>
