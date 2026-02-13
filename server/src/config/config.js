module.exports = {
    port: 8081,
    authentication: {
        // เปลี่ยนค่า secret นี้ก่อนนำขึ้น production
        jwtSecret: process.env.JWT_SECRET || 'coffee-secret-key-change-me'
    },
    db: {
        database: process.env.DB_NAME || 'coffeeshop_db',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './coffeeshop_db.sqlite' //ชื่อไฟล์ฐานข้อมูลที่จะถูกสร้างขึ้น
        }
    }
}