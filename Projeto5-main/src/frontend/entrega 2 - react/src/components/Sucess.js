import React from 'react';
import styled from 'styled-components';
import Banner from '../components/Banner';

const Container = styled.div`
  text-align: center;
  min-height: 100vh;
  color: #004f42;
  background-color: #ddd; 
`;


function Sucess () {
  return (
    <Container>
    <Banner
     texto= "Negócios Globais, Política e Muito Mais!"
     descricao= "Confira as últimas notícias financeiras globais, com atualizações sobre mercados, economia e investimentos. Acompanhe as tendências econômicas que impactam o cenário global."/>
  </Container>
);
}

export default Sucess;