import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppContext } from './context/AppContext';

// Import debug script
import './utils/debug.js';

// Pages
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Therapy from './pages/Therapy';
import Appointments from './pages/Appointments';
import Devices from './pages/Devices';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';

// Components
import BottomNavigation from './components/navigation/BottomNavigation';

// Route logger wrapper that must be used inside Router
const RouteLoggerComponent = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location]);
  
  return null;
};

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 70px; /* Make room for the bottom navigation */
`;

const App = () => {
  const { state } = useContext(AppContext);
  const { isOnboarded } = state;

  // For routes that require authentication
  const ProtectedRoute = ({ children }) => {
    if (!isOnboarded) {
      return <Navigate to="/onboarding" replace />;
    }
    return children;
  };

  return (
    <Router>
      <AppContainer>
        <ContentArea>
          <RouteLoggerComponent />
          <Routes>
            <Route 
              path="/onboarding" 
              element={isOnboarded ? <Navigate to="/chat" replace /> : <Onboarding />} 
            />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/therapy" 
              element={
                <ProtectedRoute>
                  <Therapy />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/devices" 
              element={
                <ProtectedRoute>
                  <Devices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/subscription" 
              element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to={isOnboarded ? "/chat" : "/onboarding"} replace />} />
          </Routes>
        </ContentArea>
        
        {isOnboarded && <BottomNavigation />}
      </AppContainer>
    </Router>
  );
};

export default App;
