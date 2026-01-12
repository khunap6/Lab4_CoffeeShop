<template>
  <div>
    <h1>Show User</h1>
    <p>User ID: {{ userId }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId: null
    }
  },
  created () {
    console.log("Crerte userId",this.$route.params)
    // ดึงค่า userId จาก URL
    this.userId = this.$route.params.userId
  }
}
</script>
<style scoped>
</style>