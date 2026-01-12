<template>
  <div>
    <h1>Get All Users</h1>
    <p><button @click="goCreate"> Create User </button></p>

    <p><button @click="goEdit">Edit User</button></p>

    <p><button @click="goShow">Show User</button></p>
  </div>
</template>

<script>
export default {
  methods: {
  goCreate () {
    this.$router.push('/user/create')
  },
  goEdit () {
    this.$router.push('/user/edit/1')   // ส่ง userId = 1
  },
  goShow () {
    this.$router.push('/user/1')        // ส่ง userId = 1
  }
    }
}
</script>

<style scoped>
button {
  padding: 6px 12px;
}
</style>