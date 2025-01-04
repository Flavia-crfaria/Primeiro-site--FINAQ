require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { generateToken } = require('./auth');
const authMiddleware = require('./authMiddleware');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); 

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


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


app.post('/criar', async (req, res) => {
    const { nome, email, telefone, data_nasc, senha } = req.body;

    if (!nome || !email || !telefone || !data_nasc || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);

        connection.query(
            'INSERT INTO Usuario (nome, email, telefone, data_nasc, senha) VALUES (?, ?, ?, ?, ?)',
            [nome, email, telefone, data_nasc, hashedSenha],
            (error, results) => {
                if (error) {
                    console.error("Erro ao registrar usuário:", error);
                    return res.status(500).json({ message: "Erro ao registrar usuário", error: error.message });
                }
                res.status(201).json({ message: "Usuário registrado com sucesso!" });
            }
        );
    } catch (error) {
        console.error("Erro ao hash a senha:", error);
        res.status(500).json({ message: "Erro ao processar a senha", error: error.message });
    }
});


app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    connection.query(
        'SELECT * FROM Usuario WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                console.error("Erro ao fazer login:", error);
                return res.status(500).json({ message: "Erro ao fazer login", error: error.message });
            }

            if (results && results.length > 0) {
                const user = results[0];
                const match = await bcrypt.compare(senha, user.senha);
                if (match) {
                    const token = generateToken(user);
                    res.status(200).json({ message: "Login bem-sucedido", token });
                } else {
                    res.status(401).json({ message: "Credenciais inválidas" });
                }
            } else {
                res.status(401).json({ message: "Credenciais inválidas" });
            }
        }
    );
});


app.get('/usuarios', authMiddleware, (req, res) => {
    connection.query('SELECT * FROM Usuario', (error, results) => {
        if (error) {
            console.error("Erro ao obter a lista de usuários:", error);
            return res.status(500).json({ message: "Erro ao obter a lista de usuários", error: error.message });
        }
        res.status(200).json(results);
    });
});
app.get('/usuario', authMiddleware, (req, res) => {
    const userId = req.user.id;

    connection.query(
        'SELECT Usuario.id, Usuario.nome, Usuario.email, Usuario.telefone, Usuario.data_nasc, QuizPerfilInvestidor.perfil_calculado FROM Usuario LEFT JOIN QuizPerfilInvestidor ON Usuario.id = QuizPerfilInvestidor.usuario_id WHERE Usuario.id = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao obter dados do usuário:", error);
                return res.status(500).json({ message: "Erro ao obter dados do usuário", error: error.message });
            }

            if (results && results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: "Usuário não encontrado" });
            }
        }
    );
});

app.post('/save-quiz', authMiddleware, (req, res) => {
    const { score, investorProfile } = req.body;
    const userId = req.user.id;

    if (!score || !investorProfile) {
        return res.status(400).json({ message: "Pontuação e perfil de investidor são obrigatórios" });
    }

    const dataRespostas = new Date();

    connection.query(
        'INSERT INTO QuizPerfilInvestidor (data_respostas, perfil_calculado, usuario_id) VALUES (?, ?, ?)',
        [dataRespostas, investorProfile, userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao salvar o resultado do quiz:", error);
                return res.status(500).json({ message: "Erro ao salvar o resultado do quiz", error: error.message });
            }
            res.status(201).json({ message: "Resultado do quiz salvo com sucesso!" });
        }
    );
});
app.put('/usuario', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const { nome, email, telefone, data_nasc } = req.body;

    connection.query(
        'UPDATE Usuario SET nome = ?, email = ?, telefone = ?, data_nasc = ? WHERE id = ?',
        [nome, email, telefone, data_nasc, userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao atualizar dados do usuário:", error);
                return res.status(500).json({ message: "Erro ao atualizar dados do usuário", error: error.message });
            }
            res.status(200).json({ message: "Dados do usuário atualizados com sucesso!" });
        }
    );
});

app.delete('/usuario', authMiddleware, (req, res) => {
    const userId = req.user.id;

    connection.query(
        'DELETE FROM Usuario WHERE id = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao excluir usuário:", error);
                return res.status(500).json({ message: "Erro ao excluir usuário", error: error.message });
            }
            res.status(200).json({ message: "Usuário excluído com sucesso!" });
        }
    );
});
app.delete('/usuario/quiz', authMiddleware, (req, res) => {
    const userId = req.user.id;

    connection.query(
        'DELETE FROM QuizPerfilInvestidor WHERE usuario_id = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao excluir o resultado do quiz:", error);
                return res.status(500).json({ message: "Erro ao excluir o resultado do quiz", error: error.message });
            }
            res.status(200).json({ message: "Resultado do quiz excluído com sucesso!" });
        }
    );
});
app.get('/usuario/quiz/existe', authMiddleware, (req, res) => {
    const userId = req.user.id;

    connection.query(
        'SELECT * FROM QuizPerfilInvestidor WHERE usuario_id = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao verificar o quiz do usuário:", error);
                return res.status(500).json({ message: "Erro ao verificar o quiz do usuário", error: error.message });
            }

            if (results && results.length > 0) {
                res.status(200).json({ message: "Usuário já possui um quiz realizado. Exclua o quiz existente antes de criar um novo." });
            } else {
                res.status(200).json({ message: "Usuário não possui um quiz realizado. Pode prosseguir com a criação do quiz." });
            }
        }
    );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
