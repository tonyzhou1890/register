<template>
  <div class="image-upload-wrapper">
    <div
      v-for="(item, index) in file"
      :key="index"
      class="image-upload-image-wrapper">
      <img src="" alt="">
    </div>
    <span class="image-upload">
      +
    </span>
    <span class="image-remove">

    </span>
  </div>
</template>

<script>
import { primary } from '@/style/variables.less'
export default {
  name: 'ImageUpload',
  props: {
    // 组件大小
    componentSize: {
      type: Number,
      default: 100
    },
    // 是否显示边框
    showBoarder: {
      type: Boolean,
      default: true
    },
    // 颜色
    color: {
      type: String,
      default: primary
    },
    // 图片大小
    size: {
      type: Number,
      default: 0
    },
    // 图片宽度
    width: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    // 图片高度
    height: {
      type: Array,
      default() {
        return [0, 0]
      }
    },
    // 是否多张
    multiple: {
      type: Boolean,
      default: false
    },
    // 格式
    access: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认文件列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      _file: []
    }
  },
  computed: {
    fontSize() {
      return this.componentSize * 0.3
    },
    margin() {
      return this.componentSize * 0.1
    },
    file() {
      return this.fileList.length ? this.fileList : this._file
    }
  }
}
</script>

<style>

</style>
