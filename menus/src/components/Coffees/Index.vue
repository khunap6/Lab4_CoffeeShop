<template>
  <div>
    <h1>Get All Coffees</h1>

    <p>
      <button v-if="isAdminLoggedIn" @click="navigateTo('/coffee/create')">เพิ่มเมนูกาแฟ</button>
      <button v-else @click="navigateTo('/login')">Login (Admin)</button>
      <button v-if="isAdminLoggedIn" @click="onLogout">Logout</button>
    </p>

    <div v-if="coffees.length">
      <h4>จำนวนเมนูกาแฟ {{ coffees.length }}</h4>

      <div v-for="coffee in coffees" :key="coffee.id" class="card">
        <p><b>ID</b> : {{ coffee.id }}</p>
        <p><b>Name</b>: {{ coffee.name }}</p>
        <p><b>Type</b>: {{ coffee.type }}</p>
        <p><b>Price</b>: {{ coffee.price }}</p>
        <p><b>Status</b>: {{ coffee.status }}</p>

        <p>
          <button @click="navigateTo('/coffee/' + coffee.id)">ดู</button>
          <button v-if="isAdminLoggedIn" @click="navigateTo('/coffee/edit/' + coffee.id)">แก้ไข</button>
          <button v-if="isAdminLoggedIn" @click="deleteCoffee(coffee.id)">ลบ</button>
        </p>
      </div>
    </div>

    <div v-else>
      <p>ไม่มีข้อมูลเมนูกาแฟ</p>
    </div>
  </div>
</template>

<script>
import CoffeeService from "../../services/CoffeeService"
import { useAuthenStore } from "../../stores/authen"

export default {
  data () {
    return { coffees: [] }
  },
  computed: {
    isAdminLoggedIn () {
      const authenStore = useAuthenStore()
      return authenStore.isAdminLoggedIn
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteCoffee (coffeeId) {
      if (!confirm("Want to delete?")) return
      try {
        await CoffeeService.delete(coffeeId)
        await this.refreshData()
      } catch (err) {
        console.log(err)
        alert(err?.response?.data?.error || "Delete failed")
      }
    },
    async refreshData () {
      const res = await CoffeeService.index()
      this.coffees = res.data.data || res.data
    },
    onLogout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: "login" })
    }
  },
  async created () {
    await this.refreshData()
  }
}
</script>

<style scoped>
/* ใช้ .card จาก global style.css */
</style>
