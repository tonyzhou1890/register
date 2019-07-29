<template>
  <v-container class="dashboard-container page-container">
    <!-- 菜单栏 -->
    <MenuBar />
    <!-- 头像区域 -->
    <v-layout class="avatar-container">
      <v-flex justify="justify-center" class="avatar-wrapper">
        <img :src="src" />
      </v-flex>
    </v-layout>
    <!-- 基本信息 -->
    <BaseInfo />
    <!-- 订阅应用 -->
    <AppInfo />
  </v-container>
</template>

<script>
import MenuBar from '@/components/MenuBar'
import EditBlock from '@/components/EditBlock'
import BaseInfo from './components/baseInfo'
import AppInfo from './components/appInfo'
export default {
  name: 'Profile',
  components: {
    MenuBar,
    EditBlock,
    BaseInfo,
    AppInfo
  },
  data() {
    return {
      _src: ''
    }
  },
  metaInfo: {
    title: '个人中心'
  },
  computed: {
    src() {
      return this._src || this.$store.state.user.raw.avatar ? process.env.VUE_APP_STORE + this.$store.state.user.raw.avatar : process.env.VUE_APP_STORE + '/images/avatar/default.jpg'
    }
  },
  methods: {
    onEdit() {
      console.log('edit')
      return true
    },
  },
  created() {
    console.log(this.$store.state)
    console.log(process.env)
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.dashboard-container {
  position: relative;
  .avatar-container {
    height: 100px;
    background: @primary;
    .avatar-wrapper {
      flex: 0 0 100px;
      height: 100px;
      margin: 0 auto;
      transform: translateY(50px);
      img {
        width: 100%;
        height: 100%;
        border: 1px solid seashell;
        border-radius: 50%;
      }
    }
  }
}
</style>

