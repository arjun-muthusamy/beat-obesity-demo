import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Card from '../shared/Card';
import Typography from '../shared/Typography';
import Avatar from '../shared/Avatar';
import Button from '../shared/Button';

const AIWidgetContainer = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  overflow: hidden;
`;

const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: ${props => props.theme.colors.gradientPrimary};
  opacity: 0.1;
  border-radius: 75px;
  transform: translate(50%, -50%);
  z-index: 0;
`;

const WidgetContent = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
`;

const AvatarSection = styled.div`
  margin-right: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentSection = styled.div`
  flex: 1;
`;

const SuggestionsContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const SuggestionChip = styled.button`
  background-color: ${props => props.theme.colors.backgroundDark};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.pill};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.caption.fontSize};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover, &:focus {
    background-color: ${props => props.theme.colors.primaryLighter};
    color: ${props => props.theme.colors.primary};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const AICompanionWidget = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  
  const { selectedAvatar, user } = state;
  
  // Sample suggestions
  const suggestions = [
    "How's my progress?",
    "When is my next appointment?",
    "What foods should I avoid?",
    "Help me with side effects"
  ];
  
  const handleChatClick = () => {
    navigate('/chat');
  };
  
  const handleSuggestionClick = (suggestion) => {
    // In a real app, we'd store this suggestion and navigate to chat
    navigate('/chat', { state: { initialMessage: suggestion } });
  };
  
  return (
    <AIWidgetContainer>
      <BackgroundGradient />
      
      <WidgetContent>
        <AvatarSection>
          <Avatar
            size="lg"
            bgColor={selectedAvatar?.color || "#4A90E2"}
          >
            <i data-feather={selectedAvatar?.icon || "user"} />
          </Avatar>
          <Typography variant="body2" style={{ marginTop: '8px' }}>
            {selectedAvatar?.name || "AI Companion"}
          </Typography>
        </AvatarSection>
        
        <ContentSection>
          <Typography variant="body1" gutterBottom>
            Hi {user?.name || 'there'}! I'm here to support your weight loss journey. How can I help you today?
          </Typography>
          
          <SuggestionsContainer>
            {suggestions.map((suggestion, index) => (
              <SuggestionChip 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionChip>
            ))}
          </SuggestionsContainer>
          
          <ButtonsContainer>
            <Button 
              variant="primary" 
              icon={<i data-feather="message-circle" />}
              onClick={handleChatClick}
            >
              Chat Now
            </Button>
            <Button 
              variant="ghost" 
              icon={<i data-feather="mic" />}
              onClick={handleChatClick}
            >
              Voice
            </Button>
          </ButtonsContainer>
        </ContentSection>
      </WidgetContent>
    </AIWidgetContainer>
  );
};

export default AICompanionWidget;
