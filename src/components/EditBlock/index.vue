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
    <!-- svg 按钮 -->
    <!-- 编辑 -->
    <svg-icon
      v-if="buttonType === 'svg'"
      @click.native="onClick('edit')"
      v-show="edit"
      class="edit"
      :style="`border-color: ${color}; color: ${color}; background: ${background}`"
      icon-class="edit" />
    <!-- 完成 -->
    <svg-icon
      v-if="buttonType === 'svg'"
      @click.native="onClick('done')"
      v-show="right"
      class="right"
      :style="`border-color: ${color}; color: ${color}; background: ${background}`"
      icon-class="right" />
    <!-- 取消 -->
    <svg-icon
      v-if="buttonType === 'svg'"
      @click.native="onClick('cancel')"
      v-show="cancel"
      class="cancel"
      :style="`border-color: ${color}; color: ${color}; background: ${background}`"
      icon-class="cancel" />
    <!-- button 按钮 -->
    <!-- 编辑 -->
    <v-btn 
      v-if="buttonType === 'btn' || buttonType === 'button'"
      @click.native="onClick('edit')"
      v-show="edit"
      class="edit"
      small
      tile
      outlined
      :style="`border-color: ${color}; color: ${color}; background: ${background}`" >
      <v-icon>edit</v-icon>
    </v-btn>
    <!-- 完成 -->
    <v-btn 
      v-if="buttonType === 'btn' || buttonType === 'button'"
      @click.native="onClick('done')"
      v-show="right"
      class="right"
      small
      tile
      outlined
      :style="`border-color: ${color}; color: ${color}; background: ${background}`" >
      <v-icon>done</v-icon>
    </v-btn>
    <!-- 取消 -->
    <v-btn 
      v-if="buttonType === 'btn' || buttonType === 'button'"
      @click.native="onClick('cancel')"
      v-show="cancel"
      class="cancel btn"
      small
      tile
      outlined
      :style="`border-color: ${color}; color: ${color}; background: ${background}`" >
      <v-icon>clear</v-icon>
    </v-btn>
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
    buttonType: {
      type: String,
      default: 'svg'
    },
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
  .right, .cancel {
    border-top: 0px;
    border-right: 0px;
  }
  .cancel {
    right: 22px;
    &.btn {
      right: 50px;
    }
  }
  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
