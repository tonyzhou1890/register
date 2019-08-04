<template>
  <v-container class="apps-container page-container">
    <!-- 菜单栏 -->
    <PageHeader title="应用管理"/>
    <!-- 新增 -->
    <v-layout class="create-wrapper">
      <v-layout
        v-if="!creating"
        class="block-padding">
        <v-btn
          color="primary"
          @click="onCreate"
        >注册应用</v-btn>
      </v-layout>
      <AppForm
        ref="addForm"
        v-if="creating"
        :data="appInfo"
        :onCancel="onCancel"
        :onDone="onDone"
      />
    </v-layout>
    <!-- 应用列表 -->
    <AppForm
      v-for="(app, index) in allApps"
      :key="index"
      :ref="'app' + index"
      :data="app"
      :active="editing && editingAppUuid === app.uuid"
      :raw="app"
      :onEnterEdit="onEnterEdit"
      :onCancel="onCancel"
      :onDone="onDone"
    >
      <div
        class="block-padding app-item"
        v-show="editingAppUuid !== app.uuid"
      >
        <div class="app-icon-wrapper ilb">
          <v-img 
            :src="app._icon"
            width="100px"
            height="130px"
          />
        </div>
        <div class="app-info ilb">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <h2 v-on="on" class="app-title no-wrap">
                <a :href="app.link" target="_blank">{{ app.name }}</a>
              </h2>
            </template>
            <span>{{ app.name }}</span>
          </v-tooltip>
          <v-layout class="app-composite-info" wrap>
            <v-flex sm6 xs12 class="app-info-item">
              <span>注册时间：</span>
              <span>{{ app.registerTime }}</span>
            </v-flex>
            <v-flex sm6 xs12 class="app-info-item">
              <span>链接：</span>
              <span>{{ app.link }}</span>
            </v-flex>
            <v-flex sm6 xs12 class="app-info-item">
              <span>账号数量：</span>
              <span>{{ app.accounts }}</span>
            </v-flex>
            <v-flex sm6 xs12 class="app-info-item">
              <span>账号上限：</span>
              <span>{{ app.accountsLimit || '无限' }}</span>
            </v-flex>
            <v-flex sm6 xs12 class="app-info-item">
              <span>体验账号：</span>
              <span>{{ app.tempAccount || '无' }}</span>
            </v-flex>
            <v-flex sm6 xs12 class="app-info-item">
              <span>是否隐藏：</span>
              <span>{{ app.hidden ? '是' : '否' }}</span>
            </v-flex>
            <v-flex xs12 class="app-info-item">
              <span>关联域名：</span>
              <span>{{ app.relatedDomain }}</span>
            </v-flex>
          </v-layout>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <p v-on="on" class="app-summary">
                <span>简介：</span>
                <span>{{ app.summary }}</span>
              </p>
            </template>
            <span>{{ app.summary }}</span>
          </v-tooltip>
        </div>
      </div>
    </AppForm>
  </v-container>
</template>

<script>
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader'
import AppForm from './components/form'
// 初始app信息
const initAppInfo = {
  uuid: '',
  name: '',
  summary: '',
  link: '',
  icon: '',
  relatedDomain: '',
  accountsLimit: 0,
  tempAccount: '',
  hidden: 0
}

export default {
  name: 'Apps',
  components: {
    PageHeader,
    AppForm
  },
  data() {
    return {
      creating: false,
      editing: false,
      editingAppUuid: null,
      apps: [],
      appInfo: Object.assign({}, initAppInfo)
    }
  },
  computed: {
    allApps() {
      const apps = this.$store.state.apps.apps
      const defaultAppIcon = this.$store.state.app.defaultAppIcon
      let arr = []
      apps.map((app, index) => {
        arr.push({...app})
        arr[index]._icon = app.icon ? process.env.VUE_APP_STORE + app.icon : defaultAppIcon
        arr[index].registerTime = dayjs(app.registerTime || null).format('YYYY-MM-DD HH:mm:ss')
      })
      return arr
    }
  },
  metaInfo: {
    title: '应用管理'
  },
  created() {
    this.$store.dispatch('apps/getApps')
  },
  methods: {
    onCreate() {
      console.log('ccc')
      this.creating = true
      this.$nextTick(() => {
        this.$refs.addForm.$refs.editBlock.onClick('edit')
      })
    },
    onEnterEdit(raw) {
      if (this.creating) {
        this.$store.commit('app/TOGGLE_NOTIFY', {
          show: true,
          color: 'info',
          info: '正在注册应用'
        })
        return false
      } else if (this.editing && this.editingAppUuid) {
        this.$store.commit('app/TOGGLE_NOTIFY', {
          show: true,
          color: 'info',
          info: '有正在编辑的应用'
        })
        return false
      } else {
        this.appInfo = Object.assign(raw)
        this.editing = true
        this.editingAppUuid = raw.uuid
        return true
      }
    },
    onCancel() {
      this.editing = false
      this.creating = false
      this.editingAppUuid = null
    },
    onDone() {
      this.editing = false
      this.creating = false
      this.editingAppUuid = null
      this.$store.dispatch('apps/getApps')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.apps-container {
  position: relative;
  .app-item {
    display: flex;
  }
  .app-info {
    vertical-align: top;
    flex: 1;
    padding-left: 10px;
    .app-info-item, .app-summary {
      span:first-child {
        font-weight: bold;
      }
    }
  }
}
</style>
