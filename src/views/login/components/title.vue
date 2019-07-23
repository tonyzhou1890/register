<template>
  <div class="title-row">
    <span
      class="left link"
    >
      <a
        @click="rotate('left')"
      >{{ left.label }}</a>
    </span>
    <span class="title">
      {{ title }}
    </span>
    <span
      class="right link"
    >
      <a
        @click="rotate('right')"
      >{{ right.label }}</a>
    </span>
  </div>
</template>

<script>
// 登录盒子标题组件，接受三个 props：title，left，right
// 有一个事件：rotate，参数为方向字符串(left, right)、key、原始值
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: 'title'
    },
    left: {
      type: Object,
      default() {
        return {
          key: 'left',
          label: 'left'
        }
      }
    },
    right: {
      type: Object,
      default() {
        return {
          key: 'right',
          label: 'right'
        }
      }
    }
  },
  methods: {
    rotate(data) {
      const key = data === 'left' ? this.left.key : this.right.key
      const raw = data === 'left' ? this.left : this.right
      this.$emit('rotate', data, key, raw)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.title-row {
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  color: @primary;
  span {
    flex: 1;
    font-size: 12px;
    &.left {
      text-align: left;
    }
    &.right {
      text-align: right;
    }
    &.title {
      flex: 2;
      font-size: 46px;
      padding-top: 10px;
    }
  }
}
</style>
