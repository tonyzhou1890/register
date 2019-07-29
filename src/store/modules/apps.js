import { list } from '@/api/apps'

const state = {
  apps: []
}

const mutations = {
  SET_APPS: (state, apps) => {
    state.apps = apps
  }
}

const actions = {
  getApps: ({ commit }) => {
    list()
      .then(res => {
        commit('SET_APPS', res.data)
      })
      .catch(e => {
        console.log(e)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
