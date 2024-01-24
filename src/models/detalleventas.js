const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalleventas', {
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
    sequelize,
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
};
