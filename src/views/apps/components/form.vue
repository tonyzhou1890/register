<template>
  <EditBlock ref="editBlock" :loading="loading" :onEdit="onEdit" buttonType="btn">
    <slot />
    <v-layout v-if="active" class="app-form content block-padding" wrap>
      <v-form ref="form" v-model="valid">
        <v-layout wrap>
          <v-flex sm6 xs12>
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              color="primary"
              label="名称"
              class="input"
              required
            />
          </v-flex>
          <v-flex sm6 xs12>
            <v-text-field
              v-model="form.link"
              :rules="linkRules"
              label="链接"
              class="input"
              required
            />
          </v-flex>
          <v-flex sm6 xs12>
            <v-text-field
              v-model="form.summary"
              :rules="notEmptyRules"
              color="primary"
              label="简介"
              class="input"
              required
            />
          </v-flex>
          <v-flex sm6 xs12>
            <ImageInput
              label="图片"
              :file="form.icon"
              :rules="rules"
              @get-file="onGetFile" />
          </v-flex>
          <v-flex sm6 xs12>
            <v-text-field
              v-model="form.relatedDomain"
              :rules="notEmptyRules"
              color="primary"
              label="相关域名"
              class="input"
              required
            />
          </v-flex>
          <v-flex sm6 xs12>
            <v-text-field
              v-model="form.accountsLimit"
              :rules="notEmptyRules"
              color="primary"
              label="账号上限"
              class="input"
              type="number"
              required
            />
          </v-flex>
          <v-flex sm6 xs12>
            <v-select
              v-model="form.tempAccount"
              :items="experienceAccountList"
              color="primary"
              label="体验账号"
              class="input"
              clearable
            />
          </v-flex>
          <v-flex sm6 xs12>
            <v-radio-group v-model="form.hidden" color="primary" label="是否隐藏" required row>
              <v-radio label="是" :value="1" />
              <v-radio label="否" :value="0" />
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-form>
    </v-layout>
  </EditBlock>
</template>

<script>
import EditBlock from '@/components/EditBlock'
import ImageInput from '@/components/ImageInput'
import { validURL, validNotEmpty } from '@/utils/validate'
import { create, update } from '@/api/apps'
import { list } from '@/api/accounts'
export default {
  name: 'AppForm',
  components: {
    EditBlock,
    ImageInput
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default() {
        return {
        }
      }
    },
    onEnterEdit: {
      type: Function,
      default() {
        return () => {
          return true
        }
      }
    },
    onCancel: {
      type: Function,
      default() {
        return () => {
          return true
        }
      }
    },
    onDone: {
      type: Function,
      default() {
        return () => {
          return true
        }
      }
    },
    raw: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      valid: true,
      loading: false,
      form: JSON.parse(JSON.stringify(this.data)),
      rules: {
        accept: ".jpg, .jpeg, .png, gif",
        size: 64
      },
      nameRules: [
        (v) => validNotEmpty(v) || '不能为空',
        (v) => (v && String(v).trim() && v.trim().length <= 8) || '名称不能超过8个字'
      ],
      linkRules: [(v) => validURL(v) || '请输入有效域名'],
      notEmptyRules: [(v) => validNotEmpty(v) || '不能为空'],
      experienceAccountList: []
    }
  },
  created() {
    console.log(this.data)
    list({
      type: 3
    })
      .then(res => {
        res.data.map(item => {
          item.key = item.uuid
          item.value = item.uuid
          item.text = item.nickname
        })
        this.experienceAccountList = res.data
      })
  },
  methods: {
    onEdit(status) {
      if (status === 'edit') {
        return this.onEnterEdit(this.raw)
      }
      // 取消
      if (status === 'cancel') {
        return this.onCancel(this.raw)
      }
      // 完成
      if (status === 'done') {
        this.$refs.form.validate();
        if (this.valid) {
          this.loading = true
          let iconName = undefined
          if (this.form.base64) {
            let arr = this.form.icon.name.split('.')
            arr.pop()
            iconName = arr.join('.')
          }
          const action = this.form.uuid ? update : create
          return action({
            ...this.form,
            icon: this.form.base64 || this.form.icon,
            iconName,
            base64: undefined
          })
            .then(res => {
              this.$store.commit('app/TOGGLE_NOTIFY', {
                info: this.form.uuid ? '更新成功' : '注册成功',
                color: 'success',
                show: true,
                timeout: 2000
              })
              this.loading = false
              this.onDone(this.raw)
              return true
            })
            .catch(e => {
              this.loading = false
              return false
            })
        } else {
          return false
        }
      }
    },
    onGetFile(file) {
      this.form.icon = file.file;
      this.form.base64 = file.base64
    },
    onClearFile() {
      this.form.avatar = this.form.base64 = undefined
    }
  }
};
</script>

<style>
</style>
<style lang="less">
.app-form {
  .v-input__prepend-outer {
    display: none;
  }
}
</style>