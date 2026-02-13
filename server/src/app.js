const express = require('express')
const cors = require('cors')

const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// JWT Strategy (เหมือน nv-webblog)
require('./userPassport')

// Routes
require('./routes')(app)

// health check
app.get('/status', (req, res) => {
  res.send('Hello CoffeeShop API!')
})

app.get('/hello/:name', (req, res) => {
  console.log('hello - ' + req.params.name)
  res.send('say hello with ' + req.params.name)
})

// Sync DB แล้วค่อยเปิด server
sequelize
  .sync({ force: false })
  .then(async () => {
    // สร้าง Admin เริ่มต้น (ถ้ายังไม่มี)
    // เปลี่ยนรหัสผ่านก่อนใช้งานจริง
    const { User } = require('./models')
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@coffee.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234'

    const existing = await User.findOne({ where: { email: adminEmail } })
    if (!existing) {
      await User.create({
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        name: 'Coffee Admin',
      })
      console.log(`Seed admin created: ${adminEmail} / ${adminPassword}`)
    }

    app.listen(config.port, () => {
      console.log('Server running on port ' + config.port)
    })
  })
  .catch((err) => {
    console.error('DB sync failed:', err)
  })

module.exports = app
