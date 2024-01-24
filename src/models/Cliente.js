const { DataTypes } = require('sequelize');
// const { connection } = require('../db/connection');
// module = function(sequelize, DataTypes) {
  const {connection} = require('../db/connection')
  const Client = connection.define(
    "Cliente",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      apellido: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      direccion: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      correo: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: "correo",
      },
      contrasenia: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
    },
    {
      connection,
      tableName: "cliente",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "correo",
          unique: true,
          using: "BTREE",
          fields: [{ name: "correo" }],
        },
      ],
    }
  );

module.exports = Client;
