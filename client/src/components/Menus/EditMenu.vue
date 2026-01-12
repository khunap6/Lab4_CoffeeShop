<template>
  <div class="container">
    <h1>Edit Menu</h1>
    <p>Menu ID: {{ menuId }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuId: null
    }
  },
  created () {
    this.menuId = this.$route.params.menuId // ดึงค่า menuId จาก URL LAB
  }
}
</script>

<style scoped>
    .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;   
}
</style>