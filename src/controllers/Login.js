const { Router } = require("express");
const { connection, models } = require("../db/connection.js");
const { PasswordManager, JWTManager } = require("../lib/index.js");
// const initModels = require("../models/init-models.js");
// const {
//     Cliente: Cliente // Cambio de userr a cliente
// } = initModels(connection);
const Cliente = require('../models/Cliente.js')
const Login = Router();

Login.get("/getUsers", async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json({
            code: 200,
            text: "Clientes",
            clientes
        });
    } catch (error) {
        console.error(error);
        res.json({
            code: 500,
            text: "server-error"
        });
    }
});

Login.post("/login", async (req, res) => {
    try {
        const { user_email, user_password } = req.body; // Cambio de user_email a correo
        const cliente = await Cliente.findOne({
          where: {
            correo: user_email,
          },
        });
        if (!cliente) {
            return res.json({
                code: 404,
                text: "cliente inexistente"
            });
        }

        const isPasswordValid = await PasswordManager.comparePassword(user_password, cliente.contrasenia);
        if (!isPasswordValid) {
            return res.json({
                code: 401,
                text: "Error de correo o contraseña"
            });
        }

        const token = JWTManager.createToken(cliente.toJSON(), "Bookteam");
        const { exp } = JWTManager.decodeToken(token);
        return res.json({
            code: 200,
            text: "logged-in",
            token,
            expiresAt: exp,
            isAuthenticated: true,
            // Puedes agregar otros campos específicos de la tabla cliente aquí
        });
    } catch (error) {
        console.error(error);
        // return res.json({
        //     code: 500,
        //     text: "alv"
        // });
    }
});

Login.post("/register", async (req, res) => {
    try {
        const { user_name, user_lastname, user_location, telefono, user_email, user_password } = req.body;
        const hashedPassword = await PasswordManager.hashPassword(user_password);
        const nuevoCliente = await Cliente.create({
            nombre:user_name,
            apellido:user_lastname,
            direccion:user_location,
            // telefono,
            correo:user_email,
            contrasenia: hashedPassword
        });
        console.log("Cliente creado:", nuevoCliente.toJSON());
        res.json({
            code: 200,
            text: "success"
        });
    } catch (error) {
        console.log(error);
        // return res.json({
        //     code: 500,
        //     text: "server-error"
        // });
    }
});

Login.get("/", (req, res) => {
    res.json({
        text: "Login Controller Ready"
    });
});

module.exports = {
    Login
};
