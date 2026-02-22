<template>
  <div class="container">
    <h1>Edit Coffee</h1>

    <form v-if="loaded" @submit.prevent="updateCoffee">

      <!-- NAME -->
      <p>
        <label>Name</label><br>
        <input v-model="coffee.name" required>
      </p>

      <!-- PRICE -->
      <p>
        <label>Price</label><br>
        <input v-model.number="coffee.price" type="number" required>
      </p>

      <!-- TYPE -->
      <p>
        <label>Type</label><br>
        <select v-model="coffee.type">
          <option value="ร้อน">ร้อน</option>
          <option value="เย็น">เย็น</option>
          <option value="ปั่น">ปั่น</option>
        </select>
      </p>

      <!-- STATUS -->
      <p>
        <label>Status</label><br>
        <select v-model="coffee.status">
          <option value="มีจำหน่าย">มีจำหน่าย</option>
          <option value="หมด">หมด</option>
        </select>
      </p>

      <!-- Upload -->
      <p>
        <label>เปลี่ยนรูปสินค้า</label><br>
        <Upload @selected="onFile" />
        <small style="color:gray">รองรับ .jpg .png .webp (ไม่เกิน 2MB)</small>
      </p>

      <!-- Preview -->
      <div v-if="coffee.image || previewImage">
        <h3 v-if="previewImage">รูปใหม่ (ยังไม่ได้บันทึก)</h3>
        <h3 v-else>รูปปัจจุบัน</h3>

        <img
          v-if="previewImage"
          :src="previewImage"
          width="220"
        />

        <img
          v-else
          :src="BASE_URL + coffee.image + '?t=' + Date.now()"
          width="220"
        />

        <br />

        <button
          v-if="previewImage"
          type="button"
          @click="cancelPreview"
        >
          ยกเลิกการเปลี่ยนรูป
        </button>
      </div>

      <!-- CKEditor -->
      <p>
        <label>รายละเอียดสินค้า</label>
        <ckeditor
          :editor="editor"
          v-model="coffee.content"
          :config="editorConfig"
        />
      </p>

      <br>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "กำลังบันทึก..." : "บันทึก" }}
      </button>

      <button type="button" @click="navigateTo('/coffees')" :disabled="isLoading">
        ยกเลิก
      </button>

    </form>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import CoffeeService from "../../services/CoffeeService"
import Upload from "../Utils/Upload.vue"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default {

  components: { Upload },

  data() {
    return {
      coffee: {},
      file: null,
      previewImage: null,
      loaded: false,
      isLoading: false,

      editor: ClassicEditor,

      editorConfig: {
        ckfinder: {
          uploadUrl: "http://localhost:8081/coffee-upload-image"
        }
      },

      BASE_URL: "http://localhost:8081/assets/uploads/"
    }
  },

  async created() {
    try {
      const res = await CoffeeService.show(this.$route.params.coffeeId)
      this.coffee = res.data.data || res.data
      this.loaded = true
    } catch (err) {
      alert("ไม่พบเมนู")
      this.$router.push({ name: "coffees" })
    }
  },

  beforeUnmount() {
    if (this.previewImage) {
      URL.revokeObjectURL(this.previewImage)
    }
  },

  methods: {

    navigateTo(route) {
      this.$router.push(route)
    },

    onFile(file) {

      if (!file) return

      // ตรวจประเภทไฟล์
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        alert("อนุญาตเฉพาะไฟล์ JPG, PNG, WEBP")
        return
      }

      // ตรวจขนาดไฟล์ (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("ไฟล์ต้องมีขนาดไม่เกิน 2MB")
        return
      }

      this.file = file

      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage)
      }

      this.previewImage = URL.createObjectURL(file)
    },

    cancelPreview() {
      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage)
      }
      this.previewImage = null
      this.file = null
    },

    async updateCoffee() {
      try {

        this.isLoading = true

        let imageName = this.coffee.image

        if (this.file) {

          const uploadData = new FormData()
          uploadData.append("image", this.file)

          const uploadRes = await fetch("http://localhost:8081/upload-image", {
            method: "POST",
            body: uploadData
          })

          if (!uploadRes.ok) {
            throw new Error("Upload failed")
          }

          const uploadJson = await uploadRes.json()
          imageName = uploadJson.filename
        }

        const data = {
          name: this.coffee.name,
          price: this.coffee.price,
          type: this.coffee.type,
          status: this.coffee.status,
          content: this.coffee.content || "",
          image: imageName
        }

        await CoffeeService.put(this.coffee.id, data)

        alert("แก้ไขสำเร็จ")
        this.$router.push({ name: "coffees" })

      } catch (err) {
        console.error(err)
        alert("แก้ไขไม่สำเร็จ")
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 24px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(76, 110, 98, 0.25);
  box-shadow: 0 6px 18px rgba(47, 79, 68, 0.12);
}

/* รูปภาพ */
img {
  border-radius: 14px;
  border: 1px solid rgba(76, 110, 98, 0.25);
  margin-top: 14px;
  box-shadow: 0 4px 12px rgba(47, 79, 68, 0.15);
  transition: all 0.25s ease;
}

img:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(47, 79, 68, 0.25);
}

/* ปุ่ม (ถ้า component นี้ override global button) */
button {
  margin-right: 10px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(76, 110, 98, 0.35);
  background: linear-gradient(180deg, #ffffff 0%, #dce7e2 100%);
  color: #2f4f44;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

button:hover {
  background: linear-gradient(180deg, #e6f0eb 0%, #c9ddd4 100%);
  box-shadow: 0 6px 16px rgba(47, 79, 68, 0.25);
}
</style>