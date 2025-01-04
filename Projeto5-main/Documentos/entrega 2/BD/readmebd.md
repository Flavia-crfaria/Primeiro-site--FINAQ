CREATE DATABASE finaq_db;
use finaq_db;
CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    data_nasc DATE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE QuizPerfilInvestidor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_respostas DATE,
    perfil_calculado VARCHAR(50),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);
