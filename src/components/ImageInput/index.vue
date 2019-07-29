<template>
  <v-file-input truncate-length="30" v-model="localFile"  :accept="rules.accept" :rules="fileRules" :label="label"></v-file-input>
</template>

<script>
import _debounce from "lodash/debounce";
export default {
  name: "ImageInput",
  props: {
    
    require: {
      type: Boolean,
      default: false
    },
    file: {
      type: [Object, String, File],
      default() {
        return {}
      }
    },
    rules: {
      type: Object,
      default() {
        return {};
      }
    },
    label: {
      type: String,
      default: "头像"
    }
  },
  data() {
    return {
      valid: true,
      bindFile: {},
      _fileName: '',
      fileRules: [
        v => {
          let message = "文件错误";
          let result = true;
          // 判断大小
          if (this.rules.size && v && v.size > this.rules.size * 1024) {
            this.valid = result = false;
            message = `文件不能超过${this.rules.size}k`;
            return result || message;
          }
          // 不支持异步，所以无法判断宽高
          // 判断类型
          if (this.rules.accept && v && v.type !== undefined) {
            let type = v.type.replace("image/", "").toLowerCase();
            let accepts = this.rules.accept
              .split(",")
              .map(item => item.replace(/(\s|\.)/g, "").toLowerCase());
            if (accepts.every(item => item !== type)) {
              this.valid = result = false;
              message = `只支持${this.rules.accept}格式`;
              return result || message;
            }
          }
          // 是否必传
          if (this.require && this.localFile.name.length === 0) {
            this.valid = result = false;
            message = `必填项`;
            return result || message;
          }
          this.valid = result;
          if (result) {
            this.send();
          }
          return result || message;
        }
      ]
    };
  },
  computed: {
    localFile: {
      get() {
        let temp = null
        if (this.bindFile && this.bindFile.name && this.bindFile.name.length) {
          temp = this.bindFile
        } else {
          if (typeof this.file === 'string') {
            temp = {
              name: this.file
            }
          } else {
            temp = this.file
          }
        }
        return this.bindFile === null ? null : temp
      },
      set(e) {
        this.bindFile = e
      }
    }
  },
  created() {
    this.send = _debounce(this.send, 0.1);
  },
  methods: {
    send() {
      if (this.bindFile === null) {
        this.$emit("clear")
        return
      }
      if (!this.bindFile.size) return;
      if (!FileReader)
        return this.$store.commit("app/TOGGLE_NOTIFY", {
          info: "您的浏览器太旧了，请使用最新版谷歌浏览器。",
          color: "info",
          show: true
        });
      let reader = new FileReader();
      reader.readAsDataURL(this.bindFile);
      reader.onload = e => {
        this.$emit("get-file", {
          file: this.bindFile,
          base64: e.target.result
        });
      };
    }
  }
};
</script>

<style lang="less" scoped>
</style>
