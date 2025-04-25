import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import Avatar from '../shared/Avatar';

const AvatarSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  height: 100%;
`;

const HeaderContent = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const AvatarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const AvatarName = styled(Typography)`
  font-weight: ${props => props.$active ? 600 : 400};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text};
  transition: all ${props => props.theme.transitions.short};
`;

const SelectedAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  gap: ${props => props.theme.spacing.md};
`;

const SelectedAvatarInfo = styled.div`
  text-align: center;
  max-width: 300px;
`;

const ButtonsContainer = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  bottom: 0;
  background-color: ${props => props.theme.colors.background};
  z-index: 10;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
`;

// Sample avatar data
const avatarOptions = [
  { id: 1, name: "Coach Amy", personality: "Supportive & Motivating", icon: "award", color: "#673AB7" },
  { id: 2, name: "Dr. Michael", personality: "Clinical & Educational", icon: "clipboard", color: "#7E57C2" },
  { id: 3, name: "Trainer Alex", personality: "Energetic & Challenging", icon: "trending-up", color: "#9C27B0" },
  { id: 4, name: "Nutritionist Emma", personality: "Balanced & Wholesome", icon: "heart", color: "#8E24AA" },
  { id: 5, name: "Therapist Jake", personality: "Calming & Mindful", icon: "book", color: "#6A1B9A" },
  { id: 6, name: "Friend Sophia", personality: "Casual & Relatable", icon: "users", color: "#BA68C8" },
];

const AvatarSelection = ({ onNext, onBack }) => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const [selectedAvatar, setSelectedAvatar] = useState(state.selectedAvatar || null);
  
  const handleAvatarSelect = (avatar) => {
    console.log("Selected avatar:", avatar.name);
    try {
      // Update local state
      setSelectedAvatar(avatar);
      // Also update context immediately to avoid any sync issues
      console.log("Updating avatar in context when selected");
      dispatch({ 
        type: actionTypes.SELECT_AVATAR, 
        payload: avatar 
      });
    } catch (error) {
      console.error("Error setting avatar:", error);
    }
  };
  
  const handleContinue = () => {
    console.log("AvatarSelection - Continue button clicked");
    console.log("Current selectedAvatar state:", selectedAvatar);
    
    if (selectedAvatar) {
      try {
        // We've already updated the context in handleAvatarSelect, but let's do it again to be safe
        console.log("Proceeding to next step with avatar:", selectedAvatar.name);
        onNext(); // Call the parent component's onNext function
      } catch (error) {
        console.error("Error in handleContinue:", error);
      }
    } else {
      console.warn("No avatar selected, cannot continue");
    }
  };
  
  return (
    <AvatarSelectionContainer>
      <HeaderContent>
        <Typography variant="h3" gutterBottom>
          Choose Your AI Companion
        </Typography>
        <Typography variant="body1" color="textLight">
          Select a personality that will guide you through your weight loss journey
        </Typography>
      </HeaderContent>
      
      <AvatarsGrid>
        {avatarOptions.map((avatar) => (
          <AvatarWrapper key={avatar.id}>
            <Avatar
              size="lg"
              variant="circle"
              bgColor={avatar.color}
              selectable
              active={selectedAvatar?.id === avatar.id}
              onClick={() => handleAvatarSelect(avatar)}
            >
              <i data-feather={avatar.icon}></i>
            </Avatar>
            <AvatarName 
              variant="body2" 
              $active={selectedAvatar?.id === avatar.id}
            >
              {avatar.name}
            </AvatarName>
          </AvatarWrapper>
        ))}
      </AvatarsGrid>
      
      {selectedAvatar && (
        <SelectedAvatarContainer>
          <Typography variant="h5" color="primary">
            Selected: {selectedAvatar.name}
          </Typography>
          <SelectedAvatarInfo>
            <Typography variant="body2" color="textLight">
              {selectedAvatar.personality}
            </Typography>
          </SelectedAvatarInfo>
        </SelectedAvatarContainer>
      )}
      
      <ButtonsContainer>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="primary" 
          disabled={!selectedAvatar}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </ButtonsContainer>
    </AvatarSelectionContainer>
  );
};

export default AvatarSelection;
