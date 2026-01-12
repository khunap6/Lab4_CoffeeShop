<template>
  <div class="container">
    <h1>Get All Menus</h1>
    <div bottons>
      <p><button @click="goCreate">Create Menu</button></p>
      <p><button @click="goEdit">Edit Menu</button></p>
      <p><button @click="goShow">Show Menu</button></p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goCreate () {
      this.$router.push('/menu/create/')
    },
    goEdit () {
      this.$router.push('/menu/edit/99') // ส่ง menuId 1 - 999 LAB7
    },
    goShow () {
      this.$router.push('/menu/1')
    }
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
  div bottons {
    margin-top: 20px;
  }
 
</style>