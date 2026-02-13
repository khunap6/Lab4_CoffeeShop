<template>
  <div>
    <h1>Create Coffee</h1>

    <form @submit.prevent="createCoffee" class="card">
      <p>
        <label>Name</label><br>
        <input v-model="coffee.name" type="text" required />
      </p>

      <p>
        <label>Price</label><br>
        <input v-model.number="coffee.price" type="number" min="0" required />
      </p>

      <p>
        <label>Type</label><br>
        <select v-model="coffee.type" required>
          <option value="ร้อน">ร้อน</option>
          <option value="เย็น">เย็น</option>
          <option value="ปั่น">ปั่น</option>
        </select>
      </p>

      <p>
        <label>Status</label><br>
        <select v-model="coffee.status" required>
          <option value="มีจำหน่าย">มีจำหน่าย</option>
          <option value="หมด">หมด</option>
        </select>
      </p>

      <p>
        <button type="submit">บันทึก</button>
        <button type="button" @click="navigateTo('/coffees')">ยกเลิก</button>
      </p>
    </form>
  </div>
</template>

<script>
import CoffeeService from "../../services/CoffeeService";

export default {
  data () {
    return {
      coffee: {
        name: "",
        price: 0,
        type: "ร้อน",
        status: "มีจำหน่าย"
      }
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async createCoffee () {
      try {
        await CoffeeService.post(this.coffee)
        this.$router.push({ name: "coffees" })
      } catch (err) {
        console.log(err)
        alert(err?.response?.data?.error || "Create failed")
      }
    }
  }
}
</script>

<style scoped>

</style>