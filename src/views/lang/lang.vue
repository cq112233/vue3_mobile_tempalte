<template>
  <div class="lang1">
    <van-radio-group v-model="checked">
      <van-cell-group>
        <van-cell title="英语" clickable @click="changeLang('en')">
          <template #right-icon>
            <van-radio name="en" />
          </template>
        </van-cell>
        <van-cell title="中文" clickable @click="changeLang('zh')">
          <template #right-icon>
            <van-radio name="zh" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>
<script lang="ts">
export default {
  name: 'lang'
}
</script>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { vantLocales } from '@/plugins/i18n'
import { setLocalStore } from '@/utils/localStoreUtils'
import { ref, Ref } from 'vue'

interface returnLangFn {
  checked:Ref<string>,
  changeLang:Function
}
// 改变语言功能函数
function setLangFn ():returnLangFn {
  const store = useStore()
  const i18n:any = useI18n()
  const checked = ref(store.state.app.lang)
  const changeLang = (lang:string):void => {
    store.commit('app/setLang', {
      lang
    })
    i18n.locale.value = lang
    vantLocales(lang)
    setLocalStore('LANG', lang)
    checked.value = lang
  }
  return {
    checked,
    changeLang
  }
}
const { checked, changeLang } = setLangFn()
</script>

<style lang="less" scoped>
.lang1 {
}
</style>
