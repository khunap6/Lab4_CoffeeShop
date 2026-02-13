// server/src/controllers/CoffeeController.js
const { Coffee } = require("../models")

module.exports = {
  // GET /coffees
  async index(req, res) {
    try {
      const coffees = await Coffee.findAll({ order: [["id", "ASC"]] })
      res.json({ message: "เรียกข้อมูลกาแฟสำเร็จ", data: coffees })
    } catch (err) {
      res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message })
    }
  },

  // GET /coffee/:coffeeId
  async show(req, res) {
    try {
      const coffeeId = parseInt(req.params.coffeeId, 10)
      const coffee = await Coffee.findByPk(coffeeId)

      if (!coffee) return res.status(404).json({ message: "ไม่พบเมนูกาแฟนี้" })
      res.json({ message: "เรียกดูเมนูกาแฟสำเร็จ", data: coffee })
    } catch (err) {
      res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message })
    }
  },

  // POST /coffee
  async create(req, res) {
    try {
      const coffee = await Coffee.create(req.body)
      res.status(201).json({ message: "สร้างเมนูกาแฟสำเร็จ", data: coffee })
    } catch (err) {
      res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message })
    }
  },

  // PUT /coffee/:coffeeId
  async update(req, res) {
    try {
      const coffeeId = parseInt(req.params.coffeeId, 10)
      const coffee = await Coffee.findByPk(coffeeId)

      if (!coffee) return res.status(404).json({ message: "ไม่พบเมนูกาแฟนี้" })

      await coffee.update(req.body)
      res.json({ message: "แก้ไขเมนูกาแฟสำเร็จ", data: coffee })
    } catch (err) {
      res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message })
    }
  },

  // DELETE /coffee/:coffeeId
  async delete(req, res) {
    try {
      const coffeeId = parseInt(req.params.coffeeId, 10)
      const coffee = await Coffee.findByPk(coffeeId)

      if (!coffee) return res.status(404).json({ message: "ไม่พบเมนูกาแฟนี้" })

      await coffee.destroy()
      res.json({ message: "ลบเมนูกาแฟสำเร็จ" })
    } catch (err) {
      res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err.message })
    }
  }
}
