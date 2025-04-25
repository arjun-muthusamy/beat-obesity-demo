import React, { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../components/shared/Typography';
import ProgressSummary from '../components/dashboard/ProgressSummary';
import AICompanionWidget from '../components/dashboard/AICompanionWidget';
import QuickActions from '../components/dashboard/QuickActions';

const HomeContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Greeting = styled.div``;

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primaryLight};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const Home = () => {
  // Get current time to display appropriate greeting
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  // User data would come from context in a real app
  const userData = {
    name: 'John',
    // Other user data used by the components would be passed here
  };
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - Home';
  }, []);
  
  return (
    <HomeContainer>
      <HeaderContainer>
        <Greeting>
          <Typography variant="h5" gutterBottom>
            {getCurrentGreeting()}, {userData.name}
          </Typography>
          <Typography variant="body2" color="textLight">
            Let's continue your weight loss journey
          </Typography>
        </Greeting>
        
        <AvatarCircle>
          {userData.name ? userData.name.charAt(0) : 'U'}
        </AvatarCircle>
      </HeaderContainer>
      
      <ProgressSummary userData={userData} />
      
      <AICompanionWidget />
      
      <QuickActions />
    </HomeContainer>
  );
};

export default Home;
