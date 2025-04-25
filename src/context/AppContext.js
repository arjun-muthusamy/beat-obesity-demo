import React, { createContext, useReducer, useEffect } from 'react';

// Initial state for the application
const initialState = {
  isOnboarded: false,
  user: null,
  selectedAvatar: null,
  healthGoals: [],
  medicationReminders: [],
  appointments: [],
  connectedDevices: [],
  subscriptionPlan: null,
  currentWeight: null,
  targetWeight: null,
  lastGlucoseReading: null,
  steps: 0,
  sleep: null,
  chatHistory: [],
  sideEffects: [],
  activeReminders: [], // Track currently active reminders
  medicationLog: [], // Track medication history
  apiKeys: {
    perplexity: process.env.REACT_APP_PERPLEXITY_API_KEY || null
  },
  notificationSettings: {
    medication: true,
    appointments: true,
    goals: true,
    chat: true
  },
  privacySettings: {
    shareDataWithDoctor: true,
    shareDataWithResearch: false,
    locationTracking: true
  }
};

// Actions to update the state
const actionTypes = {
  COMPLETE_ONBOARDING: 'COMPLETE_ONBOARDING',
  SET_USER: 'SET_USER',
  SELECT_AVATAR: 'SELECT_AVATAR',
  SET_HEALTH_GOALS: 'SET_HEALTH_GOALS',
  ADD_MEDICATION_REMINDER: 'ADD_MEDICATION_REMINDER',
  UPDATE_MEDICATION_REMINDER: 'UPDATE_MEDICATION_REMINDER',
  REMOVE_MEDICATION_REMINDER: 'REMOVE_MEDICATION_REMINDER',
  MARK_MEDICATION_COMPLETE: 'MARK_MEDICATION_COMPLETE',
  SNOOZE_MEDICATION_REMINDER: 'SNOOZE_MEDICATION_REMINDER',
  LOG_MEDICATION_DOSE: 'LOG_MEDICATION_DOSE',
  SET_ACTIVE_REMINDER: 'SET_ACTIVE_REMINDER',
  CLEAR_ACTIVE_REMINDER: 'CLEAR_ACTIVE_REMINDER',
  SCHEDULE_APPOINTMENT: 'SCHEDULE_APPOINTMENT',
  CANCEL_APPOINTMENT: 'CANCEL_APPOINTMENT',
  CONNECT_DEVICE: 'CONNECT_DEVICE',
  DISCONNECT_DEVICE: 'DISCONNECT_DEVICE',
  UPDATE_SUBSCRIPTION: 'UPDATE_SUBSCRIPTION',
  UPDATE_METRICS: 'UPDATE_METRICS',
  ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE',
  REPORT_SIDE_EFFECT: 'REPORT_SIDE_EFFECT',
  UPDATE_NOTIFICATION_SETTINGS: 'UPDATE_NOTIFICATION_SETTINGS',
  UPDATE_PRIVACY_SETTINGS: 'UPDATE_PRIVACY_SETTINGS',
  UPDATE_API_KEY: 'UPDATE_API_KEY',
};

