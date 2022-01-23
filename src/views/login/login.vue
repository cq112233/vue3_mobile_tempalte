<template>
  <div class="login">
    <header>
      <h3>使用手机号登录</h3>
      <h4 @click="changeRole">{{ role === 1 ? '管理员登入' : '员工登入' }}</h4>
    </header>
    <section>
      <van-cell-group inset>
        <van-field
          label-class="label_width"
          v-model="phone"
          label="用户名"
          placeholder="请输入用户名"
          type="text"
        />
        <van-field
          label-class="label_width"
          v-model="password"
          label="密码"
          placeholder="请输入用户名"
          type="password"
        />
      </van-cell-group>
    </section>
    <footer>
      <van-button
        type="primary"
        @click="onSubmit"
      >登录</van-button>
      <router-link :to="{ path: '/' }">忘记密码</router-link>
      <router-link :to="{ path: '/page/jtRegister' }">注册</router-link>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'login'
}
</script>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'
const loginModeFn = () => {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const data = reactive({
    phone: '', // 手机
    password: '', // 密码
    role: 1 // 角色
  })

  function changeRole () {
    if (data.role === 1) {
      data.role = 2
    } else {
      data.role = 1
    }
  }
  function onSubmit () {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '登录中'
    })
    // 登录
    store
      .dispatch('user/login', {
        username: window.escape(data.phone),
        password: window.escape(data.password),
        roleId: data.role
      })
      .then(() => {
        Toast.clear()
        const backPath = (route.query.redirect as string) || '/layout/home'
        router.replace({ path: backPath })
      })
      .catch(() => {
        Toast('登入失败')
      })
  }
  return {
    ...toRefs(data),
    changeRole,
    onSubmit
  }
}
const { phone, password, role, changeRole, onSubmit } = loginModeFn()
</script>

<style>
.page {
  height: 100%;
  background-color: #fff;
}
</style>
<style lang="less" scoped>
.login {
  overflow: hidden;
  header {
    font-size: 60px;
    margin: 100px 0;
    text-align: center;
  }
  section {
    /deep/ .label_width {
      width: 3em !important;
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    .van-button {
      width: 80%;
      height: 100px;
    }
    a {
      margin-top: 20px;
      color: #000;
    }
  }
}
</style>
