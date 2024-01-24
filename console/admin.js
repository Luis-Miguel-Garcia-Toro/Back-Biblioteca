const { db } = require("../src/db/connection");
const bcrypt = require("bcrypt");

const initModels = require("../src/models/aadmin");
console.log("wwwwww", db);

let admin = async () => {
  let id_admin = '10'; // Se cambió a string porque en la tabla se define como varchar(15)
  let nombre_admin = 'Cristian';
  let apellidos_admin = 'Rincon Giraldo';
  let correo_admin = 'cristianrincongiraldo@gmail.com';
  let contrasenia_admin = '1409';

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(contrasenia_admin, salt);

  const conn = db.connection;
  console.log("----", conn);

  // Corregir la consulta SQL
  let query = `INSERT INTO admin (id_admin, nombre_admin, apellidos_admin, correo_admin, contrasenia_admin) 
               VALUES ('${id_admin}', '${nombre_admin}', '${apellidos_admin}', '${correo_admin}', '${hash}')`;

  try {
    await conn.query(query);
    console.log("Registro insertado correctamente.");
  } catch (error) {
    console.log("Error al insertar el registro:", error);
  }
};

admin().then((res) => {
  console.log("qqqqqq", res);
}).catch((err) => {
  console.log("ffffff", err);
});
