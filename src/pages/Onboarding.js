import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import OnboardingCarousel from '../components/onboarding/OnboardingCarousel';
import AvatarSelection from '../components/onboarding/AvatarSelection';
import GoalSelection from '../components/onboarding/GoalSelection';
import AccountCreation from '../components/onboarding/AccountCreation';

const OnboardingContainer = styled.div`
  height: 100%;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

const OnboardingContent = styled.div`
  height: 100%;
`;

// For debugging
const DebugPanel = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  font-size: 12px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  max-width: 280px;
  border-top-left-radius: 8px;
  
  div {
    margin: 2px 0;
  }
`;

const Onboarding = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  // Initialize step from localStorage if available
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('onboardingStep');
    if (savedStep) {
      console.log(`Restoring onboarding from step ${savedStep}`);
      return parseInt(savedStep, 10);
    }
    return 1; // Default start at step 1
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('Current onboarding step:', step);
    
    // Ensure Feather icons are loaded
    if (window.feather) {
      window.feather.replace();
    }
  }, [step]);
  
  const handleNextStep = () => {
    const nextStep = step + 1;
    console.log(`Onboarding - Moving to step ${nextStep}`);
    
    // If final step completed, mark onboarding as complete and navigate to home
    if (nextStep > 4) {
      console.log('Onboarding complete, navigating to home');
      try {
        dispatch({ type: actionTypes.COMPLETE_ONBOARDING });
        console.log('Navigation to home page');
        navigate('/home');
      } catch (error) {
        console.error('Error completing onboarding:', error);
      }
      return;
    }
    
    try {
      // Save current step in localStorage to preserve progress
      localStorage.setItem('onboardingStep', nextStep.toString());
      console.log(`Saved step ${nextStep} to localStorage`);
      
      setStep(nextStep);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(`Error moving to step ${nextStep}:`, error);
    }
  };
  
  const handlePreviousStep = () => {
    const prevStep = Math.max(1, step - 1);
    console.log(`Onboarding - Moving back to step ${prevStep}`);
    
    try {
      // Save current step in localStorage to preserve progress
      localStorage.setItem('onboardingStep', prevStep.toString());
      console.log(`Saved step ${prevStep} to localStorage`);
      
      setStep(prevStep);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(`Error moving to step ${prevStep}:`, error);
    }
  };
  
  // Define welcome slides for the carousel
  const welcomeSlides = [
    {
      title: "Welcome to BeatObesity",
      description: "Your personalized weight loss journey with GLP-1 therapies, wearables, and clinical support.",
      icon: "heart"
    },
    {
      title: "Personalized Guidance",
      description: "Get expert advice and support from our AI companion tailored to your specific needs.",
      icon: "message-circle"
    },
    {
      title: "Track Your Progress",
      description: "Monitor your weight loss journey with integrated devices and comprehensive dashboards.",
      icon: "trending-up"
    },
    {
      title: "Clinical Support",
      description: "Access healthcare professionals and manage your GLP-1 medication effortlessly.",
      icon: "users"
    }
  ];
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingCarousel 
            slides={welcomeSlides} 
            onComplete={handleNextStep}
          />
        );
      case 2:
        return (
          <AvatarSelection 
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <GoalSelection 
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 4:
        return (
          <AccountCreation 
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };
  
  // Only for debugging purposes
  const renderDebugPanel = () => {
    if (process.env.NODE_ENV === 'development') {
      return (
        <DebugPanel>
          <div>Current Step: {step}</div>
          <div>Selected Avatar: {state.selectedAvatar?.name || 'None'}</div>
          <div>Health Goals: {state.healthGoals?.length || 0}</div>
          <div>User: {state.user ? 'Set' : 'Not Set'}</div>
          <div>Onboarded: {state.isOnboarded ? 'Yes' : 'No'}</div>
        </DebugPanel>
      );
    }
    return null;
  };

  return (
    <OnboardingContainer>
      <OnboardingContent>
        {renderStep()}
        {renderDebugPanel()}
      </OnboardingContent>
    </OnboardingContainer>
  );
};

export default Onboarding;
