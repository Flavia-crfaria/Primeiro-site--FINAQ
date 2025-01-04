import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  padding: 50px;
  color: #004f42;
  min-height: 100vh;
  background-color: #ddd;
  `;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin: 10px 0;
`;

const CalculatorBox = styled.div`
  flex: 1;
  max-width: 600px;
`;

const ResultBox = styled.div`
  flex: 1;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 200;
  color: #004f42;
  text-align: center;
`;

const Input = styled.input`
  padding: 30px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  width: 100%;
  font-size: 1.5rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #11a88a;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 10px;
  font-size: 1.2rem;

  &:hover {
    background-color: #004f42;
  }
`;

const Result = styled.div`
  font-size: 1.6rem;
  color: #333;
`;

const Explanation = styled.p`
  font-size: 1rem;
  color: #555;
`;

function MaxMinCalculator() {
  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState('');
  const [debt, setDebt] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [results, setResults] = useState(null);
  const [debtResult, setDebtResult] = useState(null);

  const handleOptimization = (e) => {
    e.preventDefault();
    const budgetAmount = parseFloat(budget);
    const fixedExpenses = parseFloat(expenses);
    const savingsAmount = budgetAmount * 0.1;
    const remainingBudget = budgetAmount - fixedExpenses - savingsAmount;

    const recommendations = {
      food: { min: 800, max: 1000 },
      transport: { max: 500 },
      leisure: { max: 300 },
    };

    const optimizedSpending = {
      food: Math.min(remainingBudget * 0.4, recommendations.food.max),
      transport: Math.min(remainingBudget * 0.2, recommendations.transport.max),
      leisure: Math.min(remainingBudget * 0.1, recommendations.leisure.max),
    };

    setResults({ optimizedSpending, budgetAmount, fixedExpenses, savingsAmount, remainingBudget });
  };

  const handleDebtCalculation = (e) => {
    e.preventDefault();
    const totalDebt = parseFloat(debt);
    const monthlyAmount = parseFloat(monthlyPayment);
    const interestRate = 0.02;

    let months = 0;
    let currentDebt = totalDebt;

    while (currentDebt > 0) {
      currentDebt = currentDebt + currentDebt * interestRate - monthlyAmount;
      months++;
      if (months > 1000) break;
    }

    setDebtResult(months <= 1000 ? months : 'Inviável com o pagamento mensal atual');
  };

  const handleClear = () => {
    setBudget('');
    setExpenses('');
    setDebt('');
    setMonthlyPayment('');
    setResults(null);
    setDebtResult(null);
  };

  return (
    <CalculatorContainer>
      <Title>Calculadora Financeira</Title>

      
      <Section>
        <CalculatorBox>
          <SubTitle>Otimização de Gastos</SubTitle>
          <Input
            type="number"
            placeholder="Orçamento Total Mensal (R$)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Despesas Fixas (R$)"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
          />
          <Button onClick={handleOptimization}>Calcular Gastos Ideais</Button>
          <Button onClick={handleClear} style={{ marginTop: '10px' }}>Limpar</Button>
        </CalculatorBox>

        <ResultBox>
          {results && (
            <Result>
              <p>Gastos Sugeridos:</p>
              <p>Alimentação: R$ {results.optimizedSpending.food.toFixed(2)}</p>
              <Explanation>Sugerimos até 20% do orçamento para alimentação.</Explanation>
              <p>Transporte: R$ {results.optimizedSpending.transport.toFixed(2)}</p>
              <p>Lazer: R$ {results.optimizedSpending.leisure.toFixed(2)}</p>
              <p>Poupança (10%): R$ {results.savingsAmount.toFixed(2)}</p>
            </Result>
          )}
        </ResultBox>
      </Section>

      
      <Section>
        <CalculatorBox>
          <SubTitle>Redução de Dívidas</SubTitle>
          <Input
            type="number"
            placeholder="Total das Dívidas (R$)"
            value={debt}
            onChange={(e) => setDebt(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Pagamento Mensal (R$)"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
            required
          />
          <Button onClick={handleDebtCalculation}>Calcular Tempo de Quitação</Button>
        </CalculatorBox>

        <ResultBox>
          {debtResult && (
            <Result>
              <p>Tempo estimado para quitar a dívida: {debtResult} meses</p>
              <Explanation>Considera-se uma taxa de juros de 2% ao mês.</Explanation>
            </Result>
          )}
        </ResultBox>
      </Section>
    </CalculatorContainer>
  );
}

export default MaxMinCalculator;

