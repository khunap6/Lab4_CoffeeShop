<template>
  <div>
    <h1>Edit User</h1>

    <form v-if="user" @submit.prevent="updateUser">
      <p>name:<input type="text" v-model="user.name"></p>
      <p>lastname:<input type="text" v-model="user.lastname"></p>
      <p>email:<input type="text" v-model="user.email"></p>
      <p>password:{{this.user.password}}></p>

      <button type="submit">Update User</button>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data () {
    return {
      user: null
    }
  },
  async created () {
    try {
      const userId = this.$route.params.userId
      this.user = (await UsersService.show(userId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async updateUser () {
      try {
        await UsersService.put(this.user)
        this.$router.push({ name: 'users' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
