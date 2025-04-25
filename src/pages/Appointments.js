import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/navigation/Header';
import ClinicSelector from '../components/appointments/ClinicSelector';
import DoctorProfiles from '../components/appointments/DoctorProfiles';
import TimeslotSelector from '../components/appointments/TimeslotSelector';
import Card from '../components/shared/Card';
import Typography from '../components/shared/Typography';
import Button from '../components/shared/Button';

const AppointmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
`;

const StepLine = styled.div`
  position: absolute;
  top: 16px;
  left: 32px;
  right: 32px;
  height: 2px;
  background-color: ${props => props.theme.colors.backgroundDark};
  z-index: 0;
`;

const StepProgress = styled.div`
  position: absolute;
  top: 16px;
  left: 32px;
  height: 2px;
  background-color: ${props => props.theme.colors.primary};
  z-index: 1;
  width: ${props => {
    if (props.currentStep === 1) return '0%';
    if (props.currentStep === 2) return '50%';
    return '100%';
  }};
  transition: width 0.3s ease;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => 
    props.active || props.completed 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.active || props.completed 
      ? 'white' 
      : props.theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 600;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const StepLabel = styled(Typography)`
  font-size: 12px;
  color: ${props => 
    props.active 
      ? props.theme.colors.primary 
      : props.theme.colors.textLight};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.success};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

const AppointmentDetails = styled.div`
  margin: ${props => props.theme.spacing.lg} 0;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled(Typography)`
  width: 100px;
  color: ${props => props.theme.colors.textLight};
`;

const DetailValue = styled(Typography)`
  flex: 1;
  font-weight: 500;
`;

const Appointments = () => {
  const [step, setStep] = useState(1);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  useEffect(() => {
    // Initialize Feather icons when component mounts
    if (window.feather) {
      window.feather.replace();
    }
    
    document.title = 'BeatObesity - Appointments';
  }, [step, bookingComplete]);
  
  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
  };
  
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };
  
  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const completeBooking = () => {
    // In a real app, this would submit the appointment to an API
    setBookingComplete(true);
  };
  
  const startNewBooking = () => {
    setStep(1);
    setSelectedClinic(null);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setBookingComplete(false);
  };
  
  const renderStepContent = () => {
    if (bookingComplete) {
      return (
        <Card>
          <SuccessContainer>
            <SuccessIcon>
              <i data-feather="check" />
            </SuccessIcon>
            
            <Typography variant="h5" gutterBottom>
              Appointment Confirmed!
            </Typography>
            
            <Typography variant="body1" color="textLight" gutterBottom>
              Your appointment has been successfully scheduled.
              You will receive a confirmation email shortly.
            </Typography>
            
            <AppointmentDetails>
              <DetailItem>
                <DetailLabel variant="body2">
                  Date:
                </DetailLabel>
                <DetailValue variant="body2">
                  {selectedTimeSlot && selectedTimeSlot.date.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel variant="body2">
                  Time:
                </DetailLabel>
                <DetailValue variant="body2">
                  {selectedTimeSlot && selectedTimeSlot.timeslot.time}
                </DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel variant="body2">
                  Provider:
                </DetailLabel>
                <DetailValue variant="body2">
                  {selectedDoctor && selectedDoctor.name}
                </DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel variant="body2">
                  Location:
                </DetailLabel>
                <DetailValue variant="body2">
                  {selectedClinic && selectedClinic.name}
                </DetailValue>
              </DetailItem>
            </AppointmentDetails>
            
            <Button 
              variant="primary" 
              size="full"
              onClick={startNewBooking}
            >
              Book Another Appointment
            </Button>
          </SuccessContainer>
        </Card>
      );
    }
    
    switch (step) {
      case 1:
        return <ClinicSelector onSelect={handleClinicSelect} onNext={handleNextStep} />;
      case 2:
        return <DoctorProfiles onSelect={handleDoctorSelect} onNext={handleNextStep} selectedClinic={selectedClinic} />;
      case 3:
        return (
          <TimeslotSelector 
            onSelect={handleTimeSlotSelect} 
            onComplete={completeBooking} 
            selectedClinic={selectedClinic} 
            selectedDoctor={selectedDoctor} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <AppointmentsContainer>
      <Header title="Book Appointment" />
      
      <ContentContainer>
        {!bookingComplete && (
          <StepIndicator>
            <StepLine />
            <StepProgress currentStep={step} />
            
            <Step>
              <StepCircle active={step === 1} completed={step > 1}>
                {step > 1 ? <i data-feather="check" /> : 1}
              </StepCircle>
              <StepLabel active={step === 1}>
                Location
              </StepLabel>
            </Step>
            
            <Step>
              <StepCircle active={step === 2} completed={step > 2}>
                {step > 2 ? <i data-feather="check" /> : 2}
              </StepCircle>
              <StepLabel active={step === 2}>
                Doctor
              </StepLabel>
            </Step>
            
            <Step>
              <StepCircle active={step === 3}>
                3
              </StepCircle>
              <StepLabel active={step === 3}>
                Time
              </StepLabel>
            </Step>
          </StepIndicator>
        )}
        
        {renderStepContent()}
      </ContentContainer>
    </AppointmentsContainer>
  );
};

export default Appointments;
