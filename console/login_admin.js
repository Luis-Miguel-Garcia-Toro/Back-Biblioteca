const { db } = require("../src/db/connection");
const bcrypt = require("bcrypt");

const initModels = require("../src/models/aadmin");
console.log("wwwwww", db);

// Función para iniciar sesión
let login = async (email, password) => {
  const conn = db.connection;
  console.log("----", conn);

  // Obtener información del administrador por correo electrónico
  let query = `SELECT * FROM aadmin WHERE admin_email = '${email}'`;
  try {
    const result = await conn.query(query);

    if (result.length > 0) {
      const admin = result[0];
      const passwordMatch = await bcrypt.compare(password, admin.admin_password);

      if (passwordMatch) {
        console.log("Inicio de sesión exitoso.");
        return admin;
      } else {
        console.log("Contraseña incorrecta.");
        return null;
      }
    } else {
      console.log("No se encontró ningún administrador con ese correo electrónico.");
      return null;
    }
  } catch (error) {
    console.log("Error al realizar la consulta:", error);
    return null;
  }
};

// Datos de inicio de sesión
let admin_id = 10;
let admin_name = 'Cristian';
let admin_lastname = 'Rincon Giraldo';
let admin_email = 'cristianrincongiraldo@gmail.com';
let admin_password = '1409';

login(admin_email, admin_password)
  .then((admin) => {
    if (admin) {
      console.log("Datos del administrador:", admin);
      // Puedes realizar acciones adicionales después del inicio de sesión exitoso
    } else {
      console.log("Inicio de sesión fallido.");
    }
  })
  .catch((err) => {
    console.log("Error en el proceso de inicio de sesión:", err);
  });
