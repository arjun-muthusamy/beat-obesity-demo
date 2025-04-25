import React from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import ProgressBar from '../shared/ProgressBar';
import Card from '../shared/Card';

const ProgressSummaryContainer = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const MetricCard = styled.div`
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
`;

const MetricValue = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.color || props.theme.colors.text};
`;

const MetricIcon = styled.div`
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.color || props.theme.colors.primary};
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const WeightProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WeightValue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || 'flex-start'};
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => 
    props.trend === 'down' 
      ? props.theme.colors.success 
      : props.trend === 'up' 
        ? props.theme.colors.error 
        : props.theme.colors.warning};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProgressSummary = ({ userData = {} }) => {
  // Default values or from userData
  const {
    currentWeight = 210.4,
    startWeight = 225,
    targetWeight = 180,
    weightDiff = 14.6,
    weightProgress = 32,
    weightTrend = 'down',
    glucoseValue = 112,
    glucoseTrend = 'stable',
    stepsToday = 7432,
    stepsGoal = 10000,
    stepsProgress = 74,
    caloriesIntake = 1850,
    caloriesGoal = 2200,
    caloriesProgress = 84
  } = userData;
  
  const trendIcons = {
    up: "trending-up",
    down: "trending-down",
    stable: "minus"
  };
  
  return (
    <ProgressSummaryContainer>
      <Card.Header>
        <Typography variant="h5">Your Progress</Typography>
      </Card.Header>
      
      <WeightProgress>
        <WeightValue>
          <Typography variant="body2" color="textLight">Current</Typography>
          <MetricValue color={weightTrend === 'down' ? '#4CAF50' : '#F44336'}>
            {currentWeight} <small>lbs</small>
          </MetricValue>
          <TrendIndicator trend={weightTrend}>
            <i data-feather={trendIcons[weightTrend]} />
            <Typography variant="caption">
              {weightDiff} lbs {weightTrend}
            </Typography>
          </TrendIndicator>
        </WeightValue>
        
        <WeightValue align="center">
          <Typography variant="body2" color="textLight">Start</Typography>
          <Typography variant="body1">{startWeight} lbs</Typography>
        </WeightValue>
        
        <WeightValue align="flex-end">
          <Typography variant="body2" color="textLight">Target</Typography>
          <Typography variant="body1">{targetWeight} lbs</Typography>
        </WeightValue>
      </WeightProgress>
      
      <ProgressBar 
        value={weightProgress} 
        variant="gradient" 
        label="Weight Loss Progress" 
        showValue
        size="lg"
        shape="pill"
      />
      
      <MetricsGrid>
        <MetricCard>
          <MetricIcon color="#5A58BB">
            <i data-feather="activity" />
          </MetricIcon>
          <MetricValue color="#5A58BB">{glucoseValue}</MetricValue>
          <Typography variant="caption" color="textLight">
            Glucose mg/dL
          </Typography>
          <TrendIndicator trend={glucoseTrend}>
            <i data-feather={trendIcons[glucoseTrend]} />
            <Typography variant="caption">
              Stable
            </Typography>
          </TrendIndicator>
        </MetricCard>
        
        <MetricCard>
          <MetricIcon color="#4A90E2">
            <i data-feather="navigation" />
          </MetricIcon>
          <MetricValue color="#4A90E2">{stepsToday}</MetricValue>
          <Typography variant="caption" color="textLight">
            Steps Today
          </Typography>
          <ProgressBar 
            value={stepsProgress} 
            size="xs" 
            variant="primary"
            margin="8px 0 0 0"
          />
        </MetricCard>
        
        <MetricCard>
          <MetricIcon color="#F44336">
            <i data-feather="zap" />
          </MetricIcon>
          <MetricValue color="#F44336">{caloriesIntake}</MetricValue>
          <Typography variant="caption" color="textLight">
            Calories Today
          </Typography>
          <ProgressBar 
            value={caloriesProgress} 
            size="xs" 
            variant="error"
            margin="8px 0 0 0"
          />
        </MetricCard>
        
        <MetricCard>
          <MetricIcon color="#4CAF50">
            <i data-feather="moon" />
          </MetricIcon>
          <MetricValue color="#4CAF50">7.2</MetricValue>
          <Typography variant="caption" color="textLight">
            Hours of Sleep
          </Typography>
          <ProgressBar 
            value={90} 
            size="xs" 
            variant="success"
            margin="8px 0 0 0"
          />
        </MetricCard>
      </MetricsGrid>
    </ProgressSummaryContainer>
  );
};

export default ProgressSummary;
