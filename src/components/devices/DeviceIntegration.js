import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';

const DeviceIntegrationContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CategorySelector = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
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

const CategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
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
  
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const DevicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const DeviceCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.short};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  ${props => props.connected && `
    border: 2px solid ${props.theme.colors.success};
  `}
`;

const DeviceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: 50%;
  margin-bottom: ${props => props.theme.spacing.md};
  
  svg {
    width: 30px;
    height: 30px;
    color: ${props => props.color || props.theme.colors.primary};
  }
`;

const ConnectedIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.success};
  margin-top: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.caption.fontSize};
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ConnectionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.theme.zIndex.modal};
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled(Card)`
  max-width: 400px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StepsContainer = styled.div`
  margin: ${props => props.theme.spacing.lg} 0;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: left;
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-size: 14px;
  margin-right: ${props => props.theme.spacing.md};
  margin-top: 2px;
`;

const StepContent = styled.div`
  flex: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${props => props.theme.spacing.xl} 0;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${props => props.theme.colors.primaryLighter};
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  margin-bottom: ${props => props.theme.spacing.md};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${props => props.theme.spacing.xl} 0;
`;

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.success};
  color: white;
  margin-bottom: ${props => props.theme.spacing.md};
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

// Sample device categories
const deviceCategories = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'cgm', name: 'CGM', icon: 'activity' },
  { id: 'smartring', name: 'Smart Rings', icon: 'circle' },
  { id: 'fitness', name: 'Fitness', icon: 'heart' },
  { id: 'sleep', name: 'Sleep', icon: 'moon' }
];

// Sample devices
const sampleDevices = [
  { 
    id: 1, 
    name: 'Dexcom G6', 
    category: 'cgm', 
    icon: 'activity', 
    color: '#4A90E2',
    connected: true
  },
  { 
    id: 2, 
    name: 'Freestyle Libre', 
    category: 'cgm', 
    icon: 'activity', 
    color: '#F44336',
    connected: false
  },
  { 
    id: 3, 
    name: 'Oura Ring', 
    category: 'smartring', 
    icon: 'circle', 
    color: '#5A58BB',
    connected: true
  },
  { 
    id: 4, 
    name: 'Fitbit', 
    category: 'fitness', 
    icon: 'heart', 
    color: '#4CAF50',
    connected: false
  },
  { 
    id: 5, 
    name: 'Apple Watch', 
    category: 'fitness', 
    icon: 'watch', 
    color: '#FF9800',
    connected: false
  },
  { 
    id: 6, 
    name: 'Whoop', 
    category: 'fitness', 
    icon: 'activity', 
    color: '#9C27B0',
    connected: false
  },
  { 
    id: 7, 
    name: 'Sleep Number', 
    category: 'sleep', 
    icon: 'moon', 
    color: '#2196F3',
    connected: false
  }
];

const DeviceIntegration = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [connectionState, setConnectionState] = useState('instructions'); // instructions, connecting, success
  const [devices, setDevices] = useState(sampleDevices);
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setConnectionState('instructions');
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setConnectionState('instructions');
  };
  
  const startConnection = () => {
    setConnectionState('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionState('success');
      
      // Update devices state to mark this device as connected
      setDevices(devices.map(d => 
        d.id === selectedDevice.id ? { ...d, connected: true } : d
      ));
    }, 3000);
  };
  
  // Filter devices based on selected category
  const filteredDevices = selectedCategory === 'all'
    ? devices
    : devices.filter(device => device.category === selectedCategory);
  
  return (
    <DeviceIntegrationContainer>
      <Typography variant="h5" gutterBottom>
        Connect Your Devices
      </Typography>
      
      <Typography variant="body1" color="textLight" gutterBottom>
        Integrate your health devices for better insights and personalized recommendations.
      </Typography>
      
      <CategorySelector>
        {deviceCategories.map(category => (
          <CategoryButton 
            key={category.id}
            selected={selectedCategory === category.id}
            onClick={() => handleCategorySelect(category.id)}
          >
            <i data-feather={category.icon} />
            <Typography variant="caption">
              {category.name}
            </Typography>
          </CategoryButton>
        ))}
      </CategorySelector>
      
      <DevicesGrid>
        {filteredDevices.map(device => (
          <DeviceCard 
            key={device.id}
            connected={device.connected}
            onClick={() => handleDeviceClick(device)}
          >
            <DeviceIcon color={device.color}>
              <i data-feather={device.icon} />
            </DeviceIcon>
            <Typography variant="body2" gutterBottom>
              {device.name}
            </Typography>
            {device.connected && (
              <ConnectedIndicator>
                <i data-feather="check-circle" />
                Connected
              </ConnectedIndicator>
            )}
          </DeviceCard>
        ))}
      </DevicesGrid>
      
      {showModal && selectedDevice && (
        <ConnectionModal onClick={closeModal}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <i data-feather="x" />
            </CloseButton>
            
            <DeviceIcon color={selectedDevice.color} style={{ marginTop: '16px' }}>
              <i data-feather={selectedDevice.icon} />
            </DeviceIcon>
            
            <Typography variant="h5" gutterBottom>
              Connect {selectedDevice.name}
            </Typography>
            
            {connectionState === 'instructions' && (
              <>
                <Typography variant="body1" color="textLight" gutterBottom>
                  Follow these steps to connect your device:
                </Typography>
                
                <StepsContainer>
                  <Step>
                    <StepNumber>1</StepNumber>
                    <StepContent>
                      <Typography variant="body2" gutterBottom>
                        Make sure your {selectedDevice.name} is turned on and in pairing mode.
                      </Typography>
                    </StepContent>
                  </Step>
                  
                  <Step>
                    <StepNumber>2</StepNumber>
                    <StepContent>
                      <Typography variant="body2" gutterBottom>
                        Ensure Bluetooth is enabled on your phone.
                      </Typography>
                    </StepContent>
                  </Step>
                  
                  <Step>
                    <StepNumber>3</StepNumber>
                    <StepContent>
                      <Typography variant="body2" gutterBottom>
                        Click the "Connect" button below and follow any additional prompts.
                      </Typography>
                    </StepContent>
                  </Step>
                </StepsContainer>
                
                <Button 
                  variant="primary" 
                  size="full"
                  onClick={startConnection}
                >
                  Connect Device
                </Button>
              </>
            )}
            
            {connectionState === 'connecting' && (
              <LoadingContainer>
                <LoadingSpinner />
                <Typography variant="body1" gutterBottom>
                  Connecting to {selectedDevice.name}...
                </Typography>
                <Typography variant="body2" color="textLight">
                  This may take a few moments
                </Typography>
              </LoadingContainer>
            )}
            
            {connectionState === 'success' && (
              <SuccessContainer>
                <SuccessIcon>
                  <i data-feather="check" />
                </SuccessIcon>
                <Typography variant="h6" gutterBottom>
                  Successfully Connected!
                </Typography>
                <Typography variant="body2" color="textLight" gutterBottom>
                  Your {selectedDevice.name} is now connected to BeatObesity.
                </Typography>
                <Typography variant="body2" color="textLight" gutterBottom>
                  Data will sync automatically in the background.
                </Typography>
                <Button 
                  variant="primary" 
                  style={{ marginTop: '16px' }}
                  onClick={closeModal}
                >
                  Done
                </Button>
              </SuccessContainer>
            )}
          </ModalContent>
        </ConnectionModal>
      )}
    </DeviceIntegrationContainer>
  );
};

export default DeviceIntegration;
