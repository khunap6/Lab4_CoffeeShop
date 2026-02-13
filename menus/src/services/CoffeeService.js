import Api from "./Api"

export default {
  index() {
    return Api().get("coffees")
  },
  show(coffeeId) {
    return Api().get("coffee/" + coffeeId)
  },
  post(coffee) {
    return Api().post("coffee", coffee)
  },
  put(coffeeId, coffee) {
    return Api().put("coffee/" + coffeeId, coffee)
  },
  delete(coffeeId) {
    return Api().delete("coffee/" + coffeeId)
  }
}
