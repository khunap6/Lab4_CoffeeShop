// app.js — Node.js Coffee API
let express = require('express')
let bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Coffee Menu Data
let menus = [
  {
    id: 1,
    name: "Latte",
    type: "Hot",
    origin: "Colombia",
    price: 85,
    description: "เอสเปรสโซผสมนมร้อน หอมมัน นุ่มละมุน"
  },
  {
    id: 2,
    name: "Cappuccino",
    type: "Hot",
    origin: "Italy",
    price: 85,
    description: "กาแฟเข้มข้น topped ด้วยฟองนมนุ่มละเอียด"
  },
  {
    id: 3,
    name: "Mocha",
    type: "Hot/Iced",
    origin: "Italy",
    price: 90,
    description: "กาแฟผสมช็อกโกแลต หอมหวาน เข้มกำลังดี"
  },
  {
    id: 4,
    name: "Cold Brew",
    type: "Iced",
    origin: "USA",
    price: 95,
    description: "กาแฟสกัดเย็น รสนุ่ม ไม่เปรี้ยว ดื่มสดชื่น"
  },
  {
    id: 5,
    name: "Caramel Macchiato",
    type: "Hot/Iced",
    origin: "USA",
    price: 95,
    description: "กาแฟนมหอมหวาน ราดซอสคาราเมล"
  },
  {
    id: 6,
    name: "Americano",
    type: "Hot/Iced",
    origin: "Italy",
    price: 75,
    description: "เอสเปรสโซผสมน้ำ รสชาติเข้มแต่ดื่มง่าย"
  }
]

// ROUTE ZONE
// Health Check
app.get('/status', function (req, res) {
  res.send('server is on')
})

// GET all menus
app.get('/menus', function (req, res) {
  res.json({
    message: "เรียกข้อมูลเมนูทั้งหมดสำเร็จ",
    data: menus
  })
})

// GET menu by ID
app.get('/menu/:menuID', function (req, res) {
  const id = parseInt(req.params.menuID)
  const menu = menus.find(m => m.id === id)

  if (!menu) return res.status(404).json({ message: "ไม่พบเมนูนี้" })

  res.json({
    message: "เรียกข้อมูลเมนูสำเร็จ",
    data: menu
  })
})

// CREATE new menu
app.post('/menu', function (req, res) {
  const newMenu = req.body
  newMenu.id = menus.length > 0 ? menus[menus.length - 1].id + 1 : 1

  menus.push(newMenu)

  res.json({
    message: "เพิ่มเมนูใหม่สำเร็จ",
    data: newMenu
  })
})

// UPDATE menu
app.put('/menu/:menuID', function (req, res) {
  const id = parseInt(req.params.menuID)
  const index = menus.findIndex(m => m.id === id)

  if (index === -1) return res.status(404).json({ message: "ไม่พบเมนูนี้" })

  menus[index] = { ...menus[index], ...req.body }

  res.json({
    message: "แก้ไขเมนูสำเร็จ",
    data: menus[index]
  })
})

// DELETE menu
app.delete('/menu/:menuID', function (req, res) {
  const id = parseInt(req.params.menuID)
  const index = menus.findIndex(m => m.id === id)

  if (index === -1) return res.status(404).json({ message: "ไม่พบเมนูนี้" })

  const deleted = menus.splice(index, 1)

  res.json({
    message: "ลบเมนูสำเร็จ",
    data: deleted[0]
  })
})


// START SERVER
let port = 8081
app.listen(port, function () {
  console.log('server running on ' + port)
})
