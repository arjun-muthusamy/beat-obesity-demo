import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Header from '../components/navigation/Header';
import ChatInterface from '../components/chat/ChatInterface';
import { AppContext } from '../context/AppContext';
import Avatar from '../components/shared/Avatar';
import Typography from '../components/shared/Typography';
import Card from '../components/shared/Card';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const EnhancedHeader = styled(Header)`
  background: ${props => props.theme.colors.gradientPrimary};
  height: 70px;
  padding: ${props => props.theme.spacing.md};
  
  h1, h5 {
    color: white;
  }
`;

const HeaderContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const CompanionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const QuickActionCards = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ActionCard = styled(Card)`
  min-width: 140px;
  padding: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ActionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color || props.theme.colors.primaryLighter};
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    color: ${props => props.iconColor || props.theme.colors.primary};
    stroke: ${props => props.iconColor || props.theme.colors.primary};
    width: 16px;
    height: 16px;
  }
`;

const Chat = () => {
  const location = useLocation();
  const [initialMessage, setInitialMessage] = useState('');
  const { state } = useContext(AppContext);
  const { selectedAvatar } = state;
  
  // Quick action suggestions to help the user get started
  const quickActions = [
    { 
      id: 1, 
      text: "Today's plan", 
      icon: "calendar", 
      color: "#D1C4E9", 
      iconColor: "#673AB7",
      prompt: "What should I do today to help with my weight loss?"
    },
    { 
      id: 2, 
      text: "Meal ideas", 
      icon: "coffee", 
      color: "#C8E6C9", 
      iconColor: "#4CAF50",
      prompt: "Can you suggest some healthy meal ideas for today?"
    },
    { 
      id: 3, 
      text: "Side effects", 
      icon: "alert-circle", 
      color: "#FFECB3", 
      iconColor: "#FFC107",
      prompt: "What side effects should I watch out for with my medication?"
    },
    { 
      id: 4, 
      text: "Exercise tips", 
      icon: "activity", 
      color: "#BBDEFB", 
      iconColor: "#2196F3",
      prompt: "What exercises can I do with limited mobility?"
    }
  ];
  
  const handleQuickAction = (prompt) => {
    setInitialMessage(prompt);
  };
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - AI Companion';
    
    // Check if there's an initial message passed via navigation
    if (location.state && location.state.initialMessage) {
      setInitialMessage(location.state.initialMessage);
    }
  }, [location.state]);
  
  return (
    <ChatContainer>
      <EnhancedHeader 
        elevated
        leftIcon={null}
        rightIcon="settings"
      >
        <HeaderContentWrapper>
          <Avatar
            size="md"
            bgColor={selectedAvatar?.color || "#673AB7"}
          >
            <i data-feather={selectedAvatar?.icon || "message-circle"} />
          </Avatar>
          <CompanionInfo>
            <Typography variant="h5" component="h1" color="white">
              {selectedAvatar?.name || "AI Companion"}
            </Typography>
            <Typography variant="caption" color="white" opacity={0.9}>
              {selectedAvatar?.personality || "Supportive & Motivating"}
            </Typography>
          </CompanionInfo>
        </HeaderContentWrapper>
      </EnhancedHeader>
      
      <QuickActionCards>
        {quickActions.map(action => (
          <ActionCard 
            key={action.id} 
            onClick={() => handleQuickAction(action.prompt)}
          >
            <ActionIcon color={action.color} iconColor={action.iconColor}>
              <i data-feather={action.icon} />
            </ActionIcon>
            <Typography variant="body2">{action.text}</Typography>
          </ActionCard>
        ))}
      </QuickActionCards>
      
      <ChatContent>
        <ChatInterface initialPrompt={initialMessage} />
      </ChatContent>
    </ChatContainer>
  );
};

export default Chat;
