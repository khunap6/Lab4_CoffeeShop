<template>
  <div>
    <h1>Admin Login</h1>
    <form @submit.prevent="onLogin">
      <p>Email: <input type="text" v-model="email" /></p>
      <p>Password: <input type="password" v-model="password" /></p>
      <p><button type="submit">Login</button></p>
      <div class="error" v-if="error">{{ error }}</div>
      <div class="hint">
        <p>
          <b>Default admin</b>: admin@coffee.com / admin1234
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenService from '../services/AuthenService'
import { useAuthenStore } from '../stores/authen'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        })

        const authenStore = useAuthenStore()
        authenStore.setToken(response.data.token)
        authenStore.setUser(response.data.user)

        this.$router.push({ name: 'menus' })
      } catch (error) {
        this.error = error?.response?.data?.error || 'Login failed'
      }
    },
  },
}
</script>

<style scoped>
.error {
  color: red;
}
.hint {
  margin-top: 12px;
  opacity: 0.8;
}
</style>
