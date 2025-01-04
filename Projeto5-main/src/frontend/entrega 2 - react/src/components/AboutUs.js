import React from 'react';
import styled from 'styled-components';
import Pilares from '../components/Pilares';
import Objetivo from '../components/Objetivo';
import Botao from '../components/Button';
import Banner from '../components/Banner';
import Footer from './Footer';
import objetivoImage from '../img/objetivoImage.jpg';  // Importando a imagem diretamente

const Container = styled.div`
  text-align: center;
  min-height: 100vh;
  color: #004f42;
  background-color: #f5f5f5; 
  margin: 0;
  padding: 0;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0; 
  text-align: center;
`;

const FullWidthSection = styled.section`
  width: 100%;
  padding: 0;
  text-align: center;
  background-color: #fff;
  margin: 0;
`;

const Section = styled.section`
  padding: 10px 300px;
  text-align: center;
`;

const SeparatedSection = styled.div`
  margin-bottom: 10rem; 
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 26px;
  padding: 5px 10px;
  transition: color 0.3s, background-color 0.3s;
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
`;

const ServiceBlock = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
  width: 100%;
  max-width: 1700px; /* Ajustando a largura */
  border: 2px solid #d1d1d1;
  display: flex;
  align-items: center;
`;

const ServiceText = styled.div`
  flex: 1;
  margin-right: 200px;
  margin-left: 100px;
`;

const ServiceImage = styled.img`
  width: 400px;
  height: auto;
  border-radius: 20px;
  margin-right: 130px;
`;

const ServiceTitle = styled.h3`
  font-size: 3rem;
  color: #333;
  margin: 10px 0;
`;

const ServiceDescription = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

function AboutUs() {
  return (
    <Container>
      <MainContent>
        <FullWidthSection>
          <Banner
            texto="SOBRE NÓS"
            texto2="Transformando Suas Finanças, Conquistando Seu Futuro"
            descricao="Oferecemos orientação financeira personalizada para que você possa alcançar seus objetivos com segurança e confiança."
          />
        </FullWidthSection>
        <Section>
          <Pilares />
        </Section>
        <Section>
          <Botao texto="Faça sua inscrição"><NavLink href="/">Minha conta</NavLink></Botao>
        </Section>
        <Section>
          <ServiceContainer>
            <ServiceBlock>
              <ServiceText>
                <ServiceTitle>Objetivo</ServiceTitle>
                <ServiceDescription>Nossa missão é mudar a forma como você enxerga e gerencia seu dinheiro. Acreditamos que o caminho para a prosperidade começa com um planejamento estratégico e uma visão clara do futuro.</ServiceDescription>
              </ServiceText>
              <ServiceImage src={objetivoImage} alt="Imagem do objetivo" />
            </ServiceBlock>
          </ServiceContainer>
        </Section>
      </MainContent>
    </Container>
  );
}

export default AboutUs;
