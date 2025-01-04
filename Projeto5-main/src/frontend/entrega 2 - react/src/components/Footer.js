import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background: linear-gradient(90deg, #013527 14%, #11a88a 85%);
  color: white;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2024 - Finaq</p>
    </FooterContainer>
  );
}

export default Footer;