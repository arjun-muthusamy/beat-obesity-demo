import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import Header from '../components/navigation/Header';
import MedicationTracker from '../components/therapy/MedicationTracker';
import AddMedicationForm from '../components/therapy/AddMedicationForm';
import ReminderNotification from '../components/therapy/ReminderNotification';
import SideEffectReporter from '../components/therapy/SideEffectReporter';
import RefillOrder from '../components/therapy/RefillOrder';
import { 
  getDueMedications, 
  checkOverdueMedications, 
  updateMedicationAfterTaken,
  snoozeMedication,
  updateDaysLeft 
} from '../utils/reminderService';

const TherapyContainer = styled.div`
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing.md};
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Therapy = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('medications');
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - GLP-1 Therapy';
    
    // Set up interval to check for due medications every minute
    const checkMedicationsInterval = setInterval(checkMedications, 60000);
    
    // Initial check for overdue medications
    updateMedicationStatuses();
    
    // Check for medications due in the next 15 minutes
    checkMedications();
    
    return () => {
      clearInterval(checkMedicationsInterval);
    };
  }, [state.medicationReminders]);
  
  // Check for any overdue medications and update their status
  const updateMedicationStatuses = () => {
    if (!state.medicationReminders || state.medicationReminders.length === 0) return;
    
    const updatedMedications = checkOverdueMedications(state.medicationReminders);
    const medicationsWithUpdatedDaysLeft = updateDaysLeft(updatedMedications);
    
    if (JSON.stringify(medicationsWithUpdatedDaysLeft) !== JSON.stringify(state.medicationReminders)) {
      dispatch({
        type: actionTypes.UPDATE_METRICS,
        payload: { medicationReminders: medicationsWithUpdatedDaysLeft }
      });
    }
  };
  
  // Check for medications that are due now
  const checkMedications = () => {
    if (!state.medicationReminders || state.medicationReminders.length === 0) return;
    
    // Find medications due in the next 15 minutes
    const dueMedications = getDueMedications(state.medicationReminders, 15);
    
    if (dueMedications.length > 0 && !currentReminder) {
      // Set the first due medication as the current reminder
      setCurrentReminder(dueMedications[0]);
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleOpenAddMedicationModal = () => {
    setShowAddMedicationModal(true);
  };
  
  const handleCloseAddMedicationModal = () => {
    setShowAddMedicationModal(false);
  };
  
  const handleAddMedication = (newMedication) => {
    handleCloseAddMedicationModal();
    
    // Re-render to ensure icons are initialized
    setTimeout(() => {
      if (window.feather) {
        window.feather.replace();
      }
    }, 100);
  };
  
  const handleMarkComplete = (medicationId) => {
    const medications = [...state.medicationReminders];
    const medicationIndex = medications.findIndex(med => med.id === medicationId);
    
    if (medicationIndex === -1) return;
    
    // Get the medication that was completed
    const completedMedication = medications[medicationIndex];
    
    // Update the medication with the next dose information
    const updatedMedication = updateMedicationAfterTaken(completedMedication);
    
    // Update the medications array
    medications[medicationIndex] = updatedMedication;
    
    // Update the global state
    dispatch({
      type: actionTypes.UPDATE_METRICS,
      payload: { medicationReminders: medications }
    });
    
    // Clear the current reminder
    setCurrentReminder(null);
  };
  
  const handleSnoozeReminder = (medicationId) => {
    const medications = [...state.medicationReminders];
    const medicationIndex = medications.findIndex(med => med.id === medicationId);
    
    if (medicationIndex === -1) return;
    
    // Get the medication to snooze
    const medicationToSnooze = medications[medicationIndex];
    
    // Snooze the medication for 1 hour
    const snoozedMedication = snoozeMedication(medicationToSnooze, 60);
    
    // Update the medications array
    medications[medicationIndex] = snoozedMedication;
    
    // Update the global state
    dispatch({
      type: actionTypes.UPDATE_METRICS,
      payload: { medicationReminders: medications }
    });
    
    // Clear the current reminder
    setCurrentReminder(null);
  };
  
  const handleDismissReminder = () => {
    setCurrentReminder(null);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'medications':
        return (
          <MedicationTracker 
            onAddMedication={handleOpenAddMedicationModal} 
            onMarkComplete={handleMarkComplete}
            onSnooze={handleSnoozeReminder}
          />
        );
      case 'sideEffects':
        return <SideEffectReporter />;
      case 'refills':
        return <RefillOrder />;
      default:
        return (
          <MedicationTracker 
            onAddMedication={handleOpenAddMedicationModal} 
            onMarkComplete={handleMarkComplete}
            onSnooze={handleSnoozeReminder}
          />
        );
    }
  };
  
  return (
    <TherapyContainer>
      <Header title="GLP-1 Therapy" />
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'medications'} 
          onClick={() => handleTabChange('medications')}
        >
          Medications
        </Tab>
        <Tab 
          active={activeTab === 'sideEffects'} 
          onClick={() => handleTabChange('sideEffects')}
        >
          Side Effects
        </Tab>
        <Tab 
          active={activeTab === 'refills'} 
          onClick={() => handleTabChange('refills')}
        >
          Refills
        </Tab>
      </TabsContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
      
      {/* Medication Reminder Notification */}
      {currentReminder && (
        <ReminderNotification 
          medication={currentReminder}
          onClose={handleDismissReminder}
          onMarkComplete={handleMarkComplete}
          onSnooze={handleSnoozeReminder}
        />
      )}
      
      {/* Add Medication Modal */}
      {showAddMedicationModal && (
        <ModalOverlay onClick={handleCloseAddMedicationModal}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <AddMedicationForm 
              onClose={handleCloseAddMedicationModal}
              onAddMedication={handleAddMedication}
            />
          </ModalContainer>
        </ModalOverlay>
      )}
    </TherapyContainer>
  );
};

export default Therapy;
