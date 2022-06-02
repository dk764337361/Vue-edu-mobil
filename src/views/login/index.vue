<!--  -->
<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登陆"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登陆表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.phone"
          name="phone"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[
          { required: true, message: '请填写用户名' },
          { validator: phoneCheck, message: '格式有误，请重新输入' },
          ]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="请输入密码"
          placeholder="密码"
          :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^[a-zA-Z0-9]{6,12}/, message: '格式有误，请重新输入' },
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
        round
        block
        type="primary"
        native-type="submit"
        :loading="isLoading"
        >
          登陆
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { NavBar, Form, CellGroup, Field, Button, Toast } from 'vant'
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  props: {},
  components: {
    VanNavBar: NavBar,
    VanForm: Form,
    VanCellGroup: CellGroup,
    VanField: Field,
    VanButton: Button
  },
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      // 登陆按钮加载中状态
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      // 登录成功
      if (data.state === 1) {
        // 提示，$toast 也可以通过内部⽅法触发不同提示效果，使⽤⽅式类似 element-ui
        Toast.success('登录成功!')
        // 将用户信息存储到state 中
        console.log(data)
        this.$store.commit('setUser', data.content)
        // 跳转
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        Toast.fail('登录失败!')
      }
      this.isLoading = false
    },
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    onClickLeft () {
      this.$router.go(-1)
    }

  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {}
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
</style>
