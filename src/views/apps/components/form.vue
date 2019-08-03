<template>
  <EditBlock :loading="loading" :onEdit="onEdit" buttonType="btn">
    <v-layout class="title block-padding" sm12 wrap v-show="!active">
      <v-flex sm12>
        <h2>基本信息</h2>
      </v-flex>
    </v-layout>

    <v-layout class="content block-padding" wrap>
      <v-form lazy-validation ref="form" v-model="valid" v-if="active">
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
            <ImageInput :file="form.avatar" :rules="rules" @get-file="onGetFile" />
          </v-flex>
          <v-flex sm6 xs12>
            <v-radio-group v-model="form.gender" color="primary" label="性别" required row>
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
                <v-text-field v-model="form.birth" label="出生日期" readonly v-on="on"></v-text-field>
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
</template>

<script>
export default {};
</script>

<style>
</style>
