import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: transparent;
  color: #004f42;
  border: 2px solid #004f42;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 30px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin: 20px auto;
  display: block;

  &:hover {
    background-color: #004f42;
    color: white;
  }
`;

const Botao = ({ texto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); 
  };

  return <StyledButton onClick={handleClick}>{texto}</StyledButton>;
};

export default Botao;

