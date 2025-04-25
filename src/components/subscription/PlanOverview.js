import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';

const PlanOverviewContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CurrentPlanCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.gradientPrimary};
  color: white;
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PlanDetails = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PlanFeatures = styled.div`
  margin: ${props => props.theme.spacing.md} 0;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  svg {
    margin-right: ${props => props.theme.spacing.sm};
    width: 16px;
    height: 16px;
  }
`;

const RenewalInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md};
`;

const UsageSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const UsageItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const UpgradeSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const PlanOptionCard = styled(Card)`
  transition: all ${props => props.theme.transitions.medium};
  
  ${props => props.selected && `
    border: 2px solid ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primaryLighter}33;
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const PlanPrice = styled.div`
  display: flex;
  align-items: baseline;
  margin: ${props => props.theme.spacing.md} 0;
`;

const PriceAmount = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  margin-right: ${props => props.theme.spacing.xs};
`;

const PricePeriod = styled(Typography)`
  color: ${props => props.theme.colors.textLight};
`;

const PlanTag = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PlanOverview = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Sample plan options
  const planOptions = [
    {
      id: 'complete',
      name: 'Complete',
      tag: 'Most Popular',
      price: 199,
      period: 'month',
      description: 'Comprehensive weight loss with medication and full monitoring',
      features: [
        'GLP-1 Prescription & Delivery',
        'CGM Integration',
        'AI Companion',
        'Unlimited Doctor Visits',
        'Personalized Coaching'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 99,
      period: 'month',
      description: 'Essential weight loss support without devices',
      features: [
        'GLP-1 Prescription & Delivery',
        'AI Companion',
        'Monthly Doctor Visits'
      ]
    }
  ];

  return (
    <PlanOverviewContainer>
      <Typography variant="h5" gutterBottom>
        Your Subscription
      </Typography>
      
      <CurrentPlanCard>
        <PlanHeader>
          <Typography variant="h5" color="white">
            Complete Plan
          </Typography>
          <Typography variant="body2">
            Active
          </Typography>
        </PlanHeader>
        
        <PlanDetails>
          <Typography variant="body1" color="white" gutterBottom>
            Your comprehensive weight loss plan includes medication,
            device integration, and coaching.
          </Typography>
          
          <PlanFeatures>
            <FeatureItem>
              <i data-feather="check-circle" />
              <Typography variant="body2">
                GLP-1 Prescription & Delivery
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <i data-feather="check-circle" />
              <Typography variant="body2">
                CGM & Wearable Integration
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <i data-feather="check-circle" />
              <Typography variant="body2">
                AI Companion
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <i data-feather="check-circle" />
              <Typography variant="body2">
                Unlimited Doctor Visits
              </Typography>
            </FeatureItem>
          </PlanFeatures>
          
          <RenewalInfo>
            <Typography variant="body2">
              Next billing: July 28, 2023
            </Typography>
            <Typography variant="body2" style={{ fontWeight: 600 }}>
              $199.00
            </Typography>
          </RenewalInfo>
        </PlanDetails>
      </CurrentPlanCard>
      
      <UsageSection>
        <Typography variant="h6" gutterBottom>
          Plan Usage
        </Typography>
        
        <UsageItem>
          <UsageHeader>
            <Typography variant="body2">
              Doctor Visits
            </Typography>
            <Typography variant="caption">
              2 used / Unlimited
            </Typography>
          </UsageHeader>
          <ProgressBar 
            value={100} 
            variant="success" 
            size="sm"
          />
        </UsageItem>
        
        <UsageItem>
          <UsageHeader>
            <Typography variant="body2">
              Medication
            </Typography>
            <Typography variant="caption">
              3 weeks left
            </Typography>
          </UsageHeader>
          <ProgressBar 
            value={75} 
            variant="primary" 
            size="sm"
          />
        </UsageItem>
        
        <UsageItem>
          <UsageHeader>
            <Typography variant="body2">
              Chat Support
            </Typography>
            <Typography variant="caption">
              27 messages / Unlimited
            </Typography>
          </UsageHeader>
          <ProgressBar 
            value={100} 
            variant="success" 
            size="sm"
          />
        </UsageItem>
      </UsageSection>
      
      <UpgradeSection>
        <Typography variant="h6" gutterBottom>
          Available Plans
        </Typography>
        
        <Typography variant="body2" color="textLight" gutterBottom>
          Explore our subscription options or upgrade your current plan
        </Typography>
        
        <PlanGrid>
          {planOptions.map(plan => (
            <PlanOptionCard 
              key={plan.id}
              selected={selectedPlan === plan.id}
              clickable
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.tag && <PlanTag>{plan.tag}</PlanTag>}
              
              <Typography variant="h6" gutterBottom>
                {plan.name}
              </Typography>
              
              <PlanPrice>
                <PriceAmount>${plan.price}</PriceAmount>
                <PricePeriod>/{plan.period}</PricePeriod>
              </PlanPrice>
              
              <Typography variant="body2" color="textLight" gutterBottom>
                {plan.description}
              </Typography>
              
              <PlanFeatures>
                {plan.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <i data-feather="check-circle" />
                    <Typography variant="caption">
                      {feature}
                    </Typography>
                  </FeatureItem>
                ))}
              </PlanFeatures>
              
              <Button 
                variant={selectedPlan === plan.id ? "primary" : "outlined"} 
                size="full"
                style={{ marginTop: '16px' }}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </Button>
            </PlanOptionCard>
          ))}
        </PlanGrid>
        
        <Button 
          variant="primary" 
          size="full"
          style={{ marginTop: '24px' }}
          disabled={!selectedPlan}
        >
          Update Subscription
        </Button>
      </UpgradeSection>
    </PlanOverviewContainer>
  );
};

export default PlanOverview;
