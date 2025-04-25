import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import Card from '../shared/Card';

const GoalSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.xl};
  height: 100%;
`;

const HeaderContent = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const GoalsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const GoalCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : 'transparent'};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primaryLighter + '40' // Add transparency
      : props.theme.colors.backgroundLight};
  transition: all ${props => props.theme.transitions.short};
`;

const GoalCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.circle};
  background-color: ${props => props.bgColor || props.theme.colors.primaryLight};
  color: white;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const GoalInfo = styled.div`
  flex: 1;
`;

const SelectedGoalsPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SelectedGoalTag = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primaryLighter};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: 500;
  
  svg {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
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

// Sample health goals data
const healthGoalOptions = [
  { id: 1, title: "Weight Loss", description: "Reduce overall body weight", icon: "trending-down", color: "#673AB7" },
  { id: 2, title: "Better Glucose Control", description: "Manage and stabilize blood sugar levels", icon: "activity", color: "#7E57C2" },
  { id: 3, title: "Increased Energy", description: "Feel more energetic throughout the day", icon: "zap", color: "#9575CD" },
  { id: 4, title: "Improved Sleep", description: "Get better quality and duration of sleep", icon: "moon", color: "#9C27B0" },
  { id: 5, title: "Reduced Medications", description: "Lower dependence on current medications", icon: "heart", color: "#BA68C8" },
  { id: 6, title: "Better Mobility", description: "Move more freely with less pain", icon: "move", color: "#8E24AA" },
];

const GoalSelection = ({ onNext, onBack }) => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const [selectedGoals, setSelectedGoals] = useState(state.healthGoals || []);
  
  const handleGoalToggle = (goal) => {
    console.log(`Goal ${goal.title} toggle`);
    let newGoals;
    
    if (selectedGoals.some(g => g.id === goal.id)) {
      console.log(`Removing goal: ${goal.title}`);
      newGoals = selectedGoals.filter(g => g.id !== goal.id);
    } else {
      console.log(`Adding goal: ${goal.title}`);
      newGoals = [...selectedGoals, goal];
    }
    
    // Update local state
    setSelectedGoals(newGoals);
    
    // Update context immediately
    try {
      console.log("Updating goals in context:", newGoals.map(g => g.title));
      dispatch({ 
        type: actionTypes.SET_HEALTH_GOALS, 
        payload: newGoals 
      });
    } catch (error) {
      console.error("Error updating goals in context:", error);
    }
  };
  
  const handleRemoveGoal = (goalId) => {
    console.log("Removing goal ID:", goalId);
    const goal = selectedGoals.find(g => g.id === goalId);
    console.log("Removing goal:", goal?.title);
    
    const newGoals = selectedGoals.filter(g => g.id !== goalId);
    
    // Update local state
    setSelectedGoals(newGoals);
    
    // Update context immediately
    try {
      console.log("Updating goals in context after removal");
      dispatch({ 
        type: actionTypes.SET_HEALTH_GOALS, 
        payload: newGoals 
      });
    } catch (error) {
      console.error("Error updating goals in context after removal:", error);
    }
  };
  
  const handleContinue = () => {
    console.log("GoalSelection - Continue button clicked");
    
    if (selectedGoals.length > 0) {
      console.log("Selected goals:", selectedGoals.map(g => g.title));
      
      try {
        dispatch({ 
          type: actionTypes.SET_HEALTH_GOALS, 
          payload: selectedGoals 
        });
        
        console.log("Health goals saved, proceeding to next step");
        onNext(); // Call the parent component's onNext function
      } catch (error) {
        console.error("Error in handling goals continue:", error);
      }
    } else {
      console.warn("No goals selected, cannot continue");
    }
  };
  
  return (
    <GoalSelectionContainer>
      <HeaderContent>
        <Typography variant="h3" gutterBottom>
          What are your health goals?
        </Typography>
        <Typography variant="body1" color="textLight">
          Select one or more goals for your weight loss journey
        </Typography>
      </HeaderContent>
      
      {selectedGoals.length > 0 && (
        <SelectedGoalsPreview>
          {selectedGoals.map(goal => (
            <SelectedGoalTag key={goal.id}>
              {goal.title}
              <i 
                data-feather="x" 
                onClick={() => handleRemoveGoal(goal.id)}
              />
            </SelectedGoalTag>
          ))}
        </SelectedGoalsPreview>
      )}
      
      <GoalsGrid>
        {healthGoalOptions.map((goal) => (
          <GoalCard 
            key={goal.id}
            clickable
            selected={selectedGoals.some(g => g.id === goal.id)}
            onClick={() => handleGoalToggle(goal)}
          >
            <GoalCardContent>
              <IconContainer bgColor={goal.color}>
                <i data-feather={goal.icon} />
              </IconContainer>
              <GoalInfo>
                <Typography variant="h6" gutterBottom>
                  {goal.title}
                </Typography>
                <Typography variant="body2" color="textLight">
                  {goal.description}
                </Typography>
              </GoalInfo>
            </GoalCardContent>
          </GoalCard>
        ))}
      </GoalsGrid>
      
      <ButtonsContainer>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="primary" 
          disabled={selectedGoals.length === 0}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </ButtonsContainer>
    </GoalSelectionContainer>
  );
};

export default GoalSelection;
