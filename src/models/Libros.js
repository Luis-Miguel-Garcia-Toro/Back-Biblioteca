const { DataTypes } = require('sequelize');
// const Sequelize = require('sequelize');
// module.exports = function(sequelize, DataTypes) {
  const {connection} = require('../db/connection')
  const Libros = connection.define('Libros', {
    id_libro: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    existencias: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    autor: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    imagenLibro: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    connection,
    tableName: 'libros',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_libro" },
        ]
      },
    ]
  });
  module.exports = Libros;
