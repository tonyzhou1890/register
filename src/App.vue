<template>
  <div id="app">
    <v-app>
      <v-snackbar
        v-model="showNotify"
        :top="true"
        :color="$store.state.app.notifyColor"
      >{{ $store.state.app.notifyInfo }}</v-snackbar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    showNotify: {
      get() {
        return this.$store.state.app.notify
      },
      set(value) {
        this.$store.commit('app/TOGGLE_NOTIFY', { info: '', show: value })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
