<template>
  <div>
    <h1>Create User</h1>

    <form @submit.prevent="createUser">
      <p>name:<input type="text" v-model="user.name"></p>
      <p>lastname:<input type="text" v-model="user.lastname"></p>
      <p>email:<input type="text" v-model="user.email"></p>
      <p>password:<input type="text" v-model="user.password">
      </p><p><button type="submit">Create User</button></p>
    </form>

  </div>
</template>

<script>
import UsersService from '../../services/UsersService'

export default {
  data () {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    }
  },
  methods: {
    async createUser () {
      try {
        await UsersService.post(this.user)

        // เพิ่มเสร็จ กลับไปหน้า users
        this.$router.push({ name: 'users' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
