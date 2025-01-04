import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faFileDownload, faCalculator } from '@fortawesome/free-solid-svg-icons';
import Banner from './Banner';
import ferramentas3 from '../img/ferramentas3.jpeg';
import ferramentas from '../img/ferramentas.jpeg';
import ferramentas2 from '../img/ferramentas2.png';

const Container = styled.div`
  text-align: center;
  min-height: 100vh;
  color: #ffffff;  
  background-color: #f5f5f5; 
`;

const Section = styled.section`
  padding: 60px 600px;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 10px 0;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
`;

const ToolCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  border: 2px solid #d1d1d1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};

  &:hover {
    transform: translateY(-10px);  
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Content = styled.div`
  flex: 1;
  text-align: left;
  margin-right: 30px;
  margin-left: 30px;
`;

const ToolButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #004f42;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #00352f;
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

function Tools() {
  return (
    <Container>
      <Banner
        texto="PAINEL DE CONTROLE PESSOAL"
        texto2="Ferramentas Práticas para Gestão e Planejamento Financeiro"
        descricao="Explore soluções simples e poderosas para organizar suas finanças, acompanhar seus gastos e alcançar seus objetivos financeiros de forma eficaz."
      />
      <Section>
        <ToolCard>
          <Content>
            <SubTitle><FontAwesomeIcon icon={faChartLine} /> DESCUBRA SEU PERFIL DE INVESTIDOR</SubTitle>
            <Paragraph>Permita alinhar expectativas e objetivos financeiros, garantindo decisões mais seguras e personalizadas.</Paragraph>
            <ToolButton href="/quiz">Quiz</ToolButton>
          </Content>
          <ImageContainer>
            <img src={ferramentas3} alt="Imagem ilustrativa sobre investimento" />
          </ImageContainer>
        </ToolCard>
        <ToolCard reverse>
          <Content reverse>
            <SubTitle><FontAwesomeIcon icon={faFileDownload} /> BAIXE SUA PLANILHA E PERSONALIZE!</SubTitle>
            <Paragraph>Organize suas finanças de forma prática com nossa planilha personalizada e fácil de usar.</Paragraph>
            <ToolButton href="https://download856.mediafire.com/yc4ndl7m2ydgBvEtCbXbFv1V_NH62tF4_NGNw0n4VjQjwRdj-lM70yKzKWcLVE_XRMojLg_tHU7ust-y9BC7iN7-ZSqK_ZYSGfYOzx4NBvU_ktGg8xCgwZhl3ETEWIMrc05-ShMXytNOa6rUExufTCDdwPZSceCC3Lx2EmKqu_oACfo/k20q7okxiy1x206/Planilha+Financeira.xlsx">Baixar</ToolButton>
          </Content>
          <ImageContainer>
            <img src={ferramentas2} alt="Imagem ilustrativa sobre planilha" />
          </ImageContainer>
        </ToolCard>
        <ToolCard>
          <Content>
            <SubTitle><FontAwesomeIcon icon={faCalculator} /> OTIMIZE SEUS GASTOS!</SubTitle>
            <Paragraph>Utilize nossa calculadora para Otimização de Gastos ou Redução de Dívidas.</Paragraph>
            <ToolButton href="/calculadora">Clique aqui</ToolButton>
          </Content>
          <ImageContainer>
            <img src={ferramentas} alt="Imagem ilustrativa sobre a calculadora" />
          </ImageContainer>
        </ToolCard>
      </Section>
    </Container>
  );
}

export default Tools;
