<template>
  <div class="cafe-container">

    <h1 class="cafe-title">Get All Coffees</h1>

    <div class="top-actions">
      <button v-if="isAdminLoggedIn" @click="navigateTo('/coffee/create')">
        + เพิ่มเมนู
      </button>

      <button v-else @click="navigateTo('/login')">
        Admin Login
      </button>

      <button v-if="isAdminLoggedIn" @click="onLogout">
        Logout
      </button>
    </div>

    <!-- ถ้าไม่มีข้อมูล -->
    <div v-if="coffees.length === 0" class="empty">
      ไม่มีข้อมูลเมนูกาแฟ
    </div>

    <!-- MENU LIST -->
    <div class="menu-grid">
      <div v-for="coffee in coffees" :key="coffee.id" class="menu-card">

        <!-- รูป -->
        <div class="menu-image">
          <img :src="getImage(coffee.image)" @error="onImgError">
        </div>

        <!-- ข้อมูล -->
        <div class="menu-body">
          <h2 class="coffee-id">ID : {{ coffee.id }}</h2>
          <h2 class="coffee-name">Name: {{ coffee.name }}</h2>

          <div class="coffee-meta">
            <span>Type: {{ coffee.type }}</span><br>
            <span>Status: {{ coffee.status }}</span>
          </div>

          <div class="coffee-price"> Price:
            {{ coffee.price }} ฿
          </div>
          <div class="coffee-desc">
            <p><b>รายละเอียดสินค้า</b>:{{ coffee.content }}</p>
          </div>

          <!-- ปุ่ม -->
          <div class="menu-actions">
            <button class="btn view" @click="navigateTo('/coffee/' + coffee.id)">
              ดูรายละเอียด
            </button>

            <button v-if="isAdminLoggedIn" class="btn edit" @click="navigateTo('/coffee/edit/' + coffee.id)">
              แก้ไข
            </button>

            <button v-if="isAdminLoggedIn" class="btn delete" @click="deleteCoffee(coffee.id)">
              ลบ
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CoffeeService from "../../services/CoffeeService"
import { useAuthenStore } from "../../stores/authen"

export default {

  data() {
    return { coffees: [] }
  },

  computed: {
    isAdminLoggedIn() {
      const authenStore = useAuthenStore()
      return authenStore.isAdminLoggedIn
    }
  },

  methods: {

    getImage(filename) {
      if (!filename) {
        return "https://via.placeholder.com/300x200?text=Coffee"
      }
      return "http://localhost:8081/assets/uploads/" + filename
    },

    onImgError(e) {
      e.target.src = "https://via.placeholder.com/300x200?text=Coffee"
    },

    navigateTo(route) {
      this.$router.push(route)
    },

    async deleteCoffee(id) {
      if (!confirm("Delete menu?")) return
      await CoffeeService.delete(id)
      this.refreshData()
    },

    /* ⭐ FIX ตัวสำคัญ */
    async refreshData() {
      try {
        const res = await CoffeeService.index()

        // รองรับทั้ง res.data และ res.data.data
        if (Array.isArray(res.data)) {
          this.coffees = res.data
        } else if (res.data && res.data.data) {
          this.coffees = res.data.data
        } else {
          this.coffees = []
        }

        console.log("COFFEE LOADED:", this.coffees)

      } catch (err) {
        console.error("โหลดกาแฟไม่สำเร็จ:", err)
        this.coffees = []
      }
    },

    onLogout() {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: "login" })
    }
  },

  /* ⭐ ห้าม async created */
  created() {
    this.refreshData()
  }

}
</script>

<style scoped>
.cafe-title {
  text-align: center;
  font-size: 42px;
  color: #2f4f44; /* forest */
  font-family: Georgia, serif;
}

.subtitle {
  text-align: center;
  color: #6b7c72;
  margin-bottom: 30px;
}

/* ===== Grid ===== */
.menu-grid {
  width: 100%;
  max-width: 1100px;
  margin: 30px auto 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* ===== Card ===== */
.menu-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(76, 110, 98, 0.25);
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(47, 79, 68, 0.12);
  transition: .25s ease;
}

.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(47, 79, 68, 0.22);
}

/* ===== Image zone ===== */
.menu-image {
  background: #dce7e2; /* accent-soft */
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-image img {
  max-height: 100px;
  object-fit: contain;
}

/* ===== Body ===== */
.menu-body {
  padding: 16px;
}

.coffee-name {
  margin: 0;
  color: #1f2d24;
}

.coffee-meta {
  color: #6b7c72;
  font-size: 14px;
}

.coffee-price {
  font-size: 20px;
  font-weight: 600;
  margin: 8px 0;
  color: #4c6e62; /* main accent */
}

.coffee-desc {
  background: #f4f6f2;
  border-radius: 12px;
  padding: 8px;
  border: 1px solid rgba(76, 110, 98, 0.2);
  margin-bottom: 12px;
  font-size: 14px;
}

/* ===== Buttons ===== */
.menu-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 7px 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  border: 1px solid rgba(76, 110, 98, 0.35);
  transition: 0.25s ease;
}

/* View */
.view {
  background: #4c6e62;
  color: white;
}

.view:hover {
  background: #2f4f44;
}

/* Edit */
.edit {
  background: #e6f0eb;
  color: #2f4f44;
}

/* Delete */
.delete {
  background: #f4dede;
  color: #7a2f2f;
}

/* Empty state */
.empty {
  text-align: center;
  margin-top: 40px;
  color: #4c6e62;
  font-size: 18px;
}

/* ===== Responsive ===== */
@media (max-width:900px) {
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width:600px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>