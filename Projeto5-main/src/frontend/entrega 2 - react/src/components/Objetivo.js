import React from 'react';
import styled from 'styled-components';
import objetivoImage from '../img/objetivoImage.jpg';

const ObjetivoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextoContainer = styled.div`
  flex: 1;
  padding-right: 10rem;
  font-weight: 200;

  @media (max-width: 768px) {
    padding-right: 0;
  }

  h2 {
    color: #004f42;
    font-size: 5rem;
    font-weight: 200;
    margin-bottom: 18rem;
  }

  p {
    color: #333;
    font-size: 2.5rem;
    margin-top: -6em;
    font-weight: 200;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 900px;
    height: auto;
    border-radius: 50px;
  }
`;

function Objetivo() {
  return (
    <ObjetivoContainer>
      <TextoContainer>
        <h2>OBJETIVO</h2>
        <p>
          Nossa missão é mudar a forma como você enxerga e gerencia seu dinheiro.
          Acreditamos que o caminho para a prosperidade começa com um planejamento
          estratégico e uma visão clara do futuro.
        </p>
      </TextoContainer>
      <ImageContainer>
      <img src={objetivoImage} alt="Imagem ilustrativa sobre planejamento financeiro" />
      </ImageContainer>
    </ObjetivoContainer>
  );
}

export default Objetivo;
