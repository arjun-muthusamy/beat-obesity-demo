import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/navigation/Header';
import UserSettings from '../components/profile/UserSettings';
import HealthProfile from '../components/profile/HealthProfile';
import NotificationSettings from '../components/profile/NotificationSettings';
import PrivacySettings from '../components/profile/PrivacySettings';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
`;

const TabsContainer = styled.div`
  display: flex;
  padding: 0 ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.backgroundDark};
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.md};
  white-space: nowrap;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => 
    props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => 
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - Profile';
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserSettings />;
      case 'health':
        return <HealthProfile />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      default:
        return <UserSettings />;
    }
  };
  
  return (
    <ProfileContainer>
      <Header title="Profile & Settings" />
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => handleTabChange('profile')}
        >
          Account
        </Tab>
        <Tab 
          active={activeTab === 'health'} 
          onClick={() => handleTabChange('health')}
        >
          Health Profile
        </Tab>
        <Tab 
          active={activeTab === 'notifications'} 
          onClick={() => handleTabChange('notifications')}
        >
          Notifications
        </Tab>
        <Tab 
          active={activeTab === 'privacy'} 
          onClick={() => handleTabChange('privacy')}
        >
          Privacy & Data
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </ProfileContainer>
  );
};

export default Profile;
