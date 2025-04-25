import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';

const TimeslotSelectorContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const DateNavigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.backgroundDark};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryLighter};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DateDisplay = styled.div`
  font-weight: 600;
`;

const DaysScrollContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundDark};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

const DayCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.selected 
      ? 'white' 
      : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.theme.colors.primary 
        : props.theme.colors.primaryLighter};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.backgroundDark};
    color: ${props => props.theme.colors.textLight};
  }
`;

const TimeslotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
`;

const TimeSlot = styled.button`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.selected 
      ? 'white' 
      : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.theme.colors.primary 
        : props.theme.colors.primaryLighter};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.backgroundDark};
    color: ${props => props.theme.colors.textLight};
  }
`;

const NoTimeslotsMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
`;

const ConfirmationCard = styled(Card)`
  margin-top: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.primaryLighter + '30'};
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const ConfirmationContent = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: flex-start;
`;

const ConfirmationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const ConfirmationDetails = styled.div`
  flex: 1;
`;

const DetailItem = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled(Typography)`
  min-width: 100px;
`;

// Helper function to generate dates for the next 14 days
const generateDateRange = (startDate, days) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const TimeslotSelector = ({ onSelect, onComplete, selectedClinic, selectedDoctor }) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState(generateDateRange(today, 14));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);
  const [timeslots, setTimeslots] = useState([]);
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeslot(null);
    
    // Generate sample timeslots based on the selected date
    // In a real app, this would come from an API call
    const dayOfWeek = date.getDay();
    
    // Simulate weekend having fewer slots
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setTimeslots([
        { id: 1, time: "10:00 AM", available: true },
        { id: 2, time: "11:30 AM", available: true },
        { id: 3, time: "1:00 PM", available: false }
      ]);
    } else {
      setTimeslots([
        { id: 1, time: "9:00 AM", available: true },
        { id: 2, time: "10:30 AM", available: true },
        { id: 3, time: "1:00 PM", available: true },
        { id: 4, time: "2:30 PM", available: true },
        { id: 5, time: "4:00 PM", available: false },
        { id: 6, time: "5:30 PM", available: true }
      ]);
    }
  };
  
  const handleTimeslotSelect = (timeslot) => {
    setSelectedTimeslot(timeslot);
    if (onSelect) {
      onSelect({ date: selectedDate, timeslot });
    }
  };
  
  const formatShortDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const navigateDates = (direction) => {
    const startDate = new Date(dateRange[0]);
    startDate.setDate(startDate.getDate() + (direction === 'next' ? 14 : -14));
    setDateRange(generateDateRange(startDate, 14));
  };
  
  // Check if we can navigate backward (only if first date is after today)
  const canNavigateBack = dateRange[0] > today;
  
  return (
    <TimeslotSelectorContainer>
      <Typography variant="h5" gutterBottom>
        Select a Date & Time
      </Typography>
      
      <DateNavigator>
        <NavButton 
          disabled={!canNavigateBack}
          onClick={() => navigateDates('prev')}
        >
          <i data-feather="chevron-left" />
        </NavButton>
        <DateDisplay>
          {dateRange.length > 0 && (
            `${formatDate(dateRange[0])} - ${formatDate(dateRange[dateRange.length - 1])}`
          )}
        </DateDisplay>
        <NavButton onClick={() => navigateDates('next')}>
          <i data-feather="chevron-right" />
        </NavButton>
      </DateNavigator>
      
      <DaysScrollContainer>
        {dateRange.map((date, index) => {
          const isToday = date.toDateString() === today.toDateString();
          const dayNum = date.getDate();
          
          return (
            <DayCard 
              key={index}
              selected={selectedDate && selectedDate.toDateString() === date.toDateString()}
              onClick={() => handleDateSelect(date)}
            >
              <Typography variant="caption">
                {formatShortDate(date)}
              </Typography>
              <Typography variant="h6">
                {dayNum}
              </Typography>
              {isToday && (
                <Typography variant="caption" color={selectedDate && selectedDate.toDateString() === date.toDateString() ? 'white' : 'primary'}>
                  Today
                </Typography>
              )}
            </DayCard>
          );
        })}
      </DaysScrollContainer>
      
      {selectedDate ? (
        <>
          <Typography variant="h6" gutterBottom>
            Available Times
          </Typography>
          
          {timeslots.length > 0 ? (
            <TimeslotsContainer>
              {timeslots.map(timeslot => (
                <TimeSlot 
                  key={timeslot.id}
                  selected={selectedTimeslot?.id === timeslot.id}
                  disabled={!timeslot.available}
                  onClick={() => timeslot.available && handleTimeslotSelect(timeslot)}
                >
                  {timeslot.time}
                </TimeSlot>
              ))}
            </TimeslotsContainer>
          ) : (
            <NoTimeslotsMessage>
              <i data-feather="calendar" style={{ width: '48px', height: '48px', marginBottom: '16px' }} />
              <Typography variant="body1" gutterBottom>
                No available timeslots for this date
              </Typography>
              <Typography variant="body2" color="textLight">
                Please select another date
              </Typography>
            </NoTimeslotsMessage>
          )}
        </>
      ) : (
        <NoTimeslotsMessage>
          <Typography variant="body1" color="textLight">
            Please select a date to view available times
          </Typography>
        </NoTimeslotsMessage>
      )}
      
      {selectedTimeslot && (
        <ConfirmationCard>
          <ConfirmationContent>
            <ConfirmationIcon>
              <i data-feather="calendar" />
            </ConfirmationIcon>
            <ConfirmationDetails>
              <Typography variant="h6" gutterBottom>
                Appointment Summary
              </Typography>
              
              <DetailItem>
                <DetailLabel variant="body2" color="textLight">
                  Date:
                </DetailLabel>
                <Typography variant="body2">
                  {formatDate(selectedDate)}
                </Typography>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel variant="body2" color="textLight">
                  Time:
                </DetailLabel>
                <Typography variant="body2">
                  {selectedTimeslot.time}
                </Typography>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel variant="body2" color="textLight">
                  Provider:
                </DetailLabel>
                <Typography variant="body2">
                  {selectedDoctor ? selectedDoctor.name : 'Selected Provider'}
                </Typography>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel variant="body2" color="textLight">
                  Location:
                </DetailLabel>
                <Typography variant="body2">
                  {selectedClinic ? selectedClinic.name : 'Selected Clinic'}
                </Typography>
              </DetailItem>
            </ConfirmationDetails>
          </ConfirmationContent>
        </ConfirmationCard>
      )}
      
      <Button 
        variant="primary" 
        size="full"
        disabled={!selectedTimeslot}
        onClick={onComplete}
        style={{ marginTop: '24px' }}
      >
        Confirm Appointment
      </Button>
    </TimeslotSelectorContainer>
  );
};

export default TimeslotSelector;
