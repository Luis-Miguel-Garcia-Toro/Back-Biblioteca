// Home.js

const { Router } = require("express");
const { connection, Sequelize } = require("../db/connection.js");
// const initModels = require("../models/init-models.js");
const { getUserData } = require("../middlewares/index.js");
const Libro = require('../models/Libros.js')
// const { Libro, Cliente, Venta, DetalleVenta, Admin } = initModels(connection);
const Home = Router();

// Asegúrate de que la conexión a la base de datos esté establecida
connection
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Obtener todos los libros
Home.get("/libros", async (req, res) => {
  try {
    const libros = await Libro.findAll();
    res.json({
      code: 200,
      text: "Libros obtenidos correctamente",
      libros,
    });
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({
      code: 500,
      text: "Error al obtener libros",
      error: error.message,
    });
  }
});

// Obtener un libro por ID
Home.get("/libros/:id", async (req, res) => {
  const libroId = req.params.id;
  try {
    const libro = await Libro.findByPk(libroId);

    if (!libro) {
      return res.status(404).json({
        code: 404,
        text: "Libro no encontrado",
      });
    }

    res.json({
      code: 200,
      text: "Libro encontrado",
      libro,
    });
  } catch (error) {
    console.error("Error al obtener libro por ID:", error);
    res.status(500).json({
      code: 500,
      text: "Error interno del servidor",
    });
  }
});

Home.get("/", (req, res) => {
  res.json({
    text: "Home Controller Ready",
  });
});

module.exports = {
  Home,
};
