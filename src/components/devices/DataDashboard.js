import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import ProgressBar from '../shared/ProgressBar';

const DataDashboardContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const TimeRangeSelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.xs};
  
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

const TimeButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => 
    props.selected 
      ? props.theme.colors.primary 
      : props.theme.colors.backgroundDark};
  color: ${props => 
    props.selected 
      ? 'white' 
      : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.pill};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    background-color: ${props => 
      props.selected 
        ? props.theme.colors.primary 
        : props.theme.colors.primaryLighter};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MetricCard = styled(Card)`
  padding: ${props => props.theme.spacing.md};
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MetricIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${props => props.color + '20'};
  color: ${props => props.color};
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const MetricValue = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Value = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  margin-right: ${props => props.theme.spacing.xs};
  color: ${props => props.color || props.theme.colors.text};
`;

const Unit = styled(Typography)`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => 
    props.trend === 'up' 
      ? props.positive ? props.theme.colors.success : props.theme.colors.error
      : props.trend === 'down'
        ? props.positive ? props.theme.colors.error : props.theme.colors.success
        : props.theme.colors.warning};
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const GlucoseChartSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    width: 40px;
    height: 40px;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const InsightsContainer = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const InsightCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.md};
  border-left: 4px solid ${props => props.color || props.theme.colors.primary};
`;

const InsightContent = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: flex-start;
`;

const InsightIcon = styled.div`
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

const InsightText = styled.div`
  flex: 1;
`;

// Sample time ranges
const timeRanges = ['Today', 'Week', 'Month', 'Year'];

// Sample insights
const sampleInsights = [
  {
    id: 1,
    title: "Glucose Stability Improving",
    description: "Your glucose levels have been more stable in the past week, with fewer spikes after meals.",
    icon: "thumbs-up",
    color: "#4CAF50"
  },
  {
    id: 2,
    title: "Sleep Pattern Alert",
    description: "Your sleep quality has decreased by 15% this week. Consider maintaining a consistent sleep schedule.",
    icon: "alert-triangle",
    color: "#FF9800"
  },
  {
    id: 3,
    title: "Activity Recommendation",
    description: "Try to increase your daily steps. Even a 10-minute walk after meals can help regulate blood sugar.",
    icon: "zap",
    color: "#4A90E2"
  }
];

const DataDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Today');
  
  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };
  
  return (
    <DataDashboardContainer>
      <Typography variant="h5" gutterBottom>
        Health Metrics
      </Typography>
      
      <TimeRangeSelector>
        {timeRanges.map(range => (
          <TimeButton 
            key={range}
            selected={selectedTimeRange === range}
            onClick={() => handleTimeRangeChange(range)}
          >
            {range}
          </TimeButton>
        ))}
      </TimeRangeSelector>
      
      <MetricsGrid>
        <MetricCard>
          <MetricHeader>
            <Typography variant="body2" color="textLight">
              Glucose
            </Typography>
            <MetricIcon color="#5A58BB">
              <i data-feather="activity" />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Value color="#5A58BB">112</Value>
            <Unit>mg/dL</Unit>
          </MetricValue>
          <TrendIndicator trend="stable">
            <i data-feather="minus" />
            <Typography variant="caption">
              Stable
            </Typography>
          </TrendIndicator>
        </MetricCard>
        
        <MetricCard>
          <MetricHeader>
            <Typography variant="body2" color="textLight">
              Heart Rate
            </Typography>
            <MetricIcon color="#F44336">
              <i data-feather="heart" />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Value color="#F44336">72</Value>
            <Unit>bpm</Unit>
          </MetricValue>
          <TrendIndicator trend="down" positive={true}>
            <i data-feather="trending-down" />
            <Typography variant="caption">
              -3 from avg
            </Typography>
          </TrendIndicator>
        </MetricCard>
        
        <MetricCard>
          <MetricHeader>
            <Typography variant="body2" color="textLight">
              Steps
            </Typography>
            <MetricIcon color="#4A90E2">
              <i data-feather="navigation" />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Value color="#4A90E2">7,432</Value>
            <Unit>steps</Unit>
          </MetricValue>
          <div style={{ marginTop: '4px' }}>
            <ProgressBar 
              value={74} 
              variant="primary" 
              size="xs"
              showValue
            />
          </div>
        </MetricCard>
        
        <MetricCard>
          <MetricHeader>
            <Typography variant="body2" color="textLight">
              Sleep
            </Typography>
            <MetricIcon color="#9C27B0">
              <i data-feather="moon" />
            </MetricIcon>
          </MetricHeader>
          <MetricValue>
            <Value color="#9C27B0">7.2</Value>
            <Unit>hrs</Unit>
          </MetricValue>
          <TrendIndicator trend="up" positive={true}>
            <i data-feather="trending-up" />
            <Typography variant="caption">
              +0.5 from avg
            </Typography>
          </TrendIndicator>
        </MetricCard>
      </MetricsGrid>
      
      <GlucoseChartSection>
        <Typography variant="h6" gutterBottom>
          Glucose Trends
        </Typography>
        
        <ChartPlaceholder>
          <i data-feather="bar-chart-2" />
          <Typography variant="body2">
            Glucose data visualization will appear here
          </Typography>
        </ChartPlaceholder>
      </GlucoseChartSection>
      
      <InsightsContainer>
        <Typography variant="h6" gutterBottom>
          AI Insights
        </Typography>
        
        {sampleInsights.map(insight => (
          <InsightCard key={insight.id} color={insight.color}>
            <InsightContent>
              <InsightIcon color={insight.color}>
                <i data-feather={insight.icon} />
              </InsightIcon>
              <InsightText>
                <Typography variant="h6" gutterBottom>
                  {insight.title}
                </Typography>
                <Typography variant="body2" color="textLight">
                  {insight.description}
                </Typography>
              </InsightText>
            </InsightContent>
          </InsightCard>
        ))}
      </InsightsContainer>
    </DataDashboardContainer>
  );
};

export default DataDashboard;
