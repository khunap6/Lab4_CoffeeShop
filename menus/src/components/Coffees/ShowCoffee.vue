<template>
  <div>
    <h1>Show Coffee</h1>

    <div v-if="coffee" class="card">
      <p><b>ID</b>: {{ coffee.id }}</p>
      <p><b>Name</b>: {{ coffee.name }}</p>
      <p><b>Type</b>: {{ coffee.type }}</p>
      <p><b>Price</b>: {{ coffee.price }}</p>
      <p><b>Status</b>: {{ coffee.status }}</p>

      <p>
        <button @click="navigateTo('/coffees')">กลับ</button>
      </p>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import CoffeeService from "../../services/CoffeeService";

export default {
  data () {
    return { coffee: null }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async created () {
    try {
      const res = await CoffeeService.show(this.$route.params.coffeeId)
      this.coffee = res.data.data || res.data
    } catch (err) {
      console.log(err)
      alert("Not found")
      this.$router.push({ name: "coffees" })
    }
  }
}
</script>

<style scoped>
</style>