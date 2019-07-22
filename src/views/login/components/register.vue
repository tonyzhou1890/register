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
      class="input"
      required
    />
    <v-text-field
      v-model="form.pwd"
      :rules="pwdRules"
      type="password"
      label="密码"
      class="input"
      required
    />
    <v-text-field
      v-model="form.question"
      :rules="questionRules"
      color="primary"
      label="问题"
      class="input"
      required
    />
    <v-text-field
      v-model="form.answer"
      :rules="answerRules"
      color="primary"
      label="答案"
      class="input"
      required
    />
    <v-btn
      class="submit"
      color="primary"
      :loading="loading"
      @click="handleRegister"
    >注册</v-btn>
    <br>
    <span class="explain">问题和答案必填，忘记密码后可以联系管理员，提供问题和答案，以此找回密码。</span>
  </v-form>
</template>

<script>
import { validUsername, validPassword } from '@/utils/validate'
import { register } from '@/api/user'
export default {
  name: 'Register',
  data() {
    return {
      valid: true,
      form: {
        nickname: '',
        pwd: '',
        question: '',
        answer: ''
      },
      nicknameRules: [
        v => validUsername(v) || '请输入3到20位用户名'
      ],
      pwdRules: [
        v => validPassword(v) || '请输入6到20位大小写字母或数字密码'
      ],
      questionRules: [
        v => v.length && v.length <= 20 || '请输入长度不超过20的问题'
      ],
      answerRules: [
        v => v.length && v.length <= 20 || '请输入长度不超过20的答案'
      ],
      loading: false
    }
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate()
      if (this.valid) {
        this.loading = true
        register(this.form)
          .then(() => {
            this.$store.commit('app/TOGGLE_NOTIFY', {
              info: '注册成功',
              show: true,
              color: 'success'
            })
            this.$emit('toLogin')
            this.loading = false
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
  padding: 0px 10px 20px 10px;
  .explain {
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
