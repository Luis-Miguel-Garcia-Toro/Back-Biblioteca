const {DataTypes} = require('sequelize');
const {connection}= require('../db/connection')

const Ventas = connection.define('Ventas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cliente',
        key: 'id'
      }
    }
  }, {
    connection,
    tableName: 'ventas',
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
        name: "idCliente",
        using: "BTREE",
        fields: [
          { name: "idCliente" },
        ]
      },
    ]
  });

module.exports = Ventas
