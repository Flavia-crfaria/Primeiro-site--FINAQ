import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const HeroContainer = styled.section`
 display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 2%;
   flex-direction: flex; 
   text-align: center; 
   min-height: 100vh; 
   background: linear-gradient(130deg, #002D21 15%, #9BDDC1 58%, #027553 80%); 
   color: white;
 `;
const Content = styled.div`
   margin-bottom: 2rem; 
 `;
const Heading = styled.h1`
   font-size: 2.5rem; 
   margin-bottom: 1rem; 

   @media (max-width: 768px) {
     font-size: 2rem; 
   }
   @media (max-width: 480px) {
     font-size: 1.5rem; 
   }

 `;

const Paragraph = styled.p`
   font-size: 1.5rem; 
   line-height: 1.6; 
   max-width: 600px; 
   margin: 0 auto; 

   @media (max-width: 768px) {
     font-size: 0.2rem; 
   }
   @media (max-width: 480px) {
     font-size: 0.1rem; }
 `;


const FormContainer = styled.div`
   h2 {
     margin-bottom: 1rem;
     font-size: 2rem;
     text-align: center;
     margin-left: -55px;
   }
 `;

const StyledForm = styled.form`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: 100%;
   max-width: 350px;
   padding: 0;
   background: none;
 `;

const StyledInput = styled.input`
   padding: 0.8rem;
   border: none;
   border-radius: 30px;
   background-color: rgba(255, 255, 255, 0.3);
   color: #fff;
   font-size: 1rem;
   width: 45vw; 
   max-width: 600px;
   margin-left: auto;
   margin-left: -150px;
   &::placeholder {
     color: white;
   }
 `;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: -90px; 
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
`;

const StyledButton = styled.button`
   background-color: transparent;
   border: 1px solid #FFFF;
   color: white;
   padding: 0.8rem;
   border-radius: 25px;
   cursor: pointer;
   font-size: 1rem;
   width: auto;
   transition: all 0.3s ease;
   margin-top: 10px;
   margin-left: -50px;
   &:hover {
     background-color: #fff;
     color: #004f42;
   }
 `;
const SocialLogin = styled.div`
   display: flex;
   justify-content: center; 
   gap: 1rem; 
   margin-left: -50px;
 `;
const SocialLink = styled.a`
   img {
     width: 30px; 
     height: auto; 
   }
 `;
const Login = styled.div`
   text-align: center;
   p {
     font-size: 14px;
     margin-bottom: 10px;
     margin-left: -50px;
   }
 `;
function Hero() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_nasc: '',
    password: '',
    confirmPassword: ''
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem. Tente novamente.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/criar', {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        data_nasc: formData.data_nasc,
        senha: formData.password
      });

      if (response.status === 201) {
        alert("Registro bem-sucedido!");
        navigate('/login'); 
      } else {
        alert("Erro ao registrar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar. Tente novamente.");
    }
  };


  return (
    <HeroContainer>
      <Content>
        <Heading>Empoderando você financeiramente!</Heading>
        <Paragraph>
          Domine suas finanças com conteúdos educativos, planilhas personalizadas e interações que estimulam investimentos.
        </Paragraph>
      </Content>
      <FormContainer>
        <h2>Crie uma conta</h2>
        <StyledForm id="formCadastro" onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="tel"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <StyledInput
            type="date"
            name="data_nasc"
            placeholder="Data de nascimento"
            value={formData.data_nasc}
            onChange={handleChange}
            required
          />

          <PasswordContainer>
            <StyledInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Criar senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <TogglePasswordButton onClick={handleTogglePassword} type="button">
              {showPassword ? "Ocultar" : "Mostrar"}
            </TogglePasswordButton>
          </PasswordContainer>

          <PasswordContainer>
            <StyledInput
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <TogglePasswordButton onClick={handleTogglePassword} type="button">
              {showPassword ? "Ocultar" : "Mostrar"}
            </TogglePasswordButton>
          </PasswordContainer>

          <Login>
            <p>Já tem uma conta? Conecte-se</p>
            <SocialLogin>
              <SocialLink href="#"><img src="/facebook.png" alt="Facebook" /></SocialLink>
              <SocialLink href="#"><img src="/linkedin.png" alt="LinkedIn" /></SocialLink>
              <SocialLink href="#"><img src="/gmail.png" alt="Gmail" /></SocialLink>
            </SocialLogin>
          </Login>
          <StyledButton type="submit">Começar</StyledButton>
        </StyledForm>
      </FormContainer>
    </HeroContainer>
  );
}

export default Hero;