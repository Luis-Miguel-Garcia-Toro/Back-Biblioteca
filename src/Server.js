const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//const nodemailer = require('nodemailer');
//const mailGun = require('nodemailer-mailgun-transport');
const log = console.log;
dotenv.config();



const { Login, Home, Profile } = require("./controllers/index.js");
const { errorHandler } = require("./middlewares/index.js");

const app = express()
const corsConfig = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorHandler);
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());


app.use("/api/login", Login)

app.use("/api/home", Home)

app.use("/api/profile", Profile)


app.get("/", (req, res) => {
  res.json({
    code: 200,
    text: "Ready"
  })
})

module.exports = {
  app
}