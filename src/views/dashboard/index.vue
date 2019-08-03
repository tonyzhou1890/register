<template>
  <v-container class="dashboard-container page-container">
    <!-- 头像、菜单区域 -->
    <PageHeader title=" ">
      <v-flex justify="justify-center" class="avatar-wrapper">
        <img :src="src" />
      </v-flex>
    </PageHeader>
    <!-- 基本信息 -->
    <BaseInfo />
    <!-- 订阅应用 -->
    <AppInfo />
  </v-container>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import EditBlock from '@/components/EditBlock'
import BaseInfo from './components/baseInfo'
import AppInfo from './components/appInfo'
export default {
  name: 'Profile',
  components: {
    PageHeader,
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
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.dashboard-container {
  position: relative;
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
</style>

