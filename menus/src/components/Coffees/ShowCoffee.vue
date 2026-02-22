<template>
  <div>
    <h1>Show Coffee</h1>

    <div v-if="coffee" class="card">

      <!-- ⭐ รูปใหญ่ -->
      <div class="main-image">
        <img v-if="mainImage" :src="BASE_URL + mainImage">
      </div>

      <hr>

      <!-- ข้อมูล -->
      <p><b>ID</b>: {{ coffee.id }}</p>
      <p><b>Name</b>: {{ coffee.name }}</p>
      <p><b>Type</b>: {{ coffee.type }}</p>
      <p><b>Price</b>: {{ coffee.price }} บาท</p>
      <p><b>Status</b>: {{ coffee.status }}</p>

      <!-- ⭐ เนื้อหาจาก CKEditor -->
      <p><b>รายละเอียดสินค้า</b>:{{ coffee.content }}</p>

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

  data() {
    return {
      coffee: null,
      mainImage: null,
      BASE_URL: "http://localhost:8081/assets/uploads/"
    }
  },

  methods: {

    navigateTo(route) {
      this.$router.push(route)
    },

    changeImage(img) {
      this.mainImage = img
    }
  },

  async created() {
    try {
      const res = await CoffeeService.show(this.$route.params.coffeeId)
      this.coffee = res.data

      // รูปหลัก
      this.mainImage = this.coffee.image

      // gallery
      if (this.coffee.gallery) {
        this.gallery = JSON.parse(this.coffee.gallery)
      }

    } catch (err) {
      console.log(err)
      alert("Not found")
      this.$router.push({ name: "coffees" })
    }
  }
}
</script>

<style scoped>
/* ===== รูปใหญ่ ===== */
.main-image {
  text-align: center;
  margin-bottom: 24px;
}

.main-image img {
  width: 420px;
  max-width: 100%;
  border-radius: 18px;
  border: 1px solid rgba(76, 110, 98, 0.25);
  box-shadow: 0 8px 22px rgba(47, 79, 68, 0.18);
  transition: 0.25s ease;
}

.main-image img:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(47, 79, 68, 0.28);
}

/* ===== รูปเล็ก (Thumbnails) ===== */
.thumbs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.thumbs img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 14px;
  cursor: pointer;
  border: 2px solid transparent;
  box-shadow: 0 4px 12px rgba(47, 79, 68, 0.12);
  transition: 0.25s ease;
}

.thumbs img:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 18px rgba(47, 79, 68, 0.22);
}

/* Active thumbnail */
.thumbs img.active {
  border: 2px solid #4c6e62; /* sage accent */
  box-shadow: 0 6px 16px rgba(76, 110, 98, 0.35);
}

/* ===== เนื้อหา CKEditor ===== */
.content {
  margin-top: 24px;
  line-height: 1.7;
  color: #1f2d24;
}

.content img {
  max-width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(76, 110, 98, 0.25);
  box-shadow: 0 4px 14px rgba(47, 79, 68, 0.15);
  margin: 12px 0;
}
</style>