import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Card from '../shared/Card';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';
import { formatDoseTime } from '../../utils/reminderService';

const MedicationContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MedicationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const MedCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
  border-left: 4px solid ${props => props.status === 'overdue' 
    ? props.theme.colors.error 
    : props.status === 'upcoming' 
      ? props.theme.colors.warning 
      : props.status === 'completed' 
        ? props.theme.colors.success 
        : props.theme.colors.primary};
`;

const MedCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  height: 48px;
  background-color: ${props => props.color || props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const MedInfo = styled.div`
  flex: 1;
`;

const MedActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.sm};
  gap: ${props => props.theme.spacing.sm};
`;

const TodaysMedsContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProgressContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const UpcomingMedsContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AddMedicationButton = styled(Button)`
  margin-top: ${props => props.theme.spacing.md};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl} 0;
  text-align: center;
  
  svg {
    width: 48px;
    height: 48px;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const MedicationTracker = ({ onAddMedication, onMarkComplete, onSnooze }) => {
  const { state } = useContext(AppContext);
  const [medications, setMedications] = useState([]);
  const [todaysMeds, setTodaysMeds] = useState([]);
  const [upcomingMeds, setUpcomingMeds] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  
  // Initialize and update component when state changes
  useEffect(() => {
    if (state.medicationReminders && state.medicationReminders.length > 0) {
      setMedications(state.medicationReminders);
      
      // Filter medications for today
      const today = new Date().toDateString();
      const medsToday = state.medicationReminders.filter(
        med => new Date(med.nextDose).toDateString() === today
      );
      setTodaysMeds(medsToday);
      
      // Filter upcoming medications (not today, ordered by date)
      const upcoming = state.medicationReminders
        .filter(med => new Date(med.nextDose).toDateString() !== today)
        .sort((a, b) => new Date(a.nextDose) - new Date(b.nextDose))
        .slice(0, 5); // Show only next 5 upcoming medications
      setUpcomingMeds(upcoming);
      
      // Calculate overall progress
      const completedMeds = state.medicationReminders.filter(
        med => med.status === 'completed'
      ).length;
      setOverallProgress(
        Math.round((completedMeds / state.medicationReminders.length) * 100)
      );
    } else {
      setMedications([]);
      setTodaysMeds([]);
      setUpcomingMeds([]);
      setOverallProgress(0);
    }
  }, [state.medicationReminders]);
  
  // Refresh the UI when component mounts and whenever feather icons need to be initialized
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [medications]);
  
  const handleAddMedicationClick = () => {
    if (onAddMedication) {
      onAddMedication();
    }
  };
  
  const handleMarkCompleteClick = (medicationId) => {
    if (onMarkComplete) {
      onMarkComplete(medicationId);
    }
  };
  
  const handleSnoozeClick = (medicationId) => {
    if (onSnooze) {
      onSnooze(medicationId);
    }
  };
  
  return (
    <MedicationContainer>
      <ProgressContainer>
        <Typography variant="h6" gutterBottom>
          Weekly Medication Adherence
        </Typography>
        <ProgressBar 
          value={overallProgress} 
          variant="primary" 
          size="md"
          shape="pill"
          showValue
        />
      </ProgressContainer>
      
      {todaysMeds.length > 0 && (
        <TodaysMedsContainer>
          <Typography variant="h6" gutterBottom>
            Today's Medications
          </Typography>
          <MedicationsList>
            {todaysMeds.map(med => (
              <MedCard 
                key={med.id} 
                status={med.status}
                elevation="sm"
              >
                <MedCardContent>
                  <IconContainer color={med.color}>
                    <i data-feather={med.icon} />
                  </IconContainer>
                  <MedInfo>
                    <Typography variant="h6" gutterBottom>
                      {med.name} {med.dosage}
                    </Typography>
                    <Typography variant="body2" color="textLight">
                      {med.instructions}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color={
                        med.status === 'overdue' 
                          ? 'error' 
                          : med.status === 'upcoming' 
                            ? 'warning' 
                            : 'success'
                      }
                    >
                      {med.status === 'overdue' 
                        ? 'Overdue' 
                        : med.status === 'upcoming' 
                          ? `Due at ${new Date(med.nextDose).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` 
                          : 'Completed'}
                    </Typography>
                  </MedInfo>
                </MedCardContent>
                
                {med.status !== 'completed' && (
                  <MedActions>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleSnoozeClick(med.id)}
                    >
                      Snooze
                    </Button>
                    <Button 
                      variant="primary" 
                      size="small"
                      onClick={() => handleMarkCompleteClick(med.id)}
                    >
                      Mark Complete
                    </Button>
                  </MedActions>
                )}
              </MedCard>
            ))}
          </MedicationsList>
        </TodaysMedsContainer>
      )}
      
      {upcomingMeds.length > 0 && (
        <UpcomingMedsContainer>
          <Typography variant="h6" gutterBottom>
            Upcoming Medications
          </Typography>
          <MedicationsList>
            {upcomingMeds.map(med => (
              <MedCard 
                key={med.id} 
                status={med.status}
                elevation="sm"
              >
                <MedCardContent>
                  <IconContainer color={med.color}>
                    <i data-feather={med.icon} />
                  </IconContainer>
                  <MedInfo>
                    <Typography variant="h6" gutterBottom>
                      {med.name} {med.dosage}
                    </Typography>
                    <Typography variant="body2" color="textLight">
                      {med.instructions}
                    </Typography>
                    <Typography variant="caption">
                      Next dose: {formatDoseTime(med.nextDose)}
                    </Typography>
                  </MedInfo>
                </MedCardContent>
              </MedCard>
            ))}
          </MedicationsList>
        </UpcomingMedsContainer>
      )}
      
      {medications.length === 0 && (
        <EmptyState>
          <i data-feather="file-text" />
          <Typography variant="body1" gutterBottom>
            No medications added yet
          </Typography>
          <Typography variant="body2" color="textLight" gutterBottom>
            Add your first medication to get started with reminders
          </Typography>
        </EmptyState>
      )}
      
      <AddMedicationButton
        variant="outlined"
        size="full"
        icon={<i data-feather="plus" />}
        onClick={handleAddMedicationClick}
      >
        Add Medication
      </AddMedicationButton>
    </MedicationContainer>
  );
};

export default MedicationTracker;