// Reducer function to handle state updates
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.COMPLETE_ONBOARDING:
      return { ...state, isOnboarded: true };
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.SELECT_AVATAR:
      return { ...state, selectedAvatar: action.payload };
    case actionTypes.SET_HEALTH_GOALS:
      return { ...state, healthGoals: action.payload };
      
    // Medication reminder actions
    case actionTypes.ADD_MEDICATION_REMINDER:
      return { 
        ...state, 
        medicationReminders: [...state.medicationReminders, action.payload] 
      };
    case actionTypes.UPDATE_MEDICATION_REMINDER:
      return { 
        ...state, 
        medicationReminders: state.medicationReminders.map(reminder => 
          reminder.id === action.payload.id ? action.payload : reminder
        )
      };
    case actionTypes.REMOVE_MEDICATION_REMINDER:
      return { 
        ...state, 
        medicationReminders: state.medicationReminders.filter(reminder => reminder.id !== action.payload) 
      };
    case actionTypes.MARK_MEDICATION_COMPLETE:
      const completedMed = state.medicationReminders.find(med => med.id === action.payload.medicationId);
      if (!completedMed) return state;
      
      // Log the completed dose
      const doseLog = {
        id: Date.now(),
        medicationId: completedMed.id,
        medicationName: completedMed.name,
        dosage: completedMed.dosage,
        completedAt: new Date().toISOString(),
        scheduledFor: completedMed.nextDose,
        onTime: action.payload.onTime // Whether it was taken on time or late
      };
      
      return { 
        ...state, 
        medicationLog: [...state.medicationLog, doseLog],
        medicationReminders: state.medicationReminders.map(med => 
          med.id === action.payload.medicationId 
            ? { ...med, ...action.payload.updatedMedication } 
            : med
        )
      };
    case actionTypes.SNOOZE_MEDICATION_REMINDER:
      return { 
        ...state, 
        medicationReminders: state.medicationReminders.map(med => 
          med.id === action.payload.medicationId 
            ? { ...med, ...action.payload.updatedMedication } 
            : med
        ),
        activeReminders: state.activeReminders.filter(id => id !== action.payload.medicationId)
      };
    case actionTypes.LOG_MEDICATION_DOSE:
      return {
        ...state,
        medicationLog: [...state.medicationLog, action.payload]
      };
    case actionTypes.SET_ACTIVE_REMINDER:
      // Add medication ID to active reminders if not already there
      if (state.activeReminders.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        activeReminders: [...state.activeReminders, action.payload]
      };
    case actionTypes.CLEAR_ACTIVE_REMINDER:
      return {
        ...state,
        activeReminders: state.activeReminders.filter(id => id !== action.payload)
      };
    
    // Other actions
    case actionTypes.SCHEDULE_APPOINTMENT:
      return { 
        ...state, 
        appointments: [...state.appointments, action.payload] 
      };
    case actionTypes.CANCEL_APPOINTMENT:
      return { 
        ...state, 
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload) 
      };
    case actionTypes.CONNECT_DEVICE:
      return { 
        ...state, 
        connectedDevices: [...state.connectedDevices, action.payload] 
      };
    case actionTypes.DISCONNECT_DEVICE:
      return { 
        ...state, 
        connectedDevices: state.connectedDevices.filter(device => device.id !== action.payload) 
      };
    case actionTypes.UPDATE_SUBSCRIPTION:
      return { ...state, subscriptionPlan: action.payload };
    case actionTypes.UPDATE_METRICS:
      return { ...state, ...action.payload };
    case actionTypes.ADD_CHAT_MESSAGE:
      return { 
        ...state, 
        chatHistory: [...state.chatHistory, action.payload] 
      };
    case actionTypes.REPORT_SIDE_EFFECT:
      return { 
        ...state, 
        sideEffects: [...state.sideEffects, action.payload] 
      };
    case actionTypes.UPDATE_NOTIFICATION_SETTINGS:
      return { 
        ...state, 
        notificationSettings: { ...state.notificationSettings, ...action.payload } 
      };
    case actionTypes.UPDATE_PRIVACY_SETTINGS:
      return { 
        ...state, 
        privacySettings: { ...state.privacySettings, ...action.payload } 
      };
    case actionTypes.UPDATE_API_KEY:
      return { 
        ...state, 
        apiKeys: { 
          ...state.apiKeys, 
          [action.payload.service]: action.payload.key 
        } 
      };
    default:
      return state;
  }
};

// Create context
export const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Load state from localStorage on app initialization
  useEffect(() => {
    const savedState = localStorage.getItem('beatObesityAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Update local state with saved state
        Object.keys(parsedState).forEach(key => {
          if (parsedState[key] !== undefined) {
            dispatch({ type: actionTypes.UPDATE_METRICS, payload: { [key]: parsedState[key] } });
          }
        });
        
        console.log("App state loaded from localStorage:", parsedState);
      } catch (error) {
        console.error('Error parsing saved state:', error);
      }
    }
  }, []);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('beatObesityAppState', JSON.stringify(state));
    
    // Make a sanitized version of the state available for debugging
    // Only include non-sensitive data and API keys needed by utility functions
    window.beatObesityState = {
      apiKeys: { ...state.apiKeys },
      isOnboarded: state.isOnboarded,
      selectedAvatar: state.selectedAvatar?.name || null,
      healthGoals: Array.isArray(state.healthGoals) ? state.healthGoals.length : 0
    };
    
    console.log("App state updated:", window.beatObesityState);
  }, [state]);
  
  return (
    <AppContext.Provider value={{ state, dispatch, actionTypes }}>
      {children}
    </AppContext.Provider>
  );
};
