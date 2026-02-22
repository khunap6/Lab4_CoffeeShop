<template>
  <div class="container">
    <h1>Create Coffee</h1>

    <form @submit.prevent="createCoffee">

      <div class="mb-3">
        <label>Name:</label>
        <input v-model="coffee.name" class="form-control" required>
      </div>

      <div class="mb-3">
        <label>Price:</label>
        <input v-model.number="coffee.price" type="number" class="form-control" required>
      </div>

      <div class="mb-3">
        <label>Type:</label>
        <select v-model="coffee.type" class="form-control">
          <option value="ร้อน">ร้อน</option>
          <option value="เย็น">เย็น</option>
          <option value="ปั่น">ปั่น</option>
        </select>
      </div>

      <div class="mb-3">
        <label>Status:</label>
        <select v-model="coffee.status" class="form-control">
          <option value="มีจำหน่าย">มีจำหน่าย</option>
          <option value="หมด">หมด</option>
        </select>
      </div>

      <!-- Upload -->
      <div class="mb-3">
        <label>Upload Image:</label>
        <UploadImage @selected="onFileSelected" />
        <small>รองรับ jpg/png/webp ไม่เกิน 2MB</small>
      </div>

      <!-- Preview -->
      <div class="mb-3" v-if="previewImage">
        <label>Thumbnail Preview:</label>
        <div>
          <img :src="previewImage" width="200">
        </div>
      </div>

      <!-- CKEditor -->
      <div class="mb-3">
        <label>รายละเอียดสินค้า:</label>
        <ckeditor
          :editor="editor"
          v-model="coffee.content"
          :config="editorConfig">
        </ckeditor>
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "กำลังบันทึก..." : "Create Coffee" }}
      </button>

    </form>
  </div>
</template>

<script>
import CoffeeService from '../../services/CoffeeService'
import UploadImage from '../Utils/Upload.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {

  components: { UploadImage },

  data() {
    return {
      editor: ClassicEditor,

      editorConfig: {
        ckfinder: {
          uploadUrl: "http://localhost:8081/coffee-upload-image"
        }
      },

      coffee: {
        name: '',
        price: 0,
        type: 'ร้อน',
        status: 'มีจำหน่าย',
        image: '',
        content: ''
      },

      file: null,
      previewImage: null,
      isLoading: false
    }
  },

  beforeUnmount() {
    if (this.previewImage) {
      URL.revokeObjectURL(this.previewImage)
    }
  },

  methods: {

    onFileSelected(file) {

      if (!file) return

      const allowed = ["image/jpeg","image/png","image/webp"]
      if (!allowed.includes(file.type)) {
        alert("อนุญาตเฉพาะ JPG PNG WEBP")
        return
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("ไฟล์ต้องไม่เกิน 2MB")
        return
      }

      this.file = file

      if (this.previewImage) {
        URL.revokeObjectURL(this.previewImage)
      }

      this.previewImage = URL.createObjectURL(file)
    },

    async createCoffee() {
      try {

        if (!this.file) {
          alert("กรุณาเลือกรูปก่อน")
          return
        }

        this.isLoading = true

        // upload ก่อน
        const formData = new FormData()
        formData.append("image", this.file)

        const res = await fetch("http://localhost:8081/upload-image", {
          method: "POST",
          body: formData
        })

        if (!res.ok) {
          throw new Error("Upload failed")
        }

        const uploadJson = await res.json()

        this.coffee.image = uploadJson.filename

        // บันทึก coffee
        await CoffeeService.post(this.coffee)

        alert("เพิ่มเมนูสำเร็จ")
        this.$router.push({ name: 'coffees' })

      } catch (err) {
        console.error(err)
        alert("บันทึกไม่สำเร็จ")
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
  margin: auto;
}

img {
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-top: 10px;
}
</style>