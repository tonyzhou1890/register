<template>
  <v-layout wrap class="app-info-wrapper">
    <EditBlock :loading="loading" :onEdit="onEdit">
      <v-layout class="title" sm12 wrap v-show="!active">
        <v-flex sm12>
          <h2>订阅应用</h2>
        </v-flex>
      </v-layout>

      <v-layout class="content" wrap>
        <!-- 已订阅应用 -->
        <v-layout wrap v-show="!active">
          <v-flex v-if="subApps.length === 0" class="pd-card no-subscribe" sm6 xs12>
            <v-card
              :height="200"
            >
              <p>暂无订阅</p>
            </v-card>
          </v-flex>
          <v-flex
            v-for="(app, index) in subApps"
            :key="index"
            class="pd-card"
            sm6
            xs12
          >
            <v-card
              :height="200"
              class="app-card"
            >
              <v-img :src="app.icon || ''" class="app-icon" />
              <div class="app-info">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <h2 v-on="on" class="app-title no-wrap">
                      <a :href="app.link" target="_blank">{{ app.name }}</a>
                    </h2>
                  </template>
                  <span>{{ app.name }}</span>
                </v-tooltip>
                <span class="app-register-time-label">应用注册时间:</span>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <p v-on="on" class="app-register-time no-wrap">{{ app.register_time }}</p>
                  </template>
                  <span>{{ app.register_time }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <p v-on="on" class="app-summary">{{ app.summary }}</p>
                  </template>
                  <span>{{ app.summary }}</span>
                </v-tooltip>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
        <!-- 订阅应用 -->
        <v-layout wrap v-if="active">
          <v-flex v-if="allApps.length === 0" class="pd-card no-subscribe" sm6 xs12>
            <v-card
              :height="200"
            >
              <p>暂无应用</p>
            </v-card>
          </v-flex>
          <v-flex
            v-for="(app, index) in allApps"
            :key="index"
            class="pd-card"
            sm6
            xs12
          >
            <v-card
              :height="200"
              class="app-card"
            >
              <div class="app-card-btn-wrapper">
                <v-btn
                  v-if="!app.subscribed"
                  color="primary"
                  class="app-card-btn"
                  :disabled="app.accounts >= app.accounts_limit"
                  :loading="appLoading && app.uuid === appUuid"
                  @click="changeSubscribed(app.uuid, true)"
                >订阅</v-btn>
                <v-btn
                  v-if="app.subscribed"
                  class="app-card-btn"
                  :loading="appLoading && app.uuid === appUuid"
                  @click="changeSubscribed(app.uuid, false)"
                >取消</v-btn>
              </div>
              <v-img :src="app.icon || ''" class="app-icon" />
              <div class="app-info">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <h2 v-on="on" class="app-title no-wrap">
                      {{ app.name }}
                    </h2>
                  </template>
                  <span>{{ app.name }}</span>
                </v-tooltip>
                <span class="app-register-time-label">应用注册时间:</span>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <p v-on="on" class="app-register-time no-wrap">{{ app.register_time }}</p>
                  </template>
                  <span>{{ app.register_time }}</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <p v-on="on" class="app-summary">{{ app.summary }}</p>
                  </template>
                  <span>{{ app.summary }}</span>
                </v-tooltip>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-layout>
    </EditBlock>
  </v-layout>
</template>

<script>
import { update } from '@/api/user'
import EditBlock from "@/components/EditBlock";
import dayjs from "dayjs";
import { updateApps } from '@/api/user'

export default {
  name: "AppInfo",
  components: {
    EditBlock
  },
  data() {
    return {
      active: false,
      loading: false,
      appLoading: true,
      appUuid: ''
    };
  },
  computed: {
    data() {
      const store = this.$store.state.user.raw;
      return {};
    },
    // 订阅应用
    subApps() {
      const store = this.$store.state.user.raw;
      const apps = this.$store.state.apps.apps
      const defaultAppIcon = this.$store.state.app.defaultAppIcon
      if (store.apps && typeof store.apps === 'string') {
        const temp = store.apps.split(',')
        const filterApps = []
        temp.map(item => {
          apps.map(app => {
            if (app.uuid === item) {
              filterApps.push(
                {
                  ...app,
                  icon: app.icon ? process.env.VUE_APP_STORE + app.icon : defaultAppIcon,
                  register_time: dayjs(app.register_time || null).format('YYYY-MM-DD HH:mm:ss')
                }
              )
            }
          })
        })
        return filterApps
      } else {
        return []
      }
    },
    allApps() {
      const store = this.$store.state.user.raw;
      const apps = this.$store.state.apps.apps
      const defaultAppIcon = this.$store.state.app.defaultAppIcon
      let arr = []
      let subscribedApps = store.apps ? store.apps.split(',') : []
      apps.map((app, index) => {
        arr.push({...app})
        arr[index].icon = app.icon ? process.env.VUE_APP_STORE + app.icon : defaultAppIcon
        arr[index].register_time = dayjs(app.register_time || null).format('YYYY-MM-DD HH:mm:ss')
        arr[index].subscribed = subscribedApps.includes(app.uuid) ? true : false
      })
      return arr
    }
  },
  methods: {
    // EditBlock 组件事件
    onEdit(status) {
      const store = this.$store.state.user.raw;
      const apps = this.$store.state.app.apps
      const defaultAppIcon = this.$store.state.app.defaultAppIcon
      if (status === "edit") {
        
        this.active = true;
      }
      if (status === "cancel") {
        this.active = false;
      }
      if (status === "done") {
        this.active = false
      }
    },
    // 改变订阅状态
    changeSubscribed(uuid, type) {
      const store = this.$store.state.user.raw;
      let apps = store.apps
      if (type === true) {
        apps += `,${uuid}`
      } else {
        let arr = apps.split(',')
        let index = arr.indexOf(uuid)
        arr.splice(index, 1)
        apps = arr.join(',')
      }
      this.appUuid = uuid
      console.log(uuid, apps)
      updateApps({
        app: uuid,
        apps,
        type
      })
        .then(res => {
          this.$store.commit('app/TOGGLE_NOTIFY', {
            info: type ? '订阅成功' : '取消成功',
            color: 'success',
            show: true,
            timeout: 2000
          })
          this.$store.dispatch('user/getInfo')
          this.$store.dispatch('apps/getApps')
          this.appUuid = ''
        })
        .catch(e => {
          this.appUuid = ''
        })
    }
  }
};
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.app-info-wrapper {
  padding-top: 50px;
  .title,
  .content {
    padding: 10px 50px;
  }
  .content {
    font-size: 20px;
    line-height: 2;
  }
  .pd-card {
    padding: 4px;
  }
  .no-subscribe {
    color: gray;
    line-height: 200px;
    text-align: center;
  }
  .app-card {
    position: relative;
    &:hover {
      .app-card-btn-wrapper {
        opacity: 1;
      }
    }
    .app-card-btn-wrapper {
      position: absolute;
      width: 50%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, .3);
      opacity: 0;
      transition: opacity .3s;
      z-index: 3;
      .app-card-btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .app-info {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      padding: 5px;
      overflow: hidden;
      line-height: 1.5;
      .app-title {
        font-size: 24px;
      }
      .app-register-time-label,
      .app-register-time {
        font-size: 14px;
        color: gray;
      }
      .app-summary {
        font-size: 16px;
      }
    }
  }
  .app-icon {
    width: 50%;
    height: 100%;
  }
}
</style>


