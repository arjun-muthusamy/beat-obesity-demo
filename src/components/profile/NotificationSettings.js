import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/AppContext';
import Typography from '../shared/Typography';
import Card from '../shared/Card';
import Button from '../shared/Button';

const NotificationSettingsContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SettingsCard = styled(Card)`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ToggleAll = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  button {
    font-size: ${props => props.theme.typography.caption.fontSize};
    background: none;
    border: none;
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    text-decoration: underline;
  }
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.backgroundDark};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const NotificationInfo = styled.div`
  flex: 1;
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

const ChannelSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const ChannelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const ChannelItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.backgroundDark};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ChannelIcon = styled.div`
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

const ChannelInfo = styled.div`
  flex: 1;
`;

const ChannelControls = styled.div``;

const NotificationSettings = () => {
  const { state, dispatch, actionTypes } = useContext(AppContext);
  const { notificationSettings } = state;
  
  const [settings, setSettings] = useState({
    medication: notificationSettings?.medication || true,
    appointments: notificationSettings?.appointments || true,
    goals: notificationSettings?.goals || true,
    chat: notificationSettings?.chat || true,
    deviceAlerts: notificationSettings?.deviceAlerts || true,
    progressUpdates: notificationSettings?.progressUpdates || true,
    communityActivity: notificationSettings?.communityActivity || false,
    marketingEmails: notificationSettings?.marketingEmails || false
  });
  
  const [channels, setChannels] = useState({
    push: true,
    email: true,
    sms: false
  });
  
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
  };
  
  const handleChannelChange = (e) => {
    const { name, checked } = e.target;
    setChannels({
      ...channels,
      [name]: checked
    });
  };
  
  const enableAll = () => {
    const updatedSettings = {};
    Object.keys(settings).forEach(key => {
      updatedSettings[key] = true;
    });
    setSettings(updatedSettings);
  };
  
  const disableAll = () => {
    const updatedSettings = {};
    Object.keys(settings).forEach(key => {
      updatedSettings[key] = false;
    });
    setSettings(updatedSettings);
  };
  
  const saveSettings = () => {
    dispatch({
      type: actionTypes.UPDATE_NOTIFICATION_SETTINGS,
      payload: settings
    });
    
    // Show success message
    alert('Notification settings saved successfully!');
  };
  
  return (
    <NotificationSettingsContainer>
      <Typography variant="h5" gutterBottom>
        Notification Settings
      </Typography>
      
      <SettingsCard>
        <SectionHeader>
          <Typography variant="h6">
            Notification Preferences
          </Typography>
          <ToggleAll>
            <button onClick={enableAll}>Enable All</button>
            <span>|</span>
            <button onClick={disableAll}>Disable All</button>
          </ToggleAll>
        </SectionHeader>
        
        <Typography variant="body2" color="textLight" gutterBottom>
          Choose which notifications you'd like to receive
        </Typography>
        
        <div style={{ marginTop: '16px' }}>
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Medication Reminders
              </Typography>
              <Typography variant="body2" color="textLight">
                Reminds you when it's time to take your medication
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="medication"
                checked={settings.medication}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Appointment Alerts
              </Typography>
              <Typography variant="body2" color="textLight">
                Reminders about upcoming doctor appointments
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="appointments"
                checked={settings.appointments}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Goal Updates
              </Typography>
              <Typography variant="body2" color="textLight">
                Updates on your progress toward health goals
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="goals"
                checked={settings.goals}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Chat Messages
              </Typography>
              <Typography variant="body2" color="textLight">
                Notifications when you receive messages from your AI companion
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="chat"
                checked={settings.chat}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Device Alerts
              </Typography>
              <Typography variant="body2" color="textLight">
                Important alerts from connected devices like your CGM
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="deviceAlerts"
                checked={settings.deviceAlerts}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Progress Updates
              </Typography>
              <Typography variant="body2" color="textLight">
                Weekly updates about your weight loss progress
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="progressUpdates"
                checked={settings.progressUpdates}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Community Activity
              </Typography>
              <Typography variant="body2" color="textLight">
                Updates from community forums and group activities
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="communityActivity"
                checked={settings.communityActivity}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
          
          <NotificationItem>
            <NotificationInfo>
              <Typography variant="body1" gutterBottom>
                Marketing Emails
              </Typography>
              <Typography variant="body2" color="textLight">
                News, promotions and product updates from BeatObesity
              </Typography>
            </NotificationInfo>
            <Toggle>
              <input
                type="checkbox"
                name="marketingEmails"
                checked={settings.marketingEmails}
                onChange={handleToggleChange}
              />
              <span></span>
            </Toggle>
          </NotificationItem>
        </div>
        
        <ChannelSection>
          <Typography variant="h6" gutterBottom>
            Notification Channels
          </Typography>
          
          <Typography variant="body2" color="textLight" gutterBottom>
            Select how you want to receive notifications
          </Typography>
          
          <ChannelList>
            <ChannelItem>
              <ChannelIcon color="#4A90E2">
                <i data-feather="smartphone" />
              </ChannelIcon>
              <ChannelInfo>
                <Typography variant="body1" gutterBottom>
                  Push Notifications
                </Typography>
                <Typography variant="body2" color="textLight">
                  Receive notifications on your mobile device
                </Typography>
              </ChannelInfo>
              <ChannelControls>
                <Toggle>
                  <input
                    type="checkbox"
                    name="push"
                    checked={channels.push}
                    onChange={handleChannelChange}
                  />
                  <span></span>
                </Toggle>
              </ChannelControls>
            </ChannelItem>
            
            <ChannelItem>
              <ChannelIcon color="#F44336">
                <i data-feather="mail" />
              </ChannelIcon>
              <ChannelInfo>
                <Typography variant="body1" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body2" color="textLight">
                  Receive notifications via email
                </Typography>
              </ChannelInfo>
              <ChannelControls>
                <Toggle>
                  <input
                    type="checkbox"
                    name="email"
                    checked={channels.email}
                    onChange={handleChannelChange}
                  />
                  <span></span>
                </Toggle>
              </ChannelControls>
            </ChannelItem>
            
            <ChannelItem>
              <ChannelIcon color="#4CAF50">
                <i data-feather="message-square" />
              </ChannelIcon>
              <ChannelInfo>
                <Typography variant="body1" gutterBottom>
                  SMS
                </Typography>
                <Typography variant="body2" color="textLight">
                  Receive notifications via text message
                </Typography>
              </ChannelInfo>
              <ChannelControls>
                <Toggle>
                  <input
                    type="checkbox"
                    name="sms"
                    checked={channels.sms}
                    onChange={handleChannelChange}
                  />
                  <span></span>
                </Toggle>
              </ChannelControls>
            </ChannelItem>
          </ChannelList>
        </ChannelSection>
        
        <Button
          variant="primary"
          size="full"
          style={{ marginTop: '24px' }}
          onClick={saveSettings}
        >
          Save Notification Settings
        </Button>
      </SettingsCard>
    </NotificationSettingsContainer>
  );
};

export default NotificationSettings;
