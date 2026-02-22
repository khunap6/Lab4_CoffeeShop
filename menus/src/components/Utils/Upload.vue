<template>
  <div>
    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      @change="onFileChange"
    />
  </div>
</template>

<script>
export default {
  emits: ["selected"],

  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return

      // ส่ง file object กลับไปให้ parent
      this.$emit("selected", file)
    }
  }
}
</script>