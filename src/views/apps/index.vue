<template>
  <v-container class="apps-container page-container">
    <!-- 菜单栏 -->
    <PageHeader title="应用管理"/>
    <!-- 新增 -->
    <v-layout class="create-wrapper">
      <v-layout class="block-padding">
        <v-btn
          v-if="!creating"
          color="primary"
          @click="onCreate"
        >注册应用</v-btn>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'Apps',
  components: {
    PageHeader
  },
  data() {
    return {
      creating: false
    }
  },
  metaInfo: {
    title: '应用管理'
  },
  methods: {
    onCreate() {
      console.log('ccc')
      this.creating = true
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.apps-container {
  position: relative;
}
</style>
