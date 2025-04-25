import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/navigation/Header';
import PlanOverview from '../components/subscription/PlanOverview';
import PaymentHistory from '../components/subscription/PaymentHistory';

const SubscriptionContainer = styled.div`
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

const Subscription = () => {
  const [activeTab, setActiveTab] = useState('plan');
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - Subscription';
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'plan':
        return <PlanOverview />;
      case 'payments':
        return <PaymentHistory />;
      default:
        return <PlanOverview />;
    }
  };
  
  return (
    <SubscriptionContainer>
      <Header title="Subscription" />
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'plan'} 
          onClick={() => handleTabChange('plan')}
        >
          Plan Details
        </Tab>
        <Tab 
          active={activeTab === 'payments'} 
          onClick={() => handleTabChange('payments')}
        >
          Payment History
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </SubscriptionContainer>
  );
};

export default Subscription;
