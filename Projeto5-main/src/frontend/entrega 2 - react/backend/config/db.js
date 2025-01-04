const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.getConnection()
    .then(() => console.log("Conectado ao banco de dados MySQL com sucesso!"))
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error.message));

module.exports = connection;
