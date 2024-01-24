const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    id_admin: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    nombre_admin: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    apellidos_admin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    correo_admin: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contrasenia_admin: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_admin" },
        ]
      },
    ]
  });
};
