import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../shared/Card';
import Typography from '../shared/Typography';
import Button from '../shared/Button';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const NotificationCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  svg {
    margin-right: ${props => props.theme.spacing.sm};
  }
`;

const NotificationBody = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-right: ${props => props.theme.spacing.sm};
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.sm};
  top: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  color: white;
  opacity: 0.7;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 1;
  }
`;

const ReminderNotification = ({ 
  medication, 
  onClose, 
  onMarkComplete, 
  onSnooze 
}) => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10); // 10 second auto-dismiss
  
  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleClose = () => {
    setVisible(false);
    // Delay actual unmounting to allow for exit animation
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  
  const handleMarkComplete = () => {
    if (onMarkComplete) onMarkComplete(medication.id);
    handleClose();
  };
  
  const handleSnooze = () => {
    if (onSnooze) onSnooze(medication.id);
    handleClose();
  };
  
  if (!visible) return null;
  
  return (
    <NotificationContainer>
      <NotificationCard elevation="lg">
        <CloseButton onClick={handleClose}>
          <i data-feather="x" />
        </CloseButton>
        
        <NotificationHeader>
          <IconContainer>
            <i data-feather={medication.icon || 'bell'} />
          </IconContainer>
          <Typography variant="h6" color="inherit">
            Medication Reminder
          </Typography>
        </NotificationHeader>
        
        <NotificationBody>
          <Typography variant="body1" color="inherit" gutterBottom>
            Time to take your {medication.name} ({medication.dosage})
          </Typography>
          <Typography variant="body2" color="inherit" style={{ opacity: 0.9 }}>
            {medication.instructions}
          </Typography>
        </NotificationBody>
        
        <ActionButtons>
          <Button 
            variant="outlined" 
            size="small"
            color="white"
            onClick={handleSnooze}
          >
            Snooze 1hr
          </Button>
          <Button 
            variant="white" 
            size="small"
            onClick={handleMarkComplete}
          >
            Mark Complete
          </Button>
        </ActionButtons>
      </NotificationCard>
    </NotificationContainer>
  );
};

export default ReminderNotification;