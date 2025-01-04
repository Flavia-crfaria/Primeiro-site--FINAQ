import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import agressivoImage from '../img/agressivo.jpg';
import moderadoImage from '../img/moderado.avif';
import conservadorImage from '../img/conservador.webp';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  background: #f4f4f9;
  color: #004f42;
  min-height: 100vh;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex: 1 1 45%;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px 0;
`;

const Sidebar = styled.div`
  flex: 1 1 40%;
  padding: 20px;
  background: #e0f2f1;
  text-align: justify;
`;

const ProfileContent = styled.div`
  flex: 1 1 55%;
  padding: 20px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const TipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  width: 80%;
`;

const Tip = styled.p`
  font-size: ${({ fontSize }) => fontSize || '1.1rem'};  
  line-height: 1.2;
  color: #333;
  margin: 5px 0;
  width: 100%;
  text-align: left;
`;

const InfoRow = styled.p`
  font-size: ${({ fontSize }) => fontSize || '1.2rem'};  
  color: #333;
  margin: 10px 0;

  strong {
    font-weight: 600;
    color: #004f42;
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: #004f42;
  color: white;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #004f42;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || '1rem'}; 
  margin-top: 20px;
  margin-right: 50px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00352f;
  }
`;

const ButtonLogout = styled.button`
  background-color: #004f42;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || '1rem'};  
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00352f;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const getProfileImage = (perfil) => {
  switch (perfil.trim().toLowerCase()) {
    case 'agressivo':
      return agressivoImage;
    case 'moderado':
      return moderadoImage;
    case 'conservador':
      return conservadorImage;
    default:
      return '';
  }
};

const textosPerfil = {
  agressivo: `Você aceita os riscos dos investimentos e até mesmo eventuais perdas do capital, pois acredita que a longo prazo o retorno dos investimentos será muito superior. Esses investidores entendem que as variações fazem parte daquele tipo de investimento e traçam estratégias para aproveitar as pequenas oscilações do dia a dia para realizar lucros. Se encaixam nesse perfil pessoas com grande conhecimento do mercado que aceitam possíveis prejuízos em troca de uma rentabilidade maior no longo prazo.`,
  moderado: `Você busca equilíbrio entre segurança e rentabilidade. Aceita correr alguns riscos em troca de um potencial retorno maior, mas prefere diversificar seus investimentos para proteger parte do capital. O investidor moderado faz escolhas estratégicas, buscando uma mescla de investimentos estáveis e opções que oferecem um crescimento superior no médio a longo prazo.`,
  conservador: `Você valoriza a segurança do seu capital acima de tudo e prefere minimizar os riscos, mesmo que isso signifique abrir mão de retornos maiores. O investidor conservador opta por aplicações estáveis, que proporcionam previsibilidade e proteção do patrimônio. Ideal para quem prioriza a preservação de recursos e busca crescimento financeiro com mais estabilidade.`,
};

const dicasPorPerfil = {
  agressivo: [
    'Diversifique com risco calculado: Espalhe seu capital entre diferentes ativos para minimizar possíveis perdas.',

    'Acompanhe o mercado de perto: Esteja atento às tendências e notícias econômicas.',

    'Tenha uma estratégia de saída: Defina metas de lucro e limites de perda.',

    'Invista em conhecimento: Aprenda sobre novos produtos financeiros e estratégias.',

    'Tenha uma reserva de emergência: Mesmo com risco, mantenha uma reserva segura.',
  ],
  moderado: [
    'Mantenha uma carteira balanceada: Combine ativos de baixo risco com maior potencial de retorno.',

    'Defina objetivos claros: Estabeleça prazos e metas para seus investimentos.',

    'Reavalie sua carteira periodicamente: Ajuste conforme o cenário econômico.',

    'Considere fundos diversificados: Opte por fundos com gestão profissional.',

    'Cuidado com a alavancagem: Use-a com moderação para evitar perdas.',
  ],
  conservador: [
    'Priorize a renda fixa: Foque em títulos do governo, CDBs e fundos estáveis.',
    'Proteja-se da inflação: Invista em ativos atrelados à inflação.',
    'Diversifique, mesmo com baixo risco: Distribua entre diferentes instituições.',
    'Prefira investimentos de longo prazo: Aproveite melhores taxas mantendo segurança.',
    'Tenha uma reserva de liquidez: Mantenha dinheiro em aplicações de fácil resgate.',
  ],
};

const UserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState('1.2rem'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/usuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3001/usuario',
        { nome: user.nome, email: user.email, telefone: user.telefone, data_nasc: user.data_nasc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Dados atualizados com sucesso!');
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:3001/usuario', {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Conta excluída com sucesso.');
        handleLogout();
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  };

  const handleDeleteQuiz = async () => {
    if (window.confirm('Tem certeza que deseja excluir o resultado do seu quiz? Esta ação não pode ser desfeita.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:3001/usuario/quiz', {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Resultado do quiz excluído com sucesso.');
        setUser((prevUser) => ({ ...prevUser, perfil_calculado: null }));
      } catch (error) {
        console.error('Erro ao excluir resultado do quiz:', error);
      }
    }
  };

  if (loading) {
    return <Container>Carregando informações do usuário...</Container>;
  }

  if (!user) {
    return <Container>Nenhum usuário encontrado.</Container>;
  }

  return (
    <Container>
      <ProfileContainer>
        <Sidebar>
          {isEditing ? (
            <>
              <Input
                type="text"
                value={user.nome}
                onChange={(e) => setUser({ ...user, nome: e.target.value })}
              />
              <Input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <Input
                type="tel"
                value={user.telefone}
                onChange={(e) => setUser({ ...user, telefone: e.target.value })}
              />
              <Input
                type="date"
                value={user.data_nasc}
                onChange={(e) => setUser({ ...user, data_nasc: e.target.value })}
              />
              <Button onClick={handleUpdate}>Salvar Alterações</Button>
              <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
            </>
          ) : (
            <>
              <InfoRow fontSize={fontSize}>
                <strong>Nome:</strong> {user.nome}
              </InfoRow>
              <InfoRow fontSize={fontSize}>
                <strong>Email:</strong> {user.email}
              </InfoRow>
              <InfoRow fontSize={fontSize}>
                <strong>Perfil de Investidor:</strong> {user.perfil_calculado || 'Ainda não calculado'}
              </InfoRow>
              {user.perfil_calculado && (
                <InfoRow fontSize={fontSize}>{textosPerfil[user.perfil_calculado.toLowerCase()]}</InfoRow>
              )}
              <Button onClick={() => setIsEditing(true)}>Editar</Button>
              {user.perfil_calculado && <Button onClick={handleDeleteQuiz}>Excluir Resultado do Quiz</Button>}
              <Button onClick={handleDelete}>Excluir Conta</Button>
            </>
          )}
        </Sidebar>
        <ProfileContent>
          {user.perfil_calculado && (
            <>
              <h2 fontSize={fontSize}>Dicas para o seu Perfil</h2>
              <ProfileImage src={getProfileImage(user.perfil_calculado)} alt="Imagem do Perfil" />
              <TipsContainer>
                {dicasPorPerfil[user.perfil_calculado.toLowerCase()].map((dica, index) => (
                  <Tip key={index} fontSize={fontSize}>{dica}</Tip>
                ))}
              </TipsContainer>
            </>
          )}
        </ProfileContent>
      </ProfileContainer>
      <ButtonContainer>
        <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
      </ButtonContainer>
    </Container>
  );
};

export default UserData;
