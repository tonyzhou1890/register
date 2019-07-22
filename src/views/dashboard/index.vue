<template>
  <div class="dashboard-container">
    dashboard
  </div>
</template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  created() {
    console.log(this.$store.state)
  }
}
</script>
