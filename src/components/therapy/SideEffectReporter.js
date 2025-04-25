import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Card from '../shared/Card';
import Typography from '../shared/Typography';
import Button from '../shared/Button';

const SideEffectContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SeveritySelector = styled.div`
  display: flex;
  margin: ${props => props.theme.spacing.md} 0;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
`;

const SeverityOption = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: none;
  background-color: ${props => 
    props.selected 
      ? props.color 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.selected 
      ? 'white' 
      : props.theme.colors.text};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.color 
        : props.hoverColor};
  }
  
  &:first-child {
    border-top-left-radius: ${props => props.theme.borderRadius.md};
    border-bottom-left-radius: ${props => props.theme.borderRadius.md};
  }
  
  &:last-child {
    border-top-right-radius: ${props => props.theme.borderRadius.md};
    border-bottom-right-radius: ${props => props.theme.borderRadius.md};
  }
`;

const SymptomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.md} 0;
`;

const SymptomOption = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primaryLighter 
      : props.theme.colors.backgroundDark};
  border: 2px solid ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : 'transparent'};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.theme.colors.primaryLighter 
        : `${props.theme.colors.backgroundDark}99`};
  }
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const TextAreaContainer = styled.div`
  margin: ${props => props.theme.spacing.md} 0;
`;

const TextAreaLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primaryLighter};
  }
`;

const HistoryList = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const HistoryItem = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.md};
  border-left: 4px solid ${props => {
    switch (props.severity) {
      case 'mild': return props.theme.colors.info;
      case 'moderate': return props.theme.colors.warning;
      case 'severe': return props.theme.colors.error;
      default: return props.theme.colors.info;
    }
  }};
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SymptomTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const SymptomTag = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.caption.fontSize};
`;

// Sample symptoms
const commonSymptoms = [
  { id: 1, name: "Nausea", icon: "wind" },
  { id: 2, name: "Vomiting", icon: "droplet" },
  { id: 3, name: "Diarrhea", icon: "refresh-cw" },
  { id: 4, name: "Headache", icon: "frown" },
  { id: 5, name: "Dizziness", icon: "refresh-cw" },
  { id: 6, name: "Fatigue", icon: "battery" },
  { id: 7, name: "Stomach Pain", icon: "alert-circle" },
  { id: 8, name: "Constipation", icon: "x-circle" }
];

// Sample reports for history
const sampleReports = [
  {
    id: 1,
    date: "2023-07-10",
    severity: "moderate",
    symptoms: ["Nausea", "Headache"],
    description: "Felt nauseous for about 2 hours after taking medication. Had a mild headache throughout the day.",
    medication: "Ozempic"
  },
  {
    id: 2,
    date: "2023-07-03",
    severity: "mild",
    symptoms: ["Fatigue"],
    description: "Unusually tired throughout the day. Went to bed early.",
    medication: "Ozempic"
  }
];

const SideEffectReporter = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [description, setDescription] = useState('');
  const [reports, setReports] = useState(state.sideEffects || sampleReports);
  
  const handleSeveritySelect = (severity) => {
    setSelectedSeverity(severity);
  };
  
  const handleSymptomToggle = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const handleSubmit = () => {
    if (!selectedSeverity || selectedSymptoms.length === 0) {
      alert("Please select severity and at least one symptom");
      return;
    }
    
    const newReport = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      severity: selectedSeverity,
      symptoms: selectedSymptoms.map(id => 
        commonSymptoms.find(s => s.id === id).name
      ),
      description,
      medication: "Ozempic" // In a real app, this would be selected by the user
    };
    
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    
    dispatch({ 
      type: actionTypes.REPORT_SIDE_EFFECT, 
      payload: newReport
    });
    
    // Reset form
    setSelectedSeverity(null);
    setSelectedSymptoms([]);
    setDescription('');
    
    // Show confirmation
    alert("Side effect reported successfully. Your provider will be notified.");
  };
  
  return (
    <SideEffectContainer>
      <Typography variant="h5" gutterBottom>
        Report Side Effects
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Let us know about any side effects you're experiencing with your medication so we can adjust your treatment plan if needed.
      </Typography>
      
      <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
        1. How severe are your symptoms?
      </Typography>
      
      <SeveritySelector>
        <SeverityOption 
          selected={selectedSeverity === 'mild'} 
          onClick={() => handleSeveritySelect('mild')}
          color="#2196F3"
          hoverColor="#2196F333"
        >
          Mild
        </SeverityOption>
        <SeverityOption 
          selected={selectedSeverity === 'moderate'} 
          onClick={() => handleSeveritySelect('moderate')}
          color="#FF9800"
          hoverColor="#FF980033"
        >
          Moderate
        </SeverityOption>
        <SeverityOption 
          selected={selectedSeverity === 'severe'} 
          onClick={() => handleSeveritySelect('severe')}
          color="#F44336"
          hoverColor="#F4433633"
        >
          Severe
        </SeverityOption>
      </SeveritySelector>
      
      <Typography variant="h6" gutterBottom>
        2. What symptoms are you experiencing?
      </Typography>
      
      <SymptomsGrid>
        {commonSymptoms.map(symptom => (
          <SymptomOption 
            key={symptom.id}
            selected={selectedSymptoms.includes(symptom.id)}
            onClick={() => handleSymptomToggle(symptom.id)}
          >
            <i data-feather={symptom.icon} />
            <Typography variant="body2">
              {symptom.name}
            </Typography>
          </SymptomOption>
        ))}
      </SymptomsGrid>
      
      <Typography variant="h6" gutterBottom>
        3. Additional Details
      </Typography>
      
      <TextAreaContainer>
        <TextAreaLabel htmlFor="description">
          Describe how you're feeling and when symptoms started
        </TextAreaLabel>
        <TextArea 
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="E.g., Felt nauseous about 2 hours after taking medication..."
        />
      </TextAreaContainer>
      
      <Button 
        variant="primary" 
        size="full"
        disabled={!selectedSeverity || selectedSymptoms.length === 0}
        onClick={handleSubmit}
      >
        Submit Report
      </Button>
      
      {reports.length > 0 && (
        <HistoryList>
          <Typography variant="h6" gutterBottom style={{ marginTop: '24px' }}>
            Previous Reports
          </Typography>
          
          {reports.map(report => (
            <HistoryItem 
              key={report.id} 
              severity={report.severity}
            >
              <HistoryHeader>
                <Typography variant="h6">
                  {new Date(report.date).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
                <Typography 
                  variant="caption" 
                  color={
                    report.severity === 'mild' 
                      ? 'info' 
                      : report.severity === 'moderate' 
                        ? 'warning' 
                        : 'error'
                  }
                >
                  {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)} Severity
                </Typography>
              </HistoryHeader>
              
              <SymptomTags>
                {report.symptoms.map((symptom, index) => (
                  <SymptomTag key={index}>
                    {symptom}
                  </SymptomTag>
                ))}
              </SymptomTags>
              
              <Typography variant="body2" color="textLight">
                {report.description}
              </Typography>
            </HistoryItem>
          ))}
        </HistoryList>
      )}
    </SideEffectContainer>
  );
};

export default SideEffectReporter;
