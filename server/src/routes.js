const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const CoffeeController = require('./controllers/CoffeeController')

module.exports = (app) => {

  // ===== User routes =====
  app.get('/users', UserController.index)
  app.post('/user', UserController.create)
  app.get('/user/:userId', UserController.show)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)

  // ===== Auth routes =====
  app.post('/register', AuthenticationController.register)

  // ===== Coffee routes (Lab 6 Exercise) =====
  app.get('/coffees', CoffeeController.index)
  app.post('/coffee', CoffeeController.create)
  app.get('/coffee/:coffeeId', CoffeeController.show)
  app.put('/coffee/:coffeeId', CoffeeController.put)
  app.delete('/coffee/:coffeeId', CoffeeController.remove)
}
