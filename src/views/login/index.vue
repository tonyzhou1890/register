<template>
  <div class="login-container">
    <div class="box-container" :style="{transform: `rotateY(${rotate}deg)`}">
      <div class="login-box">
        <Title
          :title="titles.forward.title"
          :left="titles.forward.left"
          :right="titles.forward.right"
          @rotate="handleRotate"
        />
        <LoginBox />
      </div>
      <div class="register-box">
        <Title
          :title="titles.right.title"
          :left="titles.right.left"
          :right="titles.right.right"
          @rotate="handleRotate"
        />
        <Register @toLogin="toLogin" />
      </div>
      <div class="forget-box">
        <Title
          :title="titles.back.title"
          :left="titles.back.left"
          :right="titles.back.right"
          @rotate="handleRotate"
        />
        <Forget />
      </div>
      <div class="about-box">
        <Title
          :title="titles.left.title"
          :left="titles.left.left"
          :right="titles.left.right"
          @rotate="handleRotate"
        />
        <About />
      </div>
    </div>
  </div>
</template>

<script>
import Title from './components/title'
import LoginBox from './components/login'
import Register from './components/register'
import Forget from './components/forget'
import About from './components/about'

const login = '登录'
const register = '注册'
const forget = '忘记密码'
const about = '关于'
export default {
  name: 'Login',
  components: {
    Title,
    LoginBox,
    Register,
    Forget,
    About
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!String(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      index: 0,
      // 标题组件需要的数据
      // 本来是准备根据key旋转盒子的，后来想想还是根据方向旋转好了
      titles: {
        // 正面
        forward: {
          title: login,
          left: {
            key: -1,
            label: about
          },
          right: {
            key: 1,
            label: register
          }
        },
        // 左侧
        left: {
          title: about,
          left: {
            key: -2,
            label: forget
          },
          right: {
            key: 0,
            label: login
          }
        },
        // 右侧
        right: {
          title: register,
          left: {
            key: 0,
            label: login
          },
          right: {
            key: 2,
            label: forget
          }
        },
        //  后面
        back: {
          title: forget,
          left: {
            key: 1,
            label: register
          },
          right: {
            key: -1,
            label: about
          }
        }
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  computed: {
    rotate() {
      return 90 * this.index
    }
  },
  metaInfo: {
    title: '登录中心'
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // 点击标题左右
    handleRotate(direction, key, raw) {
      this.index = direction === 'left' ? this.index + 1 : this.index - 1
    },
    // 回到登录面
    toLogin() {
      this.index = this.index < 0 ? Math.ceil(this.index / 4) * 4 : Math.floor(this.index / 4) * 4
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
@bg:#96a5b9;
@dark_gray:#889aa4;
@light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  perspective: 1000px;
  text-align: center;

  .box-container {
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-in;
    > div {
      position: absolute;
      width: 300px;
      height: 450px;
      left: -150px;
      top: -225px;
      color: @primary;
      background-color: rgba(255, 255, 255, 0.96);
      box-sizing: border-box;
      border: 4px solid @primary;
      border-radius: 3px;
      &.login-box {
        transform: translateZ(150px);
      }
      &.forget-box {
        transform: rotateY(-180deg) translateZ(150px);
      }
      &.register-box {
        transform: rotateY(90deg) translateZ(150px);
      }
      &.about-box {
        transform: rotateY(-90deg) translateZ(150px);
      }
    }
  }
}
</style>
