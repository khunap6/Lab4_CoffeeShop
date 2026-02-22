module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define(
    "Coffee",
    {
      name: { type: DataTypes.STRING(100), allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: false },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "มีจำหน่าย"
      },
      description: DataTypes.TEXT,

      // CKEditor HTML
      content: DataTypes.TEXT,

      // รูปหลัก
      image: DataTypes.STRING,

      // หลายรูป
      gallery: DataTypes.STRING
    },
    {
      tableName: "coffees",
      timestamps: true
    }
  )

  return Coffee
}