const MenuController = require("./controllers/MenuController")
const CoffeeController = require("./controllers/CoffeeController")
const isAuthenController = require("./controllers/isAuthenController")
const UserAuthenController = require("./controllers/UserAuthenController")

module.exports = (app) => {
  // ===== Auth =====
  app.post("/login", UserAuthenController.login)
  app.post("/register", UserAuthenController.register)

  // ===== Menu =====
  // all
  app.get("/menus", MenuController.index)
  // one
  app.get("/menu/:id", MenuController.show)
  // create
  app.post("/menu", isAuthenController, MenuController.create)
  // update
  app.put("/menu/:id", isAuthenController, MenuController.update)
  // delete
  app.delete("/menu/:id", isAuthenController, MenuController.delete)

  // ===== Coffee =====
  // all 
  app.get("/coffees", CoffeeController.index)
  // one
  app.get("/coffee/:coffeeId", CoffeeController.show)
  // create
  app.post("/coffee", isAuthenController, CoffeeController.create)
  // update
  app.put("/coffee/:coffeeId", isAuthenController, CoffeeController.update)
  // delete
  app.delete("/coffee/:coffeeId", isAuthenController, CoffeeController.delete)
}
