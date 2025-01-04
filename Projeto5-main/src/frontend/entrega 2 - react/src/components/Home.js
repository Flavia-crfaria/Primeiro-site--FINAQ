import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Footer from './Footer';  
import Banner from './Banner';
import financialGraph from '../img/financialGraph.png';
import spreadsheet from '../img/spreadsheet.png';
import handsStackingCoins from '../img/handsStackingCoins.png';

const HomeContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  color: #ffffff;  
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0; 
  text-align: center;
`;

const Section = styled.section`
  padding: 60px 300px;
  text-align: center;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: -30px auto;
  overflow: hidden;
`;

const CarouselItem = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  background-color: #f5f5f5; 
  border-radius: 10px; 
  padding: 30px 100px; 
  margin: 20px 0;
  text-align: left; 
  border: 2px solid #d1d1d1; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border: 2px solid #d1d1d1;
  border-radius: 5px;
  padding: 60px 20px;
  cursor: pointer;
  z-index: 1;
  font-size: 1.2rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }
`;


const TipTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
`;

const TipDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ServiceBlock = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
  width: 100%;
  max-width: 800px;
  border: 2px solid #d1d1d1;
  display: flex;
  align-items: center;
`;

const ServiceBlockMiddle = styled(ServiceBlock)`
  flex-direction: row-reverse; 
`;

const ServiceText = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ServiceTextMiddle = styled(ServiceText)`
  margin-left: 20px;
  margin-right: 0;
`;

const ServiceTextLast = styled(ServiceText)`
  margin-bottom: 20px;
`;

const ServiceImage = styled.img`
  width: 400px;
  height: auto;
  border-radius: 10px;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 10px 0;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

const ServiceDescriptionLast = styled(ServiceDescription)`
  margin-bottom: 30px;
`;

const EnterButtonLast = styled(Link)`
  background-color: #004f42;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 143px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    background-color: #00352f;
  }
`;

function Home() {
  const [currentTip, setCurrentTip] = useState(0);
  const tips = [
    { title: "Faça um Orçamento Mensal", description: "Mantenha suas finanças organizadas controlando sua receita e despesas mensais." },
    { title: "Pague suas Contas em Dia", description: "Evite multas e mantenha uma boa pontuação de crédito pagando suas contas em dia." },
    { title: "Reserve um Fundo de Emergência", description: "Tenha um fundo de emergência para cobrir despesas inesperadas." },
    { title: "Invista em Conhecimento Financeiro", description: "Invista em educação financeira para tomar decisões informadas." },
    { title: "Evite Compras por Impulso", description: "Evite compras por impulso refletindo antes de comprar." },
    { title: "Conheça o Banco do Povo", description: "Aprenda sobre bancos comunitários que oferecem suporte financeiro para empreendedores." },
    { title: "Revise Seus Gastos Regularmente", description: "Revise seus gastos regularmente para identificar oportunidades de economia." },
    { title: "Tenha um Plano de Pagamento para Dívidas", description: "Crie um plano de pagamento para gerenciar e reduzir dívidas." },
  ];

  const handleNext = () => {
    setCurrentTip((currentTip + 1) % tips.length);
  };

  const handlePrevious = () => {
    setCurrentTip((currentTip - 1 + tips.length) % tips.length);
  };

  return (
    <HomeContainer>
      <MainContent>
        <Banner texto={<Link to="/sobre-nos" style={{ color: 'inherit', textDecoration: 'none' }}>SUA MUDANÇA FINANCEIRA COMEÇA AQUI!</Link>} />
        <Section>
          <CarouselContainer>
            {tips.map((tip, index) => (
              <CarouselItem key={index} active={index === currentTip}>
                <TipTitle>{tip.title}</TipTitle>
                <TipDescription>{tip.description}</TipDescription>
              </CarouselItem>
            ))}
            <NavigationButton onClick={handlePrevious}>{"<"}</NavigationButton>
            <NavigationButton onClick={handleNext}>{">"}</NavigationButton>
          </CarouselContainer>
          <ServiceContainer>
            <ServiceBlock>
              <ServiceText>
                <ServiceTitle>DESCUBRA SEU PERFIL DE INVESTIDOR</ServiceTitle>
                <ServiceDescription>Permita alinhar expectativas e objetivos financeiros, garantindo decisões mais seguras e personalizadas.</ServiceDescription>
              </ServiceText>
              <ServiceImage src={financialGraph} alt="Gráfico financeiro" />
            </ServiceBlock>
            <ServiceBlockMiddle>
              <ServiceTextMiddle>
                <ServiceTitle>BAIXE SUA PLANILHA PERSONALIZADA!</ServiceTitle>
                <ServiceDescription>Organize suas finanças de forma prática com nossa planilha personalizada e fácil de usar.</ServiceDescription>
              </ServiceTextMiddle>
              <ServiceImage src={spreadsheet} alt="Planilha" />
            </ServiceBlockMiddle>
            <ServiceBlock>
              <ServiceTextLast>
                <ServiceTitle>DICAS PRATICAS PARA VOCÊ!</ServiceTitle>
                <ServiceDescriptionLast>Aprenda estratégias simples e eficazes para administrar melhor seu dinheiro e alcançar seus objetivos financeiros.</ServiceDescriptionLast>
                <EnterButtonLast to="/dicas">Dicas</EnterButtonLast>
              </ServiceTextLast>
              <ServiceImage src={handsStackingCoins} alt="Mãos empilhando moedas" />
            </ServiceBlock>
          </ServiceContainer>
        </Section>
      </MainContent>
    </HomeContainer>
  );
}

export default Home;
