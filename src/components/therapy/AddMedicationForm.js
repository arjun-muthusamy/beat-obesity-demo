import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import Card from '../shared/Card';

const FormContainer = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
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
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.5;
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

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.selected ? props.theme.colors.primaryLighter : props.theme.colors.backgroundDark};
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLighter};
  }
`;

const ScheduleContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const WeekdaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WeekdayButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  background-color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.backgroundDark};
  color: ${props => props.selected ? 'white' : props.theme.colors.text};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => !props.selected ? props.theme.colors.backgroundDarker : props.theme.colors.primary};
  }
`;

const TimeSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const TimeSlot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const TimeInput = styled.input`
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: 1px solid transparent;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  text-align: center;
  width: 100px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ColorOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const ColorOption = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  transition: transform ${props => props.theme.transitions.short};
  border: 2px solid ${props => props.selected ? 'white' : 'transparent'};
  box-shadow: ${props => props.selected ? `0 0 0 2px ${props.theme.colors.primary}` : 'none'};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const IconOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};
`;

const IconOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.selected ? props.theme.colors.primaryLighter : props.theme.colors.backgroundDark};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  border: 1px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLighter};
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.textLight};
  }
`;

const ErrorText = styled(Typography)`
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.caption.fontSize};
`;

// Medication icon options
const medicationIcons = [
  'activity', 'tablet', 'thermometer', 'droplet', 
  'sun', 'heart', 'clipboard', 'zap', 'battery-charging'
];

// Medication color options
const medicationColors = [
  '#5A58BB', '#4A90E2', '#F44336', '#4CAF50', 
  '#FF9800', '#9C27B0', '#E91E63', '#00BCD4', '#795548'
];

// Weekly schedule options
const weekdays = [
  { id: 0, label: 'S', name: 'Sunday' },
  { id: 1, label: 'M', name: 'Monday' },
  { id: 2, label: 'T', name: 'Tuesday' },
  { id: 3, label: 'W', name: 'Wednesday' },
  { id: 4, label: 'T', name: 'Thursday' },
  { id: 5, label: 'F', name: 'Friday' },
  { id: 6, label: 'S', name: 'Saturday' }
];

// Predefined medications for easier input
const predefinedMedications = [
  { 
    name: 'Ozempic (semaglutide)', 
    dosage: '0.5 mg', 
    instructions: 'Inject subcutaneously once weekly',
    frequency: 'weekly'
  },
  { 
    name: 'Wegovy (semaglutide)', 
    dosage: '2.4 mg', 
    instructions: 'Inject subcutaneously once weekly',
    frequency: 'weekly'
  },
  { 
    name: 'Metformin', 
    dosage: '1000 mg', 
    instructions: 'Take twice daily with meals',
    frequency: 'daily'
  },
  { 
    name: 'Saxenda (liraglutide)', 
    dosage: '3 mg', 
    instructions: 'Inject subcutaneously once daily',
    frequency: 'daily'
  }
];

const AddMedicationForm = ({ onClose, onAddMedication }) => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    instructions: '',
    icon: 'tablet',
    color: '#5A58BB',
    frequency: 'daily', // daily, weekly, monthly
    timeOfDay: '08:00', // Default 8:00 AM
    selectedDays: [new Date().getDay()], // Default to current day
    predefinedMed: null
  });
  
  const [errors, setErrors] = useState({});
  
  // Handle changing a predefined medication
  const handlePredefinedMedication = (med) => {
    setFormData({
      ...formData,
      name: med.name,
      dosage: med.dosage,
      instructions: med.instructions,
      frequency: med.frequency,
      predefinedMed: med.name
    });
  };
  
  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error on field change
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle frequency selection
  const handleFrequencyChange = (frequency) => {
    setFormData({
      ...formData,
      frequency
    });
  };
  
  // Handle icon selection
  const handleIconSelect = (icon) => {
    setFormData({
      ...formData,
      icon
    });
  };
  
  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData({
      ...formData,
      color
    });
  };
  
  // Handle day selection for weekly schedule
  const handleDaySelect = (dayId) => {
    const selectedDays = [...formData.selectedDays];
    const index = selectedDays.indexOf(dayId);
    
    if (index === -1) {
      // Add day
      selectedDays.push(dayId);
    } else {
      // Remove day
      selectedDays.splice(index, 1);
    }
    
    setFormData({
      ...formData,
      selectedDays
    });
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Medication name is required';
    }
    
    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Dosage is required';
    }
    
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
    }
    
    if (formData.frequency === 'weekly' && formData.selectedDays.length === 0) {
      newErrors.selectedDays = 'Please select at least one day of the week';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Calculate the next dose date based on frequency and selected days
  const calculateNextDose = () => {
    const now = new Date();
    let nextDose;
    
    // Parse time of day
    const [hours, minutes] = formData.timeOfDay.split(':').map(Number);
    
    if (formData.frequency === 'daily') {
      // If time is already past for today, set for tomorrow
      nextDose = new Date(now);
      nextDose.setHours(hours, minutes, 0, 0);
      
      if (nextDose < now) {
        nextDose.setDate(nextDose.getDate() + 1);
      }
    } else if (formData.frequency === 'weekly') {
      // Find the next occurrence of a selected day
      const currentDay = now.getDay();
      let daysUntilNext = 7;
      
      // Sort selected days for consistent processing
      const sortedDays = [...formData.selectedDays].sort((a, b) => a - b);
      
      // Find the next day that comes after the current day
      for (const day of sortedDays) {
        const diff = (day - currentDay + 7) % 7;
        if (diff < daysUntilNext && diff > 0) {
          daysUntilNext = diff;
        }
      }
      
      // If all selected days are before current day or same day but time has passed,
      // take the first selected day next week
      if (daysUntilNext === 7) {
        daysUntilNext = (sortedDays[0] - currentDay + 7) % 7;
        if (daysUntilNext === 0) {
          // Same day but check if time has passed
          const todayWithTime = new Date(now);
          todayWithTime.setHours(hours, minutes, 0, 0);
          
          if (todayWithTime > now) {
            daysUntilNext = 0; // Set for today
          } else {
            daysUntilNext = 7; // Set for next week
          }
        }
      }
      
      nextDose = new Date(now);
      nextDose.setDate(nextDose.getDate() + daysUntilNext);
      nextDose.setHours(hours, minutes, 0, 0);
    } else if (formData.frequency === 'monthly') {
      // If day of month is already past, set for next month
      const currentDate = now.getDate();
      const selectedDate = formData.selectedDays[0] || currentDate;
      
      nextDose = new Date(now.getFullYear(), now.getMonth(), selectedDate);
      nextDose.setHours(hours, minutes, 0, 0);
      
      if (nextDose < now) {
        nextDose = new Date(now.getFullYear(), now.getMonth() + 1, selectedDate);
        nextDose.setHours(hours, minutes, 0, 0);
      }
    }
    
    return nextDose.toISOString();
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const nextDose = calculateNextDose();
      const today = new Date();
      const nextDoseDate = new Date(nextDose);
      
      // Calculate days left
      const diffTime = Math.abs(nextDoseDate - today);
      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // New medication object
      const newMedication = {
        id: Date.now(),
        name: formData.name,
        dosage: formData.dosage,
        instructions: formData.instructions,
        icon: formData.icon,
        color: formData.color,
        nextDose,
        frequency: formData.frequency,
        selectedDays: formData.selectedDays,
        timeOfDay: formData.timeOfDay,
        status: 'upcoming',
        daysLeft,
        progress: 0,
      };
      
      // Get current medications from state
      const medications = state.medicationReminders || [];
      const updatedMedications = [...medications, newMedication];
      
      // Update state
      dispatch({ 
        type: actionTypes.UPDATE_METRICS, 
        payload: { medicationReminders: updatedMedications } 
      });
      
      // Call parent handler if provided
      if (onAddMedication) {
        onAddMedication(newMedication);
      }
      
      // Close modal if handler provided
      if (onClose) {
        onClose();
      }
    }
  };
  
  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Add Medication
      </Typography>
      
      <Typography variant="body2" color="textLight" gutterBottom>
        Add the details of your medication and set up reminders
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Select a Common Medication (Optional)</Label>
          <Select
            name="predefinedMed"
            value={formData.predefinedMed || ''}
            onChange={(e) => {
              const selected = predefinedMedications.find(med => med.name === e.target.value);
              if (selected) {
                handlePredefinedMedication(selected);
              }
            }}
          >
            <option value="">Select a medication (or enter custom below)</option>
            {predefinedMedications.map((med, index) => (
              <option key={index} value={med.name}>
                {med.name} - {med.dosage}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="name">Medication Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Ozempic"
            error={errors.name}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            name="dosage"
            value={formData.dosage}
            onChange={handleInputChange}
            placeholder="e.g., 0.5 mg"
            error={errors.dosage}
          />
          {errors.dosage && <ErrorText>{errors.dosage}</ErrorText>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="instructions">Instructions</Label>
          <Input
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            placeholder="e.g., Inject subcutaneously once weekly"
            error={errors.instructions}
          />
          {errors.instructions && <ErrorText>{errors.instructions}</ErrorText>}
        </FormGroup>
        
        <FormGroup>
          <Label>Medication Icon</Label>
          <IconOptions>
            {medicationIcons.map((icon, index) => (
              <IconOption
                key={index}
                selected={formData.icon === icon}
                onClick={() => handleIconSelect(icon)}
              >
                <i data-feather={icon} />
              </IconOption>
            ))}
          </IconOptions>
        </FormGroup>
        
        <FormGroup>
          <Label>Color</Label>
          <ColorOptions>
            {medicationColors.map((color, index) => (
              <ColorOption
                key={index}
                color={color}
                selected={formData.color === color}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </ColorOptions>
        </FormGroup>
        
        <FormGroup>
          <Label>Frequency</Label>
          <RadioGroup>
            <RadioOption
              selected={formData.frequency === 'daily'}
              onClick={() => handleFrequencyChange('daily')}
            >
              <input
                type="radio"
                name="frequency"
                value="daily"
                checked={formData.frequency === 'daily'}
                onChange={() => {}}
                style={{ display: 'none' }}
              />
              <Typography variant="body2">Daily</Typography>
            </RadioOption>
            
            <RadioOption
              selected={formData.frequency === 'weekly'}
              onClick={() => handleFrequencyChange('weekly')}
            >
              <input
                type="radio"
                name="frequency"
                value="weekly"
                checked={formData.frequency === 'weekly'}
                onChange={() => {}}
                style={{ display: 'none' }}
              />
              <Typography variant="body2">Weekly</Typography>
            </RadioOption>
            
            <RadioOption
              selected={formData.frequency === 'monthly'}
              onClick={() => handleFrequencyChange('monthly')}
            >
              <input
                type="radio"
                name="frequency"
                value="monthly"
                checked={formData.frequency === 'monthly'}
                onChange={() => {}}
                style={{ display: 'none' }}
              />
              <Typography variant="body2">Monthly</Typography>
            </RadioOption>
          </RadioGroup>
        </FormGroup>
        
        <ScheduleContainer>
          <Label>Reminder Schedule</Label>
          
          {formData.frequency === 'weekly' && (
            <>
              <Typography variant="body2" gutterBottom>
                Select days of the week
              </Typography>
              <WeekdaySelector>
                {weekdays.map((day) => (
                  <WeekdayButton
                    key={day.id}
                    type="button"
                    selected={formData.selectedDays.includes(day.id)}
                    onClick={() => handleDaySelect(day.id)}
                  >
                    {day.label}
                  </WeekdayButton>
                ))}
              </WeekdaySelector>
              {errors.selectedDays && <ErrorText>{errors.selectedDays}</ErrorText>}
            </>
          )}
          
          <TimeSelector>
            <TimeSlot>
              <Label htmlFor="timeOfDay">Time</Label>
              <TimeInput
                id="timeOfDay"
                name="timeOfDay"
                type="time"
                value={formData.timeOfDay}
                onChange={handleInputChange}
              />
            </TimeSlot>
          </TimeSelector>
        </ScheduleContainer>
        
        <ButtonGroup>
          <Button
            variant="outlined"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Add Medication
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default AddMedicationForm;