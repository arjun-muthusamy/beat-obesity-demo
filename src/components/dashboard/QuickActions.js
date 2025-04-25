import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '../shared/Typography';
import Card from '../shared/Card';

const QuickActionsContainer = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const ActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.backgroundDark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover, &:focus {
    background-color: ${props => props.theme.colors.primaryLighter};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const UpcomingReminderCard = styled(Card)`
  margin-top: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primaryLighter + '30'};
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const ReminderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ReminderIconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ReminderInfo = styled.div`
  flex: 1;
`;

const ReminderActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButtonSmall = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  
  &:hover, &:focus {
    background-color: rgba(74, 144, 226, 0.1);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const QuickActions = () => {
  const navigate = useNavigate();
  
  const actionItems = [
    { 
      label: "Log Food", 
      icon: "coffee", 
      bgColor: "#4A90E2", 
      onClick: () => console.log("Log Food clicked") 
    },
    { 
      label: "Track Medication", 
      icon: "pill", 
      bgColor: "#5A58BB", 
      onClick: () => navigate("/therapy") 
    },
    { 
      label: "Book Appointment", 
      icon: "calendar", 
      bgColor: "#F44336", 
      onClick: () => navigate("/appointments") 
    },
    { 
      label: "Check Glucose", 
      icon: "activity", 
      bgColor: "#4CAF50", 
      onClick: () => navigate("/devices") 
    },
  ];
  
  return (
    <>
      <QuickActionsContainer>
        <Card.Header>
          <Typography variant="h5">Quick Actions</Typography>
        </Card.Header>
        
        <ActionsGrid>
          {actionItems.map((item, index) => (
            <ActionButton key={index} onClick={item.onClick}>
              <ActionIcon bgColor={item.bgColor}>
                <i data-feather={item.icon} />
              </ActionIcon>
              <Typography variant="caption">{item.label}</Typography>
            </ActionButton>
          ))}
        </ActionsGrid>
      </QuickActionsContainer>
      
      <UpcomingReminderCard>
        <ReminderContent>
          <ReminderIconContainer>
            <i data-feather="bell" />
          </ReminderIconContainer>
          
          <ReminderInfo>
            <Typography variant="h6">Medication Reminder</Typography>
            <Typography variant="body2" color="textLight">
              Take your Ozempic injection today
            </Typography>
          </ReminderInfo>
          
          <ReminderActions>
            <ActionButtonSmall>
              <i data-feather="check" />
            </ActionButtonSmall>
            <ActionButtonSmall>
              <i data-feather="x" />
            </ActionButtonSmall>
          </ReminderActions>
        </ReminderContent>
      </UpcomingReminderCard>
    </>
  );
};

export default QuickActions;
