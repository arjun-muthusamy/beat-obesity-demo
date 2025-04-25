import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Button from '../shared/Button';
import Avatar from '../shared/Avatar';
import Card from '../shared/Card';

const UserSettingsContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProfileSection = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AvatarUpload = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const UploadOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid white;
  color: white;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const FormSection = styled.div`
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

const ErrorText = styled(Typography)`
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.caption.fontSize};
`;

const APIKeySection = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const PreferenceSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PreferenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.backgroundDark};
  
  &:last-child {
    border-bottom: none;
  }
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

const UserSettings = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const { user } = state;
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    timeZone: user?.timeZone || 'America/New_York'
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    receiveUpdates: true,
    activityReminders: true,
    dataSync: true
  });
  
  const [errors, setErrors] = useState({});
  
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
  
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Update user in context
      dispatch({
        type: actionTypes.SET_USER,
        payload: {
          ...user,
          ...formData
        }
      });
      
      // Show success message
      alert('Profile updated successfully!');
    }
  };
  
  return (
    <UserSettingsContainer>
      <Typography variant="h5" gutterBottom>
        Profile Settings
      </Typography>
      
      <ProfileSection>
        <ProfileHeader>
          <AvatarUpload>
            <Avatar
              size="xxl"
              name={formData.name || "User"}
              bgColor="#4A90E2"
            />
            <UploadOverlay>
              <i data-feather="camera" />
            </UploadOverlay>
          </AvatarUpload>
          
          <Typography variant="h6">
            {formData.name || "Your Name"}
          </Typography>
          <Typography variant="body2" color="textLight">
            {formData.email || "email@example.com"}
          </Typography>
        </ProfileHeader>
        
        <form onSubmit={handleSubmit}>
          <FormSection>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                error={errors.name}
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address"
                error={errors.email}
              />
              {errors.email && <ErrorText>{errors.email}</ErrorText>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="timeZone">Time Zone</Label>
              <select
                id="timeZone"
                name="timeZone"
                value={formData.timeZone}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#EBF2FD',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#333333',
                  fontSize: '16px'
                }}
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="America/Anchorage">Alaska Time (AKT)</option>
                <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
              </select>
            </FormGroup>
          </FormSection>
          
          <PreferenceSection>
            <Typography variant="h6" gutterBottom>
              App Preferences
            </Typography>
            
            <PreferenceItem>
              <div>
                <Typography variant="body1" gutterBottom>
                  Dark Mode
                </Typography>
                <Typography variant="body2" color="textLight">
                  Switch between light and dark themes
                </Typography>
              </div>
              <Toggle>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={preferences.darkMode}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </PreferenceItem>
            
            <PreferenceItem>
              <div>
                <Typography variant="body1" gutterBottom>
                  Receive Updates
                </Typography>
                <Typography variant="body2" color="textLight">
                  Get app and feature updates via email
                </Typography>
              </div>
              <Toggle>
                <input
                  type="checkbox"
                  name="receiveUpdates"
                  checked={preferences.receiveUpdates}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </PreferenceItem>
            
            <PreferenceItem>
              <div>
                <Typography variant="body1" gutterBottom>
                  Activity Reminders
                </Typography>
                <Typography variant="body2" color="textLight">
                  Receive reminders to log your activities
                </Typography>
              </div>
              <Toggle>
                <input
                  type="checkbox"
                  name="activityReminders"
                  checked={preferences.activityReminders}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </PreferenceItem>
            
            <PreferenceItem>
              <div>
                <Typography variant="body1" gutterBottom>
                  Background Data Sync
                </Typography>
                <Typography variant="body2" color="textLight">
                  Sync data in the background
                </Typography>
              </div>
              <Toggle>
                <input
                  type="checkbox"
                  name="dataSync"
                  checked={preferences.dataSync}
                  onChange={handleToggleChange}
                />
                <span></span>
              </Toggle>
            </PreferenceItem>
          </PreferenceSection>
          
          <Button
            variant="primary"
            size="full"
            type="submit"
          >
            Save Changes
          </Button>
        </form>
      </ProfileSection>
      
      <Card>
        <Typography variant="h6" gutterBottom>
          Password & Security
        </Typography>
        
        <Typography variant="body2" color="textLight" gutterBottom>
          Update your password and security settings
        </Typography>
        
        <Button
          variant="outlined"
          size="full"
          style={{ marginTop: '16px' }}
          icon={<i data-feather="lock" />}
        >
          Change Password
        </Button>
        
        <Button
          variant="outlined"
          size="full"
          style={{ marginTop: '12px' }}
          icon={<i data-feather="shield" />}
        >
          Two-Factor Authentication
        </Button>
      </Card>
      
      <Card style={{ marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom>
          API Settings
        </Typography>
        
        <Typography variant="body2" color="textLight" gutterBottom>
          Manage your API keys for enhanced AI features
        </Typography>
        
        <APIKeySection>
          <FormGroup>
            <Label htmlFor="perplexityKey">Perplexity API Key</Label>
            <Input
              id="perplexityKey"
              name="perplexityKey"
              type="password"
              value={state.apiKeys.perplexity || ''}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.UPDATE_API_KEY,
                  payload: {
                    service: 'perplexity',
                    key: e.target.value
                  }
                });
              }}
              placeholder="Enter your Perplexity API key"
            />
            <Typography variant="caption" color="textLight" style={{ marginTop: '8px' }}>
              The Perplexity API key enhances the AI chat functionality with more accurate responses.
              <a 
                href="https://www.perplexity.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#673AB7', marginLeft: '5px' }}
              >
                Get a key
              </a>
            </Typography>
          </FormGroup>
        </APIKeySection>
      </Card>
    </UserSettingsContainer>
  );
};

export default UserSettings;
