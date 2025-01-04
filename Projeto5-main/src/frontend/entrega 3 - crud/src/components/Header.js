 import React, { useEffect, useState } from 'react';
 import styled from 'styled-components';
 import axios from 'axios';
 const HeaderContainer = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 20px;
   background: linear-gradient(90deg, #013527 14%, #11a88a 85%);
   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
   height: 80px;
 `;
 const Logo = styled.div`
   img {
     width: 80px;
   }
 `;
 const Nav = styled.nav`
   flex: 1;
 `;
 const NavLinks = styled.ul`
   margin-left: -300px;
   list-style: none;
   display: flex;
   justify-content: center;
   gap: 40px;
 `;
 const NavLink = styled.a`
   color: white;
   text-decoration: none;
   font-size: 26px;
   padding: 5px 10px;
   transition: color 0.3s, background-color 0.3s;
   &:hover {
     color: #004f42; 
   }
 `;
 const ButtonContainer = styled.div`
   display: flex;
   gap: 10px;
 `;
 const CustomButton = styled.button`
   background-color: transparent;
   border: 2px solid white;
   color: white;
   padding: 10px 20px;
   cursor: pointer;
   border-radius: 20px;
   transition: all 0.3s ease;
   font-size: 17px;

   &:hover {
     background-color: #fff;
     color: #004f42;
   }
 `;
 function Header() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   useEffect(() => {
     const checkAuth = async () => {
       const token = localStorage.getItem('token');
       if (!token) {
         setIsAuthenticated(false);
         return;
       }
       try {
         const response = await axios.get('http://localhost:3001/usuario', {
           headers: { Authorization: `Bearer ${token}` },
         });
         if (response.status === 200) {
           setIsAuthenticated(true);
         }
       } catch (error) {
         console.error("Erro ao verificar autenticação:", error);
         setIsAuthenticated(false);
       }
     };
     checkAuth();
   }, []);
   return (
     <HeaderContainer>
       <Logo>
         <img src="/logo.jpeg" alt="Sua Logo" />
       </Logo>
       <Nav>
         <NavLinks>
           <li><NavLink href="/">Home</NavLink></li>
           <li><NavLink href="/dicas">Dicas</NavLink></li>
           <li><NavLink href="/ferramentas">Ferramentas</NavLink></li>
           <li><NavLink href="/sobre-nos">Sobre Nós</NavLink></li>
         </NavLinks>
       </Nav>
       <ButtonContainer>
         <CustomButton>
           <NavLink href="/Hero">Sign Up</NavLink>
         </CustomButton>
         <CustomButton>
           <NavLink href={isAuthenticated ? "/user" : "/login"}>
             Account
           </NavLink>
         </CustomButton>
       </ButtonContainer>
     </HeaderContainer>
   );
 }
 export default Header;
