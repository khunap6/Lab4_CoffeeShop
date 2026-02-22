const { Coffee } = require("../models")
const fs = require("fs")
const path = require("path")

const uploadDir = path.join(__dirname, "../../public/uploads")

module.exports = {

  // ================= GET ALL =================
  async index(req, res) {
    try {
      const coffees = await Coffee.findAll({ order: [["id", "ASC"]] })
      res.json(coffees)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // ================= GET ONE =================
  async show(req, res) {
    try {
      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) return res.status(404).send("Not found")
      res.json(coffee)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // ================= CREATE =================
  async create(req, res) {
    try {

      const coffee = await Coffee.create({
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        status: req.body.status,
        description: req.body.description,
        content: req.body.content,
        image: req.body.image || null   // ⭐ ใช้ค่าจาก body
      })

      res.json(coffee)

    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  },

  // ================= UPDATE =================
  async update(req, res) {
    try {

      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) return res.status(404).send("Not found")

      coffee.name = req.body.name
      coffee.price = req.body.price
      coffee.type = req.body.type
      coffee.status = req.body.status
      coffee.description = req.body.description
      coffee.content = req.body.content

      // ⭐ ถ้ามี image ส่งมาใน body
      if (req.body.image) {
        coffee.image = req.body.image
      }

      await coffee.save()

      res.json(coffee)

    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
    console.log("UPDATE BODY:", req.body)
  },

  // ================= DELETE =================
  async delete(req, res) {
    try {

      const coffee = await Coffee.findByPk(req.params.coffeeId)
      if (!coffee) return res.status(404).send("Not found")

      // ลบไฟล์รูป
      if (coffee.image) {
        const filePath = path.join(uploadDir, coffee.image)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }

      await coffee.destroy()

      res.json({ success: true })

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // ================= CKEditor Upload =================
  async uploadImage(req, res) {
    try {

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" })
      }

      res.json({
        url: "http://localhost:8081/assets/uploads/" + req.file.filename
      })

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

}