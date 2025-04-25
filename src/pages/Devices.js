import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/navigation/Header';
import DeviceIntegration from '../components/devices/DeviceIntegration';
import DataDashboard from '../components/devices/DataDashboard';

const DevicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
`;

const TabsContainer = styled.div`
  display: flex;
  padding: 0 ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.backgroundDark};
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.md};
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

const Devices = () => {
  const [activeTab, setActiveTab] = useState('devices');
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - Device Integration';
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'devices':
        return <DeviceIntegration />;
      case 'data':
        return <DataDashboard />;
      default:
        return <DeviceIntegration />;
    }
  };
  
  return (
    <DevicesContainer>
      <Header title="Devices & Data" />
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'devices'} 
          onClick={() => handleTabChange('devices')}
        >
          Connect Devices
        </Tab>
        <Tab 
          active={activeTab === 'data'} 
          onClick={() => handleTabChange('data')}
        >
          Health Data
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </DevicesContainer>
  );
};

export default Devices;
