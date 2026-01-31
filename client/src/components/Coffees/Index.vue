<template>
  <div class="container">
    <h1>Coffee Menu</h1>

    <p>จำนวนกาแฟทั้งหมด: {{ coffees.length }}</p>

    <button @click="goCreate">Add Coffee</button>

    <hr />

    <div v-for="coffee in coffees" :key="coffee.id" class="card">
      <p>id: {{ coffee.id }}</p>
      <p>name: {{ coffee.name }}</p>
      <p>price: {{ coffee.price }}</p>
      <p>type: {{ coffee.type }}</p>

      <div class="btn-group">
        <button @click="goShow(coffee.id)">ดูข้อมูล</button>
        <button @click="goEdit(coffee.id)">Edit</button>
        <button @click="deleteCoffee(coffee)">Delete</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* กลางแนวนอน */
  padding-top: 40px;
}

.card {
  width: 300px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
  padding-bottom: 10px;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

button {
  padding: 6px 12px;
  cursor: pointer;
}
</style>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  name: 'CoffeeIndex',
  data() {
    return {
      coffees: []
    }
  },
  async mounted() {
    await this.refreshData()
  },
  methods: {
    async refreshData() {
      this.coffees = (await CoffeesService.index()).data
    },
    goCreate() {
      this.$router.push({ name: 'coffee-create' })
    },
    goEdit(coffeeId) {
      this.$router.push({
        name: 'coffee-edit',
        params: { coffeeId }
      })
    },
    goShow(coffeeId) {
      this.$router.push({
        name: 'coffee-show',
        params: { coffeeId }
      })
    },
    async deleteCoffee(coffee) {
      const isConfirm = confirm(`ต้องการลบเมนู "${coffee.name}" ใช่หรือไม่?`)
      if (isConfirm) {
        await CoffeesService.delete(coffee)
        this.refreshData()
      }
    }
  }
}



</script>
