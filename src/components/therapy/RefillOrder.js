import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../shared/Card';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';

const RefillContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MedicationCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  overflow: hidden;
`;

const MedicationContent = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const MedIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30%;
  background-color: ${props => props.theme.colors.primaryLighter};
  color: ${props => props.theme.colors.primary};
  
  svg {
    width: 28px;
    height: 28px;
  }
`;

const MedInfo = styled.div`
  flex: 1;
`;

const SupplyStatus = styled.div`
  margin: ${props => props.theme.spacing.md} 0;
`;

const StatusLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const PharmacySection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const AddressCard = styled(Card)`
  margin-top: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  ${props => props.selected && `
    border: 2px solid ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primaryLighter}33;
  `}
`;

const LocationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.primaryLighter};
  color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const AddressInfo = styled.div`
  flex: 1;
`;

const ChangeLinkButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  font-size: ${props => props.theme.typography.caption.fontSize};
  padding: 0;
`;

const DeliveryOptions = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const OptionSelector = styled.div`
  display: flex;
  margin: ${props => props.theme.spacing.md} 0;
  gap: ${props => props.theme.spacing.md};
`;

const OptionCard = styled.button`
  flex: 1;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  text-align: center;
  
  svg {
    width: 24px;
    height: 24px;
    color: ${props => props.theme.colors.primary};
  }
`;

const SummarySection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TotalRow = styled(SummaryRow)`
  font-weight: 600;
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.backgroundDark};
`;

const RefillOrder = () => {
  const [pharmacy, setPharmacy] = useState('local');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [orderComplete, setOrderComplete] = useState(false);
  
  const handlePharmacyChange = (option) => {
    setPharmacy(option);
  };
  
  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };
  
  const handleSubmitOrder = () => {
    // In a real app, this would submit the order to an API
    setOrderComplete(true);
    
    // Show confirmation
    setTimeout(() => {
      alert("Your refill order has been submitted successfully!");
    }, 500);
  };
  
  return (
    <RefillContainer>
      {orderComplete ? (
        <Card>
          <Card.Header>
            <Typography variant="h5">Order Successful!</Typography>
          </Card.Header>
          <Card.Content>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                backgroundColor: '#4CAF50', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white'
              }}>
                <i data-feather="check" style={{ width: '40px', height: '40px' }} />
              </div>
            </div>
            
            <Typography variant="h6" align="center" gutterBottom>
              Your Ozempic refill order has been placed
            </Typography>
            
            <Typography variant="body1" align="center" color="textLight" gutterBottom>
              You will receive a notification when your medication is ready for pickup or on its way to you.
            </Typography>
            
            <Typography variant="body2" align="center" gutterBottom style={{ marginTop: '16px' }}>
              Order Reference: #ORD87429
            </Typography>
            
            <Typography variant="body2" align="center" color="textLight">
              Estimated arrival: 2-3 business days
            </Typography>
          </Card.Content>
        </Card>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Refill Medication
          </Typography>
          
          <MedicationCard>
            <MedicationContent>
              <MedIconContainer>
                <i data-feather="activity" />
              </MedIconContainer>
              <MedInfo>
                <Typography variant="h6" gutterBottom>
                  Ozempic (semaglutide)
                </Typography>
                <Typography variant="body2" color="textLight">
                  0.5 mg/0.5 mL subcutaneous solution
                </Typography>
                <Typography variant="caption">
                  Prescribed by Dr. Sarah Johnson
                </Typography>
                
                <SupplyStatus>
                  <StatusLabel>
                    <Typography variant="caption">
                      Current Supply
                    </Typography>
                    <Typography variant="caption" color="warning">
                      2 doses left
                    </Typography>
                  </StatusLabel>
                  <ProgressBar 
                    value={25} 
                    variant="warning" 
                    size="sm"
                  />
                </SupplyStatus>
              </MedInfo>
            </MedicationContent>
          </MedicationCard>
          
          <PharmacySection>
            <Typography variant="h6" gutterBottom>
              Select Pharmacy
            </Typography>
            
            <AddressCard 
              selected={pharmacy === 'local'}
              onClick={() => handlePharmacyChange('local')}
            >
              <LocationIcon>
                <i data-feather="map-pin" />
              </LocationIcon>
              <AddressInfo>
                <Typography variant="body1" gutterBottom>
                  Local Pharmacy
                </Typography>
                <Typography variant="body2" color="textLight">
                  123 Main St, Anytown, CA 12345
                </Typography>
              </AddressInfo>
            </AddressCard>
            
            <AddressCard 
              selected={pharmacy === 'mail'}
              onClick={() => handlePharmacyChange('mail')}
            >
              <LocationIcon>
                <i data-feather="home" />
              </LocationIcon>
              <AddressInfo>
                <Typography variant="body1" gutterBottom>
                  Mail to Home
                </Typography>
                <Typography variant="body2" color="textLight">
                  456 Residential Ave, Anytown, CA 12345
                </Typography>
              </AddressInfo>
              <ChangeLinkButton>
                Change
              </ChangeLinkButton>
            </AddressCard>
          </PharmacySection>
          
          <DeliveryOptions>
            <Typography variant="h6" gutterBottom>
              Delivery Options
            </Typography>
            
            <OptionSelector>
              <OptionCard 
                selected={deliveryOption === 'standard'}
                onClick={() => handleDeliveryOptionChange('standard')}
              >
                <i data-feather="truck" />
                <Typography variant="body2">
                  Standard
                </Typography>
                <Typography variant="caption" color="textLight">
                  2-3 business days
                </Typography>
                <Typography variant="body2">
                  Free
                </Typography>
              </OptionCard>
              
              <OptionCard 
                selected={deliveryOption === 'express'}
                onClick={() => handleDeliveryOptionChange('express')}
              >
                <i data-feather="zap" />
                <Typography variant="body2">
                  Express
                </Typography>
                <Typography variant="caption" color="textLight">
                  1 business day
                </Typography>
                <Typography variant="body2">
                  $9.99
                </Typography>
              </OptionCard>
            </OptionSelector>
          </DeliveryOptions>
          
          <SummarySection>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Card padding="md">
              <SummaryRow>
                <Typography variant="body2">
                  Ozempic (semaglutide) 0.5mg
                </Typography>
                <Typography variant="body2">
                  $25.00
                </Typography>
              </SummaryRow>
              
              <SummaryRow>
                <Typography variant="body2">
                  Insurance copay
                </Typography>
                <Typography variant="body2">
                  -$15.00
                </Typography>
              </SummaryRow>
              
              <SummaryRow>
                <Typography variant="body2">
                  Delivery
                </Typography>
                <Typography variant="body2">
                  {deliveryOption === 'express' ? '$9.99' : 'Free'}
                </Typography>
              </SummaryRow>
              
              <TotalRow>
                <Typography variant="body1">
                  Total
                </Typography>
                <Typography variant="body1">
                  ${deliveryOption === 'express' ? '19.99' : '10.00'}
                </Typography>
              </TotalRow>
            </Card>
          </SummarySection>
          
          <Button 
            variant="primary" 
            size="full"
            style={{ marginTop: '24px' }}
            onClick={handleSubmitOrder}
          >
            Place Order
          </Button>
        </>
      )}
    </RefillContainer>
  );
};

export default RefillOrder;
