<template>
<div class="container">
    <h1>Edit Coffee</h1>

    <form v-if="coffee" @submit.prevent="updateCoffee">
      <p>name: <input v-model="coffee.name" /></p>
      <p>price: <input type="number" v-model="coffee.price" /></p>
      <p>type: <input v-model="coffee.type" /></p>
      <p>description: <input v-model="coffee.description" /></p>

      <button type="submit">Update</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;      /* กลางแนวนอน */
  padding-top: 40px;
}

form {
  width: 320px;
}

p {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

input {
  padding: 6px;
}

button {
  width: 100%;
  padding: 8px;
  cursor: pointer;
}
</style>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  data () {
    return {
      coffee: null
    }
  },
  async created () {
    const coffeeId = this.$route.params.coffeeId
    this.coffee = (await CoffeesService.show(coffeeId)).data
  },
  methods: {
    async updateCoffee () {
      await CoffeesService.put(this.coffee)
      this.$router.push({ name: 'coffees' })
    }
  }
}
</script>
