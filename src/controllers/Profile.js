const { Router } = require("express");
const express = require('express');
const { uploader, uploadStorage, imageFilter } = require("../lib/index.js");
const { requireActiveUser, getUserData, authenticate } = require("../middlewares/index.js");
const { connection, models } = require("../db/connection.js");  // Mover la importación aquí
const initModels = require("../models/init-models.js");
const { cliente: Cliente, libros: Libro, ventas: Venta, detalleVentas: DetalleVenta, admin: Admin } = initModels(connection);
const Profile = Router();

const uploaderS = uploader({
  storage: uploadStorage,
  fileFilter: imageFilter.fileFilter,
});

Profile.get("/cliente", getUserData, async (req, res) => {
  const cliente = await Cliente.findOne({
    where: {
      id: req.actualUser.id,
    }
  });
  res.status(200).json({
    code: 200,
    text: "Cliente obtenido correctamente",
    cliente,
  });
});

Profile.put(
  "/cliente",
  [getUserData, uploaderS.single("photo")],
  async (req, res) => {
    try {
      const cliente = await Cliente.findOne({
        where: {
          id: req.actualUser.id,
        }
      });
      cliente.nombre = req.body["nombre"];
      cliente.apellido = req.body["apellido"];
      cliente.direccion = req.body["direccion"];
      cliente.telefono = req.body["telefono"];
      cliente.correo = req.body["correo"];
      if (req.file) {
        cliente.foto = req.file.filename;
      }
      await cliente.save();
      res.status(200).json({
        code: 200,
        text: "Cliente actualizado",
        cliente,
      });
    } catch (err) {
      console.error('Hubo un error!', err);
      res.status(500).json({
        code: 500,
        text: "Error al actualizar el cliente",
        error: err.message,
      });
    }
  }
);

Profile.post("/libro", [getUserData, uploaderS.single("photo")], async (req, res) => {
  const libro = {
    nombre: 'Nombre del Libro',
    precio: 0.0,
    descripcion: 'Descripción del Libro',
    existencias: 0,
    url_img: 'URL de la Imagen del Libro',
    categoria: 'Categoría del Libro',
    autor: 'Autor del Libro',
  };

  try {
    const createdLibro = await Libro.create(libro);
    res.json({
      code: 200,
      text: "Libro creado correctamente",
      libroId: createdLibro.id_libro,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 500,
      text: "Error al crear el libro",
      error: err,
    });
  }
});

Profile.get("/", authenticate, (req, res) => {
  res.json({
    text: "Profile Controller Ready",
  });
});

module.exports = {
  Profile,
};
