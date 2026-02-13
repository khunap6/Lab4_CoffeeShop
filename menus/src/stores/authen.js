import { defineStore } from 'pinia'

export const useAuthenStore = defineStore('authen', {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isAdminLoggedIn: (state) => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },
    logout() {
      this.token = null
      this.user = null
    },
  },
  persist: true,
})
