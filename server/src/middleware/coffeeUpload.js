const multer = require('multer')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join(__dirname, '../../public/uploads')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = 'coffee-' + Date.now() + ext
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg','image/png','image/jpg','image/gif']
  if (allowedTypes.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Only images allowed'), false)
}

module.exports = multer({ storage, fileFilter })