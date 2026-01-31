const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const CoffeeController = require('./controllers/CoffeeController')

module.exports = (app) => {
  // เส้นทางเดิมจากบทที่ 4 (ถ้าอยากเก็บไว้)
  // app.get('/status', (req, res) => res.send('server is running'))

  // เส้นทางใหม่สำหรับ User Management แบบ MVC
  app.get('/users', UserController.index)
  app.post('/user', UserController.create)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)
  app.get('/user/:userId', UserController.show)
  app.post('/register', AuthenticationController.register)

  //coffee
  app.get('/coffees', CoffeeController.index)
  app.get('/coffee/:coffeeId', CoffeeController.show)
  app.post('/coffee', CoffeeController.create)
  app.put('/coffee/:coffeeId', CoffeeController.update)
  app.delete('/coffee/:coffeeId', CoffeeController.remove)

}