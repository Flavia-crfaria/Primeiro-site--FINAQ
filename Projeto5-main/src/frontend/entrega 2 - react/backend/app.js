require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Configura para processar JSON

// Configura a conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // Exemplo: 'localhost'
    user: process.env.DB_USER, // Seu usuário do MySQL
    password: process.env.DB_PASSWORD, // Sua senha do MySQL
    database: process.env.DB_NAME, // Nome do seu banco de dados
});

// Verifica a conexão com o banco de dados
connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados com sucesso!");
    }
});

app.get('/test-connection', async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT 1 + 1 AS solution');
        res.json({ message: "Conexão bem-sucedida com o banco de dados!", solution: rows[0].solution });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        res.status(500).json({ message: "Erro ao conectar ao banco de dados", error: error.message });
    }
});

app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM Usuario', (error, results) => {
        if (error) {
            console.error("Erro ao obter a lista de usuários:", error);
            return res.status(500).json({ message: "Erro ao obter a lista de usuários", error: error.message });
        }
        res.status(200).json(results);
    });
});

app.post('/criar', async (req, res) => {
    const { nome, email, telefone, data_nasc, senha } = req.body;

    console.log("Dados recebidos:", { nome, email, telefone, data_nasc, senha });

    if (!nome || !email || !telefone || !data_nasc || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10); // Hash da senha

        connection.query(
            'INSERT INTO Usuario (nome, email, telefone, data_nasc, senha) VALUES (?, ?, ?, ?, ?)',
            [nome, email, telefone, data_nasc, hashedSenha],
            (error, results) => {
                if (error) {
                    console.error("Erro ao registrar usuário:", error);
                    return res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
                }
                else{
                res.status(201).json({ message: "Usuário registrado com sucesso!" });
            }
        }
        );
    } catch (error) {
        console.error("Erro ao hash a senha:", error);
        res.status(500).json({ message: "Erro ao processar a senha", error: error.message });
    }
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body; // Obtém do corpo da requisição

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    const trimmedSenha = senha.trim();

    console.log("Recebendo login para:", email);
    console.log("Senha recebida:", trimmedSenha);

    connection.query(
        'SELECT * FROM Usuario WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                console.error("Erro ao fazer login:", error);
                return res.status(500).json({ message: "Erro ao fazer login", error: error.message });
            }

            console.log("Resultado da consulta ao banco:", results); 

            if (results && results.length > 0) {
                const user = results[0];
                const match = await bcrypt.compare(trimmedSenha, user.senha);
                if (match) {
                    console.log("Login bem-sucedido:", user);
                    res.status(200).json({ message: "Login bem-sucedido", user });
                } else {
                    console.log("Senha incorreta para o usuário:", email);
                    res.status(401).json({ message: "Credenciais inválidas" });
                }
            } else {
                console.log("Nenhum usuário encontrado com essas credenciais");
                res.status(401).json({ message: "Credenciais inválidas" });
            }
        }
    );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
