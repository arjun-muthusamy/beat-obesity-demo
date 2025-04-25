import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  background-color: ${props => props.theme.colors.backgroundLight};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: ${props => props.theme.zIndex.nav};
`;

const IconWrapper = styled.div`
  margin-bottom: 4px;
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  width: 20%;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.caption.fontSize};
  font-weight: ${props => props.active ? 600 : 400};
  transition: all ${props => props.theme.transitions.short};
  position: relative;
  
  &:hover, &:focus {
    color: ${props => props.theme.colors.primary};
  }
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 40%;
      height: 3px;
      background: ${props.theme.colors.primary};
      border-radius: 3px 3px 0 0;
    }
  `}
  
  ${props => props.primary && `
    transform: translateY(-15px);
    
    div {
      background: ${props.theme.colors.gradientPrimary};
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
      box-shadow: ${props.theme.shadows.md};
      
      svg, i {
        stroke: white;
        color: white;
      }
    }
  `}
`;

const Label = styled.span`
  font-size: 10px;
  text-align: center;
  white-space: nowrap;
`;

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // Initialize Feather icons when the component mounts or updates
  useEffect(() => {
    // Check if feather is available (loaded from CDN in index.html)
    if (window.feather) {
      window.feather.replace();
    }
  }, [location]); // Re-run when location changes
  
  const navItems = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'Therapy', path: '/therapy', icon: 'activity' },
    { label: 'Chat', path: '/chat', icon: 'message-circle', primary: true },
    { label: 'Devices', path: '/devices', icon: 'smartphone' },
    { label: 'Profile', path: '/profile', icon: 'user' }
  ];
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <BottomNavContainer>
      {navItems.map((item) => (
        <NavItem 
          key={item.path}
          active={currentPath === item.path}
          primary={item.primary}
          onClick={() => handleNavigation(item.path)}
        >
          <IconWrapper>
            <i data-feather={item.icon} />
          </IconWrapper>
          <Label>{item.label}</Label>
        </NavItem>
      ))}
    </BottomNavContainer>
  );
};

export default BottomNavigation;
