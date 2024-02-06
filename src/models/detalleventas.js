const {DataTypes} = require('sequelize');
const {connection} = require('../db/connection')
const DetalleVenta =  connection.define('DetalleVentas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idVenta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ventas',
        key: 'id'
      }
    },
    id_libro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'libros',
        key: 'id_libro'
      }
    }
  }, {
    connection,
    tableName: 'detalleventas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idVenta",
        using: "BTREE",
        fields: [
          { name: "idVenta" },
        ]
      },
      {
        name: "id_libro",
        using: "BTREE",
        fields: [
          { name: "id_libro" },
        ]
      },
    ]
  });
module.exports = DetalleVenta
