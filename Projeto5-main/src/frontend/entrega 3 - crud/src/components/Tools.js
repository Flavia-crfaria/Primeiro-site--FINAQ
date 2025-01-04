import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faFileDownload, faCalculator } from '@fortawesome/free-solid-svg-icons';
import Banner from './Banner';
import ferramentas3 from '../img/ferramentas3.jpeg';
import ferramentas from '../img/ferramentas.jpeg';
import ferramentas2 from '../img/ferramentas2.png';
import { useNavigate } from 'react-router-dom';


 const Container = styled.div`
   text-align: center;
   min-height: 100vh;
   color: #333;
   background-color: #EEEDED; 
 `;
 const Section = styled.section`
   margin: 30px 0;
 `;
 const SubTitle = styled.h2`
   font-size: 2rem;
   font-family: 'Poppins', sans-serif;
   color: #004f42;
   margin: 10px 0;
   display: center;
   align-items: auto;
   gap: 10px;
 `;
 const Paragraph = styled.p`
   font-size: 1.6rem;
   font-family: 'Roboto', sans-serif;
   color: #333;
   max-width: 400px;
   margin: 10px auto;
 `;
 const ToolCard = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 300px;
   margin: 10px 0;
   padding: 50px;
   margin-left: 40px;
   margin-right: 40px;
   border-radius: 10px;
   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s, box-shadow 0.3s;
   flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
   &:hover {
     transform: scale(1.02);
     box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
     background-color: #E6FDF8;
   }
 `;
 const Content = styled.div`
   flex: 1;
   text-align: center;
 `;
 const ToolButton = styled.a`
   display: inline-block;
   margin-top: 10px;
   padding: 20px 30px;
   background-color: #11a88a;
   color: white;
   text-decoration: none;
   transition: background-color 0.3s, transform 0.2s;
   border-radius: 10px;
   font-size: 19px;
   &:hover {
     background-color: #007d63;
     transform: scale(1.05);
     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
   }
 `;
 const ImageContainer = styled.div`
  flex: 1;
   display: flex;
   justify-content: center;
   img {
     max-width: 550px;
     height: auto;
     border-radius: 5px;
   }
 `;

function Tools() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Você precisa estar logado para acessar essa página!");
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

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
