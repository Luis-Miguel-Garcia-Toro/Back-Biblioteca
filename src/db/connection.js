const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = require("../utils/index.js");
const initModels = require("../models/init-models.js");

const connection = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: DB_HOST,
        dialect: "mysql",
        define: {
            charset: "utf8",
            collate: "utf8_general_ci"
        },
        logging: false
    }
);

const models = initModels(connection);

module.exports = {
    Sequelize,
    connection,
    models
};
