import React from 'react';
import styled, { keyframes } from 'styled-components';
import bgImage from '../img/bg.jpeg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const BannerContainer = styled.div`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.8));
    z-index: 1;
  }

  h1, p, h2 {
    z-index: 2; 
    animation: ${fadeIn} 1s ease-in-out;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0px; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Paragraph = styled.p`
  font-size: 1.7rem; 
  color: #ffffff;
  max-width: 800px; 
  line-height: 1.8; 
  margin: 0 auto; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #ffffff; 
  margin-bottom: 10px; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

function Banner({ id, texto, texto2, descricao }) {
  return (
    <BannerContainer id={id}>
      <Title>{texto}</Title>
      <Subtitle>{texto2}</Subtitle>
      <Paragraph>{descricao}</Paragraph>
    </BannerContainer>
  );
}

export default Banner;