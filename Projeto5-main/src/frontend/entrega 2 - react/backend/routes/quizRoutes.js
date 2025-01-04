const express = require('express');
const { createQuiz, getQuiz } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', authMiddleware, getQuiz);

module.exports = router;
