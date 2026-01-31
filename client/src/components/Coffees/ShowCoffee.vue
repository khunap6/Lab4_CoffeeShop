<template>
  <div class="container" v-if="coffee">
    <h1>Coffee Detail</h1>

    <p><b>ID:</b> {{ coffee.id }}</p>
    <p><b>Name:</b> {{ coffee.name }}</p>
    <p><b>Price:</b> {{ coffee.price }}</p>
    <p><b>Type:</b> {{ coffee.type }}</p>
    <p><b>Description:</b> {{ coffee.description }}</p>

    <button @click="$router.push({ name: 'coffees' })">
      Back
    </button>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  name: 'CoffeeShow',
  data () {
    return {
      coffee: null
    }
  },
  async mounted () {
    const coffeeId = this.$route.params.coffeeId
    this.coffee = (await CoffeesService.show(coffeeId)).data
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
