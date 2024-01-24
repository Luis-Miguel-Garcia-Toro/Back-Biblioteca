const dotenv = require("dotenv");
dotenv.config();

const DB_HOST = process.env.DB_HOST ?? "";
const DB_USER = process.env.DB_USER ?? "";
const DB_PASS = process.env.DB_PASS ?? "";
const DB_PORT = process.env.DB_PORT ?? "";
const DB_NAME = process.env.DB_NAME ?? "";

module.exports = {
    DB_HOST,
    DB_PASS,
    DB_PORT,
    DB_USER,
    DB_NAME
}