<template>
  <v-layout class="page-header-container">
    <!-- 菜单栏 -->
    <MenuBar />
    <!-- page-title -->
    <h1 class="page-title">{{ title }}</h1>
    <slot />
  </v-layout>
</template>

<script>
import MenuBar from '@/components/MenuBar'
export default {
  name: 'PageHeader',
  components: {
    MenuBar
  },
  props: {
    title: {
      type: String,
      default: 'PageHeader'
    }
  }
}
</script>

<style lang="less">
@import url('~@/style/variables.less');
.page-header-container {
  height: 100px;
  background-color: @primary;
  .page-title {
    position: absolute;
    font-size: 30px;
    padding: 30px;
    color: seashell;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
