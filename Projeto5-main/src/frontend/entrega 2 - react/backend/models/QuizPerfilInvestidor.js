const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const QuizPerfilInvestidor = sequelize.define('QuizPerfilInvestidor', {
    perfil_calculado: { type: DataTypes.STRING, allowNull: false },
    data_resposta: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

QuizPerfilInvestidor.belongsTo(User);

module.exports = QuizPerfilInvestidor;
