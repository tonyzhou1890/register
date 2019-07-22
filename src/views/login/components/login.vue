<template>
  <v-form
    ref="form"
    v-model="valid"
    class="form"
  >
    <v-text-field
      v-model="form.nickname"
      :rules="nicknameRules"
      color="primary"
      label="用户名"
      class="user-name"
      required
    />
    <v-text-field
      v-model="form.pwd"
      :rules="pwdRules"
      type="password"
      label="密码"
      class="pwd"
      required
    />
    <v-btn
      class="submit"
      color="primary"
      :loading="loading"
      @click="handleLogin"
    >登录</v-btn>
  </v-form>
</template>

<script>
import { validUsername, validPassword } from '@/utils/validate'
export default {
  name: 'LoginBox',
  data() {
    return {
      valid: true,
      form: {
        nickname: '',
        pwd: ''
      },
      nicknameRules: [
        v => validUsername(v) || '请输入3到20位用户名'
      ],
      pwdRules: [
        v => validPassword(v) || '请输入6到20位大小写字母或数字密码'
      ],
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate()
      if (this.valid) {
        this.loading = true
        this.$store.dispatch('user/login', this.form)
          .then(() => {
            this.loading = false
            this.$router.push({ name: 'profile' })
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        console.log('error submit!!')
        this.$store.commit('app/TOGGLE_NOTIFY', { info: '请检查输入', show: true, color: 'error' })
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 20px 10px 20px 10px;
  .user-name, .pwd {
    margin-bottom: 15px;
  }
  .submit {
    margin-top: 120px;
  }
}
</style>
