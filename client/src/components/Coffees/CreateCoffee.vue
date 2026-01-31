<template>
  <div class="container">
    <h1>Create Coffee</h1>

    <form @submit.prevent="createCoffee" class="form">
      <label>name:<input v-model="coffee.name" /></label>
      <label>price:<input type="number" v-model="coffee.price" /></label>
      <label>type:<input v-model="coffee.type" /></label>
      <label>description:<input v-model="coffee.description" /></label>
      <button type="submit">Create</button>
    </form>
    
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;   /* กลางแนวตั้ง */
  align-items: center;       /* กลางแนวนอน */
}

.form {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;                 /* ระยะห่าง input */
}

label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

input {
  padding: 6px;
}

button {
  margin-top: 10px;
  padding: 8px;
  cursor: pointer;
}
</style>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  data () {
    return {
      coffee: {
        name: '',
        price: '',
        type: '',
        description: ''
      }
    }
  },
  methods: {
    async createCoffee () {
      await CoffeesService.post(this.coffee)
      this.$router.push({ name: 'coffees' })
    }
  }
}
</script>
