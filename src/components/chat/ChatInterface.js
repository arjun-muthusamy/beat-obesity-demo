import React, { useState, useRef, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import Avatar from '../shared/Avatar';
import VoiceInput from './VoiceInput';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 90%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
  align-items: flex-end;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MessageBubble = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  max-width: 80%;
  background-color: ${props => 
    props.isUser ? props.theme.colors.primary : props.theme.colors.backgroundLight};
  color: ${props => 
    props.isUser ? 'white' : props.theme.colors.text};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const MessageTime = styled(Typography)`
  margin-top: ${props => props.theme.spacing.xs};
  margin-right: ${props => props.isUser ? '44px' : '0'};
  margin-left: ${props => props.isUser ? '0' : '44px'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const SuggestionChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
  margin-left: 44px;
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

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundLight};
  border-top: 1px solid ${props => props.theme.colors.backgroundDark};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const MessageInput = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.body1.fontSize};
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
`;

const IconButton = styled(Button)`
  min-width: 48px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const InputToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: ${props => props.active ? 600 : 400};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  
  &:hover, &:focus {
    color: ${props => props.theme.colors.primary};
  }
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

// Animation for typing dots
const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
  }
  40% { 
    transform: translateY(-5px);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  opacity: 0.6;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'};
`;

// Sample messages for demo
const initialMessages = [
  {
    id: 1,
    content: "Hi there! I'm your BeatObesity AI companion. How can I help you today?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    sender: "ai",
    suggestions: [
      "How's my progress going?",
      "When should I take my medication?",
      "What foods should I avoid?"
    ]
  }
];

const ChatInterface = ({ initialPrompt }) => {
  const { state } = useContext(AppContext);
  const { selectedAvatar, user } = state;
  
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState(initialPrompt || '');
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const newUserMessage = {
      id: Date.now(),
      content: inputText,
      timestamp: new Date().toISOString(),
      sender: "user"
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    
    // Show typing indicator
    const typingIndicator = {
      id: 'typing-indicator',
      content: 'Typing...',
      timestamp: new Date().toISOString(),
      sender: 'ai',
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingIndicator]);
    
    // Get previous messages for context (excluding the typing indicator)
    const previousMessages = messages.filter(m => !m.isTyping);
    
    // Import is done dynamically to avoid issues with SSR
    import('../../utils/perplexityApi')
      .then(async ({ sendChatMessage }) => {
        try {
          // Get response from Perplexity API
          const response = await sendChatMessage(inputText, previousMessages);
          
          // Remove typing indicator and add actual response
          setMessages(prev => {
            // Filter out the typing indicator
            const withoutTyping = prev.filter(m => m.id !== 'typing-indicator');
            
            // Add the real response
            return [...withoutTyping, {
              id: Date.now(),
              content: response.content,
              timestamp: new Date().toISOString(),
              sender: "ai",
              suggestions: response.suggestions
            }];
          });
        } catch (error) {
          console.error('Error getting AI response:', error);
          
          // Remove typing indicator and show error message
          setMessages(prev => {
            const withoutTyping = prev.filter(m => m.id !== 'typing-indicator');
            return [...withoutTyping, {
              id: Date.now(),
              content: "I'm having trouble connecting. Please try again later.",
              timestamp: new Date().toISOString(),
              sender: "ai",
              suggestions: ["Try again", "What foods should I eat?", "How much exercise is recommended?"]
            }];
          });
        }
      })
      .catch(error => {
        console.error('Error importing API module:', error);
        
        // Fallback to a simple response if there's an issue with the import
        setMessages(prev => {
          const withoutTyping = prev.filter(m => m.id !== 'typing-indicator');
          return [...withoutTyping, {
            id: Date.now(),
            content: "I'm here to help with your weight loss journey. Feel free to ask any questions!",
            timestamp: new Date().toISOString(),
            sender: "ai",
            suggestions: ["Tell me about side effects", "My medication schedule", "Food recommendations"]
          }];
        });
      });
  };
  
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    // Small delay to show the suggestion in the input before sending
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };
  
  const handleVoiceInput = (text) => {
    setInputText(text);
  };
  
  const toggleInputMode = (mode) => {
    setInputMode(mode);
  };
  
  return (
    <ChatContainer>
      <ChatMessages>
        {messages.map((message) => (
          <MessageGroup key={message.id} isUser={message.sender === 'user'}>
            <MessageContainer isUser={message.sender === 'user'}>
              {message.sender === 'ai' ? (
                <Avatar
                  size="sm"
                  bgColor={selectedAvatar?.color || "#4A90E2"}
                >
                  <i data-feather={selectedAvatar?.icon || "user"} />
                </Avatar>
              ) : (
                <Avatar
                  size="sm"
                  name={user?.name || "You"}
                />
              )}
              <MessageBubble isUser={message.sender === 'user'}>
                {message.isTyping ? (
                  <TypingIndicator>
                    <TypingDot delay="0s" />
                    <TypingDot delay="0.3s" />
                    <TypingDot delay="0.6s" />
                  </TypingIndicator>
                ) : (
                  <Typography variant="body1">
                    {message.content}
                  </Typography>
                )}
              </MessageBubble>
            </MessageContainer>
            
            <MessageTime 
              variant="caption" 
              color="textLight"
              isUser={message.sender === 'user'}
            >
              {formatTime(message.timestamp)}
            </MessageTime>
            
            {message.sender === 'ai' && message.suggestions && (
              <SuggestionChips>
                {message.suggestions.map((suggestion, index) => (
                  <SuggestionChip
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionChip>
                ))}
              </SuggestionChips>
            )}
          </MessageGroup>
        ))}
        <div ref={messagesEndRef} />
      </ChatMessages>
      
      <ChatInputContainer>
        {inputMode === 'text' ? (
          <InputWrapper>
            <IconButton 
              variant="ghost" 
              iconOnly
              icon={<i data-feather="paperclip" />}
            />
            <MessageInput
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <IconButton 
              variant="primary" 
              iconOnly
              icon={<i data-feather="send" />}
              onClick={handleSendMessage}
            />
          </InputWrapper>
        ) : (
          <VoiceInput onVoiceInput={handleVoiceInput} />
        )}
        
        <InputToggleContainer>
          <ToggleButton 
            active={inputMode === 'text'} 
            onClick={() => toggleInputMode('text')}
          >
            <i data-feather="type" />
            Text
          </ToggleButton>
          <ToggleButton 
            active={inputMode === 'voice'} 
            onClick={() => toggleInputMode('voice')}
          >
            <i data-feather="mic" />
            Voice
          </ToggleButton>
        </InputToggleContainer>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;
