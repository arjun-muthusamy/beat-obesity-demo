import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';

const HealthProfileContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProgressSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const WeightTracker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WeightValue = styled.div`
  text-align: center;
`;

const WeightLabel = styled(Typography)`
  margin-top: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textLight};
`;

const WeightDisplay = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || props.theme.colors.text};
`;

const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 ${props => props.theme.spacing.md};
`;

const FormSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  & > * {
    flex: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: 1px solid ${props => props.error ? props.theme.colors.error : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body1.fontSize};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: 1px solid ${props => props.error ? props.theme.colors.error : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body1.fontSize};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
`;

const GoalsSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const GoalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const GoalItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const GoalIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color || props.theme.colors.primary};
  color: white;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const GoalContent = styled.div`
  flex: 1;
`;

const MedicalConditionSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ConditionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const ConditionTag = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.caption.fontSize};
  
  svg {
    width: 14px;
    height: 14px;
    cursor: pointer;
    color: ${props => props.theme.colors.textLight};
    
    &:hover {
      color: ${props => props.theme.colors.error};
    }
  }
`;

const HealthProfile = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const { healthGoals } = state;
  
  const [formData, setFormData] = useState({
    gender: 'male',
    age: 42,
    height: 175,
    currentWeight: 210.4,
    startWeight: 225,
    targetWeight: 180,
    activityLevel: 'moderate',
    conditions: [
      'Type 2 Diabetes',
      'Hypertension',
      'High Cholesterol'
    ]
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRemoveCondition = (condition) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter(c => c !== condition)
    });
  };
  
  const handleAddCondition = () => {
    const newCondition = prompt('Enter medical condition:');
    if (newCondition && newCondition.trim() && !formData.conditions.includes(newCondition)) {
      setFormData({
        ...formData,
        conditions: [...formData.conditions, newCondition]
      });
    }
  };
  
  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    return (formData.currentWeight / (heightInMeters * heightInMeters)).toFixed(1);
  };
  
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#2196F3' };
    if (bmi < 25) return { category: 'Normal', color: '#4CAF50' };
    if (bmi < 30) return { category: 'Overweight', color: '#FF9800' };
    return { category: 'Obese', color: '#F44336' };
  };
  
  const bmi = calculateBMI();
  const bmiInfo = getBMICategory(bmi);
  
  const calculateProgress = () => {
    const totalToLose = formData.startWeight - formData.targetWeight;
    const lost = formData.startWeight - formData.currentWeight;
    return Math.round((lost / totalToLose) * 100);
  };
  
  const weightProgress = calculateProgress();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update metrics in context
    dispatch({
      type: actionTypes.UPDATE_METRICS,
      payload: {
        currentWeight: formData.currentWeight,
        targetWeight: formData.targetWeight,
        startWeight: formData.startWeight
      }
    });
    
    // Show success message
    alert('Health profile updated successfully!');
  };
  
  return (
    <HealthProfileContainer>
      <Typography variant="h5" gutterBottom>
        Health Profile
      </Typography>
      
      <SectionCard>
        <ProgressSection>
          <Typography variant="h6" gutterBottom>
            Weight Journey
          </Typography>
          
          <WeightTracker>
            <WeightValue>
              <WeightDisplay color="#F44336">{formData.startWeight}</WeightDisplay>
              <WeightLabel>Starting Weight</WeightLabel>
            </WeightValue>
            
            <ProgressContainer>
              <ProgressBar 
                value={weightProgress} 
                variant="primary" 
                size="md"
                shape="pill"
                showValue
              />
            </ProgressContainer>
            
            <WeightValue>
              <WeightDisplay color="#4CAF50">{formData.targetWeight}</WeightDisplay>
              <WeightLabel>Target Weight</WeightLabel>
            </WeightValue>
          </WeightTracker>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '60px', 
              backgroundColor: bmiInfo.color + '20', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: bmiInfo.color
            }}>
              <Typography variant="h4" style={{ fontWeight: 700 }}>
                {bmi}
              </Typography>
              <Typography variant="body2">
                BMI
              </Typography>
              <Typography variant="caption">
                {bmiInfo.category}
              </Typography>
            </div>
          </div>
        </ProgressSection>
        
        <form onSubmit={handleSubmit}>
          <FormSection>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="gender">Biological Sex</Label>
                <Select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                min="100"
                max="250"
                value={formData.height}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="currentWeight">Current Weight (lbs)</Label>
                <Input
                  id="currentWeight"
                  name="currentWeight"
                  type="number"
                  min="50"
                  max="500"
                  step="0.1"
                  value={formData.currentWeight}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="targetWeight">Target Weight (lbs)</Label>
                <Input
                  id="targetWeight"
                  name="targetWeight"
                  type="number"
                  min="50"
                  max="500"
                  step="0.1"
                  value={formData.targetWeight}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 times/week)</option>
                <option value="moderate">Moderate (exercise 3-5 times/week)</option>
                <option value="active">Active (exercise 6-7 times/week)</option>
                <option value="veryActive">Very Active (hard exercise daily)</option>
              </Select>
            </FormGroup>
          </FormSection>
          
          <GoalsSection>
            <Typography variant="h6" gutterBottom>
              Health Goals
            </Typography>
            
            <GoalList>
              {healthGoals?.map((goal, index) => (
                <GoalItem key={index}>
                  <GoalIcon color={goal.color}>
                    <i data-feather={goal.icon} />
                  </GoalIcon>
                  <GoalContent>
                    <Typography variant="body1" gutterBottom>
                      {goal.title}
                    </Typography>
                    <Typography variant="body2" color="textLight">
                      {goal.description}
                    </Typography>
                  </GoalContent>
                </GoalItem>
              ))}
              
              {(!healthGoals || healthGoals.length === 0) && (
                <Typography variant="body2" color="textLight">
                  No health goals set. Complete onboarding to set your goals.
                </Typography>
              )}
            </GoalList>
          </GoalsSection>
          
          <MedicalConditionSection>
            <Typography variant="h6" gutterBottom>
              Medical Conditions
            </Typography>
            
            <Typography variant="body2" color="textLight" gutterBottom>
              These help us personalize your treatment plan
            </Typography>
            
            <ConditionsList>
              {formData.conditions.map((condition, index) => (
                <ConditionTag key={index}>
                  {condition}
                  <i 
                    data-feather="x" 
                    onClick={() => handleRemoveCondition(condition)}
                  />
                </ConditionTag>
              ))}
              <Button 
                variant="outlined" 
                size="small"
                icon={<i data-feather="plus" />}
                onClick={handleAddCondition}
              >
                Add Condition
              </Button>
            </ConditionsList>
          </MedicalConditionSection>
          
          <Button
            variant="primary"
            size="full"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </SectionCard>
    </HealthProfileContainer>
  );
};

export default HealthProfile;
