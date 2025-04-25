import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';

const PrivacySettingsContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SettingsCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SettingItem = styled.div`
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.backgroundDark};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SettingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.backgroundDark};
    transition: ${props => props.theme.transitions.medium};
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: ${props => props.theme.transitions.medium};
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: ${props => props.theme.colors.primary};
  }
  
  input:checked + span:before {
    transform: translateX(24px);
  }
`;

const SharingSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const SharingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const SharingItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const SharingIcon = styled.div`
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

const SharingInfo = styled.div`
  flex: 1;
`;

const SharingControls = styled.div``;

const DataSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const DownloadButton = styled(Button)`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DeleteSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.backgroundDark};
`;

const ConfirmationModal = styled.div`
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
  padding: ${props => props.theme.spacing.xl};
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`;

const PrivacySettings = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const { privacySettings } = state;
  
  const [settings, setSettings] = useState({
    shareDataWithDoctor: privacySettings?.shareDataWithDoctor || true,
    shareDataWithResearch: privacySettings?.shareDataWithResearch || false,
    locationTracking: privacySettings?.locationTracking || true,
    usageAnalytics: true,
    biometricAuth: false,
    twoFactorAuth: false
  });
  
  const [dataSharing, setDataSharing] = useState({
    doctorAccess: true,
    familyAccess: false,
    researchStudies: false
  });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
  };
  
  const handleSharingChange = (e) => {
    const { name, checked } = e.target;
    setDataSharing({
      ...dataSharing,
      [name]: checked
    });
  };
  
  const saveSettings = () => {
    dispatch({
      type: actionTypes.UPDATE_PRIVACY_SETTINGS,
      payload: settings
    });
    
    // Show success message
    alert('Privacy settings saved successfully!');
  };
  
  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    // In a real app, this would call an API to delete the account
    setShowDeleteModal(false);
    alert('Account deletion process initiated. You will receive an email with further instructions.');
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
  };
  
  return (
    <PrivacySettingsContainer>
      <Typography variant="h5" gutterBottom>
        Privacy & Data Settings
      </Typography>
      
      <SettingsCard>
        <Typography variant="h6" gutterBottom>
          Privacy Settings
        </Typography>
        
        <Typography variant="body2" color="textLight" gutterBottom>
          Control how your data is used and shared
        </Typography>
        
        <div style={{ marginTop: '16px' }}>
          <SettingItem>
            <SettingHeader>
              <Typography variant="body1">
                Share Data with Healthcare Provider
              </Typography>
              <Toggle>
                <input
                  type="checkbox"
                  name="shareDataWithDoctor"
                  checked={settings.shareDataWithDoctor}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </SettingHeader>
            <Typography variant="body2" color="textLight">
              Allow your doctor to access your weight, medication, and device data to provide better care
            </Typography>
          </SettingItem>
          
          <SettingItem>
            <SettingHeader>
              <Typography variant="body1">
                Anonymized Research Data
              </Typography>
              <Toggle>
                <input
                  type="checkbox"
                  name="shareDataWithResearch"
                  checked={settings.shareDataWithResearch}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </SettingHeader>
            <Typography variant="body2" color="textLight">
              Contribute your anonymized data to research for improving GLP-1 therapies and weight management
            </Typography>
          </SettingItem>
          
          <SettingItem>
            <SettingHeader>
              <Typography variant="body1">
                Location Services
              </Typography>
              <Toggle>
                <input
                  type="checkbox"
                  name="locationTracking"
                  checked={settings.locationTracking}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </SettingHeader>
            <Typography variant="body2" color="textLight">
              Enable location services to find nearby clinics and pharmacies
            </Typography>
          </SettingItem>
          
          <SettingItem>
            <SettingHeader>
              <Typography variant="body1">
                Usage Analytics
              </Typography>
              <Toggle>
                <input
                  type="checkbox"
                  name="usageAnalytics"
                  checked={settings.usageAnalytics}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </SettingHeader>
            <Typography variant="body2" color="textLight">
              Allow collection of anonymous usage data to improve app experience
            </Typography>
          </SettingItem>
          
          <SettingItem>
            <SettingHeader>
              <Typography variant="body1">
                Biometric Authentication
              </Typography>
              <Toggle>
                <input
                  type="checkbox"
                  name="biometricAuth"
                  checked={settings.biometricAuth}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </SettingHeader>
            <Typography variant="body2" color="textLight">
              Use fingerprint or face recognition to secure your app
            </Typography>
          </SettingItem>
          
          <SettingItem>
            <SettingHeader>
              <Typography variant="body1">
                Two-Factor Authentication
              </Typography>
              <Toggle>
                <input
                  type="checkbox"
                  name="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </SettingHeader>
            <Typography variant="body2" color="textLight">
              Add an extra layer of security with two-factor authentication
            </Typography>
          </SettingItem>
        </div>
        
        <SharingSection>
          <Typography variant="h6" gutterBottom>
            Data Sharing
          </Typography>
          
          <Typography variant="body2" color="textLight" gutterBottom>
            Manage who can access your health data
          </Typography>
          
          <SharingList>
            <SharingItem>
              <SharingIcon color="#4A90E2">
                <i data-feather="user-plus" />
              </SharingIcon>
              <SharingInfo>
                <Typography variant="body1" gutterBottom>
                  Healthcare Provider Access
                </Typography>
                <Typography variant="body2" color="textLight">
                  Dr. Sarah Johnson (Primary Care)
                </Typography>
              </SharingInfo>
              <SharingControls>
                <Toggle>
                  <input
                    type="checkbox"
                    name="doctorAccess"
                    checked={dataSharing.doctorAccess}
                    onChange={handleSharingChange}
                  />
                  <span></span>
                </Toggle>
              </SharingControls>
            </SharingItem>
            
            <SharingItem>
              <SharingIcon color="#F44336">
                <i data-feather="users" />
              </SharingIcon>
              <SharingInfo>
                <Typography variant="body1" gutterBottom>
                  Family Member Access
                </Typography>
                <Typography variant="body2" color="textLight">
                  Share health updates with family caregivers
                </Typography>
              </SharingInfo>
              <SharingControls>
                <Toggle>
                  <input
                    type="checkbox"
                    name="familyAccess"
                    checked={dataSharing.familyAccess}
                    onChange={handleSharingChange}
                  />
                  <span></span>
                </Toggle>
              </SharingControls>
            </SharingItem>
            
            <SharingItem>
              <SharingIcon color="#4CAF50">
                <i data-feather="clipboard" />
              </SharingIcon>
              <SharingInfo>
                <Typography variant="body1" gutterBottom>
                  Research Studies
                </Typography>
                <Typography variant="body2" color="textLight">
                  Contribute anonymized data to obesity research
                </Typography>
              </SharingInfo>
              <SharingControls>
                <Toggle>
                  <input
                    type="checkbox"
                    name="researchStudies"
                    checked={dataSharing.researchStudies}
                    onChange={handleSharingChange}
                  />
                  <span></span>
                </Toggle>
              </SharingControls>
            </SharingItem>
          </SharingList>
        </SharingSection>
        
        <DataSection>
          <Typography variant="h6" gutterBottom>
            Your Data
          </Typography>
          
          <Typography variant="body2" color="textLight" gutterBottom>
            Download or delete your personal data
          </Typography>
          
          <DownloadButton
            variant="outlined"
            size="full"
            icon={<i data-feather="download" />}
          >
            Download Your Data
          </DownloadButton>
          
          <Button
            variant="outlined"
            size="full"
            icon={<i data-feather="eye" />}
          >
            View Data Collection Policy
          </Button>
        </DataSection>
        
        <Button
          variant="primary"
          size="full"
          style={{ marginTop: '24px' }}
          onClick={saveSettings}
        >
          Save Privacy Settings
        </Button>
        
        <DeleteSection>
          <Typography variant="h6" color="error" gutterBottom>
            Delete Account
          </Typography>
          
          <Typography variant="body2" color="textLight" gutterBottom>
            Permanently delete your account and all associated data. This action cannot be undone.
          </Typography>
          
          <Button
            variant="outlined"
            size="full"
            style={{ 
              marginTop: '16px', 
              color: '#F44336', 
              borderColor: '#F44336' 
            }}
            icon={<i data-feather="trash-2" />}
            onClick={handleDeleteAccount}
          >
            Delete My Account
          </Button>
        </DeleteSection>
      </SettingsCard>
      
      {showDeleteModal && (
        <ConfirmationModal>
          <ModalContent>
            <Typography variant="h5" color="error" gutterBottom>
              Delete Your Account?
            </Typography>
            
            <Typography variant="body1" gutterBottom>
              This action will permanently delete your account and all associated data. This cannot be undone.
            </Typography>
            
            <Typography variant="body2" color="textLight" gutterBottom>
              Before deleting:
            </Typography>
            
            <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
              <li>
                <Typography variant="body2" color="textLight">
                  Download your data if you want to keep it
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="textLight">
                  Cancel any ongoing subscriptions
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="textLight">
                  Notify your healthcare provider
                </Typography>
              </li>
            </ul>
            
            <ModalActions>
              <Button
                variant="outlined"
                size="full"
                onClick={cancelDelete}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                size="full"
                style={{ color: '#F44336', borderColor: '#F44336' }}
                onClick={confirmDelete}
              >
                Delete Account
              </Button>
            </ModalActions>
          </ModalContent>
        </ConfirmationModal>
      )}
    </PrivacySettingsContainer>
  );
};

export default PrivacySettings;
