<template>
  <div class="menu-bar">
    <v-btn
      text
      small
      color="grey lighten-4"
      @click="go('Profile')"
    >首页</v-btn>
    <v-btn
      text
      small
      color="grey lighten-4"
      @click="go('Apps')"
    >应用管理</v-btn>
    <v-btn
      text
      small
      color="grey lighten-4"
    >账户管理</v-btn>
    <v-btn
      text
      small
      color="grey lighten-4"
      @click="logout"
    >退出</v-btn>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
        .then(res => {
          this.$router.replace({ path: '/' })
        })
    },
    go(page) {
      this.$router.push({ name: page })
    }
  }
 }
</script>

<style lang="less" scoped>
.menu-bar {
  position: absolute;
  z-index: 3;
  width: 100%;
  max-width: 900px;
  padding: 0;
  margin: 0 auto;
  text-align: right;
  > div {
    text-align: center;
  }
}
</style>
