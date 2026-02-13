// server/src/models/Coffee.js
module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define(
    "Coffee",
    {
      name: { type: DataTypes.STRING(100), allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: false }, // ร้อน / เย็น / ปั่น
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "มีจำหน่าย" // มีจำหน่าย / หมด
      }
    },
    {
      tableName: "coffees",
      timestamps: true
    }
  )

  return Coffee
}
