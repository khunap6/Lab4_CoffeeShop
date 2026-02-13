const bcrypt = require('bcrypt')

async function hashPassword(user) {
  if (!user.changed('password')) return
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        // admin / user (ตอนนี้ใช้ admin เป็นหลัก)
        type: DataTypes.STRING,
        defaultValue: 'admin',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  )

  User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  return User
}
