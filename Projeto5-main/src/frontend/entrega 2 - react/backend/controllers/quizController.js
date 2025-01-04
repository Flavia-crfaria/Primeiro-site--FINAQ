const QuizPerfilInvestidor = require('../models/QuizPerfilInvestidor');

exports.createQuiz = async (req, res) => {
    try {
        const { perfil_calculado } = req.body;
        const userId = req.userId; // Assumindo que o ID do usuário é passado via middleware de autenticação
        const quiz = await QuizPerfilInvestidor.create({ perfil_calculado, UserId: userId });
        res.status(201).json({ message: 'Quiz criado com sucesso!', quiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getQuiz = async (req, res) => {
    try {
        const userId = req.userId;
        const quiz = await QuizPerfilInvestidor.findOne({ where: { UserId: userId } });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
