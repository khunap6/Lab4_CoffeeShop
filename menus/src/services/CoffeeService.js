import Api from "./Api"

export default {

  index() {
    return Api().get("coffees")
  },

  show(coffeeId) {
    return Api().get("coffee/" + coffeeId)
  },

  // ⭐ CREATE
  post(coffee) {
    // ถ้าเป็น FormData → ต้องบอก header
    if (coffee instanceof FormData) {
      return Api().post("coffee", coffee, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    }
    return Api().post("coffee", coffee)
  },

  // ⭐⭐⭐ สำคัญมาก (ตัวแก้รูปไม่เปลี่ยน)
  put(coffeeId, coffee) {

    if (coffee instanceof FormData) {
      return Api().put("coffee/" + coffeeId, coffee, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    }

    return Api().put("coffee/" + coffeeId, coffee)
  },

  delete(coffeeId) {
    return Api().delete("coffee/" + coffeeId)
  }
}