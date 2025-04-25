import React from 'react';
import styled, { css } from 'styled-components';

// Button variants
const variants = {
  primary: css`
    background: ${props => props.theme.colors.gradientPrimary};
    color: white;
    border: none;
  `,
  secondary: css`
    background: ${props => props.theme.colors.gradientSecondary};
    color: white;
    border: none;
  `,
  outlined: css`
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    
    &:hover, &:focus {
      background: ${props => props.theme.colors.primaryLighter};
    }
  `,
  text: css`
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: none;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    
    &:hover, &:focus {
      background: ${props => props.theme.colors.primaryLighter};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${props => props.theme.colors.text};
    border: none;
    
    &:hover, &:focus {
      background: rgba(0, 0, 0, 0.05);
    }
  `,
};

// Button sizes
const sizes = {
  small: css`
    height: 36px;
    padding: 0 ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.button.fontSize};
  `,
  medium: css`
    height: 44px;
    padding: 0 ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.typography.button.fontSize};
  `,
  large: css`
    height: 52px;
    padding: 0 ${props => props.theme.spacing.xl};
    font-size: calc(${props => props.theme.typography.button.fontSize} + 0.125rem);
  `,
  full: css`
    width: 100%;
    height: 48px;
    padding: 0 ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.button.fontSize};
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.button.fontWeight};
  transition: all ${props => props.theme.transitions.short};
  box-shadow: ${props => props.theme.shadows.sm};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Ripple effect */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }
  
  &:focus:not(:active)::after {
    animation: ripple 0.6s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(100, 100);
      opacity: 0;
    }
  }
  
  /* Apply variant styles */
  ${props => variants[props.variant]}
  
  /* Apply size styles */
  ${props => sizes[props.size]}
  
  /* Apply styles when Button has an icon */
  ${props => props.iconOnly && css`
    width: ${props => sizes[props.size].height};
    padding: 0;
    justify-content: center;
  `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  iconOnly = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      iconOnly={iconOnly}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {icon && iconPosition === 'left' && !iconOnly && (
        <IconWrapper>{icon}</IconWrapper>
      )}
      
      {iconOnly ? (
        <IconWrapper>{icon}</IconWrapper>
      ) : (
        children
      )}
      
      {icon && iconPosition === 'right' && !iconOnly && (
        <IconWrapper>{icon}</IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;
