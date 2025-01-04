import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import Banner from './Banner';
import financialGraph from '../img/financialGraph.png';
import spreadsheet from '../img/spreadsheet.png';
import handsStackingCoins from '../img/handsStackingCoins.png';
import orcamentoMensal from '../img/orcamentoMensal.png';
import conhecimentoFinanceiro from '../img/conhecimentoFinanceiro.png';
import comprasImpulso from '../img/comprasImpulso.png';
import bancoPovo from '../img/bancoPovo.png';
import reviseGastos from '../img/reviseGastos.png';
import planoPagamento from '../img/planoPagamento.png';

const HomeContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  color: #ffffff;  
  background-color: #e8f5e9;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0; 
  text-align: center;
`;

const Section = styled.section`
  padding: 60px 130px;
  text-align: center;
  background-color: #EEEDED;
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  color: #333;
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(-${props => props.activeIndex * 100}%);
  border-radius: 10px;
`;

const CarouselItem = styled.div` 
flex: 0 0 100%; 
width: 100%; 
padding: 30px; 
background-color: #ffffff; 
border-radius: 10px; 
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
padding-top: 200px; 
padding-bottom: 200px; 
position: relative; 
background-image: url(${props => props.bgImage}); 
background-size: cover; 
background-position: center; 
color: white; 
  
&::before { 
  content: ''; 
  position: absolute; 
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0; 
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px; } `;

const CarouselIndicators = styled.ol`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Indicator = styled.li`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#ffffff' : 'rgba(200, 200, 200, 0.5)'};
  cursor: pointer;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.0);
  color: #ffffff;
  border: 0px solid #d1d1d1;
  border-radius: 50%;
  padding: 20px;
  cursor: pointer;
  z-index: 1;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  ${props => props.position === 'left' ? 'left: 10px;' : 'right: 10px;'}
`;

const TipTitle = styled.h3` 
font-size: 3.5rem; 
color: #ffffff; 
margin: 10px 0; 
position: relative; 
z-index: 1; `;

const TipDescription = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  position: relative;
  z-index: 1;
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
  padding: 30px 60px;
  margin: 20px 0;
  text-align: left;
  width: 100%;
  border: 2px solid #d1d1d1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const ServiceBlockMiddle = styled(ServiceBlock)`
  flex-direction: row-reverse;
  text-align: right;
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
  font-size: 1.8rem;
  color: #004d40;
  margin: 10px 0;
`;

const ServiceDescription = styled.p`
  font-size: 1.2rem;
  color: #333;
`;

const ServiceDescriptionLast = styled(ServiceDescription)`
  margin-bottom: 30px;
`;

const EnterButtonLast = styled(Link)`
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 50px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #00352f;
  }
`;

const EnterButtonMiddle = styled.a`
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 50px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #00352f;
  }
`;

const EnterButtonFirst = styled(Link)`
  background-color: #004d40;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 50px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #00352f;
  }
`;

function Home() {
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    { title: "Faça um Orçamento Mensal", description: "Mantenha suas finanças organizadas controlando sua receita e despesas mensais.", bgImage: orcamentoMensal },
    { title: "Pague suas Contas em Dia", description: "Evite multas e mantenha uma boa pontuação de crédito pagando suas contas em dia.", bgImage: spreadsheet },
    { title: "Reserve um Fundo de Emergência", description: "Tenha um fundo de emergência para cobrir despesas inesperadas.", bgImage: handsStackingCoins },
    { title: "Invista em Conhecimento Financeiro", description: "Invista em educação financeira para tomar decisões informadas.", bgImage: conhecimentoFinanceiro },
    { title: "Evite Compras por Impulso", description: "Evite compras por impulso refletindo antes de comprar.", bgImage: comprasImpulso },
    { title: "Conheça o Banco do Povo", description: "Aprenda sobre bancos comunitários que oferecem suporte financeiro para empreendedores.", bgImage: bancoPovo },
    { title: "Revise Seus Gastos Regularmente", description: "Revise seus gastos regularmente para identificar oportunidades de economia.", bgImage: reviseGastos },
    { title: "Tenha um Plano de Pagamento para Dívidas", description: "Crie um plano de pagamento para gerenciar e reduzir dívidas.", bgImage: planoPagamento },
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
      <Banner 
  texto={
    <>
      SUA MUDANÇA FINANCEIRA COMEÇA <Link to="/sobre-nos" style={{ color: 'inherit', textDecoration: 'none' }}>
        <span style={{ textDecoration: 'underline' }}>AQUI!</span>
      </Link>
    </>
  } 
/>
        <Section>
          <CarouselContainer>
          <CarouselInner activeIndex={currentTip}>
  {tips.map((tip, index) => (
    <CarouselItem key={index} bgImage={tip.bgImage}>
      <TipTitle>{tip.title}</TipTitle>
      <TipDescription>{tip.description}</TipDescription>
    </CarouselItem>
  ))}
</CarouselInner>

            <NavigationButton position="left" onClick={handlePrevious}>
              &#10094;
            </NavigationButton>
            <NavigationButton position="right" onClick={handleNext}>
              &#10095;
            </NavigationButton>
            <CarouselIndicators>
              {tips.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === currentTip}
                  onClick={() => setCurrentTip(index)}
                />
              ))}
            </CarouselIndicators>
          </CarouselContainer>
          <ServiceContainer>
            <ServiceBlock>
              <ServiceText>
                <ServiceTitle>DESCUBRA SEU PERFIL DE INVESTIDOR</ServiceTitle>
                <ServiceDescription>Permita alinhar expectativas e objetivos financeiros, garantindo decisões mais seguras e personalizadas.</ServiceDescription>
                <EnterButtonFirst to="/quiz">Quiz</EnterButtonFirst>
              </ServiceText>
              <ServiceImage src={financialGraph} alt="Gráfico financeiro" />
            </ServiceBlock>
            
            <ServiceBlockMiddle>
              <ServiceTextMiddle>
                <ServiceTitle>BAIXE SUA PLANILHA PERSONALIZADA!</ServiceTitle>
                <ServiceDescription>Organize suas finanças de forma prática com nossa planilha personalizada e fácil de usar.</ServiceDescription>
                <EnterButtonMiddle 
                  href="https://download856.mediafire.com/yc4ndl7m2ydgBvEtCbXbFv1V_NH62tF4_NGNw0n4VjQjwRdj-lM70yKzKWcLVE_XRMojLg_tHU7ust-y9BC7iN7-ZSqK_ZYSGfYOzx4NBvU_ktGg8xCgwZhl3ETEWIMrc05-ShMXytNOa6rUExufTCDdwPZSceCC3Lx2EmKqu_oACfo/k20q7okxiy1x206/Planilha+Financeira.xlsx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Planilha
                </EnterButtonMiddle>
              </ServiceTextMiddle>
              <ServiceImage src={spreadsheet} alt="Planilha" />
            </ServiceBlockMiddle>
            
            <ServiceBlock>
              <ServiceTextLast>
                <ServiceTitle> OTIMIZE SEUS GASTOS!</ServiceTitle>
                <ServiceDescriptionLast>Utilize nossa calculadora para Otimização de Gastos ou Redução de Dívidas.</ServiceDescriptionLast>
                <EnterButtonLast to="/calculadora">Calculadora</EnterButtonLast>
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