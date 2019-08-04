<template>
  <v-container class="accounts-container page-container">
    <!-- 菜单栏 -->
    <PageHeader title="账号管理"/>
    <!-- 账号列表 -->
    <div
      class="block-padding"
    >
      <v-layout wrap>
        <v-flex sm4 xs6>
          <v-text-field
            v-model="search.nickname"
            color="primary"
            label="用户名"
          />
        </v-flex>
        <v-flex sm4 xs6>
          <v-select
            v-model="search.type"
            :items="types"
            color="primary"
            label="类型"
          />
        </v-flex>
        <v-flex sm4 xs6>
          <v-btn
            color="primary"
            @click="onSearch"
          >查询</v-btn>
          <v-btn
            @click="onClear"
          >清空</v-btn>
        </v-flex>
      </v-layout>
      <v-data-table
        item-key="uuid"
        :headers="headers"
        :items="data"
        :loading="loading"
        :page="search.page"
        :items-per-page="search.rows"
        :server-items-length="total"
        @update:items-per-page="onRows"
        @update:page="onPage"
      >
        <template v-slot:item.gender="{ item }">
          {{ item.gender === 1 ? '男' : '女' }}
        </template>
        <template v-slot:item.type="{ item }">
          {{ item.type === 2 ? '管理员账户' : '' }}
          <v-select
            v-if="item.type !== 2"
            :items="types.filter(t => t.value !== 2)"
            v-model="item.type"
            :style="{ width: '150px'}"
            @change="(e) => onTypeChange(e, item)"
          ></v-select>
        </template>
        <template v-slot:item.disabled="{ item }">
          <v-switch
            v-model="item.disabled"
            @change="(e) => onDisabledChange(e, item)" />
        </template>
        <template v-slot:item.logout="{ item }">
          <v-switch
            v-model="item.logout"
            @change="(e) => onLogoutChange(e, item)" />
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import { AccountType } from '@/utils/setting'
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader'
import { list, changePermission } from '@/api/accounts'

const initSearch = {
  nickname: '',
  type: null,
  page: 1,
  rows: 10
}
export default {
  name: 'Accounts',
  components: {
    PageHeader
  },
  data() {
    let types = []
    Object.keys(AccountType).map(key => {
      let temp = AccountType[key]
      temp.key = temp.value
      temp.text = temp.label
      types.push(temp)
    })
    return {
      types,
      search: {...initSearch},
      loading: false,
      data: [],
      total: 0,
      headers: [
        {
          text: '用户名',
          sortable: false,
          value: 'nickname'
        },
        {
          text: '性别',
          sortable: false,
          value: 'gender'
        },
        {
          text: '类型',
          sortable: false,
          value: 'type'
        },
        {
          text: '注册时间',
          sortable: false,
          value: '_registerTime'
        },
        {
          text: '登录时间',
          sortable: false,
          value: '_loginTime'
        },
        {
          text: '禁用',
          sortable: false,
          value: 'disabled'
        },
        {
          text: '注销',
          sortable: false,
          value: 'logout'
        }
      ],
      options: {
        pagination: [10, 20, 30, 50, 100]
      }
    }
  },
  computed: {
  },
  metaInfo: {
    title: '账号管理'
  },
  created() {
    this.searchList()
  },
  methods: {
    searchList() {
      this.loading = true
      list(this.search)
        .then(res => {
          res.data.map(item => {
            item._registerTime = item.registerTime ? dayjs(item.registerTime).format('YYYY-MM-DD HH:mm:ss') : ''
            item._loginTime = item.loginTime ? dayjs(item.loginTime).format('YYYY-MM-DD HH:mm:ss') : ''
          })
          this.data = res.data
          this.total = res.total
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    onSearch() {
      this.search.page = 1
      this.search.rows = 5
      this.searchList()
    },
    onClear() {
      this.search = {...initSearch}
      this.searchList()
    },
    onPagination(data) {
      console.log(data)
    },
    onRows(rows) {
      this.search.rows = rows
      this.searchList()
    },
    onPage(page) {
      this.search.page = page
      this.searchList()
    },
    changePermission(data, item) {
      changePermission({
        uuid: item.uuid,
        ...data
      })
        .then(res => {
          this.searchList()
        })
        .catch(e => {
          this.searchList()
        })
    },
    onTypeChange(e, item) {
      this.changePermission({
        type: e
      }, item)
    },
    onDisabledChange(e, item) {
      this.changePermission({
        disabled: Number(e)
      }, item)
    },
    onLogoutChange(e, item) {
      this.changePermission({
        logout: Number(e)
      }, item)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/variables.less');
.accounts-container {
  position: relative;
}
</style>
