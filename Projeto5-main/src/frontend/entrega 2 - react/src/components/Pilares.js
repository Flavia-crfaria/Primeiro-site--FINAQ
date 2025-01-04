import React from 'react';
import styled from 'styled-components';
import { FaChartLine, FaLightbulb, FaCoins } from 'react-icons/fa'; 


const ContainerExterno = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  min-height: 700px;
  max-width: 1700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h2`
  text-align: center;
  color: #004f42;
  margin-bottom: 40px;
  font-size: 40px;
`;

const PilaresContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 150px;  
  width: 100%;
`;

const Pilar = styled.div`
  text-align: center;
  max-width: 400px;

  h3 {
    margin: 20px 0;
    color: #004f42;
    font-size: 30px;
  }

  p {
    font-size: 28px;
    color: #333;
    font-weight: 200;
    line-height: 1.5;
  }
`;

function Pilares() {
  return (
    <ContainerExterno>
      <Titulo>Nossos Pilares</Titulo>
      <PilaresContainer>
        <Pilar>
          <FaChartLine size={80} color="#004f42" />
          <h3>Crescimento Sustentável</h3>
          <p>Promover um crescimento contínuo e saudável do PIB. Isso implica em fomentar a inovação, gerar empregos e garantir um desenvolvimento sustentável.</p>
        </Pilar>
        <Pilar>
          <FaLightbulb size={80} color="#004f42" />
          <h3>Inovação e Tecnologia</h3>
          <p>Promover atividades de alto valor agregado e soluções criativas. Isso envolve incentivar a inovação, a colaboração e a adaptação às novas demandas do consumidor.</p>
        </Pilar>
        <Pilar>
          <FaCoins size={80} color="#004f42" />
          <h3>Desenvolvimento Econômico</h3>
          <p>Elevar a produtividade através da diversificação das economias. Ao diversificar setores e estimular novas indústrias, promovemos inovação e novas oportunidades.</p>
        </Pilar>
      </PilaresContainer>
    </ContainerExterno>
  );
}

export default Pilares;
