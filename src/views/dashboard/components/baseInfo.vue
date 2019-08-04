<template>
  <v-layout wrap class="base-info-wrapper">
    <EditBlock :loading="loading" :onEdit="onEdit" buttonType="btn">
      <v-layout class="title block-padding" sm12 wrap v-show="!active">
        <v-flex sm12>
          <h2>基本信息</h2>
        </v-flex>
      </v-layout>

      <v-layout class="content block-padding" wrap>
        <v-layout wrap v-show="!active">
          <v-flex sm6 xs12>用户名：{{ data.nickname }}</v-flex>
          <v-flex sm6 xs12>性别：{{ data.gender === 1 ? '男' : '女' }}</v-flex>
          <v-flex sm6 xs12>出生日期：{{ data.birth }}</v-flex>
          <v-flex sm6 xs12>账号状态：{{ data.disabled === 1 ? '禁用' : '正常' }}</v-flex>
          <v-flex sm6 xs12>上次登录：{{ data.lastLoginTime }}</v-flex>
        </v-layout>
        <v-form ref="form" v-model="valid" v-if="active">
          <v-layout wrap>
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.nickname"
                :rules="nicknameRules"
                color="primary"
                label="用户名"
                class="input"
                required
              />
            </v-flex>
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.pwd"
                :rules="pwdRules"
                type="password"
                label="密码"
                class="input"
                required
              />
            </v-flex>
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.question"
                :rules="questionRules"
                color="primary"
                label="问题"
                class="input"
                required
              />
            </v-flex>
            <v-flex sm6 xs12>
              <v-text-field
                v-model="form.answer"
                :rules="answerRules"
                color="primary"
                label="答案"
                class="input"
                required
              />
            </v-flex>
            <v-flex sm6 xs12>
              <ImageInput
                :file="form.avatar"
                :rules="rules"
                @get-file="onGetFile"
              />
            </v-flex>
            <v-flex sm6 xs12>
              <v-radio-group
                v-model="form.gender"
                color="primary"
                label="性别"
                required
                row
              >
                <v-radio label="男" :value="1" />
                <v-radio label="女" :value="0" />
              </v-radio-group>
            </v-flex>
            <v-flex sm6 xs12>
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="form.birth"
                persistent
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.birth"
                    label="出生日期"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.birth" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">取消</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(form.birth)">确定</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-form>
      </v-layout>
    </EditBlock>
  </v-layout>
</template>

<script>
import { update } from '@/api/user'
import { validUsername, validPassword } from "@/utils/validate";
import EditBlock from "@/components/EditBlock";
import ImageInput from "@/components/ImageInput";
import dayjs from "dayjs";

const initForm = {
  nickname: "",
  pwd: "",
  gender: null,
  question: "",
  answer: "",
  birth: '',
  avatar: "",
  disabled: null,
  lastLoginTime: ""
};

export default {
  name: "BaseInfo",
  components: {
    EditBlock,
    ImageInput
  },
  data() {
    const validPwd = v => {
      console.log("pwd", v);
      console.log(validPassword(v));
      return validPassword(v);
    };
    return {
      valid: true,
      active: false,
      form: {
        ...initForm
      },
      nicknameRules: [v => validUsername(v) || "请输入3到20位用户名"],
      pwdRules: [
        v =>
          v.length === 0 ||
          validPassword(v) ||
          "请输入6到20位大小写字母或数字密码"
      ],
      questionRules: [
        v => (v.length && v.length <= 20) || "请输入长度不超过20的问题"
      ],
      answerRules: [
        v => (v.length && v.length <= 20) || "请输入长度不超过20的答案"
      ],
      rules: {
        accept: ".jpg, .jpeg, .png, gif",
        size: 64
      },
      modal: false,
      loading: false
    };
  },
  computed: {
    data() {
      const store = this.$store.state.user.raw;
      return {
        nickname: store.nickname,
        gender: store.gender,
        birth: dayjs(store.birth || null).format(
          "YYYY-MM-DD"),
        disabled: store.disabled,
        lastLoginTime: dayjs(store.lastLoginTime || null).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      };
    }
  },
  methods: {
    onEdit(status) {
      const store = this.$store.state.user.raw;
      // 进入编辑
      if (status === "edit") {
        this.form = {...initForm}
        Object.keys(this.form).map(key => {
          this.form[key] = store[key]
        })
        this.form.pwd = ''
        this.form.birth = dayjs(this.form.birth || null).format(
          "YYYY-MM-DD"
        )
        this.active = true;
      }
      // 取消
      if (status === "cancel") {
        this.active = false;
      }
      // 完成
      if (status === "done") {
        this.$refs.form.validate();
        if (this.valid) {
          this.loading = true
          let avatarName = undefined
          if (this.form.base64) {
            let arr = this.form.avatar.name.split('.')
            arr.pop()
            avatarName = arr.join('.')
          }
          return update({
            ...this.form,
            uuid: this.$store.state.user.raw.uuid,
            pwd: this.form.pwd || undefined,
            avatar: this.form.base64 || this.form.avatar,
            avatarName,
            base64: undefined
          })
            .then(res => {
              this.$store.commit('app/TOGGLE_NOTIFY', {
                info: '更新成功',
                color: 'success',
                show: true,
                timeout: 2000
              })
              this.$store.dispatch('user/getInfo')
              this.loading = false
              this.active = false
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
      this.form.avatar = file.file;
      this.form.base64 = file.base64
    },
    onClearFile() {
      this.form.avatar = this.form.base64 = undefined
    }
  }
};
</script>

<style lang="less" scoped>
.base-info-wrapper {
  padding-top: 50px;
  .content {
    font-size: 20px;
    line-height: 2;
  }
}
</style>

<style lang="less">
.base-info-wrapper {
  .v-input__prepend-outer {
    display: none;
  }
}
</style>

