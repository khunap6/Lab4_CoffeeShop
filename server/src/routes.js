const MenuController = require("./controllers/MenuController")
const CoffeeController = require("./controllers/CoffeeController")
const isAuthenController = require("./controllers/isAuthenController")
const UserAuthenController = require("./controllers/UserAuthenController")
const upload = require('./middleware/coffeeUpload')

module.exports = (app) => {

  // ===== Auth =====
  app.post("/login", UserAuthenController.login)
  app.post("/register", UserAuthenController.register)

  // ===== Menu =====
  app.get("/menus", MenuController.index)
  app.get("/menu/:id", MenuController.show)
  app.post("/menu", isAuthenController, MenuController.create)
  app.put("/menu/:id", isAuthenController, MenuController.update)
  app.delete("/menu/:id", isAuthenController, MenuController.delete)

  // ===== Coffee =====
  app.get("/coffees", CoffeeController.index)
  app.get("/coffee/:coffeeId", CoffeeController.show)

  // create coffee (upload thumbnail)
  app.post("/coffee", isAuthenController, upload.single("image"), CoffeeController.create)

  // update coffee
  app.put("/coffee/:coffeeId", isAuthenController, upload.single("image"), CoffeeController.update)

  // delete coffee
  app.delete("/coffee/:coffeeId", isAuthenController, CoffeeController.delete)

  // CKEditor upload
  app.post("/coffee-upload-image", upload.single("image"), CoffeeController.uploadImage)

  // ⭐ Upload component ใช้ตัวนี้
  app.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file){
      return res.status(400).json({ error:"No file uploaded" })
    }
    res.json({ filename: req.file.filename })
  })
}