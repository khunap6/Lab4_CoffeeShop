<template> 
  <div>
    <h1>Get All Users</h1>

    <h4>จำนวนผู้ใช้งาน: {{ users.length }}</h4>

    <div v-for="user in users" :key="user.id">
      <p>id: {{ user.id }}</p>
      <p>ชื่อ-นามสกุล: {{ user.name }} {{ user.lastname }}</p>
      <p>email: {{ user.email }}</p>
      <p>password: {{ user.password }}</p>

      <button @click="goShow(user.id)">ดูข้อมูลผู้ใช้</button> 
      <button @click="goEdit(user.id)">แก้ไข</button>
      <button v-on:click="deleteUser(user)">ลบข้อมูล</button>

      <hr>
    </div>

    <button @click="goCreate">Create User</button> 
    
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data () {
    return {
      users: []
    }
  },
  async created () {
    this.refreshData()
  },
  methods: {
  async deleteUser (user) {
    let result = confirm("Want to delete?")
    if (result) {
      try {
        await UsersService.delete(user)
        await this.refreshData()
      } catch (err) {
        console.log(err)
      }
    }
  },

  async refreshData () {
    this.users = (await UsersService.index()).data
  },

  goShow (userId) {
    this.$router.push({
      name: 'user-show',
      params: { userId }
    })
  },

  goEdit (userId) {
    this.$router.push({
      name: 'user-edit',
      params: { userId }
    })
  },

  goCreate () {
    this.$router.push({ name: 'user-create' })
  }
}

}

</script>

<style scoped>
button {
  padding: 6px 12px;
}
</style>
