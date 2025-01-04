import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Tools from './components/Tools'; 
import Home from './components/Home'; 
import Tips from './components/Tips'; 
import AboutUs from './components/AboutUs';
import styled, { createGlobalStyle } from 'styled-components';  
import InvestorQuiz from './components/InvestorQuiz';
import MaxMinCalculator from './components/MaxMinCalculator';
import Login from './components/Login';
import UserData from './components/UserData';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: white;
    background-color: #f5f5f5;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  font-size: 1rem;
`;

function App() {
  return (
    <Router>
      <GlobalStyle /> 
      <AppContainer>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/Hero" element={<Hero />} /> 
            <Route path="/ferramentas" element={<Tools />} />
            <Route path="/dicas" element={<Tips />} /> 
            <Route path="/sobre-nos" element={<AboutUs />} /> 
            <Route path="/quiz" element={<InvestorQuiz />}/>
            <Route path="/calculadora" element={<MaxMinCalculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<UserData />} />
          </Routes>
        </main>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
