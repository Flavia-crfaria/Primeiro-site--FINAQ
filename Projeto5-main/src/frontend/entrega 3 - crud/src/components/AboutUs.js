import React from 'react';
import styled from 'styled-components';
import Pilares from '../components/Pilares';
import Objetivo from '../components/Objetivo';
import Botao from '../components/Button';
import Banner from '../components/Banner';

const Container = styled.div`
  text-align: center;
  min-height: 100vh;
  color: #004f42;
  background-color: #EEEDED; 
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

function AboutUs () {
  return (
    <Container>
      <SeparatedSection>
        <Banner
          texto="SOBRE NÓS"
          texto2="Transformando Suas Finanças, Conquistando Seu Futuro"
          descricao="Oferecemos orientação financeira personalizada para que você possa alcançar seus objetivos com segurança e confiança."
        />
      </SeparatedSection>
      
      <SeparatedSection>
        <Pilares />
      </SeparatedSection>
      
      <SeparatedSection>
        <Botao texto="Faça sua inscrição"><NavLink href="/Hero">Minha conta</NavLink></Botao>
      </SeparatedSection>
      
        <Objetivo />
    </Container>
  );
}

export default AboutUs