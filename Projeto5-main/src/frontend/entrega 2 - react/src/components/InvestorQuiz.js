import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChartLine, FaShieldAlt, FaCoins } from 'react-icons/fa';


const QuizContainer = styled.div`
  padding: 200px;
  text-align: center;
  color: #000;
  background: linear-gradient(130deg, #002D21 15%, #9BDDC1 58%, #027553 80%); 
  min-height: 100vh; 
`;


const Question = styled.h2`
  font-size: 2.5rem;
`;

const Options = styled.div`
  margin: 20px 0;
`;

const OptionButton = styled.button`
  background-color: #11a88a;
  color: white;
  border: none;
  padding: 20px 30px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.4rem;

  &:hover {
    background-color: #004f42;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  background-color: #f1f9f8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;



const questions = [
  {
    question: '1. Qual é a sua experiência com investimentos?',
    options: [
      { text: 'Nenhuma experiência, prefiro aprender antes de investir.', points: 1 },
      { text: 'Tenho alguma experiência com investimentos de baixo risco.', points: 2 },
      { text: 'Já invisto em renda variável, como ações e fundos multimercado.', points: 3 },
    ],
  },
  {
    question: '2. Qual é o seu objetivo principal ao investir?',
    options: [
      { text: 'Proteger o meu capital e evitar perdas.', points: 1 },
      { text: 'Crescer o meu patrimônio a médio prazo, aceitando algum risco.', points: 2 },
      { text: 'Obter altos retornos a longo prazo, mesmo com riscos maiores.', points: 3 },
    ],
  },
  {
    question: '3. Como você reagiria se seus investimentos sofressem uma queda de 20% em um curto período?',
    options: [
      { text: 'Ficaria muito preocupado e provavelmente retiraria o dinheiro.', points: 1 },
      { text: 'Ficaria um pouco desconfortável, mas manteria o investimento.', points: 2 },
      { text: 'Entenderia que faz parte do mercado e esperaria uma recuperação.', points: 3 },
    ],
  },
  {
    question: '4. Qual é o seu horizonte de investimento?',
    options: [
      { text: 'Menos de 1 ano.', points: 1 },
      { text: 'Entre 1 e 5 anos.', points: 2 },
      { text: 'Mais de 5 anos.', points: 3 },
    ],
  },
  {
    question: '5. Como você se sente em relação a investimentos de alto risco que podem proporcionar retornos elevados?',
    options: [
      { text: 'Prefiro evitar qualquer tipo de investimento de alto risco.', points: 1 },
      { text: 'Estou disposto a arriscar uma pequena parte do meu capital.', points: 2 },
      { text: 'Estou confortável em investir uma parte significativa do meu dinheiro em opções de alto risco.', points: 3 },
    ],
  },
];

function InvestorQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleOptionClick = (points) => {
    setScore(score + points);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const getInvestorProfile = (score) => {
    if (score >= 5 && score <= 7) return 'Conservador';
    if (score >= 8 && score <= 11) return 'Moderado';
    if (score >= 12 && score <= 15) return 'Agressivo';
    return 'Indefinido';
  };

  return (
    <QuizContainer>
      {!quizComplete ? (
        <>
          <Question>{questions[currentQuestion].question}</Question>
          {questions[currentQuestion].options.map((option, index) => (
  <OptionButton key={index} onClick={() => handleOptionClick(option.points)}>
    {index === 0 && <FaShieldAlt style={{ marginRight: '8px' }} />}
    {index === 1 && <FaChartLine style={{ marginRight: '8px' }} />}
    {index === 2 && <FaCoins style={{ marginRight: '8px' }} />}
    {option.text}
  </OptionButton>
))}

        </>
      ) : (
        <Result>
  <h2>Resultado do Quiz</h2>
  <p>Sua pontuação: {score}</p>
  <p>Perfil de Investidor: {getInvestorProfile(score)}</p>
  <p>
  {getInvestorProfile(score) === 'Conservador' &&
    'Você prioriza a segurança em seus investimentos e prefere opções com risco mínimo.'}
  {getInvestorProfile(score) === 'Moderado' &&
    'Você busca um equilíbrio entre segurança e crescimento, aceitando riscos controlados.'}
  {getInvestorProfile(score) === 'Agressivo' &&
    'Você está disposto a correr riscos maiores em busca de retornos significativos.'}
</p>
  <OptionButton onClick={() => window.location.href = '/artigos'}>
    Descubra mais sobre seu perfil
  </OptionButton>
</Result>

      )}
    </QuizContainer>
  );


}

export default InvestorQuiz;
