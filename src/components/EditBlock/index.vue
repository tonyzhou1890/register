<template>
  <div
    class="edit-block-wrapper"
    :class="isActive ? 'active' : ''"
    :style="`border-color: ${color}`"
    @mouseenter="onMouseenter"
    @mousemove="onMouseenter"
    @mouseleave="onMouseleave"
  >
    <slot />
    <svg-icon
      @click.native="onClick('edit')"
      v-show="edit"
      class="edit"
      :style="`border-color: ${color}; color: ${color}; background: ${background}`"
      icon-class="edit" />
    <svg-icon
      @click.native="onClick('done')"
      v-show="right" class="right"
      :style="`border-color: ${color}; color: ${color}; background: ${background}`"
      icon-class="right" />
    <svg-icon
      @click.native="onClick('cancel')"
      v-show="cancel" class="cancel"
      :style="`border-color: ${color}; color: ${color}; background: ${background}`"
      icon-class="cancel" />
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      class="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
import { primary, background } from '@/style/variables.less'
export default {
  name: 'EditBlock',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: primary
    },
    background: {
      type: String,
      default: background
    },
    onEdit: {
      type: Function,
      default() {
        return () => {
          return true
        }
      }
    }
  },
  data() {
    return {
      isActive: false,
      edit: false
    }
  },
  computed: {
    right() {
      return this.isActive
    },
    cancel() {
      return this.isActive
    }
  },
  methods: {
    async onClick(action) {
      const res = await this.onEdit(action)
      if (res || res === undefined) {
        if (action === 'edit') {
          this.isActive = true
        } else {
          this.isActive = false
        }
      }
    },
    onMouseenter() {
      this.edit = this.isActive ? false : true
    },
    onMouseleave() {
      this.edit = false
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.edit-block-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  &.active {
    border: 1px solid @primary;
  }
  .edit, .right, .cancel {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: @primary;
    border: 1px solid @primary;
    font-size: 22px;
  }
  .edit {
    border: 0;
  }
  .cancel {
    right: 16px;
  }
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
